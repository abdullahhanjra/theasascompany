# 🚀 Developer Quickstart Guide

This guide walks you through cloning, configuring, and executing missions with **The Boring Company OS**.

---

## 📋 Prerequisites

- **Node.js**: `v18.0.0` or higher (`node --version`)
- **Git**: (`git --version`)
- *Optional*: Python 3.10+ (for semantic memory and vector indexing)

---

## 📦 Installation

The framework requires zero external dependencies from npm. Clone and verify immediately:

```bash
# 1. Clone the repository
git clone https://github.com/youtubrabdullah1626/theboringcompany.git

# 2. Enter workspace
cd theboringcompany

# 3. Verify the system against the Reality Gate
npm test
```

You should see output similar to:
```
# tests 6
# suites 0
# pass 6
# fail 0
# duration_ms 950
```

---

## 🏃 Running Your First Mission

### Interactive Demonstration Run
Run the built-in demo mission:

```bash
npm run demo
```

This dispatches the synthetic mission:
```
"Optimize transaction throughput and prevent deadlock"
```
It runs through all 6 phases:
1. `ALIGN & CLASSIFY` ➔ Classifies as **Track B: Feature Sprint**
2. `RECON & MODEL` ➔ Analyzes database transaction boundaries
3. `PLAN & GATE` ➔ Stanley pitches design; Dwight runs 3-probe chaos attack
4. `EXECUTE & OBSERVE` ➔ Jim applies atomic transaction wrapping
5. `VERIFY & PROVE` ➔ Reality Gate executes automated test suite ($? === 0)
6. `COMPLETE` ➔ Emits the **Executive 1-Minute Clarity Card**

---

## 🎯 Dispatching Custom Missions

You can dispatch arbitrary missions using the command-line interface:

```bash
# General task dispatch
node cli.js --task "Refactor authentication middleware to use constant-time token comparison"

# Run with verbose telemetry
node cli.js --task "Add rate limiting to /api/v1/checkout" --verbose
```

---

## ⚙️ Configuration & Environment Variables

| Variable | Description | Default |
|---|---|---|
| `BORING_COMPANY_DB` | Path to the SQLite operating ledger | `./database/company.db` |
| `BORING_TOKEN_LIMIT` | Global token cap per mission | `100000` |
| `BORING_LOG_LEVEL` | Logging verbosity (`info`, `debug`, `silent`) | `info` |

---

## 🛠️ Next Steps

- Explore the complete [Architecture Deep-Dive](architecture.md).
- Understand how [The Reality Gate](reality-gate.md) guarantees machine verification.
- Review the [Agent Fleet Catalog](agents-catalog.md).
- Learn how to [Contribute New Agents](../CONTRIBUTING.md).
