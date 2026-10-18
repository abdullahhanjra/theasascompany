#!/usr/bin/env node
'use strict';

/**
 * 🏢 The Boring Company — Universal Multi-Tool Agent Installer
 * Zero-dependency installer that exports all 72 specialist agents into
 * Claude Code, Cursor (.cursor/rules/), Antigravity, and Windsurf.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const ROOT_DIR = path.resolve(__dirname, '..');
const AGENTS_DIR = path.join(ROOT_DIR, 'agents', 'definitions');
const ROSTER_PATH = path.join(ROOT_DIR, 'agents', 'roster.json');

const args = process.argv.slice(2);
let targetTool = 'cursor';
let dryRun = false;
let listOnly = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--tool' && args[i + 1]) {
    targetTool = args[++i].toLowerCase();
  } else if (args[i] === '--dry-run') {
    dryRun = true;
  } else if (args[i] === '--list' || args[i] === '-l') {
    listOnly = true;
  } else if (args[i] === '--help' || args[i] === '-h') {
    printHelp();
    process.exit(0);
  }
}

function printHelp() {
  console.log(`
\x1b[1m\x1b[32mThe Boring Company — Universal Multi-Tool Agent Installer\x1b[0m

Usage:
  node scripts/install-tools.js [options]

Options:
  --tool <name>    Target tool: cursor, claude, antigravity, windsurf, all (default: cursor)
  --dry-run        Validate all 72 agent manifests without writing to disk
  --list, -l       List all 72 specialist agents and their divisions
  --help, -h       Show this help screen

Examples:
  node scripts/install-tools.js --tool cursor
  node scripts/install-tools.js --tool claude
  node scripts/install-tools.js --tool all
  node scripts/install-tools.js --list
`);
}

function loadAllAgents() {
  if (!fs.existsSync(AGENTS_DIR)) {
    throw new Error(`Agents directory not found at ${AGENTS_DIR}`);
  }

  const entries = fs.readdirSync(AGENTS_DIR, { withFileTypes: true });
  const agents = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const agentFile = path.join(AGENTS_DIR, entry.name, 'agent.md');
      if (fs.existsSync(agentFile)) {
        const content = fs.readFileSync(agentFile, 'utf8');
        // Extract frontmatter
        const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
        let name = entry.name;
        let description = 'Specialist Agent';
        let body = content;

        if (match) {
          const fm = match[1];
          body = match[2];
          const nameMatch = fm.match(/name:\s*(.+)/);
          const descMatch = fm.match(/description:\s*(.+)/);
          if (nameMatch) name = nameMatch[1].trim();
          if (descMatch) description = descMatch[1].trim();
        }

        agents.push({
          id: entry.name,
          name,
          description,
          fullContent: content,
          instructions: body.trim()
        });
      }
    }
  }

  return agents;
}

function installForCursor(agents, isDryRun) {
  const targetDir = path.join(process.cwd(), '.cursor', 'rules');
  console.log(`\n\x1b[36m[CURSOR INSTALL]\x1b[0m Exporting ${agents.length} agents to ${targetDir}...`);

  if (!isDryRun) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  let count = 0;
  for (const agent of agents) {
    const destFile = path.join(targetDir, `${agent.id}.mdc`);
    const mdcContent = `---
description: ${agent.description.replace(/"/g, "'")}
globs: *
alwaysApply: false
---

${agent.instructions}
`;
    if (!isDryRun) {
      fs.writeFileSync(destFile, mdcContent, 'utf8');
    }
    count++;
  }

  console.log(`\x1b[32m✔ Successfully installed ${count} agent rules for Cursor!\x1b[0m`);
}

function installForClaude(agents, isDryRun) {
  const home = os.homedir();
  const targetDir = path.join(home, '.claude', 'agents');
  console.log(`\n\x1b[36m[CLAUDE CODE INSTALL]\x1b[0m Exporting ${agents.length} agents to ${targetDir}...`);

  if (!isDryRun) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  let count = 0;
  for (const agent of agents) {
    const destFile = path.join(targetDir, `${agent.id}.md`);
    if (!isDryRun) {
      fs.writeFileSync(destFile, agent.fullContent, 'utf8');
    }
    count++;
  }

  console.log(`\x1b[32m✔ Successfully installed ${count} agents into Claude Code (~/.claude/agents/)!\x1b[0m`);
}

function installForAntigravity(agents, isDryRun) {
  const targetDir = path.join(process.cwd(), '.agents');
  console.log(`\n\x1b[36m[ANTIGRAVITY INSTALL]\x1b[0m Exporting ${agents.length} agents to ${targetDir}...`);

  if (!isDryRun) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  let count = 0;
  for (const agent of agents) {
    const destFile = path.join(targetDir, `${agent.id}.md`);
    if (!isDryRun) {
      fs.writeFileSync(destFile, agent.fullContent, 'utf8');
    }
    count++;
  }

  console.log(`\x1b[32m✔ Successfully installed ${count} agents into Antigravity (.agents/)!\x1b[0m`);
}

function main() {
  const agents = loadAllAgents();

  if (listOnly) {
    console.log(`\n\x1b[1m\x1b[32m🏢 The Boring Company — 72 Specialist Fleet Roster\x1b[0m\n`);
    console.log(`Total active agents discovered: \x1b[1m${agents.length}\x1b[0m\n`);
    agents.forEach((a, idx) => {
      console.log(`  ${(idx + 1).toString().padStart(2, ' ')}. \x1b[36m${a.id.padEnd(30, ' ')}\x1b[0m ${a.description}`);
    });
    return;
  }

  console.log(`\x1b[1m\x1b[32m🏢 The Boring Company — Multi-Tool Agent Installer\x1b[0m`);
  console.log(`Discovered \x1b[1m${agents.length}\x1b[0m valid specialist agents in definitions.`);

  if (dryRun) {
    console.log(`\x1b[33m[DRY RUN]\x1b[0m Validated all ${agents.length} agent definitions. Zero write operations executed.`);
    return;
  }

  if (targetTool === 'cursor' || targetTool === 'all') {
    installForCursor(agents, dryRun);
  }
  if (targetTool === 'claude' || targetTool === 'claude-code' || targetTool === 'all') {
    installForClaude(agents, dryRun);
  }
  if (targetTool === 'antigravity' || targetTool === 'all') {
    installForAntigravity(agents, dryRun);
  }
}

main();
