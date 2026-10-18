<div align="center">

# 🏢 The Boring Company

### **Your personal AI software team in your terminal.**

*Instead of one chatbot guessing code, you get **67 specialized AI teammates** (planners, coders, testers, and reviewers) that work together, fix bugs, and run your real tests until everything works.*

<br/>

[![Reality Gate CI](https://github.com/abdullahhanjraa/theboringcompany/actions/workflows/ci.yml/badge.svg)](https://github.com/abdullahhanjraa/theboringcompany/actions)
[![Reality Gate Tests](https://img.shields.io/badge/Reality%20Gate-32%20passing-22c55e.svg?style=flat-square)](test/)
[![Specialist Fleet](https://img.shields.io/badge/Specialist%20Team-67%20Agents-8b5cf6.svg?style=flat-square)](#-meet-the-team)
[![Zero Dependencies](https://img.shields.io/badge/Extra%20Packages-0%20needed-3b82f6.svg?style=flat-square)](package.json)
[![Node Runtime](https://img.shields.io/badge/Node.js->=22.5-green.svg?style=flat-square)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

<br/>

[**🏢 6 Departments**](#-the-6-company-departments-67-smart-specialists) • [**🔄 How We Collaborate**](#-how-the-departments-collaborate-the-6-step-mission-workflow) • [**🪝 6 Core Hooks**](#-6-core-hooks--unfair-advantages) • [**⚡ 1-Minute Quickstart**](#-1-minute-quickstart) • [**📊 Comparison**](#-how-we-compare-to-other-tools) • [**🛡️ Reality Gate**](#️-how-tests-are-checked-no-fake-promises)

</div>

---

## 🤔 The Problem with Most AI Coding Tools

If you have ever used an AI coding assistant, you know this pain:

1. You ask the AI to fix a bug or build a small feature.
2. It quickly outputs 200 lines of code and says:  
   > *"Done! Everything works perfectly."*
3. You paste it in, run your app, and **it immediately crashes with red errors**.
4. You spend the next hour fixing the mistakes the AI made.

**The truth:** Most AI tools guess. They don't actually test their code on your machine. Sometimes they even cheat by deleting your test files so they don't see any errors!

---

## 💡 The Solution: A Real Company Working For You

Instead of one lone AI chatbot that guesses and hallucinates, **The Boring Company** gives you an organized virtual software company. Your project moves through specialized departments that collaborate, challenge bad ideas, write clean code, and run real tests on your computer.

```
                             YOU (THE FOUNDER / BOSS)
                                       │
                                       ▼
  ┌────────────────────────────────────────────────────────────────────────┐
  │ 1. EXECUTIVE BOARD (Michael, Marcus, Stanley)                          │
  │    Listens to your request, clarifies requirements, and plans steps.   │
  └───────────────────────────────────┬────────────────────────────────────┘
                                      │
                                      ▼
  ┌────────────────────────────────────────────────────────────────────────┐
  │ 2. THE RED TEAM ARENA (Dwight, Toby, Creed)                            │
  │    Attacks the plan for edge cases, race conditions, and leaked keys.  │
  └───────────────────────────────────┬────────────────────────────────────┘
                                      │
                                      ▼
  ┌────────────────────────────────────────────────────────────────────────┐
  │ 3. CORE ENGINEERING (Jim, Oscar, Andy, Nate)                           │
  │    Writes surgical, minimal code diffs and optimizes database queries. │
  └───────────────────────────────────┬────────────────────────────────────┘
                                      │
                                      ▼
  ┌────────────────────────────────────────────────────────────────────────┐
  │ 4. REALITY GATE QA (Angela, Ryan, Kevin)                               │
  │    Runs your machine's real test runner. Zero fake passes allowed!     │
  └───────────────────────────────────┬────────────────────────────────────┘
                                      │
                     ┌────────────────┴────────────────┐
                     ▼                                 ▼
              [Tests Fail ❌]                   [Tests Pass ✅]
         Jim & Ryan diagnose and            Angela certifies exit code 0.
        fix the bug automatically.         Logged in company.db & shipped!
```

---

## 🏢 The 6 Company Departments (67 Smart Specialists)

Just like a real high-performance software company, our 67 AI specialists are organized into **6 dedicated departments**. Each department has one clear focus and works to protect your codebase:

### 🏛️ 1. Executive Board & Leadership
*Sets direction, turns vague requests into clear plans, and keeps the team aligned.*

| Teammate | Persona & Title | What They Do For You | When They Step In |
| :--- | :--- | :--- | :--- |
| 👔 **Michael** | **Supreme Conductor & CEO** | Listens to your prompt, leads the team morning standup, assigns tasks, and signs off on deliveries. | Whenever you run `/boss <task>`. |
| 📋 **Marcus** | **Chief Product Officer (CPO)** | Turns short 1-line ideas into clear specifications, user stories, and acceptance checklists. | At the start of any new feature or task. |
| 📐 **Stanley** | **Chief Technology Officer (CTO)** | Picks the simplest, cleanest architectural design. Refuses over-complicated abstractions. | Before any code is drafted. |
| ⚡ **David** | **VP of Engineering** | Manages execution pace, keeps diffs small, and enforces strict testing rigor across the team. | During sprint execution. |
| 💼 **Jan** | **Chief Revenue Officer (CRO)** | Ensures every feature brings real value to your users and aligns with your product goals. | When planning user-facing features. |
| 📊 **Darryl** | **VP of Operations** | Monitors token budgets, runtime speed, and local database ledger health. | Continuously in the background. |

<br/>

### 🛡️ 2. The Red Team & Security Guard (Defensive Auditing)
*Stops bugs and security holes BEFORE a single line of code touches your computer.*

| Teammate | Persona & Title | What They Do For You | When They Step In |
| :--- | :--- | :--- | :--- |
| 🥊 **Dwight** | **Adversarial Inquisitor (Red Team)** | Attacks the plan before coding begins. Questions: *"What if network drops? What if user clicks twice? What if database is empty?"* | Before any coding begins (Sparring Arena). |
| 🔒 **Toby** | **Security Guard (AppSec Lead)** | Scans code for leaked API keys, exposed passwords, SQL injection, and path traversal security risks. | Before any code is committed. |
| 🕵️ **Creed** | **Fresh Eyes Reviewer** | Inspects code changes in total isolation with zero author bias to catch weird mistakes everyone else missed. | Final sanity check before delivery. |

<br/>

### 💻 3. Core Engineering & Architecture
*Writes clean, surgical code that touches only what is needed.*

| Teammate | Persona & Title | What They Do For You | When They Step In |
| :--- | :--- | :--- | :--- |
| 💻 **Jim** | **Lead Coder (Minimal Change)** | Enforces the 50-line razor: writes small, clean code that fixes only what was asked without touching unrelated files. | For bug fixes and feature code. |
| 🧮 **Oscar** | **Database Specialist (DBRE)** | Writes clean SQLite & PostgreSQL queries, prevents slow page loads, and ensures safe database migrations. | Whenever working with database schemas and data. |
| 🔌 **Andy** | **API Platform Architect** | Builds clean REST and OpenAPI endpoints with clear error messages and input validation. | When designing backend endpoints and APIs. |
| 🏎️ **Nate** | **Speed & Latency Optimizer** | Hunts down slow database queries, memory leaks, and loops to keep your app fast and responsive. | Performance tuning and profiling. |

<br/>

### 🧪 4. Quality Assurance & Reality Gate (Real Machine Proof)
*Never believes claims or promises. Demands real proof from your machine's test runner.*

| Teammate | Persona & Title | What They Do For You | When They Step In |
| :--- | :--- | :--- | :--- |
| 🛡️ **Angela** | **Reality Gate Auditor (Head of QA)** | Demands raw machine proof (`exit code 0`). Blocks completion if tests fail or if test files were tampered with. | The final gate before any task is marked done. |
| 🔴 **Ryan** | **TDD Test Engineer (RED ➔ GREEN)** | Writes failing tests first to confirm the bug exists, then verifies that Jim's code turns them green. | At the start of bug fixes and features. |
| 📋 **Kevin** | **Definition of Done Auditor** | Cross-checks the finished work against Marcus's original acceptance checklist. Defaults to "NEEDS WORK" until proven. | Verification phase. |
| 🔍 **Erin** | **User Empathy Tester** | Tests edge cases from a beginner's perspective: confusing button labels, broken error alerts, and mobile quirks. | User interface and usability testing. |

<br/>

### 🎨 5. Product Design & User Experience
*Ensures your product looks premium, feels fluid, and is easy to use.*

| Teammate | Persona & Title | What They Do For You | When They Step In |
| :--- | :--- | :--- | :--- |
| 🎨 **Pam** | **Executive UI Designer** | Crafts clean layouts, Apple-grade typography, thoughtful spacing, and responsive screens. | For web and mobile interfaces. |
| 💎 **Jan** | **Brand & Visual Director** | Maintains color consistency, professional design tokens, and a clean modern aesthetic. | Visual design and brand polish. |
| ♿ **Val** | **Accessibility & Ergonomics Guide** | Ensures high contrast ratios, readable font sizes, keyboard accessibility, and screen-reader support. | Frontend review and polish. |

<br/>

### 🚀 6. Operations, Systems & Release
*Automates deployment, protects your local files, and tracks team memory.*

| Teammate | Persona & Title | What They Do For You | When They Step In |
| :--- | :--- | :--- | :--- |
| 📦 **Darryl** | **Release & Packaging Master** | Packages code cleanly, generates changelogs, tags git releases, and ensures zero broken dependencies. | Release and deployment time. |
| 🛡️ **Hank** | **System Guardian** | Prevents unauthorized file overwrites and keeps execution isolated to the designated project folder. | Continuous safety enforcement. |
| 🧠 **Phyllis** | **Knowledge & Team Coordinator** | Logs lessons learned into institutional memory so the team never makes the same mistake twice. | Post-task debrief and logging. |
| 🌐 **+ 45 Specialists** | **Domain Experts** | Mobile apps, Docker, cloud deployment, WebSockets, Python vector memory, and more. | Run `npm run install-tools -- --list` to see all 67! |

---

## 🔄 How The Departments Collaborate (The 6-Step Mission Workflow)

When you give a task to the company, your request follows a disciplined, step-by-step collaboration cycle:

```
Step 1: ALIGN & PLAN          Step 2: RED TEAM SPARRING       Step 3: SURGICAL CODING
Marcus (CPO) breaks down       Dwight (Red Team) attacks      Jim (Lead Coder) writes
your request into clear        the plan for race conditions   small, clean code. Oscar
acceptance criteria.           and edge cases.                verifies database queries.
        │                               │                              │
        ▼                               ▼                              ▼
Step 4: TDD & REALITY GATE    Step 5: SECURITY & FRESH REVIEW Step 6: LOGGED & SHIPPED
Ryan writes tests first.      Toby scans for leaked keys.     Recorded in SQLite ledger
Angela runs your test         Creed inspects the diff with    (company.db) with 100%
runner: exit code 0 required! fresh, unbiased eyes.           machine proof. Done!
```

1. **Step 1: Understand & Plan:** Michael calls the Executive Board. Marcus (CPO) turns your prompt into a clear 3-bullet checklist. Stanley (CTO) outlines the smallest simple design needed.
2. **Step 2: Adversarial Sparring:** Before touching any files, Dwight (Bug Hunter) questions the plan: *"What if the user clicks back? What if data is null?"* Weak plans are rejected and fixed early.
3. **Step 3: Surgical Coding:** Jim writes a minimal, clean code change. He changes 10 lines instead of rewriting 300 lines. Oscar checks database queries for speed and safety.
4. **Step 4: Real Testing (The Reality Gate):** Angela runs your computer's native test runner (`npm test`, `pytest`, etc.). If anything fails, Jim and Ryan fix it automatically. No fake "it works" claims allowed.
5. **Step 5: Security & Fresh Review:** Toby scans for exposed API keys or dangerous inputs. Creed inspects the code in isolation to catch any remaining blind spots.
6. **Step 6: Verified Delivery:** Once all 6 departments sign off and tests pass with exit code 0, the task is saved into your local SQLite audit ledger (`company.db`).

---

## 🪝 6 Core Hooks & Unfair Advantages

Why do developers and founders choose **The Boring Company** over solo AI chatbots or basic coding agents?

* **🪝 Hook 1: The Reality Gate Interlock (`$? === 0`)**  
  Other AI tools claim *"I fixed it!"* even when your app is completely broken. Angela Martin will **refuse to finish** until your computer's real test runner exits cleanly with exit code 0.
* **🪝 Hook 2: The 50-Line Minimal Change Razor**  
  Tired of AI rewriting 500 lines of your code and breaking other features? Jim Halpert touches only the exact lines in the direct call chain. Zero unnecessary refactoring.
* **🪝 Hook 3: Pre-Code Adversarial Sparring**  
  Solo chatbots jump directly into writing bad code. Dwight Schrute stress-tests the design with 3 chaos probes *before* a single file is touched, killing bugs in the planning room.
* **🪝 Hook 4: Zero Dependency Footprint (Pure Node.js 22+)**  
  No Python venv headaches, no pip version conflicts, and no 200MB `node_modules` downloads. Runs instantaneously out of the box using Node.js built-in standard library.
* **🪝 Hook 5: Tamper-Proof Local Database Ledger (`company.db`)**  
  Every task, execution lease, test verification, and file diff is recorded in a local SQLite database on your computer. You own 100% of your data and maintain a permanent audit trail.
* **🪝 Hook 6: Works Across All Your Favorite AI Tools**  
  Export all 67 agent prompts with 1 command (`node scripts/install-tools.js`) directly into **Cursor** (`.cursor/rules/`), **Claude Code** (`~/.claude/agents/`), **Antigravity**, or terminal!

---

## 📊 How We Compare to Other Tools

| Feature | Regular Chatbots (ChatGPT / Copilot) | Coding Agents (Devin / AutoGPT) | **The Boring Company** |
| :--- | :---: | :---: | :---: |
| **How it checks work** | It guesses. You have to test everything yourself. | Runs basic commands, often claims success when broken. | **Runs your real tests on your computer until they pass.** |
| **Stops AI from cheating** | ❌ No | ❌ No (can delete test files) | **✔ Yes (protects your test files from being deleted or weakened).** |
| **Reviews the plan first** | ❌ No plan, just codes | ❌ Long confusing chats | **✔ Yes (teammates challenge the plan before writing code).** |
| **Code changes** | Often rewrites 300 lines you didn't ask for | Big confusing changes | **Minimal, clean diffs (fixes only what was asked).** |
| **Installation** | Need browser or plugin | 100+ heavy Python/pip packages | **Zero extra packages (pure Node.js standard library).** |
| **Audit log** | Lost in chat history | Hard to find in logs | **Saved in a local SQLite file on your computer.** |

---

## ⚡ 1-Minute Quickstart

You don't need to install 50 npm packages. This runs on **pure Node.js** (version 22+).

### Option 1: Try the Instant 3-Second Demo
```bash
npx theboringcompany
```
*Watch the team catch a bug in a sandbox, write the fix, prove tests pass, and finish in 3 seconds.*

### Option 2: Run a Task in Your Project
```bash
npx theboringcompany /boss "Fix the login error when email is capitalized"
```

### Option 3: Use with Cursor, Claude Code, or Antigravity
You can export all 67 agent prompts directly into your favorite editor:

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

## 🎯 3 Easy Examples You Can Try Now

Copy and paste these commands to see the team in action:

### 🐛 Example 1: Fix a Tricky Bug
```bash
node cli.js /boss "Fix checkout bug: if the user clicks Pay twice quickly, only charge them once"
```
*Jim writes a small 10-line fix, Angela runs your test suite, and the bug is solved.*

### 🚀 Example 2: Build a New Feature
```bash
node cli.js /boss "Add email confirmation when a user signs up with their email"
```
*Stanley plans the steps, Angela writes the test first, and the team makes it pass.*

### 🔒 Example 3: Security Check
```bash
node cli.js /boss "Scan our project for leaked API keys and unsafe file upload paths"
```
*Toby scans your files, protects your secrets, and makes sure paths are secure.*

---

## 🛡️ How Tests Are Checked (No Fake Promises)

Normal AI tools often say *"All tests passed!"* even when they failed. 

The Boring Company uses **3 Simple Rules**:

1. **Real Test Execution:** It runs your real test command (`npm test`, `pytest`, `cargo test`, etc.) directly on your computer. If the computer returns an error, the AI is not done.
2. **Anti-Cheating Guard:** It fingerprints your test files. If the AI tries to delete a test or comment out an assertion to make it pass, the change is **blocked and rolled back immediately**.
3. **Real Assertions:** Empty tests that don't check anything are rejected. Real tests must pass.

---

## ⚡ Super Fast & Lightweight

Because The Boring Company uses **pure Node.js with 0 extra packages**, it is super fast:

- **Instant startup:** Starts in less than 1 millisecond.
- **Fast decisions:** Evaluates tests in under 2 milliseconds.
- **Zero download waiting:** No 200MB `node_modules` folder to wait for.

---

## 🤖 Works With Any AI Model

You can use whichever AI provider you prefer:

| Provider | Models | Best For |
| :--- | :--- | :--- |
| **Anthropic** | `claude-3-7-sonnet`, `claude-3-5-sonnet` | Complex logic, architecture, and deep debugging |
| **OpenAI** | `gpt-4o`, `o3-mini` | Fast everyday coding and quick tasks |
| **Google Gemini** | `gemini-2.5-pro`, `gemini-2.5-flash` | Large projects and reading big codebases |
| **Ollama (Free / Local)** | `deepseek-coder`, `qwen2.5-coder`, `llama3` | 100% private, free coding running on your own computer |
| **Offline Test Mode** | Built-in test engine | Free testing and running CI without any API key |

---

## 📜 License & Creator

Distributed under the **MIT License**. Free for everyone to use.

### Creator
* **Abdullah Hanjra** — Software Builder
* **GitHub**: [@abdullahhanjraa](https://github.com/abdullahhanjraa) • [@abdullahhanjra153](https://github.com/abdullahhanjra153)
* **LinkedIn**: [linkedin.com/in/abdullahhanjracodes](https://www.linkedin.com/in/abdullahhanjracodes/)

<br/>

<div align="center">
<b>Welcome to The Boring Company. Be The Boss, and let your AI team do the heavy lifting. ☕</b>
</div>
