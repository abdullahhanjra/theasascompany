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

[**⚡ 1-Minute Quickstart**](#-1-minute-quickstart) • [**👥 Meet The Team**](#-meet-the-team) • [**📊 How We Compare**](#-how-we-compare-to-other-tools) • [**🎯 3 Easy Examples**](#-3-easy-examples-you-can-try-now) • [**🛡️ How Tests Are Checked**](#️-how-tests-are-checked-no-fake-promises) • [**🤖 Works With Any AI**](#-works-with-any-ai-model)

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

## 💡 The Solution: A Real Team That Tests Its Own Work

**The Boring Company** fixes this by giving you a team with clear roles and real testing:

```
                           YOU (THE BOSS)
                                 │
                                 ▼
         ┌────────────────────────────────────────────────┐
         │ 1. THE LEADER (Michael)                        │
         │ Understands your request and plans the steps.  │
         └────────────────────────────────────────────────┘
                                 │
                                 ▼
         ┌────────────────────────────────────────────────┐
         │ 2. THE BUG HUNTER (Dwight)                     │
         │ Finds edge cases before any code is written.   │
         └────────────────────────────────────────────────┘
                                 │
                                 ▼
         ┌────────────────────────────────────────────────┐
         │ 3. THE CLEAN CODER (Jim)                       │
         │ Writes a small, simple fix (no giant rewrites).│
         └────────────────────────────────────────────────┘
                                 │
                                 ▼
         ┌────────────────────────────────────────────────┐
         │ 4. THE STRICT TESTER (Angela) 🛡️               │
         │ Runs your real tests on your computer.         │
         │ Did tests pass? Did the app actually run?      │
         └────────────────────────────────────────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
          [Test Failed ❌]                [Test Passed ✅]
      The team automatically fixes      Clean, working code is
    the bug until tests pass cleanly.     ready for you to use!
```

---

## 👥 Meet The Team

Inspired by the classic office dynamic, every AI specialist has one clear job:

| Teammate | Role | What They Do For You | When to Call Them |
| :--- | :--- | :--- | :--- |
| 👔 **Michael** | **The Team Leader (CEO)** | Listens to your request, picks the right teammates, and makes sure the job gets done. | Whenever you start a task with `/boss <your task>`. |
| 🥊 **Dwight** | **The Bug Hunter (Red Team)** | Asks the tough questions *before* code is written: *"What if inputs are empty? What if the user double-clicks? What if the network drops?"* | When planning new features to prevent bugs early. |
| 💻 **Jim** | **The Clean Coder** | Writes small, clean, simple code changes. He changes 10 lines instead of rewriting your whole file. | For quick bug fixes and clean code edits. |
| 🛡️ **Angela** | **The Strict Tester** | Never believes promises. She runs your actual tests and only marks a job done if tests 100% pass. | Before any code is saved or released. |
| 🏛️ **Stanley** | **The System Architect** | Keeps designs simple and straightforward. Refuses complicated, unnecessary code. | For designing database tables and app structure. |
| 🧮 **Oscar** | **The Database Specialist** | Makes database queries fast, avoids slow page loads, and protects your saved data. | When writing database queries and migrations. |
| 🔒 **Toby** | **The Security Guard** | Checks for exposed passwords, leaked API keys, and unsafe inputs. | When checking security and protecting user data. |
| 🕵️ **Creed** | **The Fresh Eyes Reviewer** | Reviews changes with a fresh look to catch weird mistakes that everyone else missed. | Final review before you ship code. |
| 🎨 **Pam & Jan** | **The UI & Design Team** | Makes buttons, colors, mobile screens, and layouts look polished and easy to use. | For frontend screens, CSS, and user interfaces. |
| 🌐 **58+ Specialists** | **Domain Experts** | Mobile apps, backend APIs, Docker, voice AI, documentation, and more. | Run `npm run install-tools -- --list` to see them all. |

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
