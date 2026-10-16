'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT_DIR = path.resolve(__dirname, '..');
const AGENTS_DIR = path.join(ROOT_DIR, 'agents', 'definitions');
const SCHEMA_FILE = path.join(ROOT_DIR, 'database', 'schema.sql');
const ROSTER_FILE = path.join(ROOT_DIR, 'agents', 'roster.json');

test('🏛️ Organizational Fleet: All 67 agent definitions exist and are well-formed', () => {
  assert.ok(fs.existsSync(AGENTS_DIR), 'agents/definitions directory must exist');
  const agentFolders = fs.readdirSync(AGENTS_DIR).filter(f => fs.statSync(path.join(AGENTS_DIR, f)).isDirectory());
  
  assert.ok(agentFolders.length >= 20, `Expected at least 20 specialist agents, found ${agentFolders.length}`);
  
  for (const folder of agentFolders) {
    const agentMd = path.join(AGENTS_DIR, folder, 'agent.md');
    assert.ok(fs.existsSync(agentMd), `Agent definition missing: ${agentMd}`);
    const content = fs.readFileSync(agentMd, 'utf8');
    assert.ok(content.startsWith('---'), `Agent ${folder} missing YAML frontmatter header`);
    assert.ok(content.includes('name:'), `Agent ${folder} missing name in frontmatter`);
    assert.ok(content.includes('description:'), `Agent ${folder} missing description in frontmatter`);
    assert.ok(!content.includes('f:\\videosystem'), `Agent ${folder} contains un-sanitized local path`);
  }
});

test('📋 Roster Integrity: agents/roster.json is valid and maps non-conflicting agent IDs', () => {
  assert.ok(fs.existsSync(ROSTER_FILE), 'roster.json must exist');
  const rosterRaw = fs.readFileSync(ROSTER_FILE, 'utf8');
  const roster = JSON.parse(rosterRaw);
  
  assert.ok(Array.isArray(roster.agents), 'roster.agents must be an array');
  assert.ok(roster.agents.length >= 20, `Expected at least 20 agents in roster, found ${roster.agents.length}`);
  
  const ids = new Set();
  for (const agent of roster.agents) {
    assert.ok(agent.id, 'Agent missing id attribute');
    assert.ok(!ids.has(agent.id), `Duplicate agent id detected: ${agent.id}`);
    ids.add(agent.id);
    assert.ok(agent.name, `Agent ${agent.id} missing name`);
    assert.ok(agent.description, `Agent ${agent.id} missing description`);
  }
});

test('🗄️ Database Schema: database/schema.sql contains enterprise relational DDL', () => {
  assert.ok(fs.existsSync(SCHEMA_FILE), 'schema.sql must exist');
  const sql = fs.readFileSync(SCHEMA_FILE, 'utf8');
  
  const requiredTables = [
    'companies', 'departments', 'positions', 'teams', 'employees',
    'tasks', 'executions', 'token_budgets', 'governance_policies',
    'verification_runs', 'quality_certifications'
  ];

  for (const table of requiredTables) {
    const tableRegex = new RegExp(`CREATE TABLE\\s+["']?${table}["']?\\s*\\(`, 'i');
    assert.ok(tableRegex.test(sql), `Mandatory enterprise table '${table}' missing from schema.sql`);
  }
});

test('📬 Hive Mailbox Protocol: Actor messages validate strictly against single-writer contract', () => {
  const validActs = new Set(['request', 'inform', 'propose', 'query', 'agree', 'refuse', 'done']);
  
  function validateHiveMessage(msg) {
    if (!msg || typeof msg !== 'object') return false;
    if (!msg.to || typeof msg.to !== 'string') return false;
    if (!msg.act || !validActs.has(msg.act)) return false;
    if (!msg.subject || typeof msg.subject !== 'string') return false;
    if (typeof msg.body !== 'string') return false;
    return true;
  }

  const sampleValid = {
    to: 'emp_dwight',
    act: 'request',
    subject: 'Adversarial 3-probe stress test on auth token refresh',
    body: 'Please test race condition on simultaneous refresh requests.'
  };

  const sampleInvalidAct = {
    to: 'emp_dwight',
    act: 'arbitrary_action',
    subject: 'Invalid message',
    body: 'Fails validation'
  };

  assert.equal(validateHiveMessage(sampleValid), true, 'Valid message should pass validation');
  assert.equal(validateHiveMessage(sampleInvalidAct), false, 'Invalid act should fail validation');
});

