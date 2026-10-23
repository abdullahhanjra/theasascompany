'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { EnterpriseRouter } = require('../src/engine/router');
const { SocraticEngine } = require('../src/engine/socratic');

test('⚡ EnterpriseRouter: Sub-15ms deterministic classification across all core domains', () => {
  const router = new EnterpriseRouter();

  // Test Bug Fix
  const bugResult = router.route('Fix double-charge bug on payment button');
  assert.strictEqual(bugResult.matched, true);
  assert.strictEqual(bugResult.domainKey, 'BUG_FIX');
  assert.ok(bugResult.latencyMs < 5.0, `Latency must be <5ms, got ${bugResult.latencyMs}ms`);

  // Test Database Infra
  const dbResult = router.route('Add SQLite row lock on transaction ledger table');
  assert.strictEqual(dbResult.matched, true);
  assert.strictEqual(dbResult.domainKey, 'DATABASE_INFRA');

  // Test Security & AppSec
  const secResult = router.route('Scan repo for leaked JWT secrets and tokens');
  assert.strictEqual(secResult.matched, true);
  assert.strictEqual(secResult.domainKey, 'SECURITY_APPSEC');

  // Test Frontend Design
  const uiResult = router.route('Build dark mode toggle in navbar using Tailwind CSS');
  assert.strictEqual(uiResult.matched, true);
  assert.strictEqual(uiResult.domainKey, 'DESIGN_FRONTEND');

  // Test Feature Build
  const featResult = router.route('Implement new API endpoint for team subscriptions');
  assert.strictEqual(featResult.matched, true);
  assert.strictEqual(featResult.domainKey, 'FEATURE_BUILD');

  // Test Fallback / Ambiguous
  const ambResult = router.route('Something completely unstructured');
  assert.strictEqual(ambResult.matched, false);
  assert.strictEqual(ambResult.domainKey, 'WAYFINDER_AMBIGUOUS');
});

test('⚡ EnterpriseRouter: Benchmark suite satisfies sub-15ms constraint', () => {
  const router = new EnterpriseRouter();
  const bench = router.benchmark();

  assert.strictEqual(bench.totalQueries, 20);
  assert.strictEqual(bench.passed, true);
  assert.ok(bench.totalDurationMs < 15.0, `Total duration must be <15ms, got ${bench.totalDurationMs}ms`);
  assert.ok(bench.averageLatencyMs < 1.0, `Average latency must be <1ms, got ${bench.averageLatencyMs}ms`);
});

test('🏛️ SocraticEngine: Resolves frontier and writes ADR and GLOSSARY without token bloat', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'socratic-test-'));
  const engine = new SocraticEngine(tmpDir);

  const mockAnswers = {
    scope: '1',
    persistence: '1',
    verification: '3'
  };

  const res = await engine.interview('Checkout Deduplication Service', async (q) => mockAnswers[q.id]);

  assert.ok(fs.existsSync(res.adrFile), 'ADR file must be generated');
  assert.ok(fs.existsSync(res.glossaryFile), 'GLOSSARY.md must be created');

  const adrContent = fs.readFileSync(res.adrFile, 'utf8');
  assert.ok(adrContent.includes('Strict 50-line rule enforced'), 'ADR must contain settled scope invariant');
  assert.ok(adrContent.includes('SQLite ACID ledger'), 'ADR must contain settled persistence invariant');
  assert.ok(adrContent.includes('Native test exit code 0'), 'ADR must contain Reality Gate invariant');

  const glossaryContent = fs.readFileSync(res.glossaryFile, 'utf8');
  assert.ok(glossaryContent.includes('Reality Gate'), 'Glossary must define Reality Gate');
  assert.ok(glossaryContent.includes('50-Line Rule'), 'Glossary must define 50-Line Rule');

  // Clean up
  fs.rmSync(tmpDir, { recursive: true, force: true });
});
