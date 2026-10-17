'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');
const { ExecutionPipeline } = require('../src/engine/pipeline');
const { DeterministicTestProvider } = require('../src/providers/deterministic-test');
const { CompanyDatabase } = require('../src/storage/db');
const { RealityGate } = require('../src/engine/reality-gate');

test('🚀 Execution Pipeline: End-to-end task execution, file edits, and verification', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'boring-pipeline-test-'));
  const db = new CompanyDatabase(':memory:');

  try {
    // Set up a mock codebase in tmpDir
    fs.writeFileSync(path.join(tmpDir, 'calculator.js'), 'module.exports = { add: (a, b) => 0 };');
    fs.writeFileSync(
      path.join(tmpDir, 'test.js'),
      `
const assert = require('assert');
const calc = require('./calculator');
assert.strictEqual(calc.add(2, 3), 5);
console.log('# tests 1\\n# pass 1\\n# fail 0\\nok 1 - add works');
`
    );

    // Scripted model actions:
    // Turn 1: Inspect calculator.js
    // Turn 2: Write fixed calculator.js
    // Turn 3: Declare ready
    const testProvider = new DeterministicTestProvider({
      responses: [
        {
          content: 'Inspecting calculator.js',
          toolCalls: [{ id: 'tc1', name: 'readFile', args: { path: 'calculator.js' } }]
        },
        {
          content: 'Fixing add function in calculator.js',
          toolCalls: [
            {
              id: 'tc2',
              name: 'writeFile',
              args: { path: 'calculator.js', content: 'module.exports = { add: (a, b) => a + b };' }
            }
          ]
        },
        {
          content: 'Implementation complete. Ready for verification.',
          toolCalls: []
        }
      ]
    });

    const pipeline = new ExecutionPipeline({
      workspaceRoot: tmpDir,
      db,
      provider: testProvider,
      realityGate: new RealityGate(),
      testCommand: 'node test.js',
      verbose: false
    });

    const result = await pipeline.runTask({
      title: 'Fix addition bug in calculator.js',
      description: 'Calculator add function returns 0 instead of sum'
    });

    assert.equal(result.status, 'VERIFIED');
    assert.equal(result.testsPassed, 1);
    assert.ok(result.evidenceDigest);
    assert.ok(result.clarityCard.includes('EXECUTIVE 1-MINUTE CLARITY CARD'));

    // Verify database records
    const task = db.getTask(result.taskId);
    assert.equal(task.status, 'completed');

    const verif = db.db.prepare('SELECT * FROM verification_runs WHERE task_id = ?;').get(result.taskId);
    assert.ok(verif);
    assert.equal(verif.status, 'PASSED');

    const evidence = db.getEvidenceForRun(verif.id);
    assert.ok(evidence.length > 0);
  } finally {
    db.close();
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('🔄 Execution Pipeline: Diagnostic feedback and self-correction on initial test failure', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'boring-pipeline-retry-'));
  const db = new CompanyDatabase(':memory:');

  try {
    fs.writeFileSync(path.join(tmpDir, 'target.js'), 'module.exports = 1;');
    fs.writeFileSync(
      path.join(tmpDir, 'test.js'),
      `
const val = require('./target');
if (val === 42) {
  console.log('# tests 1\\n# pass 1\\n# fail 0\\nok 1 - target is 42');
  process.exit(0);
} else {
  console.error('Value is ' + val + ', expected 42');
  process.exit(1);
}
`
    );

    // Turn 1: Model writes wrong value (20), causing test failure
    // Turn 2: Model receives Reality Gate diagnostic, updates to 42
    const testProvider = new DeterministicTestProvider({
      responses: [
        {
          content: 'Setting value to 20',
          toolCalls: [{ id: 't1', name: 'writeFile', args: { path: 'target.js', content: 'module.exports = 20;' } }]
        },
        {
          content: 'Diagnosed error. Updating target.js to 42.',
          toolCalls: [{ id: 't2', name: 'writeFile', args: { path: 'target.js', content: 'module.exports = 42;' } }]
        }
      ]
    });

    const pipeline = new ExecutionPipeline({
      workspaceRoot: tmpDir,
      db,
      provider: testProvider,
      realityGate: new RealityGate(),
      testCommand: 'node test.js',
      maxRetries: 2,
      verbose: false
    });

    const result = await pipeline.runTask({
      title: 'Update target to 42',
      description: 'Target must export 42'
    });

    assert.equal(result.status, 'VERIFIED');
    assert.equal(result.testsPassed, 1);
  } finally {
    db.close();
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('🛑 Execution Pipeline: Fails cleanly with setup instructions when provider is unconfigured', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'boring-pipeline-unconfigured-'));
  const db = new CompanyDatabase(':memory:');

  try {
    const unconfiguredProvider = {
      name: 'unconfigured-ai',
      validateConfig: () => ({
        valid: false,
        reason: 'API_KEY is not set',
        setupInstructions: 'Export UNCONFIGURED_API_KEY=your_key_here'
      })
    };

    const pipeline = new ExecutionPipeline({
      workspaceRoot: tmpDir,
      db,
      provider: unconfiguredProvider,
      realityGate: new RealityGate(),
      verbose: false
    });

    const result = await pipeline.runTask({
      title: 'Should fail due to missing credentials'
    });

    assert.equal(result.status, 'FAILED');
    assert.ok(result.reason.includes('PROVIDER_CREDENTIALS_MISSING'));
    assert.ok(result.setupInstructions.includes('Export UNCONFIGURED_API_KEY'));
  } finally {
    db.close();
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});
