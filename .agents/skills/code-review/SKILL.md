---
name: code-review
description: "Review the changes since a fixed point (commit, branch, tag, or merge-base) along two axes: Standards (does the code follow this repo's documented coding standards?) and Spec (does the code match what the originating issue/spec asked for?). Runs both reviews in parallel sub-agents and reports them side by side. Use when the user wants to review a branch, a PR, work-in-progress changes, or asks to \"review since X\"."
---

Two-axis review of the diff between `HEAD` and a fixed point the user supplies:

- **Standards**: does the code conform to this repo's documented coding standards?
- **Spec**: does the code faithfully implement the originating issue / spec?

Both axes run as **parallel sub-agents** so they don't pollute each other's context, then this skill aggregates their findings.

## Process

### 1. Pin the fixed point

Whatever the user said is the fixed point (a commit SHA, branch name, tag, `main`, `HEAD~5`, etc.). If they didn't specify one, ask for it. Capture the diff command once: `git diff <fixed-point>...HEAD`.

### 2. Identify the spec source

Look for the originating spec in issue references, CLI arguments, or specs in `docs/`.

### 3. Identify the standards sources

Search the repo for documented standards (`CODING_STANDARDS.md`, `CONTRIBUTING.md`). Check against Fowler smell baselines (Mysterious Name, Duplicated Code, Feature Envy, Primitive Obsession, Speculative Generality, etc.).

### 4. Spawn both sub-agents in parallel

Spawn parallel reviews for Standards and Spec axes.

### 5. Aggregate

Present the findings under `## Standards` and `## Spec` headings.

## Why two axes

- Code that follows every standard but implements the wrong thing → **Standards pass, Spec fail.**
- Code that does exactly what the issue asked but breaks the project's conventions → **Spec pass, Standards fail.**
