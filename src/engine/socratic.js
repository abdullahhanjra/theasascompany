'use strict';

/**
 * @file src/engine/socratic.js
 * @description Interactive Socratic Terminal Frontier (Matt Pocock Grill Engine)
 * for The Boring Company Autonomous Engineering Enterprise OS.
 *
 * Runs interactive terminal interviews via pure Node.js readline,
 * settling design ambiguities into Architecture Decision Records (ADRs)
 * and GLOSSARY.md with zero LLM API token consumption.
 *
 * Pure Node.js — Zero runtime external dependencies.
 */

const readline = require('node:readline');
const fs = require('node:fs');
const path = require('node:path');

class SocraticEngine {
  constructor(projectRoot = process.cwd()) {
    this.projectRoot = projectRoot;
    this.docsDir = path.join(this.projectRoot, 'docs');
    this.adrDir = path.join(this.docsDir, 'adr');
    this.glossaryFile = path.join(this.docsDir, 'GLOSSARY.md');
  }

  ensureDocsDirs() {
    if (!fs.existsSync(this.adrDir)) {
      fs.mkdirSync(this.adrDir, { recursive: true });
    }
  }

  /**
   * Run Socratic interview for a task interactively
   * @param {string} task
   * @param {Function} [inputProvider] Optional mock for automated test runners
   */
  async interview(task, inputProvider = null) {
    this.ensureDocsDirs();

    const questions = [
      {
        id: 'scope',
        title: 'Scope & Blast Radius',
        text: 'What is the maximum allowed blast radius for this change?',
        options: [
          '1. Surgical: 1 file, under 50 lines (Recommended)',
          '2. Medium: 2-3 files with isolated interface seams',
          '3. Greenfield: Multi-session architectural feature'
        ],
        defaultAnswer: '1'
      },
      {
        id: 'persistence',
        title: 'State & Persistence Strategy',
        text: 'Where should transactional state and deduplication settle?',
        options: [
          '1. SQLite ACID ledger in company.db (Recommended)',
          '2. In-memory idempotent map with TTL',
          '3. Client-side local storage with debounce'
        ],
        defaultAnswer: '1'
      },
      {
        id: 'verification',
        title: 'Reality Gate Target',
        text: 'Which verification mechanism will certify this work before release?',
        options: [
          '1. Native Node.js test runner (node --test) exit code 0 (Recommended)',
          '2. End-to-end hostile edge-case penetration script',
          '3. Both unit test suite + hostile acceptance run'
        ],
        defaultAnswer: '3'
      }
    ];

    const answers = {};

    if (inputProvider) {
      for (const q of questions) {
        answers[q.id] = await inputProvider(q);
      }
    } else {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

      console.log('\n\x1b[1m\x1b[36m🏛️  THE BORING COMPANY — SOCRATIC INTERVIEW (Marcus CPO)\x1b[0m');
      console.log(`\x1b[90mSharpening requirements for:\x1b[0m "${task}"\n`);

      for (const q of questions) {
        console.log(`\x1b[1m\x1b[33m? [${q.title}]\x1b[0m`);
        console.log(`  ${q.text}`);
        q.options.forEach(opt => console.log(`    \x1b[90m${opt}\x1b[0m`));
        const resp = await askQuestion(`  Choice [${q.defaultAnswer}]: `);
        answers[q.id] = resp.trim() || q.defaultAnswer;
        console.log('');
      }

      rl.close();
    }

    // Record settled decisions into ADR
    const adrFile = this.recordDecision(task, answers);
    this.updateGlossary(task);

    return {
      task,
      answers,
      adrFile,
      glossaryFile: this.glossaryFile
    };
  }

  recordDecision(task, answers) {
    this.ensureDocsDirs();
    const timestamp = new Date().toISOString().slice(0, 10);
    const slug = task.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30);
    const adrFilename = `${timestamp}-${slug}.md`;
    const adrPath = path.join(this.adrDir, adrFilename);

    const content = `# ADR: ${task}

- **Date**: ${timestamp}
- **Status**: Approved
- **Conductor**: Marcus Chen (CPO) & The Boring Company Executive Suite

## Context
A mission was submitted to The Boring Company engineering fleet: "${task}".
To eliminate future regressions, the frontier was resolved via the Socratic Interview.

## Decisions Settled
- **Scope Limit**: Choice ${answers.scope || '1'} (Strict 50-line rule enforced).
- **Persistence Boundary**: Choice ${answers.persistence || '1'} (SQLite ACID ledger).
- **Reality Gate Requirement**: Choice ${answers.verification || '3'} (Native test exit code 0).

## Consequences
- No rogue 400-line diffs permitted.
- Downstream tickets inherit these settled architectural invariants.
`;

    fs.writeFileSync(adrPath, content, 'utf8');
    return adrPath;
  }

  updateGlossary(task) {
    this.ensureDocsDirs();
    if (!fs.existsSync(this.glossaryFile)) {
      const header = `# Canonical Domain Glossary (The Boring Company)

This glossary defines invariant domain terminology to prevent overloaded semantic drift across all 72 agents.

| Term | Canonical Definition | Bounded Context |
| :--- | :--- | :--- |
| **Reality Gate** | Objective machine verification requirement (native test exit code 0). | Quality & Delivery |
| **50-Line Rule** | Constitutional invariant capping atomic diffs at 50 changed lines. | Core Engineering |
| **Tracer-Bullet** | Self-contained, end-to-end slice declaring explicit blocker IDs. | Task Orchestration |
| **Red Team Inquest** | Adversarial stress-test for race conditions before code is written. | Security & Resilience |
`;
      fs.writeFileSync(this.glossaryFile, header, 'utf8');
    }
  }
}

module.exports = {
  SocraticEngine
};
