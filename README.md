<div align="center">

# 🏢 The Boring Company
### **You're the Boss. You just hired an entire AI Software Company.**

*Stop writing code alone. Stop being your AI's unpaid bug-fixer.*  
*Give a one-line command. An entire autonomous engineering team designs the fix, writes the code, runs your real tests, and only hands you working software.*

<br/>

[![Reality Gate CI](https://github.com/abdullahhanjra153/theboringcompany/actions/workflows/ci.yml/badge.svg)](https://github.com/abdullahhanjra153/theboringcompany/actions)
[![Tests Passing](https://img.shields.io/badge/Tests-32%20passing-22c55e.svg?style=flat-square)](test/)
[![One Command Run](https://img.shields.io/badge/Zero%20Setup-1--Command%20Run-blue.svg?style=flat-square)](#-how-to-use-in-1-command)
[![Node Runtime](https://img.shields.io/badge/Node.js->=22.5-green.svg?style=flat-square)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-f59e0b.svg?style=flat-square)](LICENSE)

<br/>

[**⚡ 1-Command Run**](#-how-to-use-in-1-command) • [**🤔 Why "The Boring Company"?**](#-why-call-it-the-boring-company) • [**👥 Meet Your Team**](#-meet-your-in-house-engineering-team) • [**💡 How It Helps You**](#-how-this-changes-your-daily-coding) • [**🛡️ The Reality Gate**](#️-the-reality-gate-never-get-broken-code-again)

</div>

---

## ☕ Imagine This Daily Coding Workflow...

You're working on your project at 11 PM. You hit a weird bug or need to build a new feature.

Instead of staring at a blank screen or fighting with ChatGPT's broken copy-paste suggestions, you just type:

```bash
/boss fix the broken shopping cart checkout and make sure all tests pass
```

You get up, pour yourself a fresh cup of coffee ☕. While you're away:

1. **Your AI Architect** inspects your files and makes a 3-step battle plan.
2. **Your Red Team Inquisitor** attacks the plan to catch edge cases *before* writing code.
3. **Your Coder** writes clean, simple code (no bloated 500-line messy scripts).
4. **Your QA Auditor** runs your actual tests (`npm test` or `pytest`) on your computer.
5. If something fails, **they fix their own mistake in private** until tests pass cleanly.

When you walk back to your desk, you don't have to debug anything. You get an **Executive 1-Minute Clarity Card** with proof that tests passed (`$? === 0`), and a clean, ready-to-merge Git commit.

---

## ⚡ How to Use in 1 Command

No complicated configuration. No 50-step installation.

### Option 1: Instant Demo (Zero Install Required)
You don't even need to clone the repo! Just run:

```bash
npx theboringcompany
```
*(Or clone it: `git clone https://github.com/abdullahhanjra153/theboringcompany.git && cd theboringcompany && npm run demo`)*

Watch the autonomous team accept a broken codebase, catch the bug, write the fix, prove that all tests pass, and present a certified release in 3 seconds!

### Option 2: Run in Your Own Project
Point it to any coding task on your machine:

```bash
npx theboringcompany /boss "Fix the auth token refresh bug in src/auth.js"
```

### Option 3: Use Inside Your AI Editor / Antigravity
If you're using Antigravity, Cursor, or Claude Desktop, simply type:
```
/boss <what you want to build or fix>
```

---

## 🤔 Why Call it "The Boring Company"?

> *"Exciting code breaks in production on Friday night and ruins your weekend.*  
> ***Boring code is clean, well-tested, simple, and lets you sleep peacefully."***

We named it **The Boring Company** as a tribute to the best engineering rule in the world: **Write Boring Software**. 
- Software that doesn't use 200 bloated npm packages when 5 lines of native code will do.
- Software that never claims it works without running tests.
- Software that is so clear, any beginner can understand it 6 months from now.

---

## 👥 Meet Your In-House Engineering Team

When you type `/boss`, you don't just get one generic chatbot. You get **an organized software company with separation of powers**:

```
                       YOU (THE FOUNDER / BOSS)
                                  │
                                  ▼
                     ┌─────────────────────────┐
                     │ 1. THE PLANNER & SCOPER │
                     │  "What are we building? │
                     │   What is the budget?"  │
                     └─────────────────────────┘
                                  │
                                  ▼
                     ┌─────────────────────────┐
                     │ 2. THE INQUISITOR       │
                     │  "Wait! What if network │
                     │   fails? What if null?" │
                     └─────────────────────────┘
                                  │
                                  ▼
                     ┌─────────────────────────┐
                     │ 3. THE SURGICAL CODER   │
                     │  Writes small, clean,   │
                     │  readable 50-line diffs │
                     └─────────────────────────┘
                                  │
                                  ▼
                     ┌─────────────────────────┐
                     │ 4. THE REALITY GATE 🛡️  │
                     │  Runs REAL machine test │
                     │  runner: Exit code = 0? │
                     └─────────────────────────┘
                                  │
                ┌─────────────────┴─────────────────┐
                ▼                                   ▼
          [Test Failed ❌]                   [Test Passed ✅]
      Self-healing retry loop:            Delivers verified commit
   Fixes mistake without bugging you.     directly to your branch!
```

- 🎯 **The Architect & Planner**: Looks at your project structure first. Understands your imports, dependencies, and files before changing anything.
- 🥊 **The Adversarial Inquisitor**: Plays devil's advocate. Challenges assumptions and prevents messy over-engineering.
- 💻 **The Minimal Coder**: Follows the *Karpathy 50-line razor* — writes only the lines needed to solve the problem cleanly.
- 🔒 **The Security Guard**: Automatically censors your secret API keys (`sk-...`, `AIza...`) so you never accidentally leak them into logs or GitHub.
- 🛡️ **The Reality Gate Auditor**: The boss of bosses. The AI coder is **never** allowed to grade its own homework. Only your real computer test runner decides if the code is good.

---

## 💡 How This Changes Your Daily Coding

### 1. For Beginners & Junior Developers
- **You're Never Stuck Alone:** When you get a confusing error (`Cannot read properties of undefined`), you don't have to scour 10 StackOverflow pages. Just pass the task to `/boss` and watch how a senior team structures the fix.
- **You Learn Good Habits Automatically:** You see how real software engineers write tests first (TDD), keep code minimal, and document changes cleanly.
- **Zero Configuration Pain:** Pure Node.js 22+. No missing libraries, no broken Python paths, no version hell.

### 2. For Solo Founders & Indie Hackers
- **10x Your Building Speed:** Stop writing repetitive boilerplate or mundane CRUD bug fixes. Hand them to `/boss` and focus on your product strategy, marketing, and customers.
- **Cost Protection:** Built-in hard circuit breakers stop runaway loops. If an AI gets stuck, it halts automatically before burning your API budget.

### 3. For Senior Engineers & Tech Leads
- **Eliminate "Review Fatigue":** No more reviewing hallucinated AI PRs with broken imports. Every patch submitted by The Boring Company comes with machine proof (`$? === 0`, positive assertion counts, un-tampered test files).
- **Audit-Ready Ledger:** Every task, prompt, diff, and test run is permanently stored in a lightning-fast local SQLite database (`company.db`).

---

## 🛡️ The Reality Gate: Never Get Broken Code Again

Most AI tools lie. They say: *"I have fixed your bug and all tests are passing!"*  
...even when they didn't run the tests, or worse, **when they secretly deleted your test file so it wouldn't fail!**

**The Boring Company stops this with 3 Hard Machine Guarantees:**
1. **Actual Machine Execution:** We run `node:test`, Jest, Vitest, or Pytest inside an isolated process. If the OS exit code is not `0`, the task is rejected.
2. **Anti-Tamper Lock:** We take SHA-256 cryptographic fingerprints of your tests before coding starts. If the AI touches or weakens your tests, it gets caught and rejected instantly.
3. **Positive Assertion Counts:** The test runner must execute real assertions (`passed > 0`). Empty tests that do nothing are strictly forbidden.

---

## 🛠️ CLI Quick Reference

```bash
# 1. Run the instant self-healing demo (Zero dependencies)
npm run demo

# 2. Run the 32 verified Reality Gate tests
npm test

# 3. Give a custom mission to the company
node cli.js /boss "Add email validation to signup form"

# 4. Use a specific model provider (Claude, OpenAI, Gemini, or Ollama)
node cli.js --provider anthropic /boss "Refactor payment service"

# 5. Search your team's institutional memory cards (<15ms)
npm run search-memory -- "sqlite transaction deadlock"
```

---

## 🤖 Supported AI Providers

Switch between your favorite AI models anytime:

| Provider | Supported Models | Best For |
| :--- | :--- | :--- |
| **Anthropic** | `claude-3-7-sonnet`, `claude-3-5-sonnet` | Complex architectural reasoning & deep debugging |
| **OpenAI** | `gpt-4o`, `o3-mini` | Rapid code generation & tool execution |
| **Google Gemini** | `gemini-2.5-pro`, `gemini-2.5-flash` | Multimodal analysis & massive context tasks |
| **Ollama (Local)**| `deepseek-coder`, `llama3`, `qwen2.5-coder`| 100% private, free, offline coding on your machine |
| **Offline Test** | Built-in Hermetic Engine | Deterministic testing & zero-cost CI validation |

---

## 📜 Open Source & Community

- **License:** MIT License (100% Free and Open Source)
- **Built by:** **[Abdullah Hanjra](https://github.com/abdullahhanjra153)**
- **Connect:** [LinkedIn](https://www.linkedin.com/in/abdullahhanjracodes/) • [GitHub](https://github.com/abdullahhanjra153)

<br/>

<div align="center">
<b>Welcome to The Boring Company. Sit back, be The Boss, and let your software company build. ☕</b>
</div>
