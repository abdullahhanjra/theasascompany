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

[**💬 Live Demo**](#demo) • [**🏛️ Org Chart**](#org-chart) • [**🤝 Team Protocols**](#protocols) • [**🏢 6 Departments**](#departments) • [**🔥 6 Highlights**](#highlights) • [**⚡ Quickstart**](#quickstart) • [**📊 Comparison**](#comparison)

</div>

---

## 🤔 The Problem: Why Most AI Coding Tools Break Down

Every developer and founder has experienced this frustration:

1. You ask an AI chatbot to fix a tricky bug or add a button to your app.
2. The AI generates 300 lines of complex code and boldly promises:  
   > *"I have fixed everything! Your app is now production-ready."*
3. You paste the code into your project, start your server, and **it immediately crashes with red console errors**.
4. Even worse, the AI rewrote 4 other files you never asked it to touch, broke existing features, and deleted your test files to hide its mistakes.
5. You spend the next 3 hours cleaning up the mess the AI made.

> [!CAUTION]
> **Why this happens:** Solo AI chatbots don't have a team. They don't have an architect to keep designs simple. They don't have a security guard to check for leaks. And they don't have a strict tester to actually run the code on your computer before claiming victory.

---

## 💡 The Solution: A Real Software Company Inside Your Terminal

**The Boring Company** fixes this by giving you a complete, organized software studio. Instead of an isolated chatbot hallucinating code, you get **67 specialized AI teammates** arranged across **6 collaborative departments**.

They challenge weak ideas, keep code changes tiny, and **never declare a task complete without real machine proof** from your computer's native test runner.

```
                           YOU (THE FOUNDER & BOSS)
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. 👑 THE EXECUTIVE BOARD                                                   │
│    Michael (CEO), Marcus (CPO) & Stanley (CTO) plan your task with precision.│
└─────────────────────────────────────┬───────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 2. 🛡️ THE RED TEAM DEFENSE                                                  │
│    Dwight & Toby aggressively stress-test the plan BEFORE coding begins.    │
└─────────────────────────────────────┬───────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 3. ⚙️ CORE ENGINEERING & DATABASE                                            │
│    Jim writes clean, focused code (under 50 lines). Oscar tunes queries.    │
└─────────────────────────────────────┬───────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 4. 🧪 REALITY GATE QUALITY ASSURANCE                                        │
│    Angela runs your machine's real test runner. Exit code 0 ($? === 0) only!│
└─────────────────────────────────────┬───────────────────────────────────────┘
                                      │
                     ┌────────────────┴────────────────┐
                     ▼                                 ▼
              [Tests Fail ❌]                   [Tests Pass ✅]
        Jim & Ryan diagnose and            Angela certifies with proof.
       fix the bug automatically.         Logged in company.db & shipped!
```

---

<a id="demo"></a>
## 💬 See It in Action: How The Team Solves a Real Bug

Imagine you type this single sentence in your terminal:

> **You (The Boss):**  
> `"Fix checkout: if someone clicks the Pay button twice quickly, it charges them twice."`

Here is how the team actually talks and collaborates:

* 👑 **Michael (CEO):**  
  *"Alright team, we've got a customer complaint: double-charging during checkout. Marcus, let's get the requirements down before anyone touches code."*

* 📋 **Marcus (CPO):**  
  *"Got it. Here's what needs to happen: 1) Disable the button immediately on the first click, 2) Give each transaction a unique ID, and 3) Reject any duplicate request with that same ID."*

* 🥊 **Dwight (Red Team Lead):**  
  *"Hold on. What if the user refreshes their browser mid-payment? What if their WiFi drops and their browser retries automatically? If we only disable the button on the frontend, customers will still get billed twice! We have to lock the transaction in the database too."*

* 📐 **Stanley (CTO):**  
  *"Good point, Dwight. Keep it simple. Jim, write a small patch with a database transaction lock. Don't rewrite the whole file. Oscar, double-check the index."*

* ⚙️ **Jim (Minimal Coder):**  
  *"On it. Done — 14 clean lines added to `checkout.js`. Didn't touch any unrelated files."*

* 🧮 **Oscar (Database Engineer):**  
  *"Checked the query. The unique lock stops race conditions cold without slowing down normal checkouts."*

* 🔒 **Toby (Security Guard):**  
  *"Ran the security scan on Jim's diff. No leaked API keys, no SQL injection risks."*

* 🧪 **Angela (Head of QA):**  
  *"Hold your horses. I'm running your machine's real test suite right now... `npm test` exited cleanly with code 0. All 32 tests passed. No skipped assertions. It's verified."*

* 📦 **Darryl (Operations):**  
  *"Recorded the fix and the test proof into local SQLite (`company.db`). Clean, verified, and ready to ship."*

---

<a id="org-chart"></a>
## 🏛️ Company Org Chart: Who Reports to Whom?

In ordinary AI tools, there is no organization. One chatbot attempts to write requirements, write code, review itself, and run tests all at once — which causes hallucinations, messy code, and crashes.

**The Boring Company** operates like a real, disciplined software engineering firm. Every agent has a clear manager, a clear squad, and a strictly bounded responsibility:

```
                                 ┌─────────────────────────┐
                                 │   YOU (THE FOUNDER)     │
                                 │    Visionary & Boss     │
                                 └────────────┬────────────┘
                                              │
                                              ▼
                                 ┌─────────────────────────┐
                                 │   MICHAEL SCOTT (CEO)   │
                                 │   Supreme Conductor     │
                                 └──────┬───────────┬──────┘
                                        │           │
       ┌────────────────────────────────┘           └────────────────────────────────┐
       ▼                                                                             ▼
┌───────────────────────────────┐                                     ┌───────────────────────────────┐
│ 🛡️ INDEPENDENT QA BRANCH      │                                     │ 🏛️ EXECUTIVE DIRECTORS        │
│ Angela Martin (Head of QA)    │                                     │ Stanley (CTO) • Marcus (CPO)  │
│ Independent Veto Power!       │                                     │ David (VP Eng) • Darryl (Ops) │
│ Reports directly to Founder & │                                     │ Jan (CRO & Brand)             │
│ CEO. Cannot be overruled by   │                                     │                               │
│ coders. Enforces Reality Gate!│                                     └──────────────┬────────────────┘
└──────────────┬────────────────┘                                                    │
               │                                                                     │
               │                                   ┌─────────────────────────────────┼─────────────────────────────────┐
               ▼                                   ▼                                 ▼                                 ▼
┌──────────────────────────────┐    ┌──────────────────────────────┐  ┌──────────────────────────────┐  ┌──────────────────────────────┐
│ 🧪 REALITY GATE SQUAD        │    │ 🛡️ RED TEAM & SECURITY SQUAD │  │ ⚙️ CORE ENGINEERING SQUAD    │  │ 🎨 PRODUCT & DESIGN SQUAD    │
│ (Under Angela Martin)        │    │ (Under Stanley & Dwight)     │  │ (Under David Wallace)        │  │ (Under Marcus & Jan)         │
│ • Ryan (TDD Test Writer)     │    │ • Dwight (Red Team Lead)     │  │ • Jim (Minimalist Coder)     │  │ • Pam (Executive UI Designer)│
│ • Kevin (Done-Criteria Check)│    │ • Toby (AppSec Security)     │  │ • Oscar (Database DBRE)      │  │ • Val (Accessibility Guard)  │
│ • Isabela (E2E Automation)   │    │ • Creed (Isolated Review)    │  │ • Andy (API Architect)       │  │ • Zara (UX Workflow Lead)    │
│ • Erin (User Empathy Tester) │    │                              │  │ • Nate (Speed & Latency)     │  │ • Elena (Design System Tokens│
└──────────────────────────────┘    └──────────────────────────────┘  │ • +45 Specialist Coders      │  └──────────────────────────────┘
                                                                      └──────────────┬───────────────┘
                                                                                     │
                                                                                     ▼
                                                                      ┌──────────────────────────────┐
                                                                      │ 📦 OPERATIONS & MEMORY SQUAD │
                                                                      │ (Under Darryl Philbin)       │
                                                                      │ • Hank (Sandbox File Guard)  │
                                                                      │ • Phyllis (Company Memory)   │
                                                                      │ • Amira (SRE & Uptime)       │
                                                                      └──────────────────────────────┘
```

### 📋 The Chain of Command Breakdown

1. **Level 0: The Founder (YOU)**  
   * **Role:** The Owner and Final Decision Maker.  
   * **What you do:** You give the high-level goal (e.g. `npx theboringcompany /boss "Fix payment timeout"`). You never have to micromanage individual files, write prompt chains, or babysit code reviews.

2. **Level 1: Executive C-Suite Leadership**  
   * **👔 Michael Scott (CEO):** Reports directly to YOU. He is the master conductor. He listens to your goal, picks the exact right specialists from the fleet, assigns work leases, arbitrates debates, and oversees final delivery.
   * **📋 Marcus (Chief Product Officer):** Reports to Michael. Translates your 1-line prompt into detailed, unambiguous user stories, acceptance criteria, and edge-case boundaries.
   * **📐 Stanley Hudson (Chief Technology Officer):** Reports to Michael. Enforces architectural simplicity. Rejects unnecessary libraries and guarantees clean, maintainable system designs.
   * **⚡ David Wallace (VP of Engineering):** Reports to Stanley & Michael. Manages the developer sprint, allocates file leases, and enforces code quality standards.
   * **💼 Jan Levinson (Chief Revenue Officer & Brand Director):** Reports to Michael. Guarantees that what gets built looks beautiful, aligns with your business goals, and delivers real user value.
   * **📊 Darryl Philbin (VP of Operations):** Reports to Michael. Manages system resources, monitors local memory, tracks token quotas, and guarantees safe deployments.

3. **⭐ The Independent Branch: Angela Martin (Head of Quality Assurance)**  
   * **Why this is critical:** In broken engineering teams and standard AI tools, the developer checks their own work. Developers are biased — they always claim their code works!  
   * **The Boring Company Rule:** Angela Martin **does NOT report to Engineering or Product**. She reports directly to Michael and the Founder. Engineering cannot overrule or bypass her checks. If your computer's native test runner does not exit with code 0 (`$? === 0`), Angela vetoes the release immediately.

4. **Level 2: The Working Squads & Direct Reports**  
   * **🎨 Product & Design Squad (Under Marcus & Jan):** Pam Beesly (UI Design), Val Johnson (Accessibility), Zara (UX Journeys), Elena (Design Systems).
   * **🛡️ Red Team & Security Squad (Under Stanley & Dwight):** Dwight Schrute (Red Team Lead — Edge-Case Specialist), Toby Flenderson (Security & AppSec Lead), Creed Bratton (Fresh-Eyes Independent Reviewer).
   * **⚙️ Core Engineering Squad (Under David Wallace):** Jim Halpert (Lead Minimal Coder), Oscar Martinez (Database Reliability), Andy Bernard (API Platform), Nate (Speed & Latency), plus 45 domain specialist coders.
   * **🧪 Reality Gate QA Squad (Under Angela Martin):** Ryan Howard (TDD Test Writer), Kevin Malone (Definition of Done Auditor), Isabela Santos (E2E Test Automation), Erin Hannon (User Empathy Tester).
   * **📦 Operations & Systems Squad (Under Darryl Philbin):** Hank Tate (Workspace File Sandbox Guard), Phyllis Vance (Institutional Memory & Post-Mortem Coordinator), Amira (SRE & Uptime).

---

<a id="protocols"></a>
## 🤝 How The Team Collaborates: The 5 Operating Protocols

How do 67 AI specialists work together like a cohesive software studio without talking over each other or overwriting each other's code? They follow **5 clear rules of collaboration**:

### ☕ 1. Standups & Work Leases (No Overwritten Files)
* **The everyday problem:** When multiple AI tools or developers work on the same folder, they often edit the same file at the same time, overwriting each other's changes and creating messy Git conflicts.
* **How our team handles it:** When you launch a task, Michael runs a 1-second standup and issues an exclusive work lease in `company.db`. Only the assigned specialist (like Jim) can edit the targeted files. Everyone else reads.
* **Why it matters:** Zero merge conflicts, zero deleted code, and clean, easy-to-read diffs.

### 📬 2. Clean Department Mailboxes (No Noisy Chat Rooms)
* **The everyday problem:** Chatbots lose instructions when everything is dumped into one giant, scrollable chat window. Important context gets pushed out and forgotten.
* **How our team handles it:** Each department has its own clean inbox and outbox:
  * `tasks/inbox/` ➔ Marcus posts the initial specification and checklist.
  * `tasks/review/` ➔ Dwight and Toby get the plan to check for edge cases and security risks.
  * `tasks/verification/` ➔ Jim passes his code diff to Angela for physical test execution.
  * `tasks/done/` ➔ Angela and Darryl record the verified test output.
* **Why it matters:** Every step has a clear paper trail with sender, recipient, and code changes. Nothing gets lost in the noise.

### 🚦 3. The 3 Quality Gates (Zero Blind Approvals)
No code is ever shipped just because an AI promised it works. It must pass three specific checks:
1. **Gate 1 — Design Check:** Marcus defines the requirements ➔ Dwight stress-tests edge cases (timeouts, empty states, double-clicks) ➔ Stanley locks in the simplest possible design.
2. **Gate 2 — Code & Security Review:** Jim writes a small, focused patch (under 50 lines) ➔ Toby scans for secret leaks or unsafe paths ➔ Oscar verifies database query indexing.
3. **Gate 3 — Physical Machine Testing:** Angela runs your real test runner (`npm test`, `pytest`, `cargo test`). If it doesn't exit cleanly with code 0 (`$? === 0`), Kevin sends it right back to Jim with the error logs to fix immediately.

### 🗄️ 4. The Local Team Log (`company.db` on Your Machine)
* **The everyday problem:** Close a chatbot window, and everything that was decided and tested vanishes forever.
* **How our team handles it:** Every decision, file diff, and test run is saved to a local SQLite database (`company.db`) directly on your computer.
* **Why it matters:** You get a private, permanent record of every fix your team has ever made, complete with real terminal output and execution times. 100% offline and owned by you.

### 🛑 5. Spending Limits & Safety Brakes (No Runaway Costs or Loops)
* **The everyday problem:** An AI gets confused, enters an infinite loop, and burns through your API balance while you're away grabbing coffee.
* **How our team handles it:** Darryl Philbin monitors resource consumption and step counts in real time:
  * **At 75% budget:** Darryl warns the coder to stick strictly to the smallest possible fix.
  * **At 90% budget:** Darryl stops new exploratory changes and focuses solely on passing existing tests.
  * **At 100% budget:** The safety brake trips. The task safely pauses, rolls back to your last clean Git snapshot, and tells you exactly what went wrong.
* **Why it matters:** You're completely protected against runaway bills, frozen terminal screens, and infinite loops.

---

<a id="departments"></a>
## 🏢 Meet The 6 Departments & Who Does What

Our 67 specialists are organized into 6 real-world departments. Here is who they are, what they care about, and the everyday headaches they save you from:

### 👑 Department 1: Executive Board & Strategy
*Turns your short, everyday ideas into clear technical requirements and keeps the team aligned.*

* **👔 Michael Scott (CEO & Conductor)**  
  When you give a command like `npx theboringcompany /boss "fix checkout"`, Michael takes the wheel. Instead of making you prompt 5 different chatbots by hand, he holds an instant standup, picks the right specialists from the fleet, and makes sure everyone stays focused until the feature passes all tests.

* **📋 Marcus (Chief Product Officer)**  
  Most AI tools make wild guesses about what you want. Marcus prevents that. Before anyone writes a single line of code, he turns your brief prompt into clear requirements: what the feature must do, which edge cases to handle, and what "done" actually looks like.

* **📐 Stanley Hudson (Chief Technology Officer)**  
  Stanley hates over-complicated code. If a problem can be solved with 15 lines of plain JavaScript, he firmly rejects 500 lines of new frameworks or heavy dependencies. He keeps your codebase light, fast, and easy to maintain.

* **⚡ David Wallace (VP of Engineering)**  
  David oversees the engineering sprint. He manages file leases so coders don't step on each other's toes, monitors progress, and ensures that code quality stays high across every commit.

* **💼 Jan Levinson (Chief Revenue Officer & Brand Lead)**  
  Jan makes sure what you build actually makes sense for real users and real businesses. She reviews user workflows, checks visual appeal, and ensures your product feels polished and intuitive.

* **📊 Darryl Philbin (VP of Operations)**  
  Darryl is the practical operations manager. He tracks token costs in real time, watches database health, and pulls the emergency brake if an agent ever gets stuck in an expensive loop.

---

### 🛡️ Department 2: The Red Team & Security Guard
*Catches bugs, security flaws, and edge cases BEFORE anyone writes code.*

* **🥊 Dwight Schrute (Red Team Lead & Inquisitor)**  
  Dwight is the resident skeptic. While other AI tools rush to write fragile code, Dwight asks the uncomfortable questions: *"What if the user double-clicks? What if the network drops? What if the input is empty?"* By catching edge cases during the planning stage, he saves you from production disasters.

* **🔒 Toby Flenderson (Security & AppSec Lead)**  
  Toby is your quiet security guard. Before any code is committed, he scans the diff for leaked API keys, hardcoded passwords, SQL injection points, and unsafe file paths. He ensures you never accidentally push sensitive credentials to GitHub.

* **🕵️ Creed Bratton (Fresh-Eye Isolated Reviewer)**  
  When an engineer (or an AI) spends hours on a piece of code, they get "author blindness" — they assume it works because they wrote it. Creed inspects diffs in complete isolation with fresh eyes, catching strange logic errors and subtle bugs that everyone else overlooked.

---

### ⚙️ Department 3: Core Engineering & Database
*Writes small, focused code fixes and keeps your database fast and reliable.*

* **💻 Jim Halpert (Lead Minimalist Coder)**  
  The biggest problem with AI coders is that they rewrite 300 lines when you only needed a 2-line fix. Jim follows the strict 50-line rule: he writes small, pinpoint patches that fix the issue without touching unrelated files or introducing new bugs.

* **🧮 Oscar Martinez (Database Reliability Engineer — DBRE)**  
  Oscar cares deeply about data integrity and speed. He crafts fast SQLite and PostgreSQL schemas, configures WAL mode for concurrency, verifies index lookups, and makes sure database migrations run cleanly without corrupting your data.

* **🔌 Andy Bernard (API Platform Architect)**  
  Andy designs clean, predictable REST and OpenAPI endpoints. He ensures status codes make sense, error messages are helpful, and inputs are properly validated so the frontend and backend connect smoothly.

* **🏎️ Nate (Speed & Performance Optimizer)**  
  Nate profiles memory usage, eliminates redundant loops, and optimizes slow database queries so your app feels snappy and responds in milliseconds.

---

### 🧪 Department 4: Quality Assurance & Reality Gate
*Refuses promises and claims. Demands real machine verification from your computer.*

* **🛡️ Angela Martin (Head of QA & Reality Gate Auditor)**  
  Angela is the most important member of the company. She refuses promises, apologies, and chatbot claims. She executes your machine's real test runner (`npm test`, `pytest`, etc.). Unless the process exits cleanly with code 0 (`$? === 0`), the task is rejected. She holds independent veto power — no developer can overrule her.

* **🔴 Ryan Howard (TDD Test Writer — RED ➔ GREEN)**  
  Ryan prevents bugs from returning. Before Jim writes the fix, Ryan writes a failing automated test that proves the bug exists (RED). Once Jim's code makes the test pass cleanly (GREEN), that test remains in your repository to guard against future regressions.

* **📋 Kevin Malone (Definition of Done Auditor)**  
  Kevin is thorough. He walks through Marcus's original requirements checklist item by item. If a developer forgot even one small requirement, Kevin marks it as "Needs Work" and sends it back.

* **🔍 Erin Hannon (User Empathy Tester)**  
  Erin tests your application like a real human beginner. She enters unexpected inputs, clicks buttons out of order, checks mobile layouts, and makes sure error messages are friendly and helpful.

---

### 🎨 Department 5: Product Design & User Experience
*Ensures your product looks beautiful, feels tactile, and is accessible to everyone.*

* **🎨 Pam Beesly (Executive UI Designer)**  
  Pam replaces bland, cookie-cutter AI websites with bespoke, modern design. She focuses on clean typography, balanced spacing, warm color palettes, and smooth micro-interactions that make your interface feel handcrafted.

* **💎 Jan Levinson (Design System & Brand Lead)**  
  Jan ensures that button styles, typography, and color tokens remain consistent across your entire app, giving your product an established, high-trust appearance.

* **♿ Val Johnson (Accessibility Guardian)**  
  Val audits contrast ratios, keyboard navigation, and screen-reader support. She makes sure your app is easy to navigate for everyone, including power users who live on their keyboards.

---

### 📦 Department 6: Operations, Systems & Release
*Protects your local files, manages releases, and builds team memory.*

* **📦 Darryl Philbin (Release & Packaging Master)**  
  Darryl packages your code cleanly. He handles semantic versioning, writes clear changelogs, and verifies that zero dependencies are broken before shipping.

* **🛡️ Hank Tate (Workspace Sandbox Guard)**  
  Hank ensures safety. He monitors file system calls to guarantee that agents only touch files inside your project directory — never altering sensitive system files or folders outside your workspace.

* **🧠 Phyllis Vance (Institutional Memory Coordinator)**  
  Phyllis makes sure the team learns from every mistake. When a tricky bug is solved, she logs the learning into local SQLite memory (`company.db`). The next time a similar problem occurs, the team solves it even faster.

* **🌐 + 45 Domain Specialists**  
  Mobile developers, Docker experts, WebSocket streaming engineers, documentation writers, and more. Run `node scripts/install-tools.js --list` to explore the full roster!

---

<a id="highlights"></a>
## 🔥 6 Core Highlights: Why Developers Love The Boring Company

Here is why developers, founders, and hiring managers choose **The Boring Company** over conventional AI tools:

### ⚡ 1. The Reality Gate: Real Tests, Zero Lies (`$? === 0`)
Standard AI tools love to claim *"I fixed everything!"* even when the code won't even compile. You spend the next hour debugging their broken suggestions.  
**How we do it:** Angela Martin runs your computer's real test runner (`npm test`, `pytest`, `cargo test`). If your computer returns an error, the AI isn't finished. The task is only complete when your native test suite exits cleanly with code 0. No fabricated claims, ever.

### ⚡ 2. The 50-Line Rule: Clean Diffs, No Code Carnage
You ask an AI to fix a small button color, and it rewrites 400 lines across 5 files, breaking two existing features in the process.  
**How we do it:** Jim Halpert enforces small, pinpoint edits. He modifies only the exact lines needed to solve the problem, keeping Git diffs clean and easy to review in 30 seconds.

### ⚡ 3. Dwight's Reality Check: Catch Edge Cases Before Coding
Solo chatbots jump straight into writing code without thinking through edge cases, producing fragile apps that collapse when real users arrive.  
**How we do it:** Dwight Schrute stress-tests the design first: *"What happens if the user double-clicks? What if the network drops mid-request? What if the database is busy?"* Edge cases are resolved before a single file on disk is touched.

### ⚡ 4. Pure Node.js: Zero Extra Packages, Instant Start
Other multi-agent frameworks require heavy Python environments, 50 pip packages, and 500MB of downloads that easily break over time.  
**How we do it:** The Boring Company is built entirely in vanilla Node.js using only standard library modules. No `node_modules` bloat, no complex environment setup. It boots up in less than 1 millisecond and runs everywhere.

### ⚡ 5. Local SQLite Ledger (`company.db`): You Own Your Data
Most AI coding tools lock your history inside proprietary cloud servers where you pay monthly fees to see what was done.  
**How we do it:** Everything — requirements, agent decisions, code diffs, and test outputs — is recorded into a local SQLite database (`company.db`) directly on your machine. It's completely private, offline-ready, and yours forever.

### ⚡ 6. Universal 1-Click Export to Cursor, Claude Code & Antigravity
You shouldn't have to abandon your favorite code editor to get the benefits of an organized multi-agent team.  
**How we do it:** With a single command (`node scripts/install-tools.js`), all 67 specialist prompts can be exported directly into Cursor (`.cursor/rules/`), Claude Code (`~/.claude/agents/`), or Antigravity (`.agents/`).

---

<a id="comparison"></a>
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

<a id="quickstart"></a>
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
