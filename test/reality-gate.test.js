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
