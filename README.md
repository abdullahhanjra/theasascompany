<div align="center">

<a href="https://github.com/abdullahhanjraa/theboringcompany">
  <img src="docs/assets/banner.svg" alt="The Boring Company Banner" width="100%">
</a>

<br/><br/>

# 🏢 The Boring Company
### **Stop babysitting chatbots that lie to your face.**
### **Run an entire autonomous software company in your terminal.**

*72 specialized AI teammates across 6 departments who debate features, write clean code under 50 lines, and prove every fix passes your real tests before shipping. Pure Node.js, zero external packages, 100% private.*

<br/>

[![Reality Gate CI](https://github.com/abdullahhanjraa/theboringcompany/actions/workflows/ci.yml/badge.svg)](https://github.com/abdullahhanjraa/theboringcompany/actions)
[![Reality Gate Tests](https://img.shields.io/badge/Reality%20Gate-97%20passing-22c55e.svg?style=flat-square)](test/)
[![Specialist Fleet](https://img.shields.io/badge/Specialist%20Team-72%20Agents-8b5cf6.svg?style=flat-square)](#-meet-the-6-departments)
[![Zero Dependencies](https://img.shields.io/badge/External%20Packages-0%20needed-3b82f6.svg?style=flat-square)](package.json)
[![Deliberation Speed](https://img.shields.io/badge/Board%20Meeting-~37ms%20(0%20tokens)-06b6d4.svg?style=flat-square)](#-the-autonomous-board-meeting)
[![Node Runtime](https://img.shields.io/badge/Node.js->=22.5-green.svg?style=flat-square)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

<br/>

[**⚡ 10-Second Quickstart**](#-the-10-second-quickstart) • [**💬 See It In Action**](#-see-it-in-action) • [**🏛️ The Board Meeting**](#-the-autonomous-board-meeting) • [**🏢 6 Departments**](#-meet-the-6-departments) • [**🛡️ The Reality Gate**](#️-the-reality-gate-why-it-never-lies) • [**📊 Comparison**](#-why-this-beats-every-other-ai-tool)

</div>

---

## 😫 The Pain: Why Every AI Coding Tool Frustrates You

You know the feeling:

1. You ask an AI chatbot to fix a small checkout bug or add a button to your app.
2. The AI writes **350 lines of complex, confusing code** and says:  
   > *"I have fixed everything! Your app is now production-ready!"*
3. You excitedly paste it into your project, hit refresh, and **it immediately crashes with red errors**.
4. Even worse: it deleted your test files, broke two other pages you never asked it to touch, and introduced a security vulnerability.
5. You spend your whole evening cleaning up the mess the AI made.

### ❓ Why Does This Keep Happening?
Because a solo chatbot is like an **eager intern working alone at 2 AM with no supervision**:
- **No Product Manager** to stop scope creep.
- **No Software Architect** to keep code small and clean.
- **No Red Team** to challenge edge cases and race conditions.
- **No QA Lead** to physically test the code on your real computer before claiming victory.

---

## 🚀 The Hero Solution: You Are The Founder. We Are Your Company.

**The Boring Company** replaces the lonely chatbot with a **complete, disciplined virtual software company**.

You sit in the Founder's chair. You give your team a goal in plain English. Your team of **72 specialized AI teammates across 6 departments** takes over:

```
                            👑 YOU (THE FOUNDER / VISIONARY)
                                           │
                                           ▼
 ┌───────────────────────────────────────────────────────────────────────────────────┐
 │ 1. 👔 EXECUTIVE BOARD (Michael Scott, Marcus Chen, Rafael Torres)                 │
 │    Convenes in 37ms. Debates user friction, sets velocity track, and scopes work. │
 └─────────────────────────────────────────┬─────────────────────────────────────────┘
                                           │
                                           ▼
 ┌───────────────────────────────────────────────────────────────────────────────────┐
 │ 2. 🥊 THE RED TEAM (Dwight Schrute & Toby Flenderson)                             │
 │    Attacks the plan! "What if the user double-clicks? What if the network drops?" │
 └─────────────────────────────────────────┬─────────────────────────────────────────┘
                                           │
                                           ▼
 ┌───────────────────────────────────────────────────────────────────────────────────┐
 │ 3. ⚙️ CORE ENGINEERING & DATABASE (Jim Halpert & Dr. Kofi Mensah)                 │
 │    Applies the Karpathy Razor: surgical code under 50 lines. Strict SQLite ACID.  │
 └─────────────────────────────────────────┬─────────────────────────────────────────┘
                                           │
                                           ▼
 ┌───────────────────────────────────────────────────────────────────────────────────┐
 │ 4. 🧪 THE REALITY GATE (Angela Martin - Head of QA)                               │
 │    Physically runs `npm test` on your computer. Exit code MUST be 0. Zero lies.   │
 └─────────────────────────────────────────┬─────────────────────────────────────────┘
                                           │
                          ┌────────────────┴────────────────┐
                          ▼                                 ▼
                   [Tests Fail ❌]                   [Tests Pass ✅]
             Jim fixes the exact error.         Angela certifies the build.
             Never touches dirty state.         Saved to `company.db` & shipped!
```

---

<a id="demo"></a>
## 💬 See It In Action: How The Team Solves a Real Bug

Imagine you type this single command:

```bash
boss "Fix checkout: if someone clicks the Pay button twice quickly, it charges them twice"
```

Here is what happens behind the scenes in milliseconds:

* 👔 **Michael Scott (CEO):**  
  *"Team, we have a critical customer complaint: double-charging during checkout. We are operating on Track B. Marcus, what is the exact user friction?"*

* 📋 **Marcus Chen (CPO):**  
  *"I am bounding scope strictly: 1) Disable the button immediately on the first click, 2) Assign every payment an idempotent transaction UUID, and 3) Reject duplicate tokens."*

* 🥊 **Dwight Schrute (Red Team Lead):**  
  *"Identity theft is not a joke! What if the user refreshes mid-charge? What if their mobile connection drops and retries automatically? A frontend button disable is NOT enough! We need an atomic database constraint."*

* 📐 **Rafael Torres (CTO & VP Engineering):**  
  *"Agreed with Dwight. We keep the seam minimal. Jim, add a unique transaction token check in `src/payment.js`. Keep it strictly under 50 lines. Kofi, verify the database index."*

* ⚙️ **Jim Halpert (Lead Minimal Coder):**  
  *"Relax Dwight, handled. Exactly 14 clean lines added. Zero unrelated files modified."*

* 🗄️ **Dr. Kofi Mensah (Database Engineer):**  
  *"Checked the table. Unique index guarantees duplicate charges bounce safely with zero table locks."*

* 🧪 **Angela Martin (Head of Quality):**  
  *"Hold on team. Words mean nothing. I am executing your computer's real test runner right now... `npm test` exited with code 0! All 97 tests passed. No skipped assertions. No modified test files. Certified."*

* 📦 **Darryl Philbin (Operations):**  
  *"Recorded SHA-256 evidence into local `company.db`. Clean diff committed. Task complete."*

---

<a id="board-meeting"></a>
## 🏛️ The Autonomous Board Meeting (`boss meet`)

Want to brainstorm an architecture, debate database choices, or evaluate trade-offs before writing a single line of code?

Convene an **Executive Council meeting** in **~37 milliseconds** using **0 API tokens**:

```bash
boss meet "Should we use PostgreSQL or SQLite for storing user sessions?"
```

```text
══════════════════════════════════════════════════════════════════════════════════
🏢  THE BORING COMPANY — EXECUTIVE COUNCIL CHAMBERS
Session Objective: "Should we use PostgreSQL or SQLite for storing user sessions?"
Consensus: UNANIMOUS (MOTION PASSED) | Track: Track B (Feature Sprint) | Latency: 37ms
══════════════════════════════════════════════════════════════════════════════════

💬 Executive Council Deliberation Highlights:
  [Michael Scott - CEO]
  ↳ Council, we need to decide our session storage architecture. Marcus, what are the product requirements?

  [Marcus Chen - CPO]
  ↳ Low latency is everything. Sessions must resolve in <5ms. We don't need heavy multi-region replication yet.

  [Rafael Torres - CTO]
  ↳ SQLite with WAL mode running locally gives us sub-millisecond reads with zero network overhead. Avoids Redis hosting costs.

  [Dwight Schrute - Red Team]
  ↳ What about concurrent file locks? If 100 users log in at the same instant, does SQLite choke?

  [Dr. Kofi Mensah - DBA]
  ↳ In WAL mode, readers never block writers and writers never block readers. SQLite handles 50,000+ writes/sec cleanly.

  [Angela Martin - QA Gate]
  ↳ If we choose SQLite, I demand automated concurrency stress tests before any code merges.

  [Michael Scott - CEO]
  ↳ Motion passed: Use SQLite in WAL mode with Angela's concurrency tests!

📋 Approved Sprint Backlog (Topological DAG with Kahn's Algorithm):
  • [stage_1_schema] Create sessions table with foreign keys & WAL pragma (Dr. Kofi)
  • [stage_2_tests] Author adversarial concurrent login stress tests (Dwight & Ryan)
  • [stage_3_impl] Implement minimal session store interface <=50 lines (Jim Halpert)
  • [stage_4_gate] Reality Gate execution: npm test exit code 0 (Angela Martin)

✔ Board Minutes Saved: docs/meetings/MEETING_2026-10-24_sessions.md
✔ Decision Log Updated: docs/DECISION_LOG.md
══════════════════════════════════════════════════════════════════════════════════
```

> 💡 **Interactive Voting**: Add `--interactive` (`-i`) to vote yourself and break ties as the Founder!

---

<a id="quickstart"></a>
## ⚡ The 10-Second Quickstart

You don't need to install 50 npm packages. This runs on **pure Node.js** (version 22+) with **zero extra dependencies**.

### 1. Instant Run Without Installing (`npx`)
Run inside **any project on your computer**:
```bash
npx theboringcompany meet "Build social login with Google and GitHub"
```

### 2. Install Once, Use Everywhere (`boss`)
Install globally:
```bash
npm install -g theboringcompany
```

Now, in **any folder anywhere on your computer**, just type:
```bash
# 🏛️ Hold an autonomous board meeting on any feature
boss meet "Add Stripe subscription billing"

# ⚡ Instant smart routing (<15ms, 0 tokens)
boss ask "Users getting logged out randomly"

# 🚀 Execute a mission with the full company
boss "Add dark mode toggle to navigation bar"

# 🧩 Preview the assembly line without writing code
boss --plan "Build user authentication system"
```

### 3. Use Inside Cursor, Claude Code, or Antigravity
Export all 72 specialist agent definitions directly into your favorite editor:
```bash
# Export into Cursor (.cursor/rules/)
npx theboringcompany install --tool cursor

# Export into Claude Code (~/.claude/agents/)
npx theboringcompany install --tool claude

# Export into Antigravity (.agents/)
npx theboringcompany install --tool antigravity
```
Now type `/boss "your task"` directly inside your editor's chat window!

---

<a id="reality-gate"></a>
## 🛡️ The Reality Gate: Why It Never Lies

Every other AI tool uses **"narrative confirmation"** — the AI says it works, so the tool claims victory.

The Boring Company uses **The Reality Gate Interlock**:

```
                       ┌─────────────────────────────────┐
                       │       AI Generates Code         │
                       └────────────────┬────────────────┘
                                        │
                                        ▼
                       ┌─────────────────────────────────┐
                       │      THE REALITY GATE VAULT     │
                       │   (Under Angela Martin - QA)    │
                       └────────────────┬────────────────┘
                                        │
      ┌─────────────────────────────────┼─────────────────────────────────┐
      ▼                                 ▼                                 ▼
[Exit Code Check]             [Anti-Tamper Guard]               [Assertion Audit]
Did `npm test` exit 0?        Did the AI touch or delete        Did real assertions run,
Exit 1 = REJECTED.            test files? Cheating = REJECTED.   or was it empty? 0 = REJECTED.
      └─────────────────────────────────┼─────────────────────────────────┘
                                        │
                                        ▼
                       ┌─────────────────────────────────┐
                       │  ALL 3 PASS: SHIPPED TO PROD    │
                       │  Cryptographic SHA-256 in DB    │
                       └─────────────────────────────────┘
```

1. **Exit Code 0 Proof ($? === 0)**: The native test runner (`npm test`, `pytest`, `cargo test`) must exit with 0. If there is a single failure, the code is blocked.
2. **Anti-Tamper Fingerprints**: Test files are hashed before execution. If an AI tries to comment out a failing test to cheat, the Reality Gate detects the mismatch and triggers an automatic rollback.
3. **Non-Zero Assertion Enforcement**: The parser inspects test tap streams. Tests with 0 assertions are rejected as fake victories.
4. **Karpathy 50-Line Diff Razor**: Any ticket attempting to modify more than 50 lines is automatically blocked to protect your codebase from sprawling refactors.

---

<a id="departments"></a>
## 🏢 Meet The 6 Departments

Our 72 specialists work in 6 disciplined departments:

```
┌─────────────────────────┬─────────────────────────┬─────────────────────────┐
│ 1. 👑 LEADERSHIP        │ 2. 🛡️ RED TEAM          │ 3. ⚙️ CORE ENGINEERING   │
│ • Michael Scott (CEO)   │ • Dwight Schrute (Lead) │ • Jim Halpert (Lead)    │
│ • Marcus Chen (CPO)     │ • Toby (Security Guard) │ • Dr. Kofi Mensah (DBA) │
│ • Rafael Torres (CTO)   │ • Hank (File Guard)     │ • Stanley (Minimalist)  │
│ • Jan Levinson (Brand)  │ • Creed (Pen-Tester)    │ • Andy (API Specialist) │
│ • Darryl Philbin (Ops)  │ • Amira (Resilience)    │ • +45 Specialist Coders │
├─────────────────────────┼─────────────────────────┼─────────────────────────┤
│ 4. 🧪 REALITY GATE QA   │ 5. 🎨 PRODUCT & DESIGN  │ 6. 📦 OPERATIONS & SRE  │
│ • Angela Martin (Lead)  │ • Pam Beesly (UI Lead)  │ • Darryl Philbin (Lead) │
│ • Ryan Howard (TDD)     │ • Zara (UX Workflow)    │ • Nate (Speed & Cache)  │
│ • Kevin (Checklist DoD) │ • Elena (Design Tokens) │ • Val (Toolchain)       │
│ • Isabela (Automation)  │ • Yuki (Motion Design)  │ • Phyllis (Memory DB)   │
└─────────────────────────┴─────────────────────────┴─────────────────────────┘
```

---

<a id="comparison"></a>
## 📊 Why This Beats Every Other AI Tool

| Feature | Standard Chatbots (ChatGPT / Copilot) | AI Coding Agents (Devin / Cursor Agent) | 🏢 **The Boring Company** |
| :--- | :---: | :---: | :---: |
| **Verification Method** | None. It guesses and promises. | Basic commands, often hallucinates passing tests. | **Physical Reality Gate: Exit code 0 ($? === 0) on your actual machine.** |
| **Prevents Cheating** | ❌ No | ❌ No (can modify or delete test files) | **✔ Anti-Tamper SHA-256 fingerprinting catches cheating.** |
| **Pre-Code Debate** | ❌ No plan, just dumps code | ❌ Long monologue | **✔ 7 department heads debate edge cases in 37ms.** |
| **Diff Control** | Rewrites 300+ lines you never asked for | Often breaks adjacent files | **✔ Karpathy Razor: Strict $\le$50 line surgical slices.** |
| **Dependency Bloat** | Requires browser/extension | 100+ heavy Python/npm packages | **✔ ZERO external packages (100% pure Node.js stdlib).** |
| **Offline Planning** | Costs \$0.50 per query | High cloud token consumption | **✔ 100% FREE offline planning (0 tokens burned).** |
| **Auditable Memory** | Lost when you close the tab | Hard to find in log files | **✔ Saved in private, permanent local `company.db`.** |

---

<a id="models"></a>
## 🤖 Works With Any AI Provider (Or 100% Offline Free)

You can run The Boring Company with whichever AI engine you prefer:

| Provider | Supported Models | Best For |
| :--- | :--- | :--- |
| **Anthropic** | `claude-3-7-sonnet`, `claude-3-5-sonnet` | Complex software architecture and deep debugging |
| **OpenAI** | `gpt-4o`, `o3-mini` | Rapid code generation and general feature building |
| **Google Gemini** | `gemini-2.5-pro`, `gemini-2.5-flash` | Large multi-file codebases and lightning speed |
| **Ollama (Free / Local)** | `deepseek-coder`, `qwen2.5-coder`, `llama3` | 100% private, free coding running on your own computer |
| **Deterministic Mode** | Built-in test provider | **100% offline, zero API keys needed, free CI runs** |

---

## 📜 Open Source & Community

Distributed under the **MIT License**. Free for personal and commercial use forever.

### 👤 Creator & Maintainer
* **Abdullah Hanjra** — AI Engineer, Software Architect & Systems Builder
* **GitHub**: [@abdullahhanjraa](https://github.com/abdullahhanjraa)
* **LinkedIn**: [linkedin.com/in/abdullahhanjracodes](https://www.linkedin.com/in/abdullahhanjracodes/)

<br/>

<div align="center">
  <b>Welcome to The Boring Company. Be The Founder, and let your AI company build the future. ☕</b>
</div>
