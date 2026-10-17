#!/usr/bin/env node
'use strict';

/**
 * @file scripts/hostile_acceptance_test.js
 * @description Phase 3 Hostile End-to-End Acceptance Test Harness.
 * Executes the 10-step senior staff engineer acceptance test protocol in a clean,
 * disposable temporary repository outside the codebase.
 * Never relies on narrative claims; measures raw exit codes, file diffs, and database state.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync, spawnSync } = require('child_process');
const assert = require('assert');
const { RealityGate } = require('../src/engine/reality-gate');
const { ControlledWorkspace } = require('../src/tools/workspace');
const { CompanyDatabase } = require('../src/storage/db');
const { ExecutionPipeline } = require('../src/engine/pipeline');
const { DeterministicTestProvider } = require('../src/providers/deterministic-test');

const ROOT_DIR = path.resolve(__dirname, '..');
const CLI_PATH = path.join(ROOT_DIR, 'cli.js');

async function runHostileAcceptanceSuite() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════════╗
║        🏢 THE BORING COMPANY — PHASE 3 HOSTILE ACCEPTANCE TEST HARNESS           ║
║       Hostile 10-Step Verification Protocol • Zero Assumptions • Machine Reality   ║
╚══════════════════════════════════════════════════════════════════════════════════╝
`);

  const report = {
    timestamp: new Date().toISOString(),
    environment: {
      os: `${os.type()} ${os.release()} (${os.arch()})`,
      node: process.version,
      cpu: os.cpus()[0]?.model || 'Unknown CPU'
    },
    steps: []
  };

  const disposableDir = fs.mkdtempSync(path.join(os.tmpdir(), 'boring-hostile-repo-'));
  const dbPath = path.join(disposableDir, 'audit.db');
  const db = new CompanyDatabase(dbPath);

  console.log(`[WORKSPACE] Created clean disposable repository at: \x1b[33m${disposableDir}\x1b[0m\n`);

  try {
    // =========================================================================
    // STEP 1: Create a Disposable Test Repository with Known Failing Bug
    // =========================================================================
    console.log(`\x1b[1m[STEP 1: DISPOSABLE REPO INITIALIZATION]\x1b[0m`);
    execSync('git init', { cwd: disposableDir, stdio: 'ignore' });
    execSync('git config user.email "test@boringcompany.test"', { cwd: disposableDir, stdio: 'ignore' });
    execSync('git config user.name "Hostile Tester"', { cwd: disposableDir, stdio: 'ignore' });

    fs.writeFileSync(
      path.join(disposableDir, 'package.json'),
      JSON.stringify(
        {
          name: 'disposable-pricing-service',
          version: '1.0.0',
          scripts: { test: 'node test.js' }
        },
        null,
        2
      )
    );

    // Buggy implementation: Math.floor truncates decimals
    fs.writeFileSync(
      path.join(disposableDir, 'pricing.js'),
      `'use strict';
function calculateTotal(items, discountCode) {
  let total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (discountCode === 'SAVE20') {
    total = total * 0.8;
  }
  // BUG: Math.floor truncates floating point values instead of keeping 2 decimal places
  return Math.floor(total);
}
module.exports = { calculateTotal };
`
    );

    // Test with strict acceptance criteria
    fs.writeFileSync(
      path.join(disposableDir, 'test.js'),
      `const assert = require('assert');
const { calculateTotal } = require('./pricing');

const res1 = calculateTotal([{ price: 10.50, quantity: 2 }], 'SAVE20');
assert.strictEqual(res1, 16.80, 'Expected 16.80, got ' + res1);

const res2 = calculateTotal([{ price: 15.25, quantity: 2 }], null);
assert.strictEqual(res2, 30.50, 'Expected 30.50, got ' + res2);

console.log('# tests 2\\n# pass 2\\n# fail 0\\nok 1 - SAVE20 discount with precision\\nok 2 - standard total with precision');
`
    );

    execSync('git add .', { cwd: disposableDir });
    execSync('git commit -m "chore: initial buggy implementation"', { cwd: disposableDir });
    console.log(`  ✔ Initialized git repository and committed baseline buggy code.`);
    report.steps.push({ step: 1, name: 'Disposable Repo Initialization', status: 'PASS' });

    // =========================================================================
    // STEP 2: Verify Intended Regression Test Fails Before the Fix
    // =========================================================================
    console.log(`\n\x1b[1m[STEP 2: PRE-FIX REGRESSION TEST FAILURE VERIFICATION]\x1b[0m`);
    const preCheck = spawnSync('node', ['test.js'], { cwd: disposableDir, encoding: 'utf8' });
    console.log(`  • Pre-fix exit code: \x1b[31m${preCheck.status}\x1b[0m (Expected: 1)`);
    console.log(`  • Pre-fix stderr excerpt: ${(preCheck.stderr || '').trim().split('\n')[0]}`);
    if (preCheck.status === 0) {
      throw new Error('Pre-condition violation: Test should have failed on initial buggy code!');
    }
    console.log(`  ✔ [OBSERVED] Test strictly fails before fix.`);
    report.steps.push({
      step: 2,
      name: 'Pre-Fix Regression Test Failure',
      status: 'PASS',
      exitCode: preCheck.status,
      evidence: (preCheck.stderr || '').trim().split('\n')[0]
    });

    // =========================================================================
    // STEP 3 & 4: Submit Task Through Execution Engine & Verify Fix Passes
    // =========================================================================
    console.log(`\n\x1b[1m[STEP 3 & 4: EXECUTION ENGINE FIX & REALITY GATE PASS]\x1b[0m`);
    const fixProvider = new DeterministicTestProvider({
      responses: [
        {
          content: 'Inspecting pricing.js and test.js to diagnose precision error.',
          toolCalls: [
            { id: 'c1', name: 'readFile', args: { path: 'pricing.js' } },
            { id: 'c2', name: 'readFile', args: { path: 'test.js' } }
          ]
        },
        {
          content: 'Applying surgical fix to calculateTotal: rounding to 2 decimal places using Number(total.toFixed(2)).',
          toolCalls: [
            {
              id: 'c3',
              name: 'writeFile',
              args: {
                path: 'pricing.js',
                content: `'use strict';
function calculateTotal(items, discountCode) {
  let total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (discountCode === 'SAVE20') {
    total = total * 0.8;
  }
  return Number(total.toFixed(2));
}
module.exports = { calculateTotal };
`
              }
            }
          ]
        },
        {
          content: 'Fix applied. Ready for Reality Gate verification.',
          toolCalls: []
        }
      ]
    });

    const pipeline = new ExecutionPipeline({
      workspaceRoot: disposableDir,
      db,
      provider: fixProvider,
      testCommand: 'node test.js',
      verbose: false
    });

    const runResult = await pipeline.runTask({
      title: 'Fix precision bug in calculateTotal',
      description: 'Ensure floating point calculations round properly to 2 decimal places'
    });

    console.log(`  • Engine Outcome: \x1b[32m${runResult.status}\x1b[0m`);
    console.log(`  • Tests Passed: \x1b[32m${runResult.testsPassed}\x1b[0m`);
    console.log(`  • Evidence Digest: \x1b[36m${runResult.evidenceDigest}\x1b[0m`);
    if (runResult.status !== 'VERIFIED') {
      throw new Error(`Engine failed to verify task: ${runResult.reason}`);
    }

    // Independent test run outside the engine
    const postCheck = spawnSync('node', ['test.js'], { cwd: disposableDir, encoding: 'utf8' });
    console.log(`  • Independent test check exit code: \x1b[32m${postCheck.status}\x1b[0m (Expected: 0)`);
    if (postCheck.status !== 0) {
      throw new Error(`Independent verification failed post-fix with code ${postCheck.status}`);
    }
    console.log(`  ✔ [MEASURED] Code change verified with machine proof ($? === 0).`);
    report.steps.push({
      step: 3,
      name: 'Autonomous Fix & Reality Gate Verification',
      status: 'PASS',
      exitCode: postCheck.status,
      digest: runResult.evidenceDigest
    });

    // =========================================================================
    // STEP 5: Introduce Deliberately Broken Patch & Verify Rejection
    // =========================================================================
    console.log(`\n\x1b[1m[STEP 5: ADVERSARIAL BROKEN PATCH INJECTION]\x1b[0m`);
    // Inject deliberately broken calculation: total * 0.5
    fs.writeFileSync(
      path.join(disposableDir, 'pricing.js'),
      `'use strict';
function calculateTotal(items, discountCode) {
  return 999.99; // Deliberately broken malicious patch
}
module.exports = { calculateTotal };
`
    );

    const gate = new RealityGate();
    const ws = new ControlledWorkspace(disposableDir);
    const brokenResult = await gate.verify({
      workspace: ws,
      testCommand: 'node test.js'
    });

    console.log(`  • Broken patch Reality Gate passed: \x1b[31m${brokenResult.passed}\x1b[0m (Expected: false)`);
    console.log(`  • Rejection reason: ${brokenResult.reason}`);
    if (brokenResult.passed) {
      throw new Error('Security Failure: Reality Gate failed to reject deliberately broken patch!');
    }
    console.log(`  ✔ [MEASURED] Verification gate strictly rejected broken patch.`);
    report.steps.push({
      step: 5,
      name: 'Broken Patch Rejection',
      status: 'PASS',
      rejectedReason: brokenResult.reason
    });

    // Revert back to working code
    fs.writeFileSync(
      path.join(disposableDir, 'pricing.js'),
      `'use strict';
function calculateTotal(items, discountCode) {
  let total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (discountCode === 'SAVE20') {
    total = total * 0.8;
  }
  return Number(total.toFixed(2));
}
module.exports = { calculateTotal };
`
    );

    // =========================================================================
    // STEP 6: Submit Fabricated Success Evidence & Verify Rejection
    // =========================================================================
    console.log(`\n\x1b[1m[STEP 6: FABRICATED EVIDENCE ADVERSARIAL SUBMISSION]\x1b[0m`);
    // Tamper with test file during run
    const tamperCmd = 'node -e "const fs = require(\'fs\'); fs.writeFileSync(\'test.js\', \'// empty\'); console.log(\'# tests 1\\n# pass 1\'); process.exit(0);"';
    const fakeResult = await gate.verify({
      workspace: ws,
      testCommand: tamperCmd
    });

    console.log(`  • Tampered execution passed: \x1b[31m${fakeResult.passed}\x1b[0m (Expected: false)`);
    console.log(`  • Rejection classification: ${fakeResult.reason}`);
    if (fakeResult.passed || !fakeResult.tamperDetected) {
      throw new Error('Security Failure: Reality Gate failed to detect test tampering!');
    }
    console.log(`  ✔ [MEASURED] Anti-tamper interlock rejected fabricated evidence.`);
    report.steps.push({
      step: 6,
      name: 'Fabricated Evidence Rejection',
      status: 'PASS',
      tamperDetected: fakeResult.tamperDetected
    });

    // Restore test.js
    execSync('git checkout test.js', { cwd: disposableDir });

    // =========================================================================
    // STEP 7: Interrupt Running Task & Verify Recovery Does Not Duplicate
    // =========================================================================
    console.log(`\n\x1b[1m[STEP 7: PROCESS INTERRUPTION & RECOVERY VERIFICATION]\x1b[0m`);
    const interruptedTask = db.createTask({ title: 'Task to be interrupted' });
    db.updateTaskStatus(interruptedTask.id, 'in_progress');
    const interruptedExecId = db.recordExecution({
      taskId: interruptedTask.id,
      idempotencyKey: 'hostile_idemp_key_77',
      status: 'RUNNING'
    });

    // Reconcile as if node process crashed
    const reconciled = db.reconcileOrphanedExecutions();
    assert.equal(reconciled.length, 1);
    assert.equal(reconciled[0].id, interruptedExecId);

    const taskAfterCrash = db.getTask(interruptedTask.id);
    assert.equal(taskAfterCrash.status, 'blocked');
    console.log(`  ✔ [OBSERVED] Interrupted task safely blocked on restart.`);

    // Resubmit with completed key to verify idempotent replay
    const completedTask = db.createTask({ title: 'Completed Task' });
    const completedExecId = db.recordExecution({
      taskId: completedTask.id,
      idempotencyKey: 'hostile_idemp_key_done',
      status: 'COMPLETED'
    });
    db.updateExecution(completedExecId, { status: 'COMPLETED' });

    const replayRes = await pipeline.runTask({
      title: 'Replay request',
      idempotencyKey: 'hostile_idemp_key_done'
    });
    assert.equal(replayRes.isReplay, true);
    assert.equal(replayRes.executionId, completedExecId);
    console.log(`  ✔ [MEASURED] Idempotent replay prevents duplicate execution.`);
    report.steps.push({ step: 7, name: 'Process Interruption & Recovery', status: 'PASS' });

    // =========================================================================
    // STEP 8: Inspect Final Git Diff
    // =========================================================================
    console.log(`\n\x1b[1m[STEP 8: FINAL GIT DIFF INSPECTION]\x1b[0m`);
    const diff = execSync('git diff pricing.js', { cwd: disposableDir, encoding: 'utf8' });
    console.log(`--- Git Diff in Disposable Repo ---\n${diff}-----------------------------------`);
    assert.ok(diff.includes('toFixed(2)'));
    assert.ok(diff.includes('-  return Math.floor(total);'));
    assert.ok(diff.includes('+  return Number(total.toFixed(2));'));
    console.log(`  ✔ [OBSERVED] Clean minimal diff (Karpathy razor respected: 2 lines modified).`);
    report.steps.push({ step: 8, name: 'Git Diff Inspection', status: 'PASS', linesChanged: 2 });

    // =========================================================================
    // STEP 9: Audit SQLite Ledger State & Evidence Capture
    // =========================================================================
    console.log(`\n\x1b[1m[STEP 9: SQLITE RELATIONAL LEDGER AUDIT]\x1b[0m`);
    const taskRecord = db.getTask(runResult.taskId);
    const verifRecord = db.db.prepare('SELECT * FROM verification_runs WHERE task_id = ?;').get(runResult.taskId);
    const evidenceList = db.getEvidenceForRun(verifRecord.id);

    console.log(`  • Task ID: ${taskRecord.id} | Status: ${taskRecord.status}`);
    console.log(`  • Verification Run: ${verifRecord.id} | Status: ${verifRecord.status}`);
    console.log(`  • Evidence Records: ${evidenceList.length} record(s) captured`);
    console.log(`  • Evidence SHA-256 Digest: ${evidenceList[0].sha256_digest}`);

    assert.equal(taskRecord.status, 'completed');
    assert.equal(verifRecord.status, 'PASSED');
    assert.ok(evidenceList.length > 0);
    console.log(`  ✔ [MEASURED] Ledger persistence verified with cryptographic records.`);
    report.steps.push({
      step: 9,
      name: 'Ledger State Audit',
      status: 'PASS',
      recordsCaptured: evidenceList.length
    });

    // =========================================================================
    // STEP 10: Multi-Iteration Stability Loop (5 Sequential Runs)
    // =========================================================================
    console.log(`\n\x1b[1m[STEP 10: MULTI-ITERATION STABILITY LOOP (5 RUNS)]\x1b[0m`);
    const iterations = 5;
    const iterationTimes = [];

    for (let i = 1; i <= iterations; i++) {
      const iterDir = fs.mkdtempSync(path.join(os.tmpdir(), `boring-iter-${i}-`));
      try {
        fs.writeFileSync(path.join(iterDir, 'package.json'), JSON.stringify({ scripts: { test: 'node test.js' } }));
        fs.writeFileSync(path.join(iterDir, 'app.js'), 'module.exports = () => 0;');
        fs.writeFileSync(path.join(iterDir, 'test.js'), 'const f = require("./app"); if (f() === 1) { console.log("# tests 1\\n# pass 1"); process.exit(0); } process.exit(1);');

        const iterProvider = new DeterministicTestProvider({
          responses: [
            {
              content: 'Fixing app.js',
              toolCalls: [{ id: `tc_${i}`, name: 'writeFile', args: { path: 'app.js', content: 'module.exports = () => 1;' } }]
            }
          ]
        });

        const iterPipeline = new ExecutionPipeline({
          workspaceRoot: iterDir,
          db,
          provider: iterProvider,
          testCommand: 'node test.js',
          verbose: false
        });

        const t0 = Date.now();
        const iterRes = await iterPipeline.runTask({ title: `Iteration ${i}` });
        const elapsed = Date.now() - t0;
        iterationTimes.push(elapsed);

        assert.equal(iterRes.status, 'VERIFIED');
        console.log(`  • Iteration ${i}/${iterations}: \x1b[32mVERIFIED\x1b[0m (${elapsed}ms)`);
      } finally {
        fs.rmSync(iterDir, { recursive: true, force: true });
      }
    }

    const avgTime = iterationTimes.reduce((a, b) => a + b, 0) / iterationTimes.length;
    console.log(`  ✔ [MEASURED] Stability loop: 5/5 PASSED (100% success rate, avg duration: ${avgTime.toFixed(1)}ms).`);
    report.steps.push({
      step: 10,
      name: 'Multi-Iteration Stability Loop',
      status: 'PASS',
      iterationsRan: iterations,
      successRate: '100%',
      avgDurationMs: avgTime
    });

    console.log(`
\x1b[1m\x1b[32m╔══════════════════════════════════════════════════════════════════════════════════╗
║              HOSTILE ACCEPTANCE TEST SUITE: ALL 10 STEPS PASSED                   ║
╚══════════════════════════════════════════════════════════════════════════════════╝\x1b[0m
`);

    return report;
  } finally {
    db.close();
    try {
      fs.rmSync(disposableDir, { recursive: true, force: true });
    } catch {}
  }
}

if (require.main === module) {
  runHostileAcceptanceSuite()
    .then((rep) => {
      process.exit(0);
    })
    .catch((err) => {
      console.error('\x1b[31m[HOSTILE TEST FAILED]\x1b[0m', err);
      process.exit(1);
    });
}

module.exports = { runHostileAcceptanceSuite };