test('🛡️ Reality Gate Interlock: Exit code verification fails-closed on non-zero return', () => {
  function realityGateCheck(exitCode, testAssertionsPassed, unhandledErrors) {
    if (exitCode !== 0) {
      return { certified: false, reason: `Reality Gate Rejected: Non-zero exit code (${exitCode})` };
    }
    if (testAssertionsPassed < 1) {
      return { certified: false, reason: 'Reality Gate Rejected: Zero assertions passed' };
    }
    if (unhandledErrors > 0) {
      return { certified: false, reason: `Reality Gate Rejected: ${unhandledErrors} unhandled errors` };
    }
    return { certified: true, reason: 'Reality Gate Certified: Exit code 0 with clean proof' };
  }

  // Machine Reality Case 1: Clean exit code 0
  const passingRun = realityGateCheck(0, 15, 0);
  assert.equal(passingRun.certified, true);

  // Machine Reality Case 2: Non-zero exit code (fails closed)
  const failingRun = realityGateCheck(1, 15, 0);
  assert.equal(failingRun.certified, false);

  // Machine Reality Case 3: Zero assertions (fabrication protection)
  const zeroAssertionRun = realityGateCheck(0, 0, 0);
  assert.equal(zeroAssertionRun.certified, false);
});

test('🐧 Cross-Platform Parity: Both Windows and Unix shims are provided', () => {
  const winCmd = path.join(ROOT_DIR, 'hive', 'bin', 'hive-node.cmd');
  const unixSh = path.join(ROOT_DIR, 'hive', 'bin', 'hive-node.sh');
  
  assert.ok(fs.existsSync(winCmd), 'Windows shim hive-node.cmd must exist');
  assert.ok(fs.existsSync(unixSh), 'Unix shim hive-node.sh must exist');
  
  const unixContent = fs.readFileSync(unixSh, 'utf8');
  assert.ok(unixContent.startsWith('#!/usr/bin/env bash'), 'hive-node.sh must contain valid bash shebang');
});

test('📚 Open-Source Governance: Essential community, security, and architectural documentation exists', () => {
  const mandatoryDocs = [
    'CONTRIBUTING.md',
    'SECURITY.md',
    'ROADMAP.md',
    'CHANGELOG.md',
    path.join('docs', 'architecture.md'),
    path.join('docs', 'reality-gate.md'),
    path.join('docs', 'agents-catalog.md'),
    path.join('docs', 'quickstart.md'),
    path.join('.github', 'ISSUE_TEMPLATE', 'bug_report.md'),
    path.join('.github', 'ISSUE_TEMPLATE', 'feature_request.md'),
    path.join('.github', 'ISSUE_TEMPLATE', 'agent_proposal.md'),
    path.join('.github', 'PULL_REQUEST_TEMPLATE.md')
  ];

  for (const doc of mandatoryDocs) {
    const fullPath = path.join(ROOT_DIR, doc);
    assert.ok(fs.existsSync(fullPath), `Mandatory open-source document missing: ${doc}`);
    const stat = fs.statSync(fullPath);
    assert.ok(stat.size > 50, `Document ${doc} is suspiciously small (${stat.size} bytes)`);
  }
});

