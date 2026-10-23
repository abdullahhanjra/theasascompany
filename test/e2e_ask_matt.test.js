'use strict';

/**
 * @file test/e2e_ask_matt.test.js
 * @description Comprehensive E2E Test Suite for Ask-Matt Meta-Router,
 * SQLite Tracer Ticket DAG, 50-Line Diff Guard, and Tool Packaging.
 * Node.js native test runner (node --test).
 */

const { test, describe, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');
const { execSync } = require('node:child_process');

const { EnterpriseRouter, ROUTE_DOMAINS, TASK_SCALES } = require('../src/engine/router');
const { CompanyDatabase } = require('../src/storage/db');
const { TaskBreaker } = require('../src/engine/task-breaker');
const { RealityGate } = require('../src/engine/reality-gate');
const { ExecutionPipeline } = require('../src/engine/pipeline');
const { ControlledWorkspace } = require('../src/tools/workspace');

const ROOT_DIR = path.resolve(__dirname, '..');

describe('Tier 1: Routing Engine & Multi-Scale Categorization & Context Hygiene', () => {
  let router;
  let tmpDir;
  let db;

  beforeEach(() => {
    router = new EnterpriseRouter();
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'boring-e2e-tier1-'));
    db = new CompanyDatabase(path.join(tmpDir, 'test_ledger.db'));
  });

  afterEach(() => {
    if (db) {
      try { db.close(); } catch {}
    }
    if (tmpDir && fs.existsSync(tmpDir)) {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
    }
  });

  test('Test 1 [F1]: Classifies bugfix query to BUG_FIX with SMALL scale and company_jim handler', () => {
    const res = router.route('Fix double-charge bug on checkout button click');
    assert.strictEqual(res.matched, true);
    assert.strictEqual(res.domainKey, 'BUG_FIX');
    assert.strictEqual(res.scale, 'SMALL');
    assert.strictEqual(res.handler, 'company_jim');
  });

  test('Test 2 [F2]: Classifies feature build query to FEATURE_BUILD with MEDIUM scale and task_dag handler', () => {
    const res = router.route('Implement idempotent refund API endpoint');
    assert.strictEqual(res.matched, true);
    assert.strictEqual(res.domainKey, 'FEATURE_BUILD');
    assert.strictEqual(res.scale, 'MEDIUM');
    assert.strictEqual(res.handler, 'task_dag');
  });

  test('Test 3 [F3]: Classifies database query to DATABASE_INFRA with MEDIUM scale and task_dag handler', () => {
    const res = router.route('Optimize SQL database query latency and add index on user_id');
    assert.strictEqual(res.matched, true);
    assert.strictEqual(res.domainKey, 'DATABASE_INFRA');
    assert.strictEqual(res.scale, 'MEDIUM');
    assert.strictEqual(res.handler, 'task_dag');
  });

  test('Test 4 [F4]: Classifies ambiguous query to WAYFINDER_AMBIGUOUS with COMPLEX scale and socratic_interview handler', () => {
    const res = router.route('Explore uncertain architectural trade-offs across microservices');
    assert.strictEqual(res.domainKey, 'WAYFINDER_AMBIGUOUS');
    assert.strictEqual(res.scale, 'COMPLEX');
    assert.strictEqual(res.handler, 'socratic_interview');
  });

  test('Test 5 [F7]: Context reset (/clear) protocol: invokes ExecutionPipeline.prototype.clearContext', () => {
    const pipeline = new ExecutionPipeline({ workspaceRoot: tmpDir, db, verbose: false });
    const t1 = { id: 'ticket_clear_test', title: 'Refactor Auth Handler', goal: 'Fix session token leak', priority: 'high' };
    const pristine = pipeline.clearContext({ ticket: t1 });
    assert.strictEqual(pristine.length, 1);
    assert.strictEqual(pristine[0].role, 'user');
    assert.ok(pristine[0].content.includes('50-line diff limit'));
    assert.ok(pristine[0].content.includes('Refactor Auth Handler'));
  });

  test('Test 6 [F5]: Router benchmark executes 20 queries under 15ms total', () => {
    const bench = router.benchmark();
    assert.strictEqual(bench.totalQueries, 20);
    assert.strictEqual(bench.passed, true);
    assert.ok(bench.totalDurationMs < 15.0, `Benchmark duration (${bench.totalDurationMs}ms) must be < 15ms`);
  });

  test('Test 7 [F6]: TASK_SCALES exports defined scale invariants', () => {
    assert.ok(TASK_SCALES.SMALL);
    assert.strictEqual(TASK_SCALES.SMALL.id, 'SMALL');
    assert.strictEqual(TASK_SCALES.SMALL.handler, 'company_jim');
    assert.strictEqual(TASK_SCALES.SMALL.maxDiffLines, 50);

    assert.ok(TASK_SCALES.MEDIUM);
    assert.strictEqual(TASK_SCALES.MEDIUM.id, 'MEDIUM');
    assert.strictEqual(TASK_SCALES.MEDIUM.handler, 'task_dag');

    assert.ok(TASK_SCALES.COMPLEX);
    assert.strictEqual(TASK_SCALES.COMPLEX.id, 'COMPLEX');
    assert.strictEqual(TASK_SCALES.COMPLEX.handler, 'socratic_interview');
  });

  test('Test 8 [F8]: Classifies typo / patch / tweak queries as SMALL scale', () => {
    const r1 = router.route('Fix typo in header component');
    assert.strictEqual(r1.scale, 'SMALL');
    assert.strictEqual(r1.handler, 'company_jim');

    const r2 = router.route('Apply hotfix patch to broken session token');
    assert.strictEqual(r2.scale, 'SMALL');
    assert.strictEqual(r2.handler, 'company_jim');
  });

  test('Test 9 [F9]: Classifies empty and whitespace queries as COMPLEX scale', () => {
    const emptyRes = router.route('');
    assert.strictEqual(emptyRes.matched, false);
    assert.strictEqual(emptyRes.scale, 'COMPLEX');
    assert.strictEqual(emptyRes.handler, 'socratic_interview');

    const wsRes = router.route('   \n\t  ');
    assert.strictEqual(wsRes.matched, false);
    assert.strictEqual(wsRes.scale, 'COMPLEX');
    assert.strictEqual(wsRes.handler, 'socratic_interview');
  });

  test('Test 10 [F10]: formatRoute formats high-contrast terminal representation', () => {
    const res = router.route('Fix checkout bug');
    const formatted = router.formatRoute(res);
    assert.ok(formatted.includes('THE BORING COMPANY'));
    assert.ok(formatted.includes('Classification:'));
    assert.ok(formatted.includes('Assigned Leadership:'));
    assert.ok(formatted.includes('Disciplined Execution Path:'));
  });
});

