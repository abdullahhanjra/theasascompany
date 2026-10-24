# Changelog

All notable changes to **The Boring Company OS** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.0] - 2026-10-24

### Added
- **Executive Council Board Meeting Engine (`src/engine/council.js`)**: 7 autonomous department head personas (Michael Scott CEO, Marcus Chen CPO, Rafael Torres CTO, Jim Halpert Minimal Coder, Dwight Schrute Red Team, Angela Martin Reality Gate, Dr. Kofi Mensah DBA) convening in ~37ms offline at 0 tokens to debate trade-offs, score risk, and cast consensus votes.
- **Durable Meeting Minutes & Decision Register**: Automatically writes dated markdown meeting minutes to `docs/meetings/MEETING_*.md` and appends certified motions to `docs/DECISION_LOG.md`.
- **Interactive Founder Voting (`--interactive`, `-i`)**: Added human-in-the-loop voting mode allowing the Founder to break ties or steer council deliberations interactively.
- **Autonomous Sprint DAG Planner (`src/engine/planner.js`)**: Kahn's algorithm topological sorting with cycle detection (`A -> B -> A`) and orphan dependency rejection. Atomically commits tickets and `blocking_edges` to SQLite.
- **Ask-Matt Meta-Routing Engine & Socratic Interview (`src/engine/router.js`, `src/engine/socratic.js`)**: Sub-15ms deterministic task classification mapping user prompts directly to specialized engineering workflows with zero LLM API costs.
- **Exported 4 Core Matt Pocock Skills (`.agents/skills/`)**: Added `ask-matt`, `tdd`, `code-review`, and `grill-with-docs` lifecycle skills.
- **Karpathy 50-Line Diff Razor**: Strictly enforced 50-line diff guard across all sprint tickets with automated rollback on violation.
- **Reality Gate Expansion to 97 Native Tests**: Expanded test coverage across 6 comprehensive suites covering router benchmarks, socratic trees, task breaker DAGs, council deliberation, and adversarial tamper-resistance.

### Changed
- CLI entrypoint (`cli.js`): Added `meet`, `council`, `deliberate`, and `ask` commands with automatic executive council deliberation on direct `boss "<task>"` dispatches.
- Updated default Gemini model provider to `gemini-2.5-flash`.

---

## [1.1.0] - 2026-10-16

### Added
- **Empirical Benchmark Suite (`test/benchmark.js`, `BENCHMARKS.md`)**: Automated 10,000-iteration performance testing harness reporting nanosecond-precise p50/p95/p99 execution metrics adhering to `[MEASURED]` epistemic standards.
- **Context-Optimized Memory Indexing Engine (`memory/indexer.js`, `memory/search.js`)**: Slices 400KB+ institutional memory into 220+ tagged, bite-sized (<50 lines) cards queryable in under 15ms, eliminating LLM context window blowup.
- **Python Vector Memory Bridge (`scripts/vector_memory.py`)**: Dual-mode semantic retriever featuring zero-dependency native TF-IDF/BM25 cosine similarity with ChromaDB auto-detection and Windows Unicode safety.
- **Verifiable Mission Run Traces (`examples/runs/`)**: Complete raw execution JSON records capturing agent transcripts, token expenditures, test outputs, and certified Reality Gate signatures.
- **High-Fidelity SVG Terminal Preview (`docs/assets/clarity-card-preview.svg`)**: Embedded visual clarity card preview for immediate, verifiable proof of output on GitHub.
- **Reality Gate Expansion**: Expanded automated verification matrix to 12 comprehensive native test suites.

### Fixed
- Fixed agent directory resolution in `scripts/train-agents.js` to dynamically detect `agents/definitions` and added `--dry-run` inspection flag.
- Added Windows console UTF-8 stream guards for emoji rendering.

---

## [1.0.0] - 2026-10-16


### Added
- **Fleet of 67 Specialized Agents**: Complete corporate hierarchy of autonomous agents (CEO, CTO, VP Engineering, Adversarial Inquisitors, DBRE, Security, TDD Engineers, Frontend/UI).
- **Reality Gate Verification Engine**: Automated exit-code and test-runner interlock preventing hallucinated task approvals.
- **Relational Enterprise Ledger (`database/schema.sql`)**: 45+ relational tables tracking tasks, execution leases, token quotas, and tamper-proof governance audit events.
- **3-Track Velocity Engine**: Autonomous task routing across Track A (Surgical, <60s), Track B (Feature Sprint, 2-3m), and Track C (Enterprise Core, 5-8m).
- **Adversarial Sparring Protocol (Claudex Loop)**: 2-round pre-code design debate between Software Architects and Adversarial Inquisitors with 5-vector fragility scorecards.
- **Native Node.js CLI Runner (`cli.js`)**: Interactive dispatch CLI supporting zero-config execution (`npm run demo`) and custom task execution (`node cli.js --task "..."`).
- **Native Test Runner Suite (`test/reality-gate.test.js`)**: Built-in test assertions validating agent YAML frontmatter, roster integrity, schema completeness, and mailbox contracts with zero external dependencies.
- **GitHub Actions Multi-OS Matrix (`.github/workflows/ci.yml`)**: Continuous integration testing across Ubuntu, macOS, and Windows on Node.js 18, 20, and 22.
- **Cross-Platform Execution Shims**: Provided `hive/bin/hive-node.cmd` for Windows and `hive/bin/hive-node.sh` for Unix/macOS environments.
- **Token Circuit Breakers**: 3-stage budget governor (`steer` ➔ `constrain` ➔ `stop`) in the Hive proxy to prevent infinite runaway LLM loops.

### Changed
- Sanitized all repository manifests and documentation, removing local paths in favor of environment-agnostic relative references.
- Replaced uncalibrated marketing claims with verifiable, empirical mechanical descriptions.
- Added comprehensive trademark disclaimer clarifying independent open-source engineering nature of the project.
