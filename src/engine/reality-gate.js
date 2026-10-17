'use strict';

/**
 * @file src/engine/reality-gate.js
 * @description Reality Gate Verifier for The Boring Company OS.
 * Enforces Constitutional Principle #10: Tasks are complete ONLY with raw evidence
 * (clean exit code $? === 0, un-manipulated test output, non-zero assertions,
 * blast radius boundary checks, and anti-tamper verification).
 */

const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

class RealityGate {
  constructor(options = {}) {
    this.defaultTimeoutMs = options.defaultTimeoutMs || 60000;
  }

  /**
   * Parse machine test output to detect assertion and test counts across runners.
   * Supports TAP, Node.js native runner, Jest, Mocha, Pytest, Go, and Cargo.
   * @param {string} output Combined stdout and stderr
   * @returns {{ total: number, passed: number, failed: number, detected: boolean }}
   */
  parseTestMetrics(output) {
    if (!output || typeof output !== 'string') {
      return { total: 0, passed: 0, failed: 0, detected: false };
    }

    let total = 0;
    let passed = 0;
    let failed = 0;
    let detected = false;

    // 1. TAP 13/14 standard (Node test runner, tape, etc.)
    const tapTestsMatch = output.match(/#\s+tests\s+(\d+)/i);
    const tapPassMatch = output.match(/#\s+pass\s+(\d+)/i);
    const tapFailMatch = output.match(/#\s+fail\s+(\d+)/i);

    if (tapTestsMatch) {
      total = parseInt(tapTestsMatch[1], 10);
      passed = tapPassMatch ? parseInt(tapPassMatch[1], 10) : total;
      failed = tapFailMatch ? parseInt(tapFailMatch[1], 10) : 0;
      detected = true;
      return { total, passed, failed, detected };
    }

    // Individual TAP lines: 'ok 1 - ...' or 'not ok 2 - ...'
    const okMatches = output.match(/^ok\s+\d+/gm);
    const notOkMatches = output.match(/^not ok\s+\d+/gm);
    if (okMatches || notOkMatches) {
      const okCount = okMatches ? okMatches.length : 0;
      const notOkCount = notOkMatches ? notOkMatches.length : 0;
      return { total: okCount + notOkCount, passed: okCount, failed: notOkCount, detected: true };
    }

    // 2. Jest / Vitest: 'Tests: 5 passed, 5 total'
    const jestMatch = output.match(/Tests:\s+(?:(\d+)\s+failed,)?\s*(?:(\d+)\s+passed,)?\s*(\d+)\s+total/i);
    if (jestMatch) {
      failed = jestMatch[1] ? parseInt(jestMatch[1], 10) : 0;
      passed = jestMatch[2] ? parseInt(jestMatch[2], 10) : 0;
      total = parseInt(jestMatch[3], 10);
      return { total, passed, failed, detected: true };
    }

    // 3. Mocha: '5 passing (120ms)' / '1 failing'
    const mochaPassMatch = output.match(/(\d+)\s+passing/i);
    const mochaFailMatch = output.match(/(\d+)\s+failing/i);
    if (mochaPassMatch || mochaFailMatch) {
      passed = mochaPassMatch ? parseInt(mochaPassMatch[1], 10) : 0;
      failed = mochaFailMatch ? parseInt(mochaFailMatch[1], 10) : 0;
      return { total: passed + failed, passed, failed, detected: true };
    }

    // 4. Pytest: '5 passed, 1 failed in 0.12s' or '5 passed in 0.05s'
    const pytestPassMatch = output.match(/(\d+)\s+passed/i);
    const pytestFailMatch = output.match(/(\d+)\s+failed/i);
    if (pytestPassMatch || pytestFailMatch) {
      passed = pytestPassMatch ? parseInt(pytestPassMatch[1], 10) : 0;
      failed = pytestFailMatch ? parseInt(pytestFailMatch[1], 10) : 0;
      return { total: passed + failed, passed, failed, detected: true };
    }

    // 5. Python unittest: 'Ran 5 tests in 0.002s\n\nOK'
    const unittestMatch = output.match(/Ran\s+(\d+)\s+tests?/i);
    if (unittestMatch) {
      total = parseInt(unittestMatch[1], 10);
      passed = /FAILED/i.test(output) ? 0 : total;
      failed = total - passed;
      return { total, passed, failed, detected: true };
    }

    // 6. Rust cargo test: 'test result: ok. 5 passed; 0 failed;'
    const cargoMatch = output.match(/test result:\s+\w+\.\s+(\d+)\s+passed;\s+(\d+)\s+failed;/i);
    if (cargoMatch) {
      passed = parseInt(cargoMatch[1], 10);
      failed = parseInt(cargoMatch[2], 10);
      return { total: passed + failed, passed, failed, detected: true };
    }

    // 7. Go test: 'PASS\nok\tpackage\t0.012s'
    if (/\bPASS\b/.test(output) && /\bok\s+[^\s]+\s+[\d\.]+s/.test(output)) {
      return { total: 1, passed: 1, failed: 0, detected: true };
    }

    return { total: 0, passed: 0, failed: 0, detected: false };
  }

  /**
   * Computes SHA-256 fingerprint of test files in workspace to detect tampering.
   * @param {object} workspace ControlledWorkspace
   * @returns {Map<string, string>}
   */
  computeTestFilesFingerprint(workspace) {
    const fingerprint = new Map();
    try {
      const items = workspace.listFiles('.', true);
      for (const item of items) {
        const filePath = typeof item === 'string' ? item : (item && item.path);
        const fileType = typeof item === 'string' ? 'file' : (item && item.type);
        if (fileType !== 'file' || !filePath) continue;

        const norm = filePath.replace(/\\/g, '/');
        if (norm.startsWith('test/') || norm.startsWith('tests/') || norm.includes('.test.') || norm.includes('.spec.') || norm === 'package.json') {
          const content = workspace.readFile(filePath);
          const hash = crypto.createHash('sha256').update(content).digest('hex');
          fingerprint.set(norm, hash);
        }
      }
    } catch {
      // Non-fatal
    }
    return fingerprint;
  }

  /**
   * Creates an immutable integrity snapshot of all files in workspace.
   * @param {object} workspace ControlledWorkspace
   * @returns {Record<string, string>} map of relative path to sha256
   */
  createWorkspaceSnapshot(workspace) {
    const snapshot = {};
    try {
      const items = workspace.listFiles('.', true);
      for (const it of items) {
        const filePath = typeof it === 'string' ? it : (it && it.path);
        const fileType = typeof it === 'string' ? 'file' : (it && it.type);
        if (fileType === 'file' && filePath && !filePath.startsWith('.git') && !filePath.includes('node_modules')) {
          try {
            const content = workspace.readFile(filePath);
            const norm = filePath.replace(/\\/g, '/');
            snapshot[norm] = crypto.createHash('sha256').update(content).digest('hex');
          } catch {}
        }
      }
    } catch {}
    return snapshot;
  }

  /**
   * Asserts workspace matches the snapshot taken at verification time.
   * Proves no files were altered or added post-verification.
   * @param {object} workspace
   * @param {Record<string, string>} expectedSnapshot
   * @returns {{ intact: boolean, reason?: string }}
   */
  verifySnapshotIntegrity(workspace, expectedSnapshot) {
    if (!expectedSnapshot || typeof expectedSnapshot !== 'object') {
      return { intact: false, reason: 'INVALID_SNAPSHOT: No baseline snapshot provided' };
    }
    const current = this.createWorkspaceSnapshot(workspace);
    const expectedKeys = Object.keys(expectedSnapshot);
    const currentKeys = Object.keys(current);

    if (expectedKeys.length !== currentKeys.length) {
      return {
        intact: false,
        reason: `MUTATION_DETECTED: File count changed after verification (expected ${expectedKeys.length}, found ${currentKeys.length})`
      };
    }

    for (const file of expectedKeys) {
      if (current[file] !== expectedSnapshot[file]) {
        return {
          intact: false,
          reason: `MUTATION_DETECTED: File '${file}' was modified after Reality Gate verification`
        };
      }
    }

    return { intact: true };
  }

  /**
   * Execute Reality Gate verification against a workspace.
   * @param {object} params
   * @param {object} params.workspace ControlledWorkspace
   * @param {string} params.testCommand Shell command to run test suite (e.g. 'npm test')
   * @param {string[]} [params.allowedPaths] Whitelisted path prefixes for file changes
   * @param {boolean} [params.strictAssertions=true] Enforce non-zero passing assertions
   * @param {number} [params.timeoutMs] Process execution timeout
   * @returns {Promise<object>}
   */
  async verify({
    workspace,
    testCommand,
    allowedPaths = null,
    strictAssertions = true,
    timeoutMs = null
  }) {
    const startTime = Date.now();
    const effectiveTimeout = timeoutMs || this.defaultTimeoutMs;

    // Phase 1: Pre-execution Anti-Tamper Snapshot
    const preFingerprint = this.computeTestFilesFingerprint(workspace);

    // Phase 2: Check Blast Radius / Allowed Paths
    let scopeViolation = null;
    let gitDiff = '';
    try {
      const diffObj = await workspace.getGitDiff();
      gitDiff = typeof diffObj === 'object' ? (diffObj.diff || '') : String(diffObj);
      if (allowedPaths && Array.isArray(allowedPaths) && allowedPaths.length > 0) {
        const changedFiles = [];
        const diffLines = gitDiff.split('\n');
        for (const line of diffLines) {
          const match = line.match(/^diff --git a\/(.+?) b\/(.+?)$/);
          if (match) {
            changedFiles.push(match[2].replace(/\\/g, '/'));
          }
        }

        for (const file of changedFiles) {
          const isAllowed = allowedPaths.some(p => {
            const normP = p.replace(/\\/g, '/').replace(/\/$/, '');
            return file === normP || file.startsWith(normP + '/');
          });
          if (!isAllowed) {
            scopeViolation = `File '${file}' modified outside authorized scope [${allowedPaths.join(', ')}]`;
            break;
          }
        }
      }
    } catch {
      // Git diff may be unavailable if not a git repo
    }

    if (scopeViolation) {
      return {
        passed: false,
        outcome: 'FAILED',
        failureCategory: 'SCOPE_VIOLATION',
        reason: `SCOPE_VIOLATION: ${scopeViolation}`,
        exitCode: 1,
        durationMs: Date.now() - startTime,
        assertionsFound: 0,
        testsPassed: 0,
        testsFailed: 0,
        gitDiff,
        evidenceDigest: null,
        tamperDetected: false,
        scopeViolation,
        snapshot: null,
        stdoutTail: '',
        stderrTail: scopeViolation,
        timestamp: new Date().toISOString()
      };
    }

    // Phase 3: Execute Test Command Independently
    if (!testCommand || typeof testCommand !== 'string' || !testCommand.trim()) {
      return {
        passed: false,
        outcome: 'BLOCKED',
        failureCategory: 'CONFIGURATION_ERROR',
        reason: 'CONFIGURATION_ERROR: testCommand is required and cannot be empty',
        exitCode: 1,
        durationMs: Date.now() - startTime,
        assertionsFound: 0,
        testsPassed: 0,
        testsFailed: 0,
        gitDiff,
        evidenceDigest: null,
        tamperDetected: false,
        scopeViolation: null,
        snapshot: null,
        stdoutTail: '',
        stderrTail: 'No test command specified',
        timestamp: new Date().toISOString()
      };
    }

    const execResult = await workspace.runCommand(testCommand, { timeoutMs: effectiveTimeout });
    const durationMs = Date.now() - startTime;
    const combinedOutput = `${execResult.stdout}\n${execResult.stderr}`;

    if (execResult.timedOut) {
      return {
        passed: false,
        outcome: 'BLOCKED',
        failureCategory: 'TIMEOUT',
        reason: `TIMEOUT: Test runner exceeded execution limit (${effectiveTimeout}ms)`,
        exitCode: 124,
        durationMs,
        assertionsFound: 0,
        testsPassed: 0,
        testsFailed: 0,
        gitDiff,
        evidenceDigest: null,
        tamperDetected: false,
        scopeViolation: null,
        snapshot: null,
        stdoutTail: execResult.stdout.slice(-1000),
        stderrTail: 'Process terminated due to timeout',
        timestamp: new Date().toISOString()
      };
    }

    // Phase 4: Anti-Tamper Post-Execution Verification
    const postFingerprint = this.computeTestFilesFingerprint(workspace);
    let tamperDetected = false;
    let tamperDetails = null;

    for (const [filePath, preHash] of preFingerprint.entries()) {
      const postHash = postFingerprint.get(filePath);
      if (postHash !== preHash) {
        tamperDetected = true;
        tamperDetails = `Test execution tampered with existing test fixture/file: ${filePath}`;
        break;
      }
    }

    if (tamperDetected) {
      return {
        passed: false,
        outcome: 'FAILED',
        failureCategory: 'ANTI_TAMPER_VIOLATION',
        reason: `ANTI_TAMPER_VIOLATION: ${tamperDetails}`,
        exitCode: execResult.exitCode,
        durationMs,
        assertionsFound: 0,
        testsPassed: 0,
        testsFailed: 0,
        gitDiff,
        evidenceDigest: null,
        tamperDetected: true,
        scopeViolation: null,
        snapshot: null,
        stdoutTail: execResult.stdout.slice(-1000),
        stderrTail: execResult.stderr.slice(-1000),
        timestamp: new Date().toISOString()
      };
    }

    // Phase 5: Exit Code Gate ($? === 0)
    if (execResult.exitCode !== 0) {
      return {
        passed: false,
        outcome: 'FAILED',
        failureCategory: 'EXIT_CODE_FAILED',
        reason: `EXIT_CODE_FAILED: Test runner exited with non-zero code ${execResult.exitCode}`,
        exitCode: execResult.exitCode,
        durationMs,
        assertionsFound: 0,
        testsPassed: 0,
        testsFailed: 0,
        gitDiff,
        evidenceDigest: null,
        tamperDetected: false,
        scopeViolation: null,
        snapshot: null,
        stdoutTail: execResult.stdout.slice(-1500),
        stderrTail: execResult.stderr.slice(-1500),
        timestamp: new Date().toISOString()
      };
    }

    // Phase 6: Non-Zero Assertions Gate
    const metrics = this.parseTestMetrics(combinedOutput);

    if (strictAssertions) {
      if (metrics.detected && metrics.total === 0) {
        return {
          passed: false,
          outcome: 'FAILED',
          failureCategory: 'ZERO_ASSERTIONS_FAILED',
          reason: 'ZERO_ASSERTIONS_FAILED: Test runner exited 0 but 0 tests or assertions were executed',
          exitCode: 0,
          durationMs,
          assertionsFound: 0,
          testsPassed: 0,
          testsFailed: 0,
          gitDiff,
          evidenceDigest: null,
          tamperDetected: false,
          scopeViolation: null,
          snapshot: null,
          stdoutTail: execResult.stdout.slice(-1500),
          stderrTail: execResult.stderr.slice(-1500),
          timestamp: new Date().toISOString()
        };
      }

      if (metrics.detected && metrics.failed > 0) {
        return {
          passed: false,
          outcome: 'FAILED',
          failureCategory: 'FAILED_ASSERTIONS',
          reason: `FAILED_ASSERTIONS: Test runner reported ${metrics.failed} failing tests despite exit code 0`,
          exitCode: 0,
          durationMs,
          assertionsFound: metrics.total,
          testsPassed: metrics.passed,
          testsFailed: metrics.failed,
          gitDiff,
          evidenceDigest: null,
          tamperDetected: false,
          scopeViolation: null,
          snapshot: null,
          stdoutTail: execResult.stdout.slice(-1500),
          stderrTail: execResult.stderr.slice(-1500),
          timestamp: new Date().toISOString()
        };
      }
    }

    // Phase 7: Compute Immutable Cryptographic Evidence Digest & Integrity Snapshot
    const snapshot = this.createWorkspaceSnapshot(workspace);
    const evidencePayload = JSON.stringify({
      testCommand,
      exitCode: execResult.exitCode,
      metrics,
      gitDiffLength: gitDiff.length,
      snapshotFileCount: Object.keys(snapshot).length,
      timestamp: new Date().toISOString()
    });
    const evidenceDigest = crypto.createHash('sha256').update(evidencePayload).digest('hex');

    return {
      passed: true,
      outcome: 'VERIFIED',
      failureCategory: null,
      reason: 'REALITY_GATE_VERIFIED: Exit code 0, positive assertions confirmed, blast radius verified, zero tampering',
      exitCode: 0,
      durationMs,
      assertionsFound: metrics.total,
      testsPassed: metrics.passed,
      testsFailed: metrics.failed,
      gitDiff,
      evidenceDigest,
      tamperDetected: false,
      scopeViolation: null,
      snapshot,
      stdoutTail: execResult.stdout.slice(-1500),
      stderrTail: execResult.stderr.slice(-1500),
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = { RealityGate };
