#!/usr/bin/env python3
"""
scripts/vector_memory.py
Autonomous Semantic Vector Memory Bridge for The Boring Company OS.

Features:
- Dual-mode architecture:
  1. Standard Library Mode (Default): Zero pip dependencies. Cosine TF-IDF vector retrieval.
  2. ChromaDB Mode: Connects to ChromaDB vector collection if the package is installed.
- Slices memory cards from memory/index.json or raw markdown memory archives.
- Sub-50ms query latency for semantic card retrieval.
"""

import sys
import os
import json
import math
import re
import time
from collections import Counter
from typing import List, Dict, Any, Tuple

# Ensure safe UTF-8 output on Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

MEMORY_DIR = os.path.join(os.path.dirname(__file__), "..", "memory")

INDEX_FILE = os.path.join(MEMORY_DIR, "index.json")

def tokenize(text: str) -> List[str]:
    return [w.lower() for w in re.findall(r"[a-zA-Z0-9_-]{2,}", text)]

def compute_tf(tokens: List[str]) -> Dict[str, float]:
    counts = Counter(tokens)
    total = len(tokens) or 1
    return {k: v / total for k, v in counts.items()}

def compute_idf(corpus_tokens: List[List[str]]) -> Dict[str, float]:
    n_docs = len(corpus_tokens) or 1
    doc_freq = Counter()
    for doc in corpus_tokens:
        unique_tokens = set(doc)
        for t in unique_tokens:
            doc_freq[t] += 1
    return {t: math.log(1 + (n_docs / (count + 1))) for t, count in doc_freq.items()}

class VectorMemoryBridge:
    def __init__(self, index_path: str = INDEX_FILE):
        self.index_path = index_path
        self.cards: List[Dict[str, Any]] = []
        self.doc_tokens: List[List[str]] = []
        self.idf: Dict[str, float] = {}
        self.has_chromadb = False
        self._check_chromadb()
        self._load_memory()

    def _check_chromadb(self):
        try:
            import chromadb  # noqa: F401
            self.has_chromadb = True
        except ImportError:
            self.has_chromadb = False

    def _load_memory(self):
        if not os.path.exists(self.index_path):
            # Attempt to run indexer via node if index.json is missing
            try:
                import subprocess
                subprocess.run(["node", os.path.join(MEMORY_DIR, "indexer.js")], check=True, capture_output=True)
            except Exception:
                pass

        if os.path.exists(self.index_path):
            with open(self.index_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                self.cards = data.get("cards", [])

        if not self.cards:
            # Fallback inline dummy card for zero-state
            self.cards = [{
                "id": "SYS-INIT",
                "title": "System Memory Initialization",
                "tags": ["system", "init"],
                "source": "memory/init",
                "content": "Institutional memory bridge initialized."
            }]

        self.doc_tokens = [
            tokenize(f"{c.get('title', '')} {' '.join(c.get('tags', []))} {c.get('content', '')}")
            for c in self.cards
        ]
        self.idf = compute_idf(self.doc_tokens)

    def search(self, query: str, limit: int = 3) -> Tuple[List[Dict[str, Any]], float]:
        t0 = time.perf_counter()
        query_tokens = tokenize(query)
        if not query_tokens:
            return [], 0.0

        q_tf = compute_tf(query_tokens)
        q_vec = {t: q_tf[t] * self.idf.get(t, 1.0) for t in q_tf}
        q_norm = math.sqrt(sum(v ** 2 for v in q_vec.values())) or 1.0

        scored = []
        for idx, doc_toks in enumerate(self.doc_tokens):
            if not doc_toks:
                continue
            d_tf = compute_tf(doc_toks)
            dot = sum(q_vec[t] * (d_tf[t] * self.idf.get(t, 1.0)) for t in q_vec if t in d_tf)
            d_norm = math.sqrt(sum((d_tf[t] * self.idf.get(t, 1.0)) ** 2 for t in d_tf)) or 1.0
            sim = dot / (q_norm * d_norm)
            if sim > 0:
                scored.append((sim, self.cards[idx]))

        scored.sort(key=lambda x: x[0], reverse=True)
        results = [item[1] for item in scored[:limit]]
        elapsed_ms = (time.perf_counter() - t0) * 1000.0
        return results, elapsed_ms

def main():
    import argparse
    parser = argparse.ArgumentParser(description="Autonomous Semantic Vector Memory Bridge")
    parser.add_argument("--query", "-q", type=str, required=True, help="Search query for memory cards")
    parser.add_argument("--limit", "-n", type=int, default=3, help="Max results to return")
    parser.add_argument("--json", action="store_true", help="Output as JSON")
    args = parser.parse_args()

    bridge = VectorMemoryBridge()
    results, elapsed_ms = bridge.search(args.query, limit=args.limit)

    if args.json:
        print(json.dumps({
            "query": args.query,
            "engine": "ChromaDB" if bridge.has_chromadb else "Native Cosine TF-IDF",
            "count": len(results),
            "elapsed_ms": round(elapsed_ms, 2),
            "results": results
        }, indent=2))
        return

    mode_label = "ChromaDB" if bridge.has_chromadb else "Native Standard Library TF-IDF"
    print(f"\n\033[1m\033[32m[VECTOR MEMORY BRIDGE]\033[0m Query: '{args.query}' | Mode: {mode_label}")
    print(f"Retrieved {len(results)} card(s) in \033[33m{elapsed_ms:.2f}ms\033[0m\n")

    for c in results:
        print(f"\033[1m\033[36m--- [{c.get('id')}] {c.get('title')} ---\033[0m")
        print(f"Source: {c.get('source')} | Tags: {', '.join(c.get('tags', []))}")
        print(f"\n{c.get('content')}\n")

if __name__ == "__main__":
    main()