describe('Tier 2: Relational SQLite Ledger & DAG Frontier', () => {
  let tmpDir;
  let db;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'boring-e2e-tier2-'));
    db = new CompanyDatabase(path.join(tmpDir, 'test_ledger.db'));
  });

  afterEach(() => {
    if (db) {
      try { db.close(); } catch {}
    }
    if (tmpDir && fs.existsSync(tmpDir)) {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
    }
  });

  test('Test 11 [F11]: schema.sql defines blocking_edges table with foreign keys and unique constraints', () => {
    const schemaSql = fs.readFileSync(path.join(ROOT_DIR, 'database/schema.sql'), 'utf8');
    assert.ok(schemaSql.includes('blocking_edges'));
    assert.ok(schemaSql.includes('FOREIGN KEY (ticket_id) REFERENCES tasks(id)'));
    assert.ok(schemaSql.includes('FOREIGN KEY (blocked_by_ticket_id) REFERENCES tasks(id)'));
    assert.ok(schemaSql.includes('PRIMARY KEY (ticket_id, blocked_by_ticket_id)'));
  });

  test('Test 12 [F12]: CompanyDatabase init ensures blocking_edges table and indexes exist', () => {
    const table = db.db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='blocking_edges';").get();
    assert.ok(table);
    assert.strictEqual(table.name, 'blocking_edges');

    const idxTicket = db.db.prepare("SELECT name FROM sqlite_master WHERE type='index' AND name='idx_blocking_edges_ticket';").get();
    assert.ok(idxTicket);
  });

  test('Test 13 [F13]: insertBlockingEdge adds edge and ignores duplicate submissions', () => {
    db.createTask({ id: 't_parent', title: 'Parent', status: 'ready' });
    db.createTask({ id: 't_child', title: 'Child', status: 'ready' });

    db.insertBlockingEdge('t_child', 't_parent');
    db.insertBlockingEdge('t_child', 't_parent'); // duplicate

    const edges = db.db.prepare("SELECT * FROM blocking_edges WHERE ticket_id = 't_child';").all();
    assert.strictEqual(edges.length, 1);
  });

  test('Test 14 [F14]: executeInTransaction commits multi-statement operations on success', () => {
    const result = db.executeInTransaction(() => {
      db.createTask({ id: 'tx_task_1', title: 'Tx Task 1', status: 'ready' });
      db.createTask({ id: 'tx_task_2', title: 'Tx Task 2', status: 'ready' });
      return 'COMMITTED';
    });

    assert.strictEqual(result, 'COMMITTED');
    assert.ok(db.getTask('tx_task_1'));
    assert.ok(db.getTask('tx_task_2'));
  });

  test('Test 15 [F15]: executeInTransaction rolls back changes on exception', () => {
    const initialCount = db.listTasks().length;

    assert.throws(() => {
      db.executeInTransaction(() => {
        db.createTask({ id: 'tx_rollback_task', title: 'Will Rollback', status: 'ready' });
        throw new Error('Forced transaction failure');
      });
    }, /Forced transaction failure/);

    assert.strictEqual(db.getTask('tx_rollback_task'), undefined);
    assert.strictEqual(db.listTasks().length, initialCount);
  });

  test('Test 16 [F16]: TaskBreaker.persistDAG saves tasks and blocking edges in transaction', () => {
    const breaker = new TaskBreaker();
    const milestoneId = 'ms_persist_test';
    const subtasks = [
      { id: 'st_1', title: 'Subtask 1', milestoneId, dependsOn: [] },
      { id: 'st_2', title: 'Subtask 2', milestoneId, dependsOn: ['st_1'] }
    ];

    const result = breaker.persistDAG(db, subtasks);
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.subtasksCount, 2);

    assert.ok(db.getTask('st_1'));
    assert.ok(db.getTask('st_2'));

    const edges = db.db.prepare("SELECT * FROM blocking_edges WHERE ticket_id = 'st_2';").all();
    assert.strictEqual(edges.length, 1);
    assert.strictEqual(edges[0].blocked_by_ticket_id, 'st_1');
  });

  test('Test 17 [F17]: TaskBreaker.persistDAG rejects cyclic dependency graphs via Kahn algorithm', () => {
    const breaker = new TaskBreaker();
    const cyclic = [
      { id: 'cycle_1', title: 'Cycle 1', dependsOn: ['cycle_2'] },
      { id: 'cycle_2', title: 'Cycle 2', dependsOn: ['cycle_1'] }
    ];

    assert.throws(() => {
      breaker.persistDAG(db, cyclic);
    }, /Cycle detected in task dependencies/);

    assert.strictEqual(db.getTask('cycle_1'), undefined);
  });

  test('Test 18 [F18]: TaskBreaker.persistDAG rejects orphan dependencies', () => {
    const breaker = new TaskBreaker();
    const orphan = [
      { id: 'orphan_task', title: 'Orphan', dependsOn: ['ghost_parent'] }
    ];

    assert.throws(() => {
      breaker.persistDAG(db, orphan);
    }, /Invalid dependency/);
  });

  test('Test 19 [F19]: getReadyFrontier returns only root tasks when blockers are uncompleted', () => {
    const breaker = new TaskBreaker();
    const msId = 'ms_frontier_check';
    const subtasks = [
      { id: 'rf_root', title: 'Root Task', milestoneId: msId, dependsOn: [] },
      { id: 'rf_child', title: 'Child Task', milestoneId: msId, dependsOn: ['rf_root'] }
    ];
    breaker.persistDAG(db, subtasks);

    const frontier = db.getReadyFrontier(msId);
    assert.strictEqual(frontier.length, 1);
    assert.strictEqual(frontier[0].id, 'rf_root');
  });

  test('Test 20 [F20]: getReadyFrontier unblocks child tasks when parent tasks are marked completed', () => {
    const breaker = new TaskBreaker();
    const msId = 'ms_frontier_unblock';
    const subtasks = [
      { id: 'unblock_root', title: 'Root Task', milestoneId: msId, dependsOn: [] },
      { id: 'unblock_child', title: 'Child Task', milestoneId: msId, dependsOn: ['unblock_root'] }
    ];
    breaker.persistDAG(db, subtasks);

    db.markTicketStatus('unblock_root', 'completed');
    const frontier = db.getReadyFrontier(msId);
    assert.strictEqual(frontier.length, 1);
    assert.strictEqual(frontier[0].id, 'unblock_child');

    db.markTicketStatus('unblock_child', 'completed');
    const emptyFrontier = db.getReadyFrontier(msId);
    assert.strictEqual(emptyFrontier.length, 0);
  });
});

