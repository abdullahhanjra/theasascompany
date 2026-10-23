'use strict';

/**
 * @file test/challenger2_stress.test.js
 * @description Adversarial stress tests for SQLite Ledger ACID, DAG Frontier, and Context Hygiene.
 * Node.js native test runner (node --test).
 */

const { test, describe, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');

const { CompanyDatabase } = require('../src/storage/db');
const { TaskBreaker } = require('../src/engine/task-breaker');
const { ExecutionPipeline } = require('../src/engine/pipeline');
const { ControlledWorkspace } = require('../src/tools/workspace');

describe('Challenger 2 Adversarial Stress Suite', () => {
  let tmpDir;
  let testDbPath;
  let db;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'boring-c2-stress-'));
    testDbPath = path.join(tmpDir, 'test_ledger.db');
    db = new CompanyDatabase(testDbPath);
  });

  afterEach(() => {
    if (db) {
      try { db.close(); } catch {}
    }
    if (tmpDir && fs.existsSync(tmpDir)) {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
    }
  });

  // [C2-1.1] Multi-statement transaction rollback
  test('[C2-1.1] SQLite ACID & Multi-statement transaction rollback on failure', () => {
    const initialTasks = db.listTasks().length;

    assert.throws(() => {
      db.executeInTransaction(() => {
        db.createTask({
          id: 'task_should_rollback',
          title: 'Uncommitted Task',
          status: 'ready'
        });

        // Trigger fatal primary key collision constraint error
        db.db.exec("INSERT INTO companies (id, name, status, created_at, updated_at) VALUES ('comp_boring', 'Duplicate', 'active', datetime('now'), datetime('now'));");
      });
    });

    const rolledBackTask = db.getTask('task_should_rollback');
    assert.strictEqual(rolledBackTask, undefined, 'Rolled back task should not persist');
    assert.strictEqual(db.listTasks().length, initialTasks, 'Database task count should remain unchanged');

    const integrity = db.db.prepare('PRAGMA integrity_check;').get();
    assert.strictEqual(integrity.integrity_check, 'ok');
  });

  // [C2-1.2] SQLite WAL mode and foreign key enforcement
  test('[C2-1.2] SQLite WAL mode & foreign key enforcement under write burst', () => {
    const journalMode = db.db.prepare('PRAGMA journal_mode;').get();
    assert.strictEqual(journalMode.journal_mode, 'wal');

    const foreignKeys = db.db.prepare('PRAGMA foreign_keys;').get();
    assert.strictEqual(foreignKeys.foreign_keys, 1);

    // Write burst
    for (let i = 0; i < 20; i++) {
      db.createTask({
        id: `burst_task_${i}`,
        title: `Burst Task ${i}`,
        status: 'ready'
      });
    }

    const checkpoint = db.db.prepare('PRAGMA wal_checkpoint(TRUNCATE);').get();
    assert.strictEqual(checkpoint.busy, 0, 'WAL checkpoint should not be busy');

    const integrity = db.db.prepare('PRAGMA integrity_check;').get();
    assert.strictEqual(integrity.integrity_check, 'ok');
  });

  // [C2-1.3] blocking_edges foreign key constraint rejection
  test('[C2-1.3] blocking_edges table rejects non-existent ticket foreign keys', () => {
    // Ticket does not exist
    assert.throws(() => {
      db.db.prepare("INSERT INTO blocking_edges (ticket_id, blocked_by_ticket_id) VALUES ('ghost_ticket_999', 'ghost_ticket_888');").run();
    }, /FOREIGN KEY constraint failed/i);

    // Create real child task, but blocker does not exist
    db.createTask({ id: 'real_task_1', title: 'Real Task 1', status: 'ready' });

    assert.throws(() => {
      db.db.prepare("INSERT INTO blocking_edges (ticket_id, blocked_by_ticket_id) VALUES ('real_task_1', 'ghost_blocker_999');").run();
    }, /FOREIGN KEY constraint failed/i);
  });

  // [C2-1.4] blocking_edges unique constraint rejection
  test('[C2-1.4] blocking_edges enforces unique constraint and insertBlockingEdge ignores duplicates', () => {
    db.createTask({ id: 'task_parent', title: 'Parent Task', status: 'ready' });
    db.createTask({ id: 'task_child', title: 'Child Task', status: 'ready' });

    db.db.prepare("INSERT INTO blocking_edges (ticket_id, blocked_by_ticket_id) VALUES ('task_child', 'task_parent');").run();

    // Direct insertion of duplicate must throw UNIQUE constraint failed
    assert.throws(() => {
      db.db.prepare("INSERT INTO blocking_edges (ticket_id, blocked_by_ticket_id) VALUES ('task_child', 'task_parent');").run();
    }, /UNIQUE constraint failed/i);

    // Method insertBlockingEdge uses INSERT OR IGNORE and does not throw
    db.insertBlockingEdge('task_child', 'task_parent');
    const edges = db.db.prepare("SELECT * FROM blocking_edges WHERE ticket_id = 'task_child';").all();
    assert.strictEqual(edges.length, 1);
  });

  // [C2-2.1] 2-Node direct dependency cycle attack
  test('[C2-2.1] 2-Node cycle attack (A <-> B) is intercepted by Kahn algorithm before DB write', () => {
    const breaker = new TaskBreaker();
    const cyclicSubtasks = [
      { id: 'cycle_task_a', title: 'Task A', dependsOn: ['cycle_task_b'] },
      { id: 'cycle_task_b', title: 'Task B', dependsOn: ['cycle_task_a'] }
    ];

    assert.throws(() => {
      breaker.persistDAG(db, cyclicSubtasks);
    }, /Cycle detected in task dependencies! Topological sort failed\./);

    assert.strictEqual(db.getTask('cycle_task_a'), undefined);
    assert.strictEqual(db.getTask('cycle_task_b'), undefined);
    const edges = db.db.prepare("SELECT * FROM blocking_edges WHERE ticket_id IN ('cycle_task_a', 'cycle_task_b');").all();
    assert.strictEqual(edges.length, 0);
  });

  // [C2-2.2] 3-Node cycle, self-loop, and orphan dependency
  test('[C2-2.2] 3-Node cycle, self-loop, and missing blocker rejection', () => {
    const breaker = new TaskBreaker();

    // 3-node cycle
    const cycle3 = [
      { id: 'c3_a', title: 'A', dependsOn: ['c3_c'] },
      { id: 'c3_b', title: 'B', dependsOn: ['c3_a'] },
      { id: 'c3_c', title: 'C', dependsOn: ['c3_b'] }
    ];
    assert.throws(() => {
      breaker.persistDAG(db, cycle3);
    }, /Cycle detected in task dependencies!/);

    // Self-loop
    const selfLoop = [
      { id: 'self_loop_task', title: 'Self Loop', dependsOn: ['self_loop_task'] }
    ];
    assert.throws(() => {
      breaker.persistDAG(db, selfLoop);
    }, /Cycle detected in task dependencies!/);

    // Orphan dependency
    const orphan = [
      { id: 'orphan_a', title: 'Orphan A', dependsOn: ['non_existent_prerequisite'] }
    ];
    assert.throws(() => {
      breaker.persistDAG(db, orphan);
    }, /Invalid dependency: Subtask 'orphan_a' depends on non-existent 'non_existent_prerequisite'/);
  });

  // [C2-2.3] Diamond dependency frontier progression
  test('[C2-2.3] Diamond dependency frontier unblocks in exact topological order: A -> {B,C} -> D -> []', () => {
    const breaker = new TaskBreaker();
    const milestoneId = 'ms_diamond_flow';

    const diamondTasks = [
      { id: 'diamond_task_a', title: 'Task A (Root)', milestoneId, dependsOn: [] },
      { id: 'diamond_task_b', title: 'Task B (Left)', milestoneId, dependsOn: ['diamond_task_a'] },
      { id: 'diamond_task_c', title: 'Task C (Right)', milestoneId, dependsOn: ['diamond_task_a'] },
      { id: 'diamond_task_d', title: 'Task D (Sink)', milestoneId, dependsOn: ['diamond_task_b', 'diamond_task_c'] }
    ];

    breaker.persistDAG(db, diamondTasks);

    // Stage 1: Only A is ready
    let frontier = db.getReadyFrontier(milestoneId);
    assert.deepStrictEqual(frontier.map(t => t.id), ['diamond_task_a']);

    // Stage 2: A completed -> B and C become ready; D remains blocked
    db.markTicketStatus('diamond_task_a', 'completed');
    frontier = db.getReadyFrontier(milestoneId);
    assert.deepStrictEqual(frontier.map(t => t.id).sort(), ['diamond_task_b', 'diamond_task_c']);

    // Stage 3: B completed -> Only C is ready; D still blocked by C
    db.markTicketStatus('diamond_task_b', 'completed');
    frontier = db.getReadyFrontier(milestoneId);
    assert.deepStrictEqual(frontier.map(t => t.id), ['diamond_task_c']);

    // Stage 4: C completed -> Only D is ready
    db.markTicketStatus('diamond_task_c', 'completed');
    frontier = db.getReadyFrontier(milestoneId);
    assert.deepStrictEqual(frontier.map(t => t.id), ['diamond_task_d']);

    // Stage 5: D completed -> Frontier is empty
    db.markTicketStatus('diamond_task_d', 'completed');
    frontier = db.getReadyFrontier(milestoneId);
    assert.deepStrictEqual(frontier, []);
  });

  // [C2-3.1] clearContext single-message formatting & contract pass-through
  test('[C2-3.1] clearContext produces pristine 1-message array preserving contracts and 50-line rule', () => {
    const pipeline = new ExecutionPipeline({ workspaceRoot: tmpDir, db, verbose: false });
    const ticket = {
      id: 'subtask_3_core',
      title: 'Implement Core Endpoints',
      goal: 'Author minimal surgical functions',
      priority: 'high'
    };
    const upstreamContracts = {
      subtask_1_db: 'schema.sql',
      subtask_2_auth: 'auth.json'
    };

    const messages = pipeline.clearContext({ ticket, upstreamContracts });

    assert.strictEqual(Array.isArray(messages), true);
    assert.strictEqual(messages.length, 1);
    assert.strictEqual(messages[0].role, 'user');
    assert.ok(messages[0].content.includes('Implement Core Endpoints'));
    assert.ok(messages[0].content.includes('Author minimal surgical functions'));
    assert.ok(messages[0].content.includes('50-line diff limit'));
    assert.ok(messages[0].content.includes('subtask_1_db: schema.sql'));
    assert.ok(messages[0].content.includes('subtask_2_auth: auth.json'));
    assert.ok(messages[0].content.includes('[CONTEXT_CLEARED / SMART_ZONE_PRESERVED]'));
  });

  // [C2-3.2] Multi-ticket frontier execution context isolation
  test('[C2-3.2] runFrontier advances ready tickets with pristine message prompts', async () => {
    const pipeline = new ExecutionPipeline({ workspaceRoot: tmpDir, db, verbose: false });
    const breaker = new TaskBreaker();
    const milestoneId = 'ms_frontier_test';

    const subtasks = [
      { id: 'f_ticket_1', title: 'Ticket 1', milestoneId, dependsOn: [] },
      { id: 'f_ticket_2', title: 'Ticket 2', milestoneId, dependsOn: ['f_ticket_1'] }
    ];
    breaker.persistDAG(db, subtasks);

    const recordedCalls = [];
    const mockProvider = {
      name: 'mock-provider',
      validateConfig: () => ({ valid: true }),
      generate: async ({ messages }) => {
        recordedCalls.push(JSON.parse(JSON.stringify(messages)));
        return { text: `contract_for_ticket_${recordedCalls.length}` };
      }
    };

    const result = await pipeline.runFrontier({
      missionId: milestoneId,
      provider: mockProvider
    });

    assert.strictEqual(result.status, 'VERIFIED');
    assert.strictEqual(result.completedCount, 2);
    assert.deepStrictEqual(result.ticketsExecuted, ['f_ticket_1', 'f_ticket_2']);
    assert.strictEqual(recordedCalls.length, 2);

    // Each ticket was invoked with a clean 1-message prompt (free of past turns)
    assert.strictEqual(recordedCalls[0].length, 1);
    assert.ok(recordedCalls[0][0].content.includes('Ticket 1'));
    assert.strictEqual(recordedCalls[1].length, 1);
    assert.ok(recordedCalls[1][0].content.includes('Ticket 2'));
    assert.ok(recordedCalls[1][0].content.includes('contract_for_ticket_1'));
  });

  // [C2-4.1] Live database integrity check
  test('[C2-4.1] Live database company.db passes integrity_check and foreign_key_check', () => {
    const liveDbPath = path.resolve(__dirname, '../database/company.db');
    if (fs.existsSync(liveDbPath)) {
      const liveDb = new CompanyDatabase(liveDbPath);
      try {
        const integrity = liveDb.db.prepare('PRAGMA integrity_check;').get();
        assert.strictEqual(integrity.integrity_check, 'ok');

        const fkCheck = liveDb.db.prepare('PRAGMA foreign_key_check;').all();
        assert.strictEqual(fkCheck.length, 0);

        const journal = liveDb.db.prepare('PRAGMA journal_mode;').get();
        assert.strictEqual(journal.journal_mode, 'wal');
      } finally {
        liveDb.close();
      }
    }
  });
});
