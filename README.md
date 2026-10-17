<div align="center">

# 🏢 The Boring Company

### **A complete autonomous AI software company at your fingertips.**

*From minimal-change coders to adversarial red-team inquisitors, from database reliability engineers to Apple-grade design architects.*  
**67 specialized agents backed by an autonomous execution runtime that never hallucinates, never cheats on tests, and never quits until your code is mathematically verified production-ready.**

<br/>

[![Reality Gate CI](https://github.com/abdullahhanjraa/theboringcompany/actions/workflows/ci.yml/badge.svg)](https://github.com/abdullahhanjraa/theboringcompany/actions)
[![Reality Gate Tests](https://img.shields.io/badge/Reality%20Gate-32%20passing-22c55e.svg?style=flat-square)](test/)
[![Specialist Fleet](https://img.shields.io/badge/Specialist%20Fleet-67%20Agents-8b5cf6.svg?style=flat-square)](#-the-office-dream-team-roster)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0%20external-3b82f6.svg?style=flat-square)](package.json)
[![Node Runtime](https://img.shields.io/badge/Node.js->=22.5-green.svg?style=flat-square)](https://nodejs.org/)
[![p99 Latency](https://img.shields.io/badge/p99%20Latency-<15ms-f59e0b.svg?style=flat-square)](BENCHMARKS.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

<br/>

[**⚡ 1-Command Quickstart**](#-1-command-quickstart--multi-tool-install) • [**🥊 Meet The Dream Team**](#-the-office-dream-team-roster) • [**📊 How We Compare**](#-the-unbeatable-advantage-how-we-compare) • [**🎯 Copy-Paste Missions**](#-instant-copy-paste-missions) • [**🛡️ The Reality Gate**](#️-the-reality-gate-mathematical-proof) • [**📈 Benchmarks**](#-empirical-nanosecond-benchmarks)

</div>

---

## ⚡ The Developer Nightmare (And Why This Exists)

Every developer, tech lead, and founder has lived through this exact disaster:

1. You ask an AI coding assistant to implement a feature or fix a tricky bug.
2. The AI generates 300 lines of confident, beautiful code and announces:  
   > *"Done! Everything works cleanly."*
3. You copy it into your repo, run your tests, and **the build crashes with 8 errors, broken imports, and subtle regressions**.
4. You spend the next 45 minutes manually debugging the AI's hallucinations.

**The painful truth:** You didn't save time. You just became an underpaid code reviewer for an AI.

Worse, standard multi-agent frameworks often cheat: they delete failing test assertions, add `// @ts-ignore` comments, or enter infinite apology loops that burn \$50 in API credits without fixing anything.

---

## 💡 The Solution: An Autonomous Company with Separation of Powers

**The Boring Company** fundamentally flips the trust model.

We treat AI models like **untrusted junior contractors**. The model is never allowed to grade its own homework. A task is considered complete **only when your real machine test runner exits cleanly with exit code 0 (`$? === 0`)**, positive assertion counts are captured, and cryptographic SHA-256 fingerprints prove no test files were tampered with.

```
                             YOU (THE FOUNDER / BOSS)
                                        │
                                        ▼
                  ┌───────────────────────────────────────────┐
                  │ 1. CEO & CHIEF OF STAFF (Marcus / Michael)│
                  │ Decomposes request & locks token budget   │
                  └───────────────────────────────────────────┘
                                        │
                                        ▼
                  ┌───────────────────────────────────────────┐
                  │ 2. ADVERSARIAL SPARRING ARENA             │
                  │ Architect pitches ➔ Inquisitor attacks!  │
                  └───────────────────────────────────────────┘
                                        │
                                        ▼
                  ┌───────────────────────────────────────────┐
                  │ 3. SURGICAL CODER & TDD ENGINE            │
                  │ Writes failing test first (RED) ➔ GREEN   │
                  │ Enforces Karpathy 50-line razor           │
                  └───────────────────────────────────────────┘
                                        │
                                        ▼
                  ┌───────────────────────────────────────────┐
                  │ 4. THE REALITY GATE AUDITOR (Angela) 🛡️   │
                  │ Physical OS execution: Exit Code = 0?     │
                  │ Test assertions > 0? No test tampering?   │
                  └───────────────────────────────────────────┘
                                        │
                      ┌─────────────────┴─────────────────┐
                      ▼                                   ▼
                [Test Failed ❌]                   [Test Passed ✅]
            Self-healing diagnostic loop:      ACID SQLite operating ledger
          Fixes mistake without bugging you.  delivers certified clean release!
```

---

## 👥 The Office "Dream Team" Roster

Inspired by the ultimate engineering division of labor, each specialist agent has a strict mandate, an uncompromising personality, and explicit operational triggers:

| Specialist | Identity & Role | Engineering Mandate & Superpower | When to Call Them |
| :--- | :--- | :--- | :--- |
| 👔 **Michael** | **Supreme Floor Conductor & CEO** | Coordinates the 5 divisions, arbitrates deadlocks, and enforces Reality Gate sign-offs. | Whenever you dispatch a mission with `/boss <task>`. |
| 🥊 **Dwight** | **Assistant (to the) Regional Manager & Inquisitor** | Attacks edge cases, race conditions, null pointers, and over-engineering *before* code is written. | Track B & C feature planning to stress-test designs. |
| 💻 **Jim** | **Minimal Change Lead Coder** | Enforces the *Karpathy 50-Line Razor*. Prefers three similar lines over a speculative abstraction. | Surgical bug fixes, clean diffs, zero orthogonal drift. |
| 🛡️ **Angela** | **Strict TDD Engine & Reality Gate Auditor** | Utterly cold and uncompromising. Approves based on exit code 0 and nothing else. Rejects false claims. | Independent verification gate before any code release. |
| 🏛️ **Stanley** | **Principal Systems Architect** | Domain modeling, bounded contexts, and 5-bullet architectural proposals. Refuses premature abstractions. | Architecture decisions, system design, data modeling. |
| 🧮 **Oscar** | **Database Reliability Engineer (DBRE) & Math** | High availability, SQLite WAL optimization, zero N+1 queries, automated failover, index optimization. | Database schemas, indexing, migrations, query performance. |
| 🔒 **Toby** | **AgentShield AppSec & Security Officer** | CWE defense (CWE-22 path traversal, CWE-78 command injection, CWE-798 secret leaks). Fail-closed defaults. | Threat modeling, secret sanitization, permission gating. |
| 🕵️ **Creed** | **Cold Review Inspector & Chaos Probe** | Evaluates code changes with zero author bias from a clean context. Injects malformed packets and fuzzing. | Final cold-review sanity check, chaos testing. |
| 🎨 **Pam & Jan** | **Design Director & UI Finish Gate** | Apple-grade typography, tactile 60fps spring transitions, anti-slop visual consistency, 14-point UI gate. | Frontend components, responsive design, visual polish. |
| 🌐 **58+ Specialists** | **Modular Domain Engineers** | Backend Platform, Mobile, AI Data Remediation, SRE, Network, Solidity, Voice AI, Technical Writing. | See full list with `npm run install-tools -- --list`. |

---

## 📊 The Unbeatable Advantage: How We Compare

Why choose **The Boring Company** over conventional AI tools?

| Capability | Cursor / Copilot | Devin / OpenDevin | CrewAI / AutoGPT | **The Boring Company** |
| :--- | :---: | :---: | :---: | :---: |
| **Trust Model** | Blind Faith (Human reviews all slop) | Conversational self-reporting | Self-certifying (Agents agree with themselves) | **Hostile Zero-Trust (Reality Gate interlock)** |
| **Verification Gate** | None (Paste & pray) | Basic command run | Simulated / Mocked | **Real OS Exit Code 0 (`$? === 0`) + Positive Asserts** |
| **Anti-Cheating Guard** | None | None | None | **SHA-256 Test File Anti-Tamper Fingerprints** |
| **Pre-Code Sparring** | None | Single prompt chain | Endless chat debate | **2-Round Adversarial Sparring (Architect vs Inquisitor)** |
| **Cost Protection** | Unlimited chat burn | High token burn | Infinite apology loops (\$50+) | **Hard Token Budget Caps + 3-Track Velocity Circuit Breakers** |
| **Dependency Bloat** | N/A (IDE plugin) | 150+ Python/pip pkgs | 80+ npm packages | **100% Native Node 22 Standard Library (0 Dependencies)** |
| **Audit Trail** | Ephemeral chat history | Browser sandbox logs | In-memory / Plain text | **ACID Relational SQLite Ledger (WAL mode & Audit Triggers)** |

---

## ⚡ 1-Command Quickstart & Multi-Tool Install

Zero `npm install` bloat. Zero fragile dependencies. Built purely on **native Node.js 22+ standard library**.

### Option 1: Instant 3-Second Demo (Zero Setup)
```bash
npx theboringcompany
```
*Watch the autonomous team catch a broken bug in a sandbox, write the minimal fix, prove that all tests pass, and present a certified release in 3 seconds.*

### Option 2: Run Any Task in Your Project
```bash
npx theboringcompany /boss "Fix the auth token refresh bug in src/auth.js"
```

### Option 3: Export 67 Specialist Agents into Your Favorite Editor
Use our built-in multi-tool exporter to install all 67 agents directly into your development workflow:

```bash
# Clone the repository
git clone https://github.com/abdullahhanjraa/theboringcompany.git
cd theboringcompany

# Install all 67 agents into Cursor (.cursor/rules/)
node scripts/install-tools.js --tool cursor

# Install all 67 agents into Claude Code (~/.claude/agents/)
node scripts/install-tools.js --tool claude

# Install into Antigravity (.agents/)
node scripts/install-tools.js --tool antigravity

# Or install everywhere at once
node scripts/install-tools.js --tool all
```

---

## 🎯 Instant Copy-Paste Missions

Ready to see the company in action? Copy and paste these exact missions into your terminal or editor:

### 🐛 Mission 1: The Heisenbug Hunter (Surgical Bug Fix)
```bash
node cli.js /boss "Fix race condition in session checkout: ensure double-clicks return identical order ID and satisfy test suite"
```
*Jim (Minimal Coder) applies idempotent database constraints, Angela verifies tests pass, and you get a clean 15-line diff.*

### 🚀 Mission 2: The TDD Feature Sprint (0-to-1 Implementation)
```bash
node cli.js /boss "Implement rate-limited webhook receiver with exponential backoff and HMAC-SHA256 signature verification"
```
*Stanley models the architecture, Dwight attacks concurrency edge cases, Angela writes the failing tests first, and the team drives it to green.*

### 🔒 Mission 3: The AppSec Threat Audit
```bash
node cli.js /boss "Audit all file input endpoints for CWE-22 path traversal and sanitize bearer tokens from logging output"
```
*Toby scans the codebase, installs fail-closed path boundaries, adds secret redaction regexes, and confirms zero regressions.*

---

## 🛡️ The Reality Gate: Mathematical Proof

Most AI tools lie. They say: *"All tests are passing!"* — even when they didn't run the tests, or worse, **when they secretly deleted your test file so it wouldn't fail!**

The Boring Company Reality Gate enforces **3 Physical Machine Laws**:

1. **Physical OS Process Execution:** The test runner (`node:test`, Jest, Vitest, Pytest) is spawned into an isolated sub-process. The OS exit code must be exactly `0`.
2. **Cryptographic Anti-Tamper:** SHA-256 hashes of all test files are taken before execution. If the model touches, weakens, or comments out a test without permission, the patch is **immediately rejected and rolled back**.
3. **Positive Assertion Counts:** The test runner must execute real assertions (`passed > 0`). Empty tests that do nothing are strictly rejected.

---

## 📈 Empirical Nanosecond Benchmarks

All metrics measured on physical machine hardware using `npm run benchmark` with nanosecond-resolution `process.hrtime.bigint()` timing:

| Benchmark Probe | Iterations | Median (p50) | 99th Percentile (p99) | Verification Status |
| :--- | :---: | :---: | :---: | :---: |
| **Reality Gate Fail-Closed Decision** | 10,000 | **0.0001 ms** | **0.0017 ms** | ✔ PASS (Deterministic) |
| **Actor IPC Contract Validation** | 10,000 | **0.0003 ms** | **0.0015 ms** | ✔ PASS (Zero Overhead) |
| **Schema DDL Integrity (45+ tables)** | 200 | **0.2290 ms** | **0.7110 ms** | ✔ PASS (ACID Validated) |
| **Memory Index Card Query (<50 lines)**| 100 | **8.6670 ms** | **12.1720 ms** | ✔ PASS (Sub-15ms Target) |

*See [`BENCHMARKS.md`](BENCHMARKS.md) for full hardware environment specifications and reproducibility methodology.*

---

## 🤖 Universal Model Support

Switch between your favorite AI models with zero lock-in:

| Provider | Supported Models | Ideal Use Case |
| :--- | :--- | :--- |
| **Anthropic** | `claude-3-7-sonnet`, `claude-3-5-sonnet` | Complex architectural reasoning & deep debugging |
| **OpenAI** | `gpt-4o`, `o3-mini` | Rapid code generation & tool execution |
| **Google Gemini** | `gemini-2.5-pro`, `gemini-2.5-flash` | Multimodal analysis & massive context tasks |
| **Ollama (Local)**| `deepseek-coder`, `llama3`, `qwen2.5-coder`| 100% private, free, offline coding on your machine |
| **Offline Test** | Built-in Hermetic Engine | Deterministic testing & zero-cost CI validation |

---

## 📜 License & Author

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

### Author
* **Abdullah Hanjra** — Software Architect & Systems Builder
* **GitHub**: [@abdullahhanjraa](https://github.com/abdullahhanjraa) • [@abdullahhanjra153](https://github.com/abdullahhanjra153)
* **LinkedIn**: [linkedin.com/in/abdullahhanjracodes](https://www.linkedin.com/in/abdullahhanjracodes/)

<br/>

<div align="center">
<b>Welcome to The Boring Company. Sit back, be The Boss, and let your software company build. ☕</b>
</div>