describe('Tier 3: Reality Gate & 50-Line Diff Guard', () => {
  let gate;

  beforeEach(() => {
    gate = new RealityGate();
  });

  test('Test 21 [F21]: RealityGate.countDiffLines counts additions and deletions accurately', () => {
    const diff = 'diff --git a/file.js b/file.js\n--- a/file.js\n+++ b/file.js\n+added line 1\n+added line 2\n-deleted line 1\n';
    const counts = gate.countDiffLines(diff);
    assert.strictEqual(counts.added, 2);
    assert.strictEqual(counts.deleted, 1);
    assert.strictEqual(counts.total, 3);
  });

  test('Test 22 [F22]: RealityGate.verifyDiffSize passes for diffs <= 50 lines', () => {
    let diff = 'diff --git a/a.js b/a.js\n';
    for (let i = 0; i < 50; i++) {
      diff += `+line ${i}\n`;
    }
    const res = gate.verifyDiffSize(diff, 50);
    assert.strictEqual(res.pass, true);
    assert.strictEqual(res.total, 50);
    assert.strictEqual(res.error, undefined);
  });

  test('Test 23 [F23]: RealityGate.verifyDiffSize fails for diffs > 50 lines with MAX_DIFF_EXCEEDED error', () => {
    let diff = 'diff --git a/a.js b/a.js\n';
    for (let i = 0; i < 51; i++) {
      diff += `+line ${i}\n`;
    }
    const res = gate.verifyDiffSize(diff, 50);
    assert.strictEqual(res.pass, false);
    assert.strictEqual(res.total, 51);
    assert.ok(res.error.includes('MAX_DIFF_EXCEEDED'));
    assert.ok(res.error.includes('51 lines changed'));
  });

  test('Test 24 [F24]: RealityGate.verifyDiffSize handles Windows CRLF line endings identically', () => {
    const crlfDiff = 'diff --git a/a.js b/a.js\r\n--- a/a.js\r\n+++ b/a.js\r\n+line 1\r\n-line 2\r\n';
    const res = gate.verifyDiffSize(crlfDiff, 50);
    assert.strictEqual(res.pass, true);
    assert.strictEqual(res.total, 2);
    assert.strictEqual(res.added, 1);
    assert.strictEqual(res.deleted, 1);
  });

  test('Test 25 [F25]: RealityGate.verify passes when exit code is 0 and assertions are positive', async () => {
    const mockWorkspace = {
      rootDir: ROOT_DIR,
      getGitDiff: async () => ({ diff: '' }),
      runCommand: async () => ({
        exitCode: 0,
        stdout: 'ok 1 - test passes\n1..1\n# pass 1\n# fail 0',
        stderr: '',
        timedOut: false
      }),
      listFiles: () => []
    };

    const result = await gate.verify({
      workspace: mockWorkspace,
      testCommand: 'mock-test'
    });

    assert.strictEqual(result.passed, true);
    assert.strictEqual(result.outcome, 'VERIFIED');
    assert.strictEqual(result.exitCode, 0);
  });

  test('Test 26 [F26]: RealityGate.verify rejects when test runner exits non-zero', async () => {
    const mockWorkspace = {
      rootDir: ROOT_DIR,
      getGitDiff: async () => ({ diff: '' }),
      runCommand: async () => ({
        exitCode: 1,
        stdout: 'not ok 1 - test failed\n',
        stderr: 'AssertionError',
        timedOut: false
      }),
      listFiles: () => []
    };

    const result = await gate.verify({
      workspace: mockWorkspace,
      testCommand: 'failing-test'
    });

    assert.strictEqual(result.passed, false);
    assert.strictEqual(result.failureCategory, 'EXIT_CODE_FAILED');
  });

  test('Test 27 [F27]: RealityGate.verify rejects when zero assertions are executed in strict mode', async () => {
    const mockWorkspace = {
      rootDir: ROOT_DIR,
      getGitDiff: async () => ({ diff: '' }),
      runCommand: async () => ({
        exitCode: 0,
        stdout: '# tests 0\n# pass 0\n# fail 0\n',
        stderr: '',
        timedOut: false
      }),
      listFiles: () => []
    };

    const result = await gate.verify({
      workspace: mockWorkspace,
      testCommand: 'empty-test',
      strictAssertions: true
    });

    assert.strictEqual(result.passed, false);
    assert.strictEqual(result.failureCategory, 'ZERO_ASSERTIONS_FAILED');
  });

  test('Test 28 [F28]: RealityGate.verify detects scope violations outside allowedPaths', async () => {
    const mockWorkspace = {
      rootDir: ROOT_DIR,
      getGitDiff: async () => ({
        diff: 'diff --git a/unauthorized/leak.js b/unauthorized/leak.js\n+dirty code\n'
      }),
      runCommand: async () => ({ exitCode: 0, stdout: 'ok 1\n', stderr: '' }),
      listFiles: () => []
    };

    const result = await gate.verify({
      workspace: mockWorkspace,
      testCommand: 'test',
      allowedPaths: ['src/allowed']
    });

    assert.strictEqual(result.passed, false);
    assert.strictEqual(result.failureCategory, 'SCOPE_VIOLATION');
  });

  test('Test 29 [F29]: RealityGate.verify correctly detects allowedPaths on Windows CRLF diffs', async () => {
    const mockWorkspace = {
      rootDir: ROOT_DIR,
      getGitDiff: async () => ({
        diff: 'diff --git a/unauthorized/leak.js b/unauthorized/leak.js\r\n+dirty code\r\n'
      }),
      runCommand: async () => ({ exitCode: 0, stdout: 'ok 1\n', stderr: '' }),
      listFiles: () => []
    };

    const result = await gate.verify({
      workspace: mockWorkspace,
      testCommand: 'test',
      allowedPaths: ['src/allowed']
    });

    assert.strictEqual(result.passed, false);
    assert.strictEqual(result.failureCategory, 'SCOPE_VIOLATION');
  });

  test('Test 30 [F30]: RealityGate.verify enforces maxDiffLines ceiling returning MAX_DIFF_EXCEEDED', async () => {
    let bigDiff = 'diff --git a/big.js b/big.js\n';
    for (let i = 0; i < 55; i++) {
      bigDiff += `+line ${i}\n`;
    }

    const mockWorkspace = {
      rootDir: ROOT_DIR,
      getGitDiff: async () => ({ diff: bigDiff }),
      runCommand: async () => ({ exitCode: 0, stdout: 'ok 1\n', stderr: '' }),
      listFiles: () => []
    };

    const result = await gate.verify({
      workspace: mockWorkspace,
      testCommand: 'test',
      maxDiffLines: 50
    });

    assert.strictEqual(result.passed, false);
    assert.strictEqual(result.failureCategory, 'MAX_DIFF_EXCEEDED');
    assert.strictEqual(result.exitCode, 1);
  });
});

