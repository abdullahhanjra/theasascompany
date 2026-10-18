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

[**💬 Live Demo**](#-see-it-in-action-the-office-tackles-a-real-bug) • [**🏛️ Org Chart**](#️-company-org-chart-who-reports-to-whom) • [**🤝 Team Protocols**](#-how-the-team-collaborates-the-5-company-protocols) • [**🏢 6 Departments**](#-the-6-dedicated-departments--their-superpowers) • [**🔥 6 Core Hooks**](#-6-core-hooks-that-change-everything) • [**⚡ 1-Minute Quickstart**](#-1-minute-quickstart) • [**📊 Comparison**](#-how-we-compare-to-other-tools)

</div>

---

## 🤔 The Real Problem: The 2 AM AI Nightmare

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
│    Jim writes surgical minimal code (under 50 lines). Oscar tunes queries.  │
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

## 💬 See It in Action: The Office Tackles a Real Bug

Here is how the departments talk to each other when you hand them a real problem:

> **You (The Boss):**  
> `"Fix checkout: if a customer clicks the Pay button twice quickly, it charges them twice."`
> 
> 👑 **Michael (CEO):**  
> *"Alright team, we have a double-charging bug in checkout! Marcus, define the requirements."*
> 
> 📋 **Marcus (CPO):**  
> *"Requirement spec ready: 1) Disable button on first click, 2) Attach an idempotency key to each transaction, 3) Block duplicate submissions."*
> 
> 🥊 **Dwight (Red Team Inquisitor):**  
> *"Hold on! What if the user refreshes the page mid-payment? What if the network times out? We must enforce a unique transaction lock at the database level too!"*
> 
> 📐 **Stanley (CTO):**  
> *"Good catch Dwight. Jim, write a surgical 14-line fix with a database lock. Oscar, verify the query index."*
> 
> ⚙️ **Jim (Clean Coder):**  
> *"Done. Exactly 14 lines added to checkout.js. Zero unrelated files touched."*
> 
> 🧮 **Oscar (Database DBRE):**  
> *"Transaction index verified. No slow table locks or race conditions."*
> 
> 🔒 **Toby (Security Guard):**  
> *"Scanned the diff: zero leaked API secrets, zero SQL injection vectors."*
> 
> 🧪 **Angela (QA & Reality Gate):**  
> *"Running real test suite: `npm test` on your computer... Exit code 0! 32/32 tests passed. 0 hallucinations allowed. Task approved!"*
> 
> 📦 **Darryl (Release Master):**  
> *"Recorded to local SQLite ledger `company.db`. Bug permanently resolved."*

---

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
│ CEO. CANNOT be pressured by   │                                     │                               │
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
   * **The Boring Company Rule:** Angela Martin **does NOT report to Engineering or Product**. She reports directly to Michael and the Founder. Engineering cannot overrule her, bribe her, or bypass her tests. If your computer's native test runner does not exit with code 0 (`$? === 0`), Angela vetoes the release immediately.

4. **Level 2: The Working Squads & Direct Reports**  
   * **🎨 Product & Design Squad (Under Marcus & Jan):** Pam Beesly (UI Design), Val Johnson (Accessibility), Zara (UX Journeys), Elena (Design Systems).
   * **🛡️ Red Team & Security Squad (Under Stanley & Dwight):** Dwight Schrute (Adversarial Inquisitor), Toby Flenderson (AppSec & Secret Guard), Creed Bratton (Fresh-Eye Isolated Reviewer).
   * **⚙️ Core Engineering Squad (Under David Wallace):** Jim Halpert (Lead Minimal Coder), Oscar Martinez (Database Reliability), Andy Bernard (API Platform), Nate (Speed & Latency), plus 45 domain specialist coders.
   * **🧪 Reality Gate QA Squad (Under Angela Martin):** Ryan Howard (TDD Test Writer), Kevin Malone (Definition of Done Auditor), Isabela Santos (E2E Test Automation), Erin Hannon (User Empathy Tester).
   * **📦 Operations & Systems Squad (Under Darryl Philbin):** Hank Tate (Workspace File Sandbox Guard), Phyllis Vance (Institutional Memory & Post-Mortem Coordinator), Amira (SRE & Uptime).

---

## 🤝 How The Team Collaborates: The 5 Company Protocols

How do 67 AI specialists work together like a cohesive software company without talking over each other or overwriting each other's code? They follow **5 strict operational protocols**:

### ☕ Protocol 1: The Daily Standup & Exclusive Task Leases (Zero File Collisions)
* **The Problem in other AI tools:** If two agents work on the same project, they often edit the same file simultaneously, overwrite each other's changes, and create messy merge conflicts.
* **How our team works:** When you start a task, Michael calls an instant 1-second automated standup. He reviews Marcus's specification and issues an **Exclusive Task Lease** in `company.db`. Only the assigned specialist (e.g. Jim Halpert) receives write access to the targeted files. All other agents are strictly read-only until Jim's work is submitted.
* **Result:** Zero git conflicts, zero accidental file overwrites, and 100% clean diffs.

### 📬 Protocol 2: Department Mailboxes & Asynchronous Messaging (The Hive Protocol)
* **The Problem in other AI tools:** Agents get dumped into one giant, chaotic chat window. Instructions get buried, details get hallucinated, and context windows blow up.
* **How our team works:** Every department communicates through structured file-system mailboxes using clean, single-writer message queues:
  * `tasks/inbox/` ➔ Marcus posts the initial feature specification and requirements.
  * `tasks/review/` ➔ Dwight and Toby receive the proposed design to stress-test for bugs and security holes.
  * `tasks/verification/` ➔ Jim passes his code diff to Angela for physical test execution.
  * `tasks/done/` ➔ Angela and Darryl record the verified cryptographic receipt.
* **Result:** Every message contains clear metadata (sender, recipient, purpose, diff, and test output). No lost instructions, no noisy cross-talk.

### 🚦 Protocol 3: The 3 Formal Quality Gates (Zero Blind Approvals)
Work never moves from one stage to another without explicit sign-off from the responsible director:
1. **Gate 1 — Architecture Sign-Off:** Marcus defines the requirements ➔ Dwight attacks edge cases with 3 chaos probes ➔ Stanley approves the minimal design. Only then can code be written.
2. **Gate 2 — Implementation & Security Audit:** Jim writes surgical code (<50 lines) ➔ Toby scans diffs for leaked secrets, path traversals, or injections ➔ Oscar verifies database query indexing.
3. **Gate 3 — The Reality Gate Certification:** Angela runs your machine's real test runner (`npm test`, `pytest`, `cargo test`). If exit code is 0 (`$? === 0`), Kevin checks off every user story in the Definition of Done. If any test fails, code is automatically returned to Jim with diagnostic logs for instant fixing.

### 🗄️ Protocol 4: The Shared Company Ledger (`company.db` with SHA-256 Receipts)
* **The Problem in other AI tools:** Once your chat session closes, all memory of what was done, why it was done, and how it was tested disappears into the void.
* **How our team works:** Every decision, inter-department message, code diff, and test execution is logged into a local SQLite database (`company.db`) stored on your computer.
* **Tamper-Proof Receipts:** When Angela executes your test suite, the standard output, duration, and exit code are hashed with SHA-256. This cryptographic receipt is permanently stored in `company.db`. You have an immutable, verifiable audit trail of every fix your team has ever shipped.

### 🛑 Protocol 5: Token Quotas & Circuit Breakers (Cost & Runaway Protection)
* **The Problem in other AI tools:** An AI gets stuck in an infinite loop while trying to fix a bug, burning through $50 of API credits while you step away for lunch.
* **How our team works:** Darryl Philbin acts as the financial controller and runtime monitor. He tracks token consumption and execution steps in real time:
  * **At 75% budget:** Darryl issues a throttle warning and orders Jim to stick to the minimal viable diff.
  * **At 90% budget:** Darryl halts new exploratory changes and forces focus on passing the existing test runner.
  * **At 100% budget:** The emergency circuit breaker trips. The process safely aborts, cleanly rolls back to the last clean Git snapshot, and reports the exact blocker to you.
* **Result:** You are completely protected from runaway costs, frozen processes, and infinite AI loops.

---

## 🏢 The 6 Dedicated Departments & Their Superpowers

Every specialist in our 67-agent fleet has one clear responsibility, one special superpower, and eliminates a specific everyday headache for you:

### 👑 Department 1: Executive Board & Strategic Direction
*Translates your quick 1-line ideas into clear specifications and keeps everyone aligned.*

* **👔 Michael Scott — Supreme Conductor & CEO**
  * **The Headache He Kills:** Having to micromanage multiple AI tools and prompt them individually.
  * **His Superpower:** Listens to your `/boss` command, organizes the team morning standup, picks the exact right specialists from the fleet, arbitrates debates, and signs off on final delivery.
  * **Your Direct Benefit:** You give one instruction, and Michael ensures the entire company executes it cleanly without you having to guide every single keystroke.

* **📋 Marcus — Chief Product Officer (CPO)**
  * **The Headache He Kills:** AI tools building the completely wrong feature because they guessed what you meant.
  * **His Superpower:** Automatically elaborates vague founder prompts into professional user stories, boundary conditions, and acceptance checklists.
  * **Your Direct Benefit:** Nobody writes a line of code until the goal is 100% clear.

* **📐 Stanley — Chief Technology Officer (CTO)**
  * **The Headache He Kills:** Over-engineered code, unnecessary new dependencies, and bloated architectures.
  * **His Superpower:** Enforces the *Smallest Justified Design*. If a feature can be solved with 15 lines of vanilla code, he refuses any 500-line framework addition.
  * **Your Direct Benefit:** Your codebase stays light, clean, and blazingly fast.

* **⚡ David — VP of Engineering**
  * **The Headache He Kills:** Slow progress, messy Git branches, and untracked code modifications.
  * **His Superpower:** Allocates work leases, monitors sprint throughput, and enforces 100% test coverage standards.
  * **Your Direct Benefit:** Tasks finish in minutes, not hours.

* **💼 Jan — Chief Revenue Officer (CRO)**
  * **The Headache He Kills:** Building features that users don't actually care about or that don't make business sense.
  * **His Superpower:** Evaluates customer-facing clarity, user value, and pricing/conversion alignment.
  * **Your Direct Benefit:** Everything you build feels intuitive and delivers real customer value.

* **📊 Darryl — VP of Operations**
  * **The Headache He Kills:** Runaway token costs, crashed background processes, and unmonitored systems.
  * **His Superpower:** Tracks token quotas, circuit-breakers, and database health in real time.
  * **Your Direct Benefit:** Predictable costs and stable, crash-free execution.

---

### 🛡️ Department 2: The Red Team & Security Guard (Defensive Auditing)
*Stops bugs, security holes, and race conditions BEFORE code is written.*

* **🥊 Dwight Schrute — Adversarial Inquisitor (Red Team Lead)**
  * **The Headache He Kills:** Bugs that only show up after you deploy to production when hundreds of users hit your app.
  * **His Superpower:** Runs 3 aggressive chaos probes on the design before coding begins: *"What if inputs are null? What happens under heavy concurrency? What if an external API crashes?"*
  * **Your Direct Benefit:** Edge cases are solved in the planning phase, so your production code is bulletproof from day one.

* **🔒 Toby Flenderson — Security Guard (AppSec Lead)**
  * **The Headache He Kills:** Accidental API key leaks, hardcoded credentials, and dangerous hacker exploits.
  * **His Superpower:** Automated pre-commit security audits. Scans diffs for exposed secrets, SQL injections, Cross-Site Scripting (XSS), and directory traversal attempts.
  * **Your Direct Benefit:** You never accidentally push a private OpenAI key or database password to a public repository.

* **🕵️ Creed Bratton — Fresh Eyes Reviewer**
  * **The Headache He Kills:** The "author blindness" where an AI assumes its own broken code works because it remembers its own thought process.
  * **His Superpower:** Inspects code diffs in total epistemic isolation with zero prior context or author bias.
  * **Your Direct Benefit:** Catches subtle logic oversights and weird edge-case mistakes that everyone else on the team missed.

---

### ⚙️ Department 3: Core Engineering & Database
*Writes minimal, surgical code changes and guards database performance.*

* **💻 Jim Halpert — Lead Coder (Minimal Change Specialist)**
  * **The Headache He Kills:** AI rewriting 500 lines of your code when you only asked for a 2-line bug fix.
  * **His Superpower:** Enforces the strict 50-line razor: surgical, bounded edits that touch only the direct call chain with zero orthogonal drift.
  * **Your Direct Benefit:** Your Git commit history stays clean, pull requests are easy to review, and existing features never break.

* **🧮 Oscar Martinez — Database Reliability Engineer (DBRE)**
  * **The Headache He Kills:** Slow queries that freeze your app, corrupted database schemas, and data loss.
  * **His Superpower:** Crafts high-speed SQLite and PostgreSQL schemas, WAL mode concurrency, zero-downtime migrations, and optimal index trees.
  * **Your Direct Benefit:** Instant search speeds and bulletproof data integrity, even under heavy loads.

* **🔌 Andy Bernard — API Platform Architect**
  * **The Headache He Kills:** Confusing APIs with bad status codes and cryptic error messages that break the frontend.
  * **His Superpower:** Designs contract-first OpenAPI and REST endpoints with standardized HTTP response codes, friendly error objects, and input validation.
  * **Your Direct Benefit:** Frontends and backends communicate seamlessly with zero integration friction.

* **🏎️ Nate — Speed & Latency Optimizer**
  * **The Headache He Kills:** Sluggish apps, high CPU usage, and mysterious memory leaks.
  * **His Superpower:** Profiles V8 memory heaps, eliminates redundant renders, and optimizes execution loops to run under 100 milliseconds.
  * **Your Direct Benefit:** Your app feels snappy, lightweight, and responsive to every click.

---

### 🧪 Department 4: Quality Assurance & Reality Gate
*Refuses promises and claims. Demands real machine verification from your terminal.*

* **🛡️ Angela Martin — Reality Gate Auditor (Head of QA)**
  * **The Headache He Kills:** AI chatbots saying *"Done!"* when the code doesn't even compile or run.
  * **Her Superpower:** Enforces the unforgeable Reality Gate. She runs your computer's native test runner (`npm test`, `pytest`, `cargo test`, etc.). Unless the process exits with status code 0 (`$? === 0`), the task is rejected.
  * **Your Direct Benefit:** Zero hallucinations. If The Boring Company says a task is complete, it has physically passed real tests on your machine.

* **🔴 Ryan Howard — TDD Test Engineer (RED ➔ GREEN)**
  * **The Headache He Kills:** Bugs getting fixed temporarily only to break again next week.
  * **His Superpower:** Writes failing automated tests first (RED) to prove the bug exists, then verifies that Jim's code turns them completely green (GREEN).
  * **Your Direct Benefit:** Every bug fix permanently protects your codebase from future regressions.

* **📋 Kevin Malone — Definition of Done Auditor**
  * **The Headache He Kills:** Developers claiming a feature is ready when half the requirements were forgotten.
  * **His Superpower:** Checks off every single acceptance criterion from Marcus's original specification. Defaults to "NEEDS WORK" until overwhelming evidence is presented.
  * **Your Direct Benefit:** You get complete, finished features — never partial drafts.

* **🔍 Erin Hannon — User Empathy Tester**
  * **The Headache He Kills:** Clunky user experiences, confusing button labels, and hidden error states.
  * **Her Superpower:** Tests user journeys from the perspective of a beginner. Clicks buttons out of order, enters unexpected inputs, and checks mobile viewports.
  * **Your Direct Benefit:** Your software is a pleasure for real humans to use.

---

### 🎨 Department 5: Product Design & User Experience
*Ensures your product looks world-class, feels tactile, and is accessible to everyone.*

* **🎨 Pam Beesly — Executive UI Designer**
  * **The Headache He Kills:** Bland, cookie-cutter AI websites that look generic and robotic.
  * **Her Superpower:** Apple-grade typographic rhythm, generous whitespace, warm editorial color palettes, CSS grid choreography, and fluid micro-interactions.
  * **Your Direct Benefit:** Interfaces that look bespoke, premium, and designed by a senior product designer.

* **💎 Jan Levinson — Brand & Visual Director**
  * **The Headache He Kills:** Inconsistent colors, misaligned buttons, and clashing font styles across different pages.
  * **Her Superpower:** Enforces design tokens, unified component libraries, and strict visual brand cohesion.
  * **Your Direct Benefit:** Your product looks polished, cohesive, and instantly trustworthy to users and investors.

* **♿ Val Johnson — Accessibility & Ergonomics Guardian**
  * **The Headache He Kills:** Apps that are impossible to navigate with a keyboard or unreadable in dark mode.
  * **Her Superpower:** Audits WCAG contrast ratios, aria labels, keyboard focus rings, and screen-reader accessibility.
  * **Your Direct Benefit:** Accessible to everyone, compliant with international standards, and pleasant for keyboard power users.

---

### 📦 Department 6: Operations, Systems & Release
*Automates packaging, protects your local files, and builds company memory.*

* **📦 Darryl Philbin — Release & Packaging Master**
  * **The Headache He Kills:** Broken dependencies, messy release notes, and broken deployment scripts.
  * **His Superpower:** Generates clean semantic version tags, automated changelogs, and verifies that zero dependencies are missing before shipping.
  * **Your Direct Benefit:** One-command painless releases that work every single time.

* **🛡️ Hank Tate — System Guardian**
  * **The Headache He Kills:** AI tools accidentally deleting files outside the project or altering sensitive system directories.
  * **His Superpower:** Enforces strict boundary sandboxes. Intercepts file system calls to ensure agents never modify files outside your project workspace.
  * **Your Direct Benefit:** Total safety and peace of mind when running autonomous tasks.

* **🧠 Phyllis Vance — Knowledge & Team Coordinator**
  * **The Headache He Kills:** Having to explain the same codebase quirks and rules to your AI over and over again.
  * **Her Superpower:** Compiles verified learnings and bug post-mortems into local SQLite memory (`company.db`).
  * **Your Direct Benefit:** Your team compounds experience over time, getting smarter and faster with every task.

* **🌐 + 45 Domain Specialists**  
  Mobile app developers, Docker containerizers, WebSocket streaming experts, voice AI specialists, and documentation authors. Run `node scripts/install-tools.js --list` to see the full roster!

---

## 🔥 6 Core Hooks That Change Everything

Why do developers, hiring managers, and founders choose **The Boring Company** over regular AI tools?

### ⚡ Hook 1: The Reality Gate Interlock (`$? === 0`) — Zero Hallucinations Guaranteed
* **The Nightmare:** Chatbots love to say *"I fixed your code!"* even when the app won't even compile. You waste hours testing their broken suggestions.
* **The Solution:** The Reality Gate is an unforgeable machine interlock. Angela Martin executes your real test runner on your computer. If the process does not return exit code 0 (`$? === 0`), the task is marked as failed and Jim is ordered to fix it.
* **The Proof:** You never get broken code handed back to you. Period.

### ⚡ Hook 2: The 50-Line Minimal Change Rule — No More Code Carnage
* **The Nightmare:** You ask an AI to fix a small layout bug, and it rewrites 400 lines of code across 6 files, introducing 3 new bugs in the process.
* **The Solution:** Jim Halpert enforces the strict 50-line razor. He modifies only the exact lines in the direct call chain, with zero speculative refactoring.
* **The Proof:** Clean git diffs that take 30 seconds to review, with zero risk of breaking unrelated features.

### ⚡ Hook 3: Pre-Code Adversarial Sparring — Dwight Kills Bugs Early
* **The Nightmare:** Solo AI tools write code first and think later, producing fragile implementations that collapse under edge cases.
* **The Solution:** Dwight Schrute stress-tests the plan with 3 chaos probes *before* a single file is touched on disk.
* **The Proof:** Concurrency deadlocks, empty states, and network timeouts are identified and handled in the design phase.

### ⚡ Hook 4: Zero External Dependencies (Pure Node.js 22+) — Instant Setup
* **The Nightmare:** Other multi-agent frameworks force you to install 100+ pip packages, Python virtual environments, and 500MB of dependencies that constantly break.
* **The Solution:** The Boring Company is engineered in pure vanilla Node.js using only standard library modules. 0 extra npm packages needed.
* **The Proof:** Starts up in under 1 millisecond. Runs on Windows, macOS, and Linux out of the box.

### ⚡ Hook 5: Tamper-Proof Local Database Ledger (`company.db`) — You Own Everything
* **The Nightmare:** Your prompts, tasks, and project history are locked inside closed cloud databases that charge you subscription fees.
* **The Solution:** Everything is recorded into a local SQLite database (`company.db`) stored on your computer, with immutable audit triggers.
* **The Proof:** 100% offline-ready, 100% private, and completely free forever.

### ⚡ Hook 6: Universal 1-Click Export to Cursor, Claude Code & Antigravity
* **The Nightmare:** You have to copy-paste prompts manually between different editors and tools.
* **The Solution:** With one command (`node scripts/install-tools.js`), all 67 agent personas are automatically exported into `.cursor/rules/`, `~/.claude/agents/`, or Antigravity!
* **The Proof:** Use your favorite AI editor while enjoying the full power of all 67 specialists.

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
