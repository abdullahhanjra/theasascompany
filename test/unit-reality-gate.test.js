'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');
const { RealityGate } = require('../src/engine/reality-gate');
const { ControlledWorkspace } = require('../src/tools/workspace');

test('🛡️ Reality Gate: Metric Parser extracts test results accurately', () => {
  const gate = new RealityGate();

  // TAP 13/14
  const tapOutput = `
TAP version 13
# Subtest: Math works
ok 1 - Math works
1..1
# tests 10
# pass 9
# fail 1
`;
  const tapMetrics = gate.parseTestMetrics(tapOutput);
  assert.equal(tapMetrics.detected, true);
  assert.equal(tapMetrics.total, 10);
  assert.equal(tapMetrics.passed, 9);
  assert.equal(tapMetrics.failed, 1);

  // Jest
  const jestOutput = `
PASS src/index.test.ts
Tests: 2 failed, 15 passed, 17 total
Snapshots: 0 total
Time: 2.451 s
`;
  const jestMetrics = gate.parseTestMetrics(jestOutput);
  assert.equal(jestMetrics.detected, true);
  assert.equal(jestMetrics.total, 17);
  assert.equal(jestMetrics.passed, 15);
  assert.equal(jestMetrics.failed, 2);

  // Mocha
  const mochaOutput = `
  12 passing (150ms)
  1 failing
`;
  const mochaMetrics = gate.parseTestMetrics(mochaOutput);
  assert.equal(mochaMetrics.detected, true);
  assert.equal(mochaMetrics.passed, 12);
  assert.equal(mochaMetrics.failed, 1);

  // Pytest
  const pytestOutput = `
========================= 8 passed, 1 failed in 0.42s =========================
`;
  const pytestMetrics = gate.parseTestMetrics(pytestOutput);
  assert.equal(pytestMetrics.detected, true);
  assert.equal(pytestMetrics.passed, 8);
  assert.equal(pytestMetrics.failed, 1);

  // Cargo
  const cargoOutput = `
test result: ok. 4 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
`;
  const cargoMetrics = gate.parseTestMetrics(cargoOutput);
  assert.equal(cargoMetrics.detected, true);
  assert.equal(cargoMetrics.passed, 4);
  assert.equal(cargoMetrics.failed, 0);
});

test('🛡️ Reality Gate: Real command passes with exit code 0 and valid assertions', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'boring-gate-test-'));
  try {
    const ws = new ControlledWorkspace(tmpDir);
    const gate = new RealityGate();

    const result = await gate.verify({
      workspace: ws,
      testCommand: 'node -e "console.log(\'# tests 4\\n# pass 4\\n# fail 0\'); process.exit(0);"'
    });

    assert.equal(result.passed, true);
    assert.equal(result.exitCode, 0);
    assert.equal(result.testsPassed, 4);
    assert.ok(result.evidenceDigest, 'Cryptographic digest must be generated');
    assert.ok(result.reason.includes('REALITY_GATE_VERIFIED'));
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('🛡️ Reality Gate: Fails closed on non-zero exit code', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'boring-gate-test-'));
  try {
    const ws = new ControlledWorkspace(tmpDir);
    const gate = new RealityGate();

    const result = await gate.verify({
      workspace: ws,
      testCommand: 'node -e "console.error(\'Fatal Assertion Error\'); process.exit(1);"'
    });

    assert.equal(result.passed, false);
    assert.equal(result.exitCode, 1);
    assert.ok(result.reason.includes('EXIT_CODE_FAILED'));
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('🛡️ Reality Gate: Fails closed when zero assertions are executed', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'boring-gate-test-'));
  try {
    const ws = new ControlledWorkspace(tmpDir);
    const gate = new RealityGate();

    const result = await gate.verify({
      workspace: ws,
      testCommand: 'node -e "console.log(\'# tests 0\\n# pass 0\'); process.exit(0);"',
      strictAssertions: true
    });

    assert.equal(result.passed, false);
    assert.ok(result.reason.includes('ZERO_ASSERTIONS_FAILED'));
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('🛡️ Reality Gate: Detects and rejects test file tampering', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'boring-gate-test-'));
  try {
    const ws = new ControlledWorkspace(tmpDir);
    ws.writeFile('test/sample.test.js', '// Original test code\nassert.ok(true);');
    const gate = new RealityGate();

    // Command maliciously overwrites test fixture during run to force pass
    const tamperCmd = 'node -e "const fs = require(\'fs\'); fs.writeFileSync(\'test/sample.test.js\', \'// Tampered\'); console.log(\'# tests 1\\n# pass 1\'); process.exit(0);"';

    const result = await gate.verify({
      workspace: ws,
      testCommand: tamperCmd
    });

    assert.equal(result.passed, false);
    assert.equal(result.tamperDetected, true);
    assert.ok(result.reason.includes('ANTI_TAMPER_VIOLATION'));
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});