describe('Tier 4: Tool Packaging & Sandboxed Execution', () => {
  let tmpSandbox;

  beforeEach(() => {
    tmpSandbox = fs.mkdtempSync(path.join(os.tmpdir(), 'boring-sandbox-'));
  });

  afterEach(() => {
    if (tmpSandbox && fs.existsSync(tmpSandbox)) {
      try { fs.rmSync(tmpSandbox, { recursive: true, force: true }); } catch {}
    }
  });

  test('Test 31 [F31]: .agents/skills contains all 4 required skills', () => {
    const skillsDir = path.join(ROOT_DIR, '.agents/skills');
    assert.ok(fs.existsSync(skillsDir));

    const required = ['ask-matt', 'tdd', 'code-review', 'grill-with-docs'];
    for (const s of required) {
      const skillMd = path.join(skillsDir, s, 'SKILL.md');
      assert.ok(fs.existsSync(skillMd), `Missing skill file: ${skillMd}`);
    }
  });

  test('Test 32 [F32]: All 4 skills contain valid frontmatter and non-empty content', () => {
    const skillsDir = path.join(ROOT_DIR, '.agents/skills');
    const required = ['ask-matt', 'tdd', 'code-review', 'grill-with-docs'];

    for (const s of required) {
      const skillMd = path.join(skillsDir, s, 'SKILL.md');
      const content = fs.readFileSync(skillMd, 'utf8');
      assert.ok(content.startsWith('---'), `Skill ${s} should start with YAML frontmatter`);
      assert.ok(content.includes('name:'), `Skill ${s} should define name in frontmatter`);
      assert.ok(content.includes('description:'), `Skill ${s} should define description in frontmatter`);
    }
  });

  test('Test 33 [F33]: install-tools.js dry run discovers 72 specialist agents and 4 skills', () => {
    const stdout = execSync('node scripts/install-tools.js --tool all --dry-run', {
      cwd: ROOT_DIR,
      encoding: 'utf8'
    });
    assert.ok(stdout.includes('72 valid specialist agents and') || stdout.includes('Validated all 72 agent definitions and 4 skills.'));
  });

  test('Test 34 [F34]: ControlledWorkspace prevents directory traversal escape', () => {
    const ws = new ControlledWorkspace(tmpSandbox);
    assert.throws(() => {
      ws.resolveSafePath('../../escaped.txt');
    }, /Security Violation: Path traversal outside workspace root rejected/);
  });

  test('Test 35 [F35]: ControlledWorkspace blocks dangerous system commands', async () => {
    const ws = new ControlledWorkspace(tmpSandbox);
    const result = await ws.runCommand('rm -rf /');
    assert.strictEqual(result.blocked, true);
    assert.strictEqual(result.exitCode, 126);
    assert.ok(result.stderr.includes('Security Violation: Dangerous command blocked'));
  });

  test('Test 36 [F36]: ControlledWorkspace.rollback cleans untracked files safely in isolated sandbox', async () => {
    // Initialize temporary Git repository in sandbox
    execSync('git init', { cwd: tmpSandbox, stdio: 'ignore' });
    execSync('git config user.name "Test"', { cwd: tmpSandbox, stdio: 'ignore' });
    execSync('git config user.email "test@example.com"', { cwd: tmpSandbox, stdio: 'ignore' });

    fs.writeFileSync(path.join(tmpSandbox, 'committed.txt'), 'initial', 'utf8');
    execSync('git add -A && git commit -m "initial commit"', { cwd: tmpSandbox, stdio: 'ignore' });

    // Create untracked file and dirty tracked file
    fs.writeFileSync(path.join(tmpSandbox, 'committed.txt'), 'modified content', 'utf8');
    fs.writeFileSync(path.join(tmpSandbox, 'untracked.txt'), 'untracked content', 'utf8');

    const ws = new ControlledWorkspace(tmpSandbox);
    const rbResult = await ws.rollback();

    assert.strictEqual(rbResult.success, true);
    assert.strictEqual(fs.readFileSync(path.join(tmpSandbox, 'committed.txt'), 'utf8'), 'initial');
    assert.strictEqual(fs.existsSync(path.join(tmpSandbox, 'untracked.txt')), false);
  });

  test('Test 37 [F37]: ControlledWorkspace.rollback preserves .agents/teamwork/ in isolated sandbox', async () => {
    execSync('git init', { cwd: tmpSandbox, stdio: 'ignore' });
    execSync('git config user.name "Test"', { cwd: tmpSandbox, stdio: 'ignore' });
    execSync('git config user.email "test@example.com"', { cwd: tmpSandbox, stdio: 'ignore' });

    fs.writeFileSync(path.join(tmpSandbox, 'tracked.txt'), 'base', 'utf8');
    execSync('git add -A && git commit -m "base"', { cwd: tmpSandbox, stdio: 'ignore' });

    // Create agent coordination metadata
    const teamworkDir = path.join(tmpSandbox, '.agents', 'teamwork', 'worker_1');
    fs.mkdirSync(teamworkDir, { recursive: true });
    fs.writeFileSync(path.join(teamworkDir, 'DISPATCH.md'), '# Coordination Dispatch', 'utf8');

    const ws = new ControlledWorkspace(tmpSandbox);
    const rbResult = await ws.rollback();

    assert.strictEqual(rbResult.success, true);
    // Coordination metadata must be preserved
    assert.strictEqual(fs.existsSync(path.join(teamworkDir, 'DISPATCH.md')), true);
  });

  test('Test 38 [F38]: ExecutionPipeline.runFrontier executes frontier with isolated context turns', async () => {
    const dbPath = path.join(tmpSandbox, 'frontier_test.db');
    const localDb = new CompanyDatabase(dbPath);

    try {
      const pipeline = new ExecutionPipeline({ workspaceRoot: tmpSandbox, db: localDb, verbose: false });
      const breaker = new TaskBreaker();
      const mId = 'ms_e2e_frontier';

      const tasks = [
        { id: 'e2e_t1', title: 'T1', milestoneId: mId, dependsOn: [] },
        { id: 'e2e_t2', title: 'T2', milestoneId: mId, dependsOn: ['e2e_t1'] }
      ];
      breaker.persistDAG(localDb, tasks);

      const capturedPrompts = [];
      const mockProvider = {
        name: 'test-mock',
        validateConfig: () => ({ valid: true }),
        generate: async ({ messages }) => {
          capturedPrompts.push(messages);
          return { text: 'ok' };
        }
      };

      const frontierResult = await pipeline.runFrontier({
        missionId: mId,
        provider: mockProvider
      });

      assert.strictEqual(frontierResult.status, 'VERIFIED');
      assert.strictEqual(frontierResult.completedCount, 2);
      assert.strictEqual(capturedPrompts.length, 2);
      assert.strictEqual(capturedPrompts[0].length, 1);
      assert.strictEqual(capturedPrompts[1].length, 1);
    } finally {
      localDb.close();
    }
  });
});
