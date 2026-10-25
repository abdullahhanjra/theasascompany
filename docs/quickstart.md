# 🚀 Developer Quickstart Guide

This guide walks you through cloning, configuring, and executing missions with **The Asas Company OS**.

---

## 📋 Prerequisites

- **Node.js**: `v22.5.0` or higher (`node --version`) — requires native `node:sqlite`
- **Git**: (`git --version`)
- *Optional*: Python 3.10+ (for semantic memory and vector indexing)

---

## 📦 Installation

The framework requires zero external dependencies from npm. Clone and verify immediately:

```bash
# 1. Clone the repository
git clone https://github.com/abdullahhanjraa/theasascompany.git

# 2. Enter workspace
cd theasascompany

# 3. Verify the system against the Reality Gate (97 Automated Tests across 6 Suites)
npm test
```

You should see output similar to:
```
# tests 97
# suites 6
# pass 97
# fail 0
# duration_ms 1740
```

---

## 🏃 Running Your First Mission

### Hermetic Demonstration Run
Run the built-in end-to-end demonstration mission with real tool execution, sandbox creation, and Reality Gate machine proof:

```bash
npm run demo
```

This dispatches the engineering mission:
```
"Implement thread-safe connection pool with exponential backoff"
```
It runs through the real engineering pipeline:
1. `LEDGER ADMISSION` ➔ Persists task and execution lease into SQLite
2. `RECON & INSPECTION` ➔ Analyzes sandbox file boundaries
3. `EXECUTION TURNS` ➔ Agent inspects files, authors minimal code change via `writeFile`
4. `REALITY GATE` ➔ Runs `node test.js` subprocess, verifies exit code 0, positive assertions, and anti-tamper check
5. `LEDGER CERTIFICATION` ➔ Records cryptographic SHA-256 evidence record and prints the **Executive 1-Minute Clarity Card**

---

## 🤖 Configuring Real AI Providers

The system features clean model provider abstractions. You can use your preferred provider or run locally:

### 1. Anthropic Claude (Default: `claude-3-7-sonnet-20250219`)
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
node cli.js --provider anthropic --task "Add rate limiting middleware"
```

### 2. OpenAI (Default: `gpt-4o`)
```bash
export OPENAI_API_KEY="sk-..."
node cli.js --provider openai --task "Refactor transaction pool"
```

### 3. Google Gemini (Default: `gemini-2.5-pro`)
```bash
export GEMINI_API_KEY="AIzaSy..."
node cli.js --provider gemini --task "Optimize query planner"
```

### 4. Local Ollama (Offline & Private)
```bash
# Ensure ollama is running locally: ollama run llama3
node cli.js --provider ollama --model llama3 --task "Fix input validation"
```

### 5. Deterministic Test Provider (Zero API Keys Required)
```bash
node cli.js --provider test --task "Run offline hermetic verification"
```

---

## 🎯 Dispatching Custom Missions on Target Repositories

You can point The Asas Company OS at any existing repository on your machine:

```bash
# Dispatch against an external codebase
node cli.js --target /path/to/my-repo --task "Fix broken jest tests in auth module" --test-cmd "npm test"

# Force a specific velocity track
node cli.js --track A --task "Fix typo in api documentation"
```

---

## ⚡ Running Empirical Latency Benchmarks

Quantitatively measure runtime latencies (p50, p95, p99) under load with nanosecond resolution:

```bash
npm run benchmark
```

---

## ⚙️ Configuration & Environment Variables

| Variable | Description | Default |
|---|---|---|
| `ASAS_PROVIDER` | Default AI provider (`anthropic`, `openai`, `gemini`, `ollama`, `test`) | `auto` |
| `ASAS_MODEL` | Default model identifier | Provider default |
| `ANTHROPIC_API_KEY` | Anthropic API key | None |
| `OPENAI_API_KEY` | OpenAI API key | None |
| `GEMINI_API_KEY` | Google Gemini API key | None |
| `OLLAMA_BASE_URL` | Ollama local endpoint | `http://127.0.0.1:11434` |
| `ASAS_COMPANY_DB` | Path to the SQLite operating ledger | `./database/company.db` |

---

## 🛠️ Next Steps

- Explore the complete [Architecture Deep-Dive](architecture.md).
- Understand how [The Reality Gate](reality-gate.md) guarantees machine verification.
- Review the [Agent Fleet Catalog](agents-catalog.md).
- Learn how to [Contribute New Agents](../CONTRIBUTING.md).
