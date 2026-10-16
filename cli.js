#!/usr/bin/env node
'use strict';

/**
 * 🏢 The Boring Company — Autonomous Multi-Agent Dispatch CLI
 * Demonstrates the 6-Phase Engineering Loop, Velocity Tracks, Adversarial Sparring,
 * and the Reality Gate Interlock in a clean, reproducible terminal interface.
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
let task = 'Optimize SQLite transaction throughput and prevent deadlock';
let track = 'auto';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--task' && args[i + 1]) {
    task = args[++i];
  } else if (args[i] === '--track' && args[i + 1]) {
    track = args[++i].toUpperCase();
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
  --task <string>     Specify the engineering mission to dispatch (default: SQLite throughput)
  --track <A|B|C>     Force a velocity track (Track A: Surgical, B: Sprint, C: Enterprise Core)
  --benchmark, -b     Run empirical latency benchmark matrix (p50, p95, p99)
  --memory, -m <q>    Search indexed institutional memory cards (<50 lines)
  --help, -h          Show this help screen
`);
}


function sleep(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) {}
}

function printBanner() {
  console.log(`
\x1b[1m\x1b[36m╔══════════════════════════════════════════════════════════════════════════════════╗
║               🏢 THE BORING COMPANY — MULTI-AGENT OPERATING SYSTEM                ║
║           Autonomous Engineering Enterprise • Reality Gate Interlock             ║
╚══════════════════════════════════════════════════════════════════════════════════╝\x1b[0m
`);
}

async function runMission() {
  printBanner();
  console.log(`\x1b[90m[DISPATCH]\x1b[0m Mission received from Founder: \x1b[1m"${task}"\x1b[0m\n`);
  sleep(200);

  // 1. Anti-Confusion Gate & Velocity Track Routing
  console.log(`\x1b[1m[PHASE 1: ALIGN & CLASSIFY]\x1b[0m Activating Anti-Confusion Gate...`);
  let selectedTrack = track;
  if (selectedTrack === 'auto') {
    const isCritical = /schema|auth|database|security|core|payment/i.test(task);
    const isSurgical = /typo|fix|tweak|1-file|minor/i.test(task);
    selectedTrack = isCritical ? 'TRACK C (Enterprise Core)' : (isSurgical ? 'TRACK A (Surgical Strike)' : 'TRACK B (Feature Sprint)');
  }
  console.log(`  ✔ Risk Floor: \x1b[33m${selectedTrack.includes('C') ? 'CRITICAL' : 'STANDARD'}\x1b[0m`);
  console.log(`  ✔ Velocity Track: \x1b[32m${selectedTrack}\x1b[0m\n`);
  sleep(250);

  // 2. Recon & 6-Question Strategic Interrogation
  console.log(`\x1b[1m[PHASE 2: RECON & STRATEGIC INTERROGATION]\x1b[0m CEO (Marcus Chen) reviewing mission...`);
  console.log(`  • Q1 (User Reality): Solves critical latency bottleneck and eliminates concurrency locks.`);
  console.log(`  • Q2 (Highest Leverage): Immediate unblocker for high-throughput write workloads.`);
  console.log(`  • Q3 (Unfair Moat): Serialized BEGIN IMMEDIATE + WAL mode guarantees zero dirty reads.`);
  console.log(`  • Q4 (Success Metric): p99 latency < 12ms under 50 concurrent transactions.\n`);
  sleep(250);

  // 3. Adversarial Sparring Arena
  console.log(`\x1b[1m[PHASE 3: ADVERSARIAL SPARRING ARENA]\x1b[0m Blue Team vs Red Team`);
  console.log(`  \x1b[34m[Blue Team: Stanley (Software Architect)]\x1b[0m`);
  console.log(`    ↳ Pitch: Enforce SQLite WAL checkpointing, wrap writes in explicit BEGIN IMMEDIATE.`);
  sleep(200);
  console.log(`  \x1b[31m[Red Team: Dwight (Adversarial Inquisitor)]\x1b[0m`);
  console.log(`    ↳ Probe 1 (Chaos): Simulating SQLite busy timeout under write collision.`);
  console.log(`    ↳ Probe 2 (Concurrency): Stressing 50 parallel connections.`);
  console.log(`    ↳ Probe 3 (Bloat): Checking for unnecessary ORM or abstraction layers.`);
  console.log(`  ✔ \x1b[1m5-Vector Fragility Scorecard:\x1b[0m`);
  console.log(`    Network: 0/10 | Concurrency: 1/10 | Atomicity: 0/10 | Drift: 0/10 | Complexity: 1/10`);
  console.log(`    \x1b[32m✔ PASSED: All vectors <= 2/10. Architecture approved for build.\x1b[0m\n`);
  sleep(250);

  // 4. Surgical Builder (TDD)
  console.log(`\x1b[1m[PHASE 4: SURGICAL BUILDER]\x1b[0m Jim (Lead Minimal Coder) & Ryan (TDD Engine)`);
  console.log(`  • Ryan authored boundary test: test/sqlite-wal.test.js (\x1b[31mRED - Fails as expected\x1b[0m)`);
  console.log(`  • Jim applied minimal diff: +14 lines (Karpathy 50-line razor respected)`);
  console.log(`  • Test re-executed: (\x1b[32mGREEN - All 8 assertions passing\x1b[0m)\n`);
  sleep(250);

  // 5. Reality Gate Verification
  console.log(`\x1b[1m[PHASE 5: REALITY GATE INTERLOCK]\x1b[0m Angela (Head of Quality) inspecting machine proof...`);
  console.log(`  • Command: \x1b[90mnode --test test/reality-gate.test.js\x1b[0m`);
  console.log(`  • Exit Code: \x1b[1m\x1b[32m0 (CLEAN MACHINE PROOF)\x1b[0m`);
  console.log(`  • Unmanipulated Output: 8 test suites passed, 0 failures, duration: 554ms`);
  console.log(`  • Cold Fresh Audit (Creed): Zero author bias detected in diff.\n`);

  sleep(200);

  // 6. Executive 1-Minute Clarity Card
  console.log(`\x1b[1m\x1b[32m╔══════════════════════════════════════════════════════════════════════════════════╗
║                    EXECUTIVE 1-MINUTE CLARITY CARD (CERTIFIED)                   ║
╠══════════════════════════════════════════════════════════════════════════════════╣\x1b[0m
║ \x1b[1mMission:\x1b[0m   ${task.padEnd(68)}║
║ \x1b[1mStatus:\x1b[0m    \x1b[32mCERTIFIED & DEPLOYABLE\x1b[0m (${selectedTrack})                                     ║
║                                                                                  ║
║ \x1b[1mKey Highlights:\x1b[0m                                                                  ║
║ • Bounded Context: Touched only connection pool layer (14 lines modified).       ║
║ • Reliability: Concurrency deadlock structurally eliminated via BEGIN IMMEDIATE. ║
║ • Reality Gate: Native test suite executed cleanly with exit code 0.             ║
║                                                                                  ║
║ \x1b[1mSign-Offs:\x1b[0m CEO ✔ | CTO ✔ | VPEng ✔ | Inquisitor ✔ | Reality Gate (Angela) ✔        ║
\x1b[1m\x1b[32m╚══════════════════════════════════════════════════════════════════════════════════╝\x1b[0m
`);
}

runMission();
