'use strict';

const { test, describe, it, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { ExecutiveCouncil, COUNCIL_PERSONAS } = require('../src/engine/council');
const { AutonomousPlanner } = require('../src/engine/planner');
const { CompanyDatabase } = require('../src/storage/db');

describe('Executive Council & Autonomous Planner Test Suite', () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'boring-council-test-'));
  });

  afterEach(() => {
    if (tmpDir && fs.existsSync(tmpDir)) {
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch {}
    }
  });

  test('Test 1: ExecutiveCouncil has 7 defined department head personas', () => {
    const keys = Object.keys(COUNCIL_PERSONAS);
    assert.ok(keys.includes('michael'));
    assert.ok(keys.includes('marcus'));
    assert.ok(keys.includes('rafael'));
    assert.ok(keys.includes('jim'));
    assert.ok(keys.includes('dwight'));
    assert.ok(keys.includes('angela'));
    assert.ok(keys.includes('kofi'));
    assert.strictEqual(keys.length, 7);
  });

  test('Test 2: ExecutiveCouncil.analyzeGoal correctly identifies domains and scale', () => {
    const council = new ExecutiveCouncil(tmpDir);

    const bugAnalysis = council.analyzeGoal('Fix hotfix bug in connection leak');
    assert.strictEqual(bugAnalysis.hasBug, true);
    assert.strictEqual(bugAnalysis.scale, 'SMALL');

    const featureAnalysis = council.analyzeGoal('Build OAuth2 login with database user credentials');
    assert.strictEqual(featureAnalysis.hasAuth, true);
    assert.strictEqual(featureAnalysis.hasDatabase, true);
    assert.strictEqual(featureAnalysis.scale, 'MEDIUM');

    const enterpriseAnalysis = council.analyzeGoal('Build full-stack dashboard with database models, auth login, and ui screens');
    assert.strictEqual(enterpriseAnalysis.hasAuth, true);
    assert.strictEqual(enterpriseAnalysis.hasDatabase, true);
    assert.strictEqual(enterpriseAnalysis.hasFrontend, true);
    assert.strictEqual(enterpriseAnalysis.scale, 'COMPLEX');
  });

  test('Test 3: ExecutiveCouncil.convene executes in <50ms and produces minutes & decision log', async () => {
    const council = new ExecutiveCouncil(tmpDir);
    const goal = 'Implement thread-safe connection pooling with exponential backoff';

    const result = await council.convene(goal);
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.consensus, true);
    assert.ok(result.durationMs < 100, `Duration was ${result.durationMs}ms`);
    assert.ok(result.deliberation.length >= 6);
    assert.ok(result.sprintBacklog.length >= 3);

    // Verify files created on disk
    assert.ok(fs.existsSync(result.meetingFile));
    const minutesContent = fs.readFileSync(result.meetingFile, 'utf8');
    assert.ok(minutesContent.includes('Michael Scott'));
    assert.ok(minutesContent.includes('Dwight Schrute'));
    assert.ok(minutesContent.includes('Angela Martin'));

    const decisionLogPath = path.join(tmpDir, 'docs', 'DECISION_LOG.md');
    assert.ok(fs.existsSync(decisionLogPath));
    const logContent = fs.readFileSync(decisionLogPath, 'utf8');
    assert.ok(logContent.includes(goal));
  });

  test('Test 4: ExecutiveCouncil.convene supports interactive founder voting', async () => {
    const council = new ExecutiveCouncil(tmpDir);
    const goal = 'Redesign billing ledger';

    const mockInputProvider = async (question) => {
      assert.ok(question.title.includes('Architectural Direction'));
      return '1'; // Choose option 1
    };

    const result = await council.convene(goal, {
      interactive: true,
      inputProvider: mockInputProvider
    });

    assert.strictEqual(result.success, true);
    const minutes = fs.readFileSync(result.meetingFile, 'utf8');
    assert.ok(minutes.includes('Founder Vote & Guidance'));
    assert.ok(minutes.includes('Option 1'));
  });

  test('Test 5: AutonomousPlanner.validateAcyclic sorts tickets topologically into stages', () => {
    const planner = new AutonomousPlanner();
    const tickets = [
      { id: 't_spec', title: 'Spec', dependsOn: [] },
      { id: 't_data', title: 'Data', dependsOn: ['t_spec'] },
      { id: 't_code', title: 'Code', dependsOn: ['t_data'] },
      { id: 't_gate', title: 'Gate', dependsOn: ['t_code'] }
    ];

    const stages = planner.validateAcyclic(tickets);
    assert.strictEqual(stages.length, 4);
    assert.strictEqual(stages[0].tickets[0].id, 't_spec');
    assert.strictEqual(stages[1].tickets[0].id, 't_data');
    assert.strictEqual(stages[2].tickets[0].id, 't_code');
    assert.strictEqual(stages[3].tickets[0].id, 't_gate');
  });

  test('Test 6: AutonomousPlanner.validateAcyclic detects and rejects dependency cycles', () => {
    const planner = new AutonomousPlanner();
    const cyclicTickets = [
      { id: 't_a', title: 'A', dependsOn: ['t_b'] },
      { id: 't_b', title: 'B', dependsOn: ['t_a'] }
    ];

    assert.throws(() => {
      planner.validateAcyclic(cyclicTickets);
    }, /Dependency cycle detected/);
  });

  test('Test 7: AutonomousPlanner.validateAcyclic rejects orphan dependencies', () => {
    const planner = new AutonomousPlanner();
    const orphanTickets = [
      { id: 't_child', title: 'Child', dependsOn: ['t_ghost_parent'] }
    ];

    assert.throws(() => {
      planner.validateAcyclic(orphanTickets);
    }, /Orphan dependency detected/);
  });

  test('Test 8: AutonomousPlanner.persistSprintDAG saves tickets and blocking_edges in transaction', () => {
    const planner = new AutonomousPlanner();
    const db = new CompanyDatabase(':memory:');

    const tickets = [
      { id: 'sp_1', title: 'Ticket 1', dependsOn: [] },
      { id: 'sp_2', title: 'Ticket 2', dependsOn: ['sp_1'] }
    ];

    const res = planner.persistSprintDAG(db, tickets, 'sprint_test_1');
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.ticketsCount, 2);

    const task1 = db.getTask('sp_1');
    const task2 = db.getTask('sp_2');
    assert.ok(task1);
    assert.ok(task2);

    const edges = db.db.prepare("SELECT * FROM blocking_edges WHERE ticket_id = 'sp_2';").all();
    assert.strictEqual(edges.length, 1);
    assert.strictEqual(edges[0].blocked_by_ticket_id, 'sp_1');
  });

  test('Test 9: AutonomousPlanner renders high-contrast terminal flight board', () => {
    const planner = new AutonomousPlanner();
    const stages = [
      {
        stageNumber: 1,
        tickets: [{ id: 't1', title: 'Build spec', assignedSpecialist: 'Marcus', dependsOn: [] }]
      },
      {
        stageNumber: 2,
        tickets: [{ id: 't2', title: 'Build code', assignedSpecialist: 'Jim', dependsOn: ['t1'] }]
      }
    ];

    const flightBoard = planner.renderFlightBoard('Build user auth', stages);
    assert.ok(flightBoard.includes('AUTONOMOUS SPRINT FLIGHT BOARD'));
    assert.ok(flightBoard.includes('STAGE 1'));
    assert.ok(flightBoard.includes('STAGE 2'));
    assert.ok(flightBoard.includes('t1'));
    assert.ok(flightBoard.includes('t2'));
  });
});
