<div align="center">

<a href="https://github.com/abdullahhanjraa/theasascompany">
  <img src="docs/assets/banner.svg" alt="The Asas Company Banner" width="100%">
</a>

<br/><br/>

<a href="https://github.com/abdullahhanjraa/theasascompany">
  <img src="docs/assets/logo.png" alt="The Asas Company Logo" width="130" height="130">
</a>

# 🏛️ The Asas Company
### **Stop babysitting chatbots that lie to your face.**
### **Run an entire autonomous software company in your terminal.**

*72 specialized AI teammates across 6 departments who debate features, write clean code under 50 lines, and prove every fix passes your real tests before shipping. Pure Node.js, zero extra packages, 100% private.*

<br/>

[![Reality Gate CI](https://github.com/abdullahhanjraa/theasascompany/actions/workflows/ci.yml/badge.svg)](https://github.com/abdullahhanjraa/theasascompany/actions)
[![Reality Gate Tests](https://img.shields.io/badge/Reality%20Gate-97%20passing-22c55e.svg?style=flat-square)](test/)
[![Specialist Fleet](https://img.shields.io/badge/Specialist%20Team-72%20Agents-8b5cf6.svg?style=flat-square)](#departments)
[![Zero Dependencies](https://img.shields.io/badge/Extra%20Packages-0%20needed-3b82f6.svg?style=flat-square)](package.json)
[![Deliberation Speed](https://img.shields.io/badge/Board%20Meeting-~37ms%20(0%20tokens)-06b6d4.svg?style=flat-square)](#board-meeting)
[![Node Runtime](https://img.shields.io/badge/Node.js->=22.5-green.svg?style=flat-square)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

<br/>

[**⚡ 10-Second Quickstart**](#quickstart) • [**💬 See It In Action**](#demo) • [**🏛️ The Board Meeting**](#board-meeting) • [**🏢 Org Chart**](#org-chart) • [**👥 6 Departments**](#departments) • [**🛡️ Reality Gate**](#reality-gate) • [**📊 Comparison**](#comparison)

</div>

---

## 😫 The Pain: Why Most AI Coding Tools Frustrate You

Every developer, creator, and founder knows this painful feeling:

1. You ask an AI chatbot to fix a tricky bug or add a button to your app.
2. The AI generates **350 lines of complex, confusing code** and boldly promises:  
   > *"I have fixed everything! Your app is now production-ready!"*
3. You excitedly paste it into your project, start your app, and **it immediately crashes with red errors**.
4. Even worse: the AI rewrote four other files you never asked it to touch, broke existing features, and deleted your test files to hide its mistakes.
5. You spend the rest of your evening cleaning up the mess the AI made.

### ❓ Why Does This Keep Happening?

Because a solo chatbot is like an **eager intern working alone at 2 AM with zero supervision**:
* **No Product Manager** to stop scope creep and set clear requirements.
* **No Software Architect** to keep code changes tiny, clean, and under 50 lines.
* **No Red Team** to challenge edge cases and race conditions before writing code.
* **No Independent QA Lead** to physically run the code on your real computer before claiming victory.

---

## 🚀 The Hero Solution: You Are The Founder. We Are Your Company.

**The Asas Company** replaces the lonely chatbot with a **complete, disciplined virtual software company**.

> **Why Asas?** *Asas* means *"The Foundation"* — representing the unshakeable engineering foundation you need to build great software without anxiety or endless babysitting.

You sit in the Founder's chair. You give your team a goal in plain, everyday English. Your team of **72 specialized AI teammates across 6 helpful departments** takes over:

```
                            👑 YOU (THE FOUNDER / VISIONARY)
                                           │
                                           ▼
 ┌───────────────────────────────────────────────────────────────────────────────────┐
 │ 1. 👔 EXECUTIVE BOARD (Michael Scott, Marcus Chen, Stanley Hudson)                │
 │    Convenes in 37ms. Debates user needs, sets speed track, and scopes work.       │
 └─────────────────────────────────────────┬─────────────────────────────────────────┘
                                           │
                                           ▼
 ┌───────────────────────────────────────────────────────────────────────────────────┐
 │ 2. 🥊 THE RED TEAM & SECURITY (Dwight Schrute & Toby Flenderson)                  │
 │    Attacks the plan! "What if the user double-clicks? What if the network drops?" │
 └─────────────────────────────────────────┬─────────────────────────────────────────┘
                                           │
                                           ▼
 ┌───────────────────────────────────────────────────────────────────────────────────┐
 │ 3. ⚙️ CORE ENGINEERING & DATABASE (Jim Halpert & Oscar Martinez)                  │
 │    Writes tiny, clean code under 50 lines. Verifies database speed and safety.    │
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

Imagine you type this single sentence in your terminal:

```bash
boss "Fix checkout: if someone clicks the Pay button twice quickly, it charges them twice"
```

Here is how the team actually talks, debates, and solves the problem in real time:

* 👔 **Michael Scott (CEO):**  
  *"Alright team, we've got an urgent customer issue: people are getting charged twice if they click the Pay button quickly. Marcus, what is our plan?"*

* 📋 **Marcus Chen (CPO):**  
  *"Three simple steps: 1) Disable the Pay button immediately after the first click, 2) Give every order a unique receipt ID, and 3) Make the server reject any duplicate payment with that same ID."*

* 🥊 **Dwight Schrute (Red Team Lead):**  
  *"Wait! What if the user refreshes the page mid-payment? What if their internet hiccups and their phone automatically retries? If we only disable the button on the screen, double-charges will still slip through! We have to protect the database too."*

* 📐 **Stanley Hudson (CTO):**  
  *"Sharp thinking, Dwight. Let's keep the code simple and safe. Jim, write a tiny patch that blocks duplicate charges at the database level. Keep it strictly under 50 lines. Oscar, make sure it stays lightning-fast."*

* ⚙️ **Jim Halpert (Lead Minimalist Coder):**  
  *"On it! Handled — just 14 clean lines added to `checkout.js`. I didn't touch anything else in your codebase."*

* 🧮 **Oscar Martinez (Database Engineer):**  
  *"Checked the database. The unique receipt ID safely bounces any duplicate attempt in less than a millisecond with zero slowdown."*

* 🔒 **Toby Flenderson (Security Guard):**  
  *"Ran our security scan. No passwords or secret API keys leaked, and the code is 100% safe."*

* 🧪 **Angela Martin (Head of QA):**  
  *"Hold on, team. Nobody celebrates until the machine says so! Running your real test suite right now... `npm test` exited cleanly with code 0! All 97 tests passed across all 6 test suites. Zero skipped checks. It's officially certified!"*

* 📦 **Darryl Philbin (Operations):**  
  *"Everything is verified and recorded into your local file (`company.db`). Safe, clean, and ready to ship!"*

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
🏛️  THE ASAS COMPANY — EXECUTIVE COUNCIL CHAMBERS
Session Objective: "Should we use PostgreSQL or SQLite for storing user sessions?"
Consensus: UNANIMOUS (MOTION PASSED) | Track: Track B (Feature Sprint) | Latency: 37ms
══════════════════════════════════════════════════════════════════════════════════

💬 Executive Council Deliberation Highlights:
  [Michael Scott - CEO]
  ↳ Council, we need to decide where to store our user sessions. Marcus, what matters most for our users?

  [Marcus Chen - CPO]
  ↳ Speed is everything! Sessions should load in less than 5 milliseconds. We don't need a complicated cloud database right now.

  [Rafael Torres - CTO]
  ↳ Using SQLite right on the local computer gives us blazing speed with zero network delay, and it saves money on cloud hosting.

  [Dwight Schrute - Red Team]
  ↳ Hold on! What if 100 people log in at the exact same second? Does SQLite freeze or crash?

  [Dr. Kofi Mensah - DBA]
  ↳ Great question, Dwight. In modern SQLite (WAL mode), reading and writing happen at the same time without waiting for each other. It easily handles over 50,000 saves per second.

  [Angela Martin - QA Gate]
  ↳ I want real proof before anyone writes code. I demand automated stress tests to verify it works under heavy traffic.

  [Michael Scott - CEO]
  ↳ Motion approved: We use SQLite with Angela's automated stress tests!

📋 Approved Sprint Backlog (Clear Step-by-Step Plan):
  • [Step 1: Database Setup] Create user sessions table with modern speed settings (Dr. Kofi)
  • [Step 2: Stress Tests] Write automated tests that simulate 100 users logging in at once (Dwight & Ryan)
  • [Step 3: Clean Code] Write a simple, clean session manager in under 50 lines (Jim Halpert)
  • [Step 4: Real Verification] Run the real test runner on your machine until every test passes (Angela Martin)

✔ Board Minutes Saved: docs/meetings/MEETING_2026-10-24_sessions.md
✔ Decision Log Updated: docs/DECISION_LOG.md
══════════════════════════════════════════════════════════════════════════════════
```

> 💡 **Founder Tip**: Add `--interactive` (`-i`) to join the meeting, vote on decisions, and break ties yourself!

---

<a id="org-chart"></a>
## 🏛️ Company Org Chart: Who Reports to Whom?

In ordinary AI tools, there is no organization. One lonely chatbot attempts to write requirements, write code, review itself, and run tests all at once — which causes hallucinations, messy code, and crashes.

**The Asas Company** operates like a real, disciplined software engineering firm. Every agent has a clear manager, a clear squad, and a strictly bounded responsibility:

```
                                 ┌─────────────────────────┐
                                 │    YOU (THE FOUNDER)    │
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
│ Has final say on all code!    │                                     │ David (VP Eng) • Darryl (Ops) │
│ Reports directly to Founder & │                                     │ Jan (CRO & Brand)             │
│ CEO. Cannot be overruled by   │                                     │                               │
│ coders. Real tests only!      │                                     └──────────────┬────────────────┘
└──────────────┬────────────────┘                                                    │
               │                                                                     │
               │                                   ┌─────────────────────────────────┼─────────────────────────────────┐
               ▼                                   ▼                                 ▼                                 ▼
┌──────────────────────────────┐    ┌──────────────────────────────┐  ┌──────────────────────────────┐  ┌──────────────────────────────┐
│ 🧪 REALITY GATE SQUAD        │    │ 🛡️ RED TEAM & SECURITY SQUAD │  │ ⚙️ CORE ENGINEERING SQUAD    │  │ 🎨 PRODUCT & DESIGN SQUAD    │
│ (Under Angela Martin)        │    │ (Under Stanley & Dwight)     │  │ (Under David Wallace)        │  │ (Under Marcus & Jan)         │
│ • Ryan (TDD Test Writer)     │    │ • Dwight (Red Team Lead)     │  │ • Jim (Minimalist Coder)     │  │ • Pam (Executive UI Designer)│
│ • Kevin (Checks Acceptance)  │    │ • Toby (Security Guard)      │  │ • Oscar (Database Speed)     │  │ • Val (Accessibility Guard)  │
│ • Isabela (E2E Automation)   │    │ • Creed (Fresh-Eye Review)   │  │ • Andy (API Builder)         │  │ • Zara (UX Workflow Lead)    │
│ • Erin (User Empathy Tester) │    │                              │  │ • Nate (Speed & Performance) │  │ • Elena (Design Tokens)      │
└──────────────────────────────┘    └──────────────────────────────┘  │ • +45 Specialist Coders      │  └──────────────────────────────┘
                                                                      └──────────────┬───────────────┘
                                                                                     │
                                                                                     ▼
                                                                      ┌──────────────────────────────┐
                                                                      │ 📦 OPERATIONS & MEMORY SQUAD │
                                                                      │ (Under Darryl Philbin)       │
                                                                      │ • Hank (Safe File Guard)     │
                                                                      │ • Phyllis (Company Memory)   │
                                                                      │ • Amira (System Uptime)      │
                                                                      └──────────────────────────────┘
```

### 📋 The Chain of Command Breakdown

1. **Level 0: The Founder (YOU)**  
   * **Role:** The Owner and Final Decision Maker.  
   * **What you do:** You give the high-level goal in plain English (for example: `boss "Fix login button on mobile"`). You never have to micromanage individual files, write prompt chains, or babysit code reviews.

2. **Level 1: Executive Leadership Team**  
   * **👔 Michael Scott (CEO):** Reports directly to YOU. He is your company's head conductor. He listens to your goal, picks the exact right specialists for the job, assigns tasks, solves disagreements, and oversees final delivery.
   * **📋 Marcus Chen (Chief Product Officer):** Reports to Michael. Translates your short prompt into a clear, step-by-step plan with exact requirements and edge cases so the team knows what to build.
   * **📐 Stanley Hudson (Chief Technology Officer):** Reports to Michael. Guarantees simple, clean code. Rejects heavy, unnecessary packages and makes sure everything stays fast and easy to maintain.
   * **⚡ David Wallace (VP of Engineering):** Reports to Stanley & Michael. Coordinates the coders, keeps work on track, and makes sure files are edited cleanly without conflicts.
   * **💼 Jan Levinson (Chief Revenue Officer & Brand Lead):** Reports to Michael. Makes sure what gets built looks professional, makes sense for real users, and helps your project grow.
   * **📊 Darryl Philbin (VP of Operations):** Reports to Michael. Monitors speed, protects your computer resources, tracks token usage, and keeps your local database safe.

3. **⭐ The Independent Branch: Angela Martin (Head of Quality Assurance)**  
   * **Why this is critical:** In broken teams and standard AI tools, the developer checks their own work. Developers are naturally biased — they always claim their code works!  
   * **The Asas Company Rule:** Angela Martin **does NOT report to Engineering or Product**. She reports directly to Michael and the Founder. Coders cannot overrule or bypass her checks. If your computer's native test runner does not pass with zero errors (exit code 0), Angela blocks the release immediately. No excuses.

4. **Level 2: The Working Squads & Direct Reports**  
   * **🎨 Product & Design Squad (Under Marcus & Jan):** Pam Beesly (UI Design), Val Johnson (Accessibility), Zara (User Experience), Elena (Design Systems).
   * **🛡️ Red Team & Security Squad (Under Stanley & Dwight):** Dwight Schrute (Red Team Lead — Edge-Case Specialist), Toby Flenderson (Security Guard), Creed Bratton (Fresh-Eye Reviewer).
   * **⚙️ Core Engineering Squad (Under David Wallace):** Jim Halpert (Lead Minimalist Coder), Oscar Martinez (Database Reliability), Andy Bernard (API Builder), Nate (Speed & Performance), plus 45 domain specialist coders.
   * **🧪 Reality Gate QA Squad (Under Angela Martin):** Ryan Howard (TDD Test Writer), Kevin Malone (Checklist Auditor), Isabela Santos (Automated Testing), Erin Hannon (User Empathy Tester).
   * **📦 Operations & Systems Squad (Under Darryl Philbin):** Hank Tate (Safe File Guard), Phyllis Vance (Company Memory & Learnings), Amira (System Uptime).

---

<a id="protocols"></a>
## 🤝 How The Team Collaborates: The 5 Operating Protocols

How do 72 AI specialists work together like a cohesive software studio without talking over each other or overwriting each other's code? They follow **5 clear rules of collaboration**:

### ☕ 1. Standups & Work Leases (No Overwritten Files)
* **The everyday problem:** When multiple AI tools or developers work on the same folder, they often edit the same file at the same time, overwriting each other's changes and creating messy Git conflicts.
* **How our team handles it:** When you launch a task, Michael runs an instant standup and issues an exclusive work lease in `company.db`. Only the assigned specialist (like Jim) can edit the targeted files. Everyone else reads.
* **Why it matters:** Zero merge conflicts, zero deleted code, and clean, easy-to-read diffs.

### 📬 2. Clean Department Mailboxes (No Noisy Chat Rooms)
* **The everyday problem:** Chatbots lose instructions when everything is dumped into one giant, scrollable chat window. Important details get pushed out and forgotten.
* **How our team handles it:** Each department has its own clean inbox and outbox:
  * `tasks/inbox/` ➔ Marcus posts the initial specification and checklist.
  * `tasks/review/` ➔ Dwight and Toby get the plan to check for edge cases and security risks.
  * `tasks/verification/` ➔ Jim passes his code diff to Angela for physical test execution.
  * `tasks/done/` ➔ Angela and Darryl record the verified test output.
* **Why it matters:** Every step has a clear paper trail with sender, recipient, and code changes. Nothing gets lost in the noise.

### 🚦 3. The 3 Quality Gates (Zero Blind Approvals)
No code is ever shipped just because an AI promised it works. It must pass three specific checks:
1. **Gate 1 — Design Check:** Marcus defines the requirements ➔ Dwight stress-tests edge cases (timeouts, empty inputs, double-clicks) ➔ Stanley locks in the simplest possible design.
2. **Gate 2 — Code & Security Review:** Jim writes a small, focused patch (under 50 lines) ➔ Toby scans for secret leaks or unsafe paths ➔ Oscar verifies database query indexing.
3. **Gate 3 — Physical Machine Testing:** Angela runs your real test runner (`npm test`, `pytest`, `cargo test`). If tests fail or show any errors, Angela and Kevin reject the code immediately. Jim receives the exact error output and fixes it until your machine passes with zero errors (exit code 0).

### 🗄️ 4. The Local Team Log (`company.db` on Your Machine)
* **The everyday problem:** Close a chatbot window, and everything that was decided and tested vanishes forever.
* **How our team handles it:** Every decision, file change, and test run is saved to a local SQLite database (`company.db`) directly on your computer.
* **Why it matters:** You get a private, permanent record of every fix your team has ever made, complete with real terminal output and execution times. 100% offline and owned by you.

### 🛑 5. Spending Limits & Safety Brakes (No Runaway Costs or Loops)
* **The everyday problem:** An AI gets confused, enters an infinite loop, and burns through your API balance while you're away grabbing coffee.
* **How our team handles it:** Darryl Philbin monitors resource consumption and step counts in real time:
  * **At 75% budget:** Darryl warns the coder to stick strictly to the smallest possible fix.
  * **At 90% budget:** Darryl stops new exploratory changes and focuses solely on passing existing tests.
  * **At 100% budget:** The safety brake trips. The task safely pauses, rolls back to your last clean Git snapshot, and tells you exactly what happened.
* **Why it matters:** You're completely protected against runaway bills, frozen terminal screens, and infinite loops.

---

<a id="departments"></a>
## 🏢 Meet The 6 Departments & Who Does What

Our 72 specialists are organized into 6 real-world departments. Here is who they are, what they care about, and the everyday headaches they save you from:

### 👑 Department 1: Executive Board & Strategy
*Turns your short, everyday ideas into clear technical requirements and keeps the team aligned.*

* **👔 Michael Scott (CEO & Conductor)**  
  When you give a command like `boss "fix checkout"`, Michael takes the wheel. Instead of making you prompt 5 different chatbots by hand, he holds an instant standup, picks the right specialists from the fleet, and makes sure everyone stays focused until the feature passes all tests.

* **📋 Marcus Chen (Chief Product Officer)**  
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

* **🔒 Toby Flenderson (Security Guard & AppSec Lead)**  
  Toby is your quiet security guard. Before any code is committed, he scans the diff for leaked API keys, hardcoded passwords, SQL injection points, and unsafe file paths. He ensures you never accidentally push sensitive credentials to GitHub.

* **🕵️ Creed Bratton (Fresh-Eye Isolated Reviewer)**  
  When an engineer (or an AI) spends hours on a piece of code, they get "author blindness" — they assume it works because they wrote it. Creed inspects diffs in complete isolation with fresh eyes, catching strange logic errors and subtle bugs that everyone else overlooked.

---

### ⚙️ Department 3: Core Engineering & Database
*Writes small, focused code fixes and keeps your database fast and reliable.*

* **💻 Jim Halpert (Lead Minimalist Coder)**  
  The biggest problem with AI coders is that they rewrite 300 lines when you only needed a 2-line fix. Jim follows the strict 50-line rule: he writes small, pinpoint patches that fix the issue without touching unrelated files or introducing new bugs.

* **🧮 Oscar Martinez (Database Reliability Engineer — DBRE)**  
  Oscar cares deeply about data integrity and speed. He crafts fast SQLite and PostgreSQL schemas, configures modern speed settings, verifies index lookups, and makes sure database migrations run cleanly without corrupting your data.

* **🔌 Andy Bernard (API Platform Architect)**  
  Andy designs clean, predictable REST and API endpoints. He ensures status codes make sense, error messages are helpful, and inputs are properly validated so the frontend and backend connect smoothly.

* **🏎️ Nate (Speed & Performance Optimizer)**  
  Nate profiles memory usage, eliminates redundant loops, and optimizes slow database queries so your app feels snappy and responds in milliseconds.

---

### 🧪 Department 4: Quality Assurance & Reality Gate
*Refuses promises and claims. Demands real machine verification from your computer.*

* **🛡️ Angela Martin (Head of QA & Reality Gate Auditor)**  
  Angela is the most important member of the company. She never takes an AI's word for it. She runs your computer's real test command (`npm test`, `pytest`, etc.). If there is even one failure or error, the task is rejected. Code only ships when your computer confirms it passed with zero errors (exit code 0). No coder can overrule Angela.

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

<a id="reality-gate"></a>
## 🛡️ The Reality Gate: Why It Never Lies

Every other AI tool uses **"narrative confirmation"** — the AI says it works, so the tool claims victory.

The Asas Company uses **The Reality Gate Interlock**:

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
                       │  ALL 4 PASS: SHIPPED TO PROD    │
                       │  Cryptographic SHA-256 in DB    │
                       └─────────────────────────────────┘
```

The Reality Gate makes false victories physically impossible through **4 strict checks**:

1. **Clean Machine Exit (Exit Code 0):**  
   Only real computer proof counts. Angela executes your computer's native test runner (`npm test`, `pytest`, `cargo test`). If your computer returns an error (exit code 1 or higher), the task is marked as FAILED—no matter what friendly story the AI tells.

2. **Anti-Cheating Guard (Tamper Protection):**  
   The system takes a digital fingerprint (SHA-256) of your test files before the AI starts. If the AI tries to pass tests by deleting checks, commenting out assertions, or weakening rules, the cheat is immediately detected, blocked, and rolled back.

3. **Real Checkpoints (No Empty Tests):**  
   The system verifies that real checks actually ran. An AI cannot create empty tests that check nothing and claim an easy victory.

4. **The 50-Line Safety Rule (Keep Diffs Tiny):**  
   No AI is allowed to rewrite 400 lines when you asked for a simple fix. Every change is kept strictly under 50 lines so your project stays clean and nothing breaks.

---

<a id="highlights"></a>
## 🔥 6 Core Highlights: Why Developers Love The Asas Company

Here is why developers, founders, and teams choose **The Asas Company** over conventional AI tools:

### ⚡ 1. The Reality Gate: Real Tests, Zero Lies (Exit Code 0)
Standard AI tools love to claim *"I fixed everything!"* even when the code won't even compile. You spend the next hour debugging their broken suggestions.  
**How we do it:** Angela Martin runs your computer's real test runner (`npm test`, `pytest`, `cargo test`). If your computer returns an error, the AI isn't finished. The task is only complete when your native test suite passes with zero errors (exit code 0). No fabricated claims, ever.

### ⚡ 2. The 50-Line Rule: Clean Diffs, No Code Carnage
You ask an AI to fix a small button color, and it rewrites 400 lines across 5 files, breaking two existing features in the process.  
**How we do it:** Jim Halpert enforces small, pinpoint edits. He modifies only the exact lines needed to solve the problem, keeping Git diffs clean and easy to review in 30 seconds.

### ⚡ 3. Dwight's Reality Check: Catch Edge Cases Before Coding
Solo chatbots jump straight into writing code without thinking through edge cases, producing fragile apps that collapse when real users arrive.  
**How we do it:** Dwight Schrute stress-tests the design first: *"What happens if the user double-clicks? What if the network drops mid-request? What if the database is busy?"* Edge cases are resolved before a single file on disk is touched.

### ⚡ 4. Pure Node.js: Zero Extra Packages, Instant Start
Other multi-agent frameworks require heavy Python environments, 50 pip packages, and 500MB of downloads that easily break over time.  
**How we do it:** The Asas Company is built entirely in vanilla Node.js using only standard library modules. No `node_modules` bloat, no complex environment setup. It boots up in less than 1 millisecond and runs everywhere.

### ⚡ 5. Local SQLite Ledger (`company.db`): You Own Your Data
Most AI coding tools lock your history inside proprietary cloud servers where you pay monthly fees to see what was done.  
**How we do it:** Everything — requirements, agent decisions, code diffs, and test outputs — is recorded into a local SQLite database (`company.db`) directly on your machine. It's completely private, offline-ready, and yours forever.

### ⚡ 6. Universal 1-Click Export to Cursor, Claude Code & Antigravity
You shouldn't have to abandon your favorite code editor to get the benefits of an organized multi-agent team.  
**How we do it:** With a single command (`npx theasascompany install`), all 72 specialist prompts can be exported directly into Cursor (`.cursor/rules/`), Claude Code (`~/.claude/agents/`), or Antigravity (`.agents/`).

---

<a id="comparison"></a>
## 📊 Why This Beats Every Other AI Tool

| Feature | Standard Chatbots (ChatGPT / Copilot) | AI Coding Agents (Devin / AutoGPT) | 🏛️ **The Asas Company** |
| :--- | :---: | :---: | :---: |
| **How it verifies code** | None. It guesses and promises. | Basic commands, often hallucinates passing tests. | **Physical Reality Gate: Runs real tests on your machine until exit code is 0 ($? === 0).** |
| **Stops AI from cheating** | ❌ No protection | ❌ No (can modify or delete test files to make them pass) | **✔ Anti-Cheating Guard: Test files are fingerprinted (SHA-256). Any tampering is rolled back.** |
| **Reviews the plan first** | ❌ No plan, just dumps code | ❌ Long confusing monologues | **✔ 7 department heads debate edge cases and agree on a plan before writing code.** |
| **Code change size** | Rewrites 300+ lines you never asked for | Large, sprawling edits that break adjacent files | **✔ Surgical 50-line rule: Strict limit of 50 lines per fix so nothing gets broken.** |
| **System footprint & bloat** | Requires browser or heavy extension | 100+ heavy Python/pip packages and 500MB downloads | **✔ ZERO extra packages: 100% pure Node.js standard library. Boots up in under 1ms.** |
| **Cost to brainstorm & plan** | Costs money and burns API tokens | Expensive cloud token usage | **✔ 100% FREE offline planning: Convenes council in 37ms at 0 tokens burned.** |
| **Team memory & audit trail** | Lost forever when you close the tab | Buried in massive, messy log files | **✔ Saved in private, permanent local database (`company.db`) on your computer.** |

---

<a id="quickstart"></a>
## ⚡ The 10-Second Quickstart

You don't need to install 50 npm packages. This runs on **pure Node.js** (version 22+) with **zero extra dependencies**.

### 🏛️ 1. The Autonomous Executive Council (`meet`)
Need to plan an architecture, debate trade-offs, or scope a feature? Convene the 7 department heads (CEO Michael, CPO Marcus, CTO Stanley, Red Team Dwight, Lead Coder Jim, QA Angela, DBA Dr. Kofi) offline in **~37ms at 0 tokens**:
```bash
# Convene an autonomous board debate
npx theasascompany meet "Implement OAuth2 social authentication with Google and GitHub"

# Interactive meeting (cast the Founder tie-breaker vote!)
npx theasascompany meet "Migrate session storage from Redis to SQLite" --interactive
```
*Outputs: 6 rounds of department head debate, executive risk scorecard, minutes saved in `docs/meetings/`, certified decision in `docs/DECISION_LOG.md`, and an ordered sprint flight board.*

### ⚡ 2. The Instant Engineering Router (`ask`)
Don't know which specialist or department to call? Don't memorize 72 agents. Just **ask**:
```bash
npx theasascompany ask "Users charged twice when clicking checkout button"
```
In **less than 15 milliseconds** (with **0 LLM tokens burned**), it immediately returns the exact disciplined path:
```text
🏢 THE ASAS COMPANY — ENGINEERING ROUTER (ask-matt Engine)
Task: "Users charged twice when clicking checkout button"
Classification: Defect Diagnosis & Surgical Bugfix (0.23ms, 0 LLM tokens)
Assigned Leadership: Dwight Schrute (Red Team) & Jim Halpert (Minimal Coder)

Disciplined Execution Path:
  1. Diagnose Bug             [Dwight Schrute]  ↳ Establish reproduction feedback loop before code
  2. Adversarial Check        [Hank Tate]        ↳ Stress-test race conditions & network drops
  3. 50-Line Minimal Fix      [Jim Halpert]      ↳ Surgical fix strictly under 50 lines
  4. Reality Gate Pass        [Angela Martin]    ↳ Native test suite exit code 0 ($? === 0)
  5. Kaizen Retro             [Kaizen Coach]     ↳ Log regression into anti-patterns ledger
```

```bash
# Socratic requirements interview (generates docs/adr/ and docs/GLOSSARY.md without token bloat)
npx theasascompany --socratic "Idempotent payment tokens"

# Run empirical benchmark (sub-1ms per query)
npx theasascompany --router-benchmark
```

### 🚀 3. Instant Run Without Installing (`npx`)
Open your terminal inside **any project on your computer** and tell The Boss what to do:
```bash
npx theasascompany /boss "Fix the login error when email is capitalized"
```
*Michael Scott plans the sprint, Jim writes the minimal code, and Angela runs your tests until they exit 0.*

### 👑 4. Install Once, Call `boss` from Anywhere
Install globally on your computer:
```bash
npm install -g theasascompany
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
boss --break "Build User Authentication with SQL database and responsive Login Form"
```
*(Or type `boss` alone anytime to see the team status!)*

### 🎨 5. Use Inside Cursor, Claude Code, or Antigravity
Export all 72 specialist agent definitions directly into your favorite editor with one simple command:
```bash
# Install directly into Cursor (.cursor/rules/)
npx theasascompany install --tool cursor

# Install directly into Claude Code (~/.claude/agents/)
npx theasascompany install --tool claude

# Install into Antigravity (.agents/)
npx theasascompany install --tool antigravity
```
Once installed, you can simply type `/boss "your task"` right in your editor's chat window!

---

<a id="examples"></a>
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

### 🔒 Example 3: Security & Secret Check
```bash
node cli.js /boss "Scan our project for leaked API keys and unsafe file upload paths"
```
*Toby scans your files, protects your secrets, and makes sure paths are secure.*

---

<a id="models"></a>
## 🤖 Works With Any AI Provider (Or 100% Offline Free)

You can run The Asas Company with whichever AI engine you prefer:

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
  <b>Welcome to The Asas Company. Be The Founder, and let your AI company build the future. ☕</b>
</div>
