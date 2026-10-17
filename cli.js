#!/usr/bin/env node
'use strict';

/**
 * 🏢 The Boring Company — Autonomous Multi-Agent Dispatch CLI
 * Real Autonomous Engineering Enterprise OS & Multi-Agent Runtime Framework.
 * Dispatches missions through the 6-Phase Engineering Loop, Controlled Workspace,
 * Model Providers, SQLite Relational Ledger, and the Trustworthy Reality Gate.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { ExecutionPipeline } = require('./src/engine/pipeline');
const { getProvider } = require('./src/providers');
const { DeterministicTestProvider } = require('./src/providers/deterministic-test');

const args = process.argv.slice(2);
let task = null;
let track = 'auto';
let providerName = process.env.BORING_PROVIDER || null;
let modelName = process.env.BORING_MODEL || null;
let targetDir = process.cwd();
let testCmd = null;
let isDemo = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--task' && args[i + 1]) {
    task = args[++i];
  } else if (args[i] === '--track' && args[i + 1]) {
    track = args[++i].toUpperCase();
  } else if (args[i] === '--provider' && args[i + 1]) {
    providerName = args[++i].toLowerCase();
  } else if (args[i] === '--model' && args[i + 1]) {
    modelName = args[++i];
  } else if (args[i] === '--target' || args[i] === '--target-dir') {
    targetDir = path.resolve(args[++i]);
  } else if (args[i] === '--test-cmd') {
    testCmd = args[++i];
  } else if (args[i] === '--demo') {
    isDemo = true;
  } else if (args[i] === '--benchmark' || args[i] === '-b') {
    const { runBenchmark } = require('./test/benchmark');
    runBenchmark();
    process.exit(0);
  } else if (args[i] === '--memory' || args[i] === '-m') {
    const query = args[++i] || 'sqlite';
    const { searchMemory } = require('./memory/search');
    const { count, elapsedMs, results } = searchMemory(query, { limit: 2 });
    console.log(`[MEMORY SEARCH] Query: "${query}" | Found ${count} card(s) in ${elapsedMs}ms`);
    for (const r of results) {
      console.log(`\n--- [${r.id}] ${r.title} ---\n${r.content}\n`);
    }
    process.exit(0);
  } else if (!args[i].startsWith('-')) {
    if ((args[i] === '/boss' || args[i] === 'boss') && args[i + 1] && !args[i + 1].startsWith('-')) {
      task = args[++i];
    } else if (!task) {
      task = args[i];
    }
  } else if (args[i] === '--help' || args[i] === '-h') {
    printHelp();
    process.exit(0);
  }
}

function printHelp() {
  console.log(`
\x1b[1m\x1b[32mThe Boring Company — Autonomous AI Enterprise Dispatch CLI\x1b[0m

Usage:
  node cli.js [options]
  npm run demo
  npm run benchmark
  npm start -- --task "Your engineering mission"

Options:
  --task <string>         Specify the engineering mission to dispatch
  --provider <name>       AI provider: anthropic, openai, gemini, ollama, test (default: auto)
  --model <name>          Specific model name (e.g. claude-3-7-sonnet, gpt-4o, gemini-2.5-pro)
  --target <dir>          Target repository directory (default: current directory)
  --test-cmd <cmd>        Command to run for Reality Gate verification (e.g. "npm test")
  --track <A|B|C>         Velocity track (A: Surgical, B: Sprint, C: Enterprise Core)
  --demo                  Run hermetic end-to-end demonstration mission with real tools
  --benchmark, -b         Run empirical latency benchmark matrix (p50, p95, p99)
  --memory, -m <q>        Search indexed institutional memory cards (<50 lines)
  --help, -h              Show this help screen
`);
}

function printBanner() {
  console.log(`
\x1b[1m\x1b[36m╔══════════════════════════════════════════════════════════════════════════════════╗
║               🏢 THE BORING COMPANY — MULTI-AGENT OPERATING SYSTEM                ║
║           Autonomous Engineering Enterprise • Reality Gate Interlock             ║
╚══════════════════════════════════════════════════════════════════════════════════╝\x1b[0m
`);
}

async function runDemoMission() {
  printBanner();
  console.log(`\x1b[90m[MODE]\x1b[0m Launching Hermetic End-to-End Demonstration Mission`);
  console.log(`\x1b[90m[DISPATCH]\x1b[0m Mission: \x1b[1m"Implement thread-safe connection pool with exponential backoff"\x1b[0m\n`);

  // Create isolated sandbox
  const demoDir = fs.mkdtempSync(path.join(os.tmpdir(), 'boring-demo-'));
  fs.writeFileSync(path.join(demoDir, 'package.json'), JSON.stringify({ name: 'demo-pool', scripts: { test: 'node test.js' } }, null, 2));
  fs.writeFileSync(path.join(demoDir, 'pool.js'), 'module.exports = { acquire: () => null };');
  fs.writeFileSync(
    path.join(demoDir, 'test.js'),
    `
const assert = require('assert');
const pool = require('./pool');
const conn = pool.acquire();
assert.ok(conn !== null, 'Connection must not be null');
assert.strictEqual(conn.active, true, 'Connection must be active');
console.log('# tests 2\\n# pass 2\\n# fail 0\\nok 1 - connection acquired\\nok 2 - active status verified');
`
  );

  const demoProvider = new DeterministicTestProvider({
    responses: [
      {
        content: 'Inspecting existing pool implementation and test specification.',
        toolCalls: [
          { id: 'c1', name: 'readFile', args: { path: 'pool.js' } },
          { id: 'c2', name: 'readFile', args: { path: 'test.js' } }
        ]
      },
      {
        content: 'Applying Karpathy 50-line razor: implementing minimal thread-safe connection pool.',
        toolCalls: [
          {
            id: 'c3',
            name: 'writeFile',
            args: {
              path: 'pool.js',
              content: `'use strict';
class ConnectionPool {
  acquire() {
    return { id: 'conn_1', active: true, acquiredAt: Date.now() };
  }
}
module.exports = new ConnectionPool();`
            }
          }
        ]
      },
      {
        content: 'Implementation complete. Submitting to Reality Gate for automated verification.',
        toolCalls: []
      }
    ]
  });

  const pipeline = new ExecutionPipeline({
    workspaceRoot: demoDir,
    provider: demoProvider,
    testCommand: 'node test.js',
    verbose: true
  });

  const result = await pipeline.runTask({
    title: 'Implement thread-safe connection pool with exponential backoff',
    description: 'Ensure acquire() returns a valid active connection object and satisfies test.js'
  });

  // Clean up sandbox
  try {
    fs.rmSync(demoDir, { recursive: true, force: true });
  } catch {}

  process.exit(result.status === 'VERIFIED' ? 0 : 1);
}

async function runLiveMission(missionTask) {
  printBanner();
  console.log(`\x1b[90m[DISPATCH]\x1b[0m Mission received from Founder: \x1b[1m"${missionTask}"\x1b[0m\n`);

  // Determine provider
  let provider;
  try {
    provider = getProvider({ provider: providerName, model: modelName });
  } catch (err) {
    console.error(`\x1b[31m[PROVIDER ERROR]\x1b[0m ${err.message}`);
    process.exit(1);
  }

  if (provider.name === 'unconfigured') {
    console.log(`\x1b[33m[SETUP REQUIRED]\x1b[0m No AI API key detected in your environment.`);
    console.log(`To run live AI tasks, simply set your API key:\n`);
    console.log(`  \x1b[36m$env:ANTHROPIC_API_KEY="sk-ant-..."\x1b[0m   (for Claude 3.7)`);
    console.log(`  \x1b[36m$env:OPENAI_API_KEY="sk-..."\x1b[0m           (for GPT-4o)`);
    console.log(`  \x1b[36m$env:GEMINI_API_KEY="AIza..."\x1b[0m          (for Google Gemini)`);
    console.log(`  \x1b[36m--provider ollama\x1b[0m                      (for free local models)`);
    console.log(`\n👉 Or try the instant offline demo right now: \x1b[1m\x1b[32mnode cli.js --demo\x1b[0m\n`);
    process.exit(1);
  }

  console.log(`\x1b[90m[RUNTIME]\x1b[0m Provider: \x1b[32m${provider.name}\x1b[0m | Model: \x1b[32m${provider.model}\x1b[0m`);
  console.log(`\x1b[90m[TARGET]\x1b[0m Workspace: \x1b[33m${targetDir}\x1b[0m\n`);

  // Detect verification test command if not provided
  let effectiveTestCmd = testCmd;
  if (!effectiveTestCmd) {
    const pkgPath = path.join(targetDir, 'package.json');
    if (fs.existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        if (pkg.scripts && pkg.scripts.test) {
          effectiveTestCmd = 'npm test';
        }
      } catch {}
    }
  }

  if (!effectiveTestCmd) {
    effectiveTestCmd = 'node --test test/*.test.js';
  }

  const pipeline = new ExecutionPipeline({
    workspaceRoot: targetDir,
    provider,
    testCommand: effectiveTestCmd,
    verbose: true
  });

  const result = await pipeline.runTask({
    title: missionTask,
    description: missionTask,
    priority: track === 'A' ? 'HIGH' : (track === 'C' ? 'CRITICAL' : 'NORMAL')
  });

  process.exit(result.status === 'VERIFIED' ? 0 : 1);
}

// Main entry
if (isDemo || (!task && !args.includes('--benchmark') && !args.includes('--memory') && !args.includes('--help'))) {
  runDemoMission();
} else if (task) {
  runLiveMission(task);
}
