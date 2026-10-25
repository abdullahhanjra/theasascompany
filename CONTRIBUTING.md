# Contributing to The Asas Company OS

Thank you for your interest in contributing to **The Asas Company OS**. We welcome contributions from engineers, researchers, and builders who share our philosophy:

> **"Build and operate software as a production engineering system, not a code generation tool."**

---

## 🏛️ Core Principles for Contributors

Before submitting any code, familiarize yourself with our core tenets:
1. **Evidence Before Confidence**: Machine reality overrules narrative claims. Every pull request must be backed by reproducible test runs with clean exit codes (`$? === 0`).
2. **Minimal Sufficient Scope**: Modify only the lines and modules directly required for the task. No speculative abstractions or unrequested refactoring.
3. **The Reality Gate**: No change merges without automated test verification.

---

## 🛠️ Development Setup

The Asas Company OS is intentionally lightweight and has **zero external production dependencies**. It runs natively on Node.js 18+.

```bash
# 1. Fork the repo and clone your fork
git clone https://github.com/<your-username>/theasascompany.git
cd theasascompany

# 2. Verify your environment with the Reality Gate test suite
npm test

# 3. Run the interactive dispatch CLI demo
npm run demo
```

---

## 🤖 Adding a New Specialist Agent

All agents are defined in `agents/definitions/` as self-contained markdown manifests with YAML frontmatter.

### Step 1: Create the Agent Directory
Create a new directory under `agents/definitions/company_<role_name>/`.

```
agents/definitions/company_cache_specialist/
└── agent.md
```

### Step 2: Write the `agent.md` Manifest
Every agent definition **must** include the following frontmatter and sections:

```markdown
---
name: company_cache_specialist
description: Specialist in distributed caching, cache invalidation strategies, and Redis memory management.
token_budget: 32000
---

# Cache Specialist Agent

## Role & Responsibilities
- Design cache keys and TTL strategies.
- Structurally eliminate cache stampede and dogpiling.
- Enforce bounded memory eviction policies.

## Invariants
- Never cache sensitive authentication credentials in plain text.
- Always implement cache-aside with fallback to source-of-truth.

## Tools
- `read_file`
- `write_file`
- `run_command`
```

### Step 3: Register in `agents/roster.json`
Add an entry to the `agents` array in `agents/roster.json`:

```json
{
  "id": "cache_specialist",
  "name": "Cache Specialist",
  "role": "Cache Reliability & Invalidation Engineer",
  "department": "Engineering",
  "description": "Specialist in distributed caching, cache invalidation, and bounded memory policies."
}
```

### Step 4: Verify Agent with Reality Gate
Run the test suite to ensure the new agent satisfies format, roster consistency, and path-sanitization gates:

```bash
npm test
```

---

## 🧪 Testing Guidelines

- We use Node.js's native test runner (`node --test`).
- Tests are located in `test/`.
- All tests must pass cleanly (`$? === 0`).
- Do not add heavy third-party testing frameworks without prior discussion.

---

## 📜 Commit Message Conventions

We enforce [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` A new feature or agent capability
- `fix:` A bug fix or gate correction
- `docs:` Documentation improvements
- `refactor:` Code refactoring with zero functional change
- `test:` Adding or updating Reality Gate tests
- `chore:` Maintenance tasks, dependency bumps, or toolchain updates

**Example:**
```bash
git commit -m "feat(agent): add distributed cache specialist agent definition"
```

---

## 🚀 Pull Request Checklist

Before submitting a PR, verify:
- [ ] `npm test` exits with code `0`.
- [ ] No hardcoded local paths or OS-specific absolute paths exist in your files.
- [ ] `roster.json` and agent manifests match without duplicate IDs.
- [ ] Commit history is clean with descriptive commit messages.
- [ ] Documentation has been updated if behavior changed.

Thank you for helping build reliable, autonomous agent systems!