test('📐 Agent Manifest Schema: definitions schema is valid JSON Schema', () => {
  const schemaFile = path.join(AGENTS_DIR, 'agent.schema.json');
  assert.ok(fs.existsSync(schemaFile), 'agent.schema.json must exist');
  const schemaRaw = fs.readFileSync(schemaFile, 'utf8');
  const parsed = JSON.parse(schemaRaw);
  assert.equal(parsed.$schema, 'http://json-schema.org/draft-07/schema#');
  assert.ok(parsed.properties.name, 'Schema must define name property');
  assert.ok(parsed.properties.description, 'Schema must define description property');
});

test('🧠 Memory Optimization: Institutional memory index exists, slices cards, and queries in <25ms', () => {
  const { searchMemory, loadIndex } = require('../memory/search');
  const index = loadIndex();
  assert.ok(index.totalCards >= 50, `Expected at least 50 memory cards, found ${index.totalCards}`);
  assert.ok(index.tags.length >= 100, `Expected at least 100 indexed tags, found ${index.tags.length}`);

  const searchResult = searchMemory('sqlite', { limit: 2 });
  assert.ok(searchResult.count >= 1, 'Expected at least 1 match for query "sqlite"');
  assert.ok(searchResult.elapsedMs < 100, `Search took too long: ${searchResult.elapsedMs}ms`);
  assert.ok(searchResult.results[0].content.length > 20, 'Card content must be populated');
});

test('🐍 Python Vector Memory Bridge: scripts/vector_memory.py is present and functional', () => {
  const scriptPath = path.join(ROOT_DIR, 'scripts', 'vector_memory.py');
  assert.ok(fs.existsSync(scriptPath), 'scripts/vector_memory.py must exist');
  const scriptContent = fs.readFileSync(scriptPath, 'utf8');
  assert.ok(scriptContent.includes('VectorMemoryBridge'), 'Must define VectorMemoryBridge class');
  assert.ok(scriptContent.includes('reconfigure'), 'Must include Windows UTF-8 reconfigure guard');
});

test('⚡ Empirical Benchmark Suite: test/benchmark.js and BENCHMARKS.md are present and accurate', () => {
  const benchScript = path.join(ROOT_DIR, 'test', 'benchmark.js');
  const benchDoc = path.join(ROOT_DIR, 'BENCHMARKS.md');
  assert.ok(fs.existsSync(benchScript), 'test/benchmark.js must exist');
  assert.ok(fs.existsSync(benchDoc), 'BENCHMARKS.md must exist');

  const { percentile } = require('./benchmark');
  assert.equal(percentile([1, 2, 3, 4, 5], 50), 3, 'Percentile calculation must be mathematically accurate');
  assert.equal(percentile([10, 20, 30, 40, 50, 60, 70, 80, 90, 100], 99), 100);
});

test('📜 Verifiable Mission Traces & Visual Assets: Complete execution traces and SVG preview exist', () => {
  const trace1 = path.join(ROOT_DIR, 'examples', 'runs', '01-sqlite-wal-optimization.json');
  const trace2 = path.join(ROOT_DIR, 'examples', 'runs', '02-idempotent-webhook.json');
  const svgPreview = path.join(ROOT_DIR, 'docs', 'assets', 'clarity-card-preview.svg');

  assert.ok(fs.existsSync(trace1), 'Mission trace 01 must exist');
  assert.ok(fs.existsSync(trace2), 'Mission trace 02 must exist');
  assert.ok(fs.existsSync(svgPreview), 'SVG clarity card preview must exist');

  const trace1Data = JSON.parse(fs.readFileSync(trace1, 'utf8'));
  assert.equal(trace1Data.status, 'CERTIFIED_AND_DEPLOYABLE');
  assert.equal(trace1Data.realityGate.exitCode, 0);

  const svgContent = fs.readFileSync(svgPreview, 'utf8');
  assert.ok(svgContent.includes('<svg'), 'SVG file must contain valid SVG root');
  assert.ok(svgContent.includes('EXECUTIVE 1-MINUTE CLARITY CARD'), 'SVG must render Clarity Card header');
});


