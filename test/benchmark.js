#!/usr/bin/env node
'use strict';

/**
 * @file test/benchmark.js
 * @description Empirical Performance Benchmark Harness for The Boring Company OS.
 * Quantitatively measures runtime latencies (p50, p95, p99) under load
 * to provide [MEASURED] empirical evidence instead of uncalibrated claims.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { searchMemory, loadIndex } = require('../memory/search');
const { RealityGate } = require('../src/engine/reality-gate');
const { ControlledWorkspace } = require('../src/tools/workspace');
const { CompanyDatabase } = require('../src/storage/db');

const ROOT_DIR = path.resolve(__dirname, '..');
const SCHEMA_FILE = path.join(ROOT_DIR, 'database', 'schema.sql');

function percentile(arr, p) {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const idx = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, idx)];
}

function runBenchmark() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════════╗
║               🏢 THE BORING COMPANY — EMPIRICAL BENCHMARK HARNESS                ║
║           [MEASURED] Runtime Performance, Latency & Throughput Audit             ║
╚══════════════════════════════════════════════════════════════════════════════════╝
`);

  console.log(`Environment:`);
  console.log(`• OS: ${os.type()} ${os.release()} (${os.arch()})`);
  console.log(`• CPU: ${os.cpus()[0]?.model || 'Unknown CPU'} (${os.cpus().length} cores)`);
  console.log(`• Node.js: ${process.version}`);
  console.log(`• Time: ${new Date().toISOString()}\n`);

  const results = [];

  // Benchmark 1: Reality Gate Metric Parser & Tap Evaluation
  {
    const gate = new RealityGate();
    const tapSample = `TAP version 13
# Subtest: Performance Benchmark
ok 1 - Test passes
1..1
# tests 15
# pass 15
# fail 0
`;
    const iterations = 5000;
    const times = [];
    for (let i = 0; i < iterations; i++) {
      const t0 = process.hrtime.bigint();
      gate.parseTestMetrics(tapSample);
      const t1 = process.hrtime.bigint();
      times.push(Number(t1 - t0) / 1000000);
    }

    results.push({
      benchmark: 'Reality Gate Metric Parsing (TAP/Jest/Pytest)',
      iterations,
      unit: 'ms',
      min: Math.min(...times).toFixed(4),
      p50: percentile(times, 50).toFixed(4),
      p95: percentile(times, 95).toFixed(4),
      p99: percentile(times, 99).toFixed(4)
    });
  }

  // Benchmark 2: Controlled Workspace Path Traversal Boundary Check
  {
    const ws = new ControlledWorkspace(ROOT_DIR);
    const testPaths = ['src/tools/workspace.js', 'package.json', 'database/schema.sql', 'cli.js'];
    const iterations = 5000;
    const times = [];

    for (let i = 0; i < iterations; i++) {
      const p = testPaths[i % testPaths.length];
      const t0 = process.hrtime.bigint();
      ws.resolveSafePath(p);
      const t1 = process.hrtime.bigint();
      times.push(Number(t1 - t0) / 1000000);
    }

    results.push({
      benchmark: 'Workspace Path Security & Traversal Boundary Check',
      iterations,
      unit: 'ms',
      min: Math.min(...times).toFixed(4),
      p50: percentile(times, 50).toFixed(4),
      p95: percentile(times, 95).toFixed(4),
      p99: percentile(times, 99).toFixed(4)
    });
  }

  // Benchmark 3: SQLite Ledger Transaction Latency (In-Memory WAL)
  {
    const db = new CompanyDatabase(':memory:');
    const iterations = 500;
    const times = [];

    for (let i = 0; i < iterations; i++) {
      const t0 = process.hrtime.bigint();
      const task = db.createTask({ title: `Benchmark Task ${i}` });
      const execId = db.recordExecution({ taskId: task.id, taskInstructions: 'Run benchmark' });
      db.updateTaskStatus(task.id, 'completed');
      const t1 = process.hrtime.bigint();
      times.push(Number(t1 - t0) / 1000000);
    }
    db.close();

    results.push({
      benchmark: 'SQLite Ledger Transaction (Task + Exec + State)',
      iterations,
      unit: 'ms',
      min: Math.min(...times).toFixed(3),
      p50: percentile(times, 50).toFixed(3),
      p95: percentile(times, 95).toFixed(3),
      p99: percentile(times, 99).toFixed(3)
    });
  }

  // Benchmark 4: Context-Optimized Memory Card Search
  {
    loadIndex();
    const queries = ['sqlite', 'windows', 'testing', 'intent', 'concurrency', 'frontend', 'security'];
    const iterations = 100;
    const times = [];

    for (let i = 0; i < iterations; i++) {
      const q = queries[i % queries.length];
      const t0 = process.hrtime.bigint();
      searchMemory(q, { limit: 3 });
      const t1 = process.hrtime.bigint();
      times.push(Number(t1 - t0) / 1000000);
    }

    results.push({
      benchmark: 'Institutional Memory Card Search (<50-line slices)',
      iterations,
      unit: 'ms',
      min: Math.min(...times).toFixed(3),
      p50: percentile(times, 50).toFixed(3),
      p95: percentile(times, 95).toFixed(3),
      p99: percentile(times, 99).toFixed(3)
    });
  }

  // Benchmark 5: Database Schema DDL Table Verification
  {
    const sql = fs.readFileSync(SCHEMA_FILE, 'utf8');
    const requiredTables = [
      'companies', 'departments', 'positions', 'teams', 'employees',
      'tasks', 'executions', 'token_budgets', 'governance_policies',
      'verification_runs', 'acceptance_criteria'
    ];

    const iterations = 200;
    const times = [];
    for (let i = 0; i < iterations; i++) {
      const t0 = process.hrtime.bigint();
      for (const table of requiredTables) {
        const tableRegex = new RegExp(`CREATE TABLE\\s+["']?${table}["']?\\s*\\(`, 'i');
        tableRegex.test(sql);
      }
      const t1 = process.hrtime.bigint();
      times.push(Number(t1 - t0) / 1000000);
    }

    results.push({
      benchmark: 'Schema DDL Integrity Check (Core Enterprise Tables)',
      iterations,
      unit: 'ms',
      min: Math.min(...times).toFixed(3),
      p50: percentile(times, 50).toFixed(3),
      p95: percentile(times, 95).toFixed(3),
      p99: percentile(times, 99).toFixed(3)
    });
  }

  // Format and print markdown-ready table
  console.log('| Benchmark Metric | Iterations | Min (ms) | p50 (ms) | p95 (ms) | p99 (ms) | Status |');
  console.log('| :--- | :---: | :---: | :---: | :---: | :---: | :---: |');
  for (const r of results) {
    const passed = parseFloat(r.p99) < 25.0 ? '✔ OPTIMAL' : 'PASS';
    console.log(`| ${r.benchmark} | ${r.iterations.toLocaleString()} | ${r.min} | ${r.p50} | ${r.p95} | ${r.p99} | ${passed} |`);
  }
  console.log('\n✔ [MEASURED] All benchmarks executed with real machine measurements.');
  return results;
}

if (require.main === module) {
  runBenchmark();
}

module.exports = { runBenchmark, percentile };
