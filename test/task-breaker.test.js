'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { TaskBreaker, DEPARTMENTS } = require('../src/engine/task-breaker');

test('🧩 TaskBreaker: Decomposes full-stack mission into structured subtasks', () => {
  const breaker = new TaskBreaker();
  const subtasks = breaker.decompose(
    'Build User Authentication with SQL database and responsive Login Form',
    'Include JWT tokens and bcrypt password hashing.'
  );

  assert.ok(Array.isArray(subtasks), 'Subtasks must be an array');
  assert.ok(subtasks.length >= 4, `Expected at least 4 subtasks, got ${subtasks.length}`);

  // Check that subtasks have required properties
  for (const st of subtasks) {
    assert.ok(st.id, 'Subtask missing id');
    assert.ok(st.title, 'Subtask missing title');
    assert.ok(st.goal, 'Subtask missing goal');
    assert.ok(st.department, 'Subtask missing department');
    assert.ok(st.assignedAgent, 'Subtask missing assignedAgent');
    assert.ok(Array.isArray(st.dependsOn), 'dependsOn must be an array');
    assert.ok(Array.isArray(st.fileWhitelist), 'fileWhitelist must be an array');
    assert.ok(st.microGate, 'Subtask missing microGate');
    assert.ok(st.contractOutput, 'Subtask missing contractOutput');
  }

  // Check specific departments mapped
  const deptNames = subtasks.map(s => s.department.name);
  assert.ok(deptNames.includes(DEPARTMENTS.DEPT_3_CORE.name), 'Must include Core Engineering & Database');
  assert.ok(deptNames.includes(DEPARTMENTS.DEPT_5_DESIGN.name), 'Must include Design & Frontend');
  assert.ok(deptNames.includes(DEPARTMENTS.DEPT_2_RED.name), 'Must include Red Team');
  assert.ok(deptNames.includes(DEPARTMENTS.DEPT_4_REALITY.name), 'Must include Reality Gate');
});

test('⛓️ TaskBreaker: Organizes subtasks into strictly staged topological DAG', () => {
  const breaker = new TaskBreaker();
  const subtasks = breaker.decompose('Create customer checkout portal with database schema and UI payment card');
  const stages = breaker.organizeStages(subtasks);

  assert.ok(Array.isArray(stages), 'Stages must be an array');
  assert.ok(stages.length >= 4, `Expected at least 4 stages, got ${stages.length}`);

  // Verify Stage 1 has zero dependencies
  const stage1 = stages[0];
  assert.strictEqual(stage1.stageNumber, 1);
  for (const t of stage1.tasks) {
    assert.strictEqual(t.dependsOn.length, 0, `Stage 1 task '${t.id}' must have zero dependencies`);
  }

  // Verify that any downstream task's dependencies appeared in strictly earlier stages
  const seenTaskIds = new Set();
  for (const t of stage1.tasks) {
    seenTaskIds.add(t.id);
  }

  for (let i = 1; i < stages.length; i++) {
    const stage = stages[i];
    for (const t of stage.tasks) {
      for (const depId of t.dependsOn) {
        assert.ok(seenTaskIds.has(depId), `Task '${t.id}' in stage ${stage.stageNumber} depends on '${depId}' which was not completed in an earlier stage!`);
      }
    }
    for (const t of stage.tasks) {
      seenTaskIds.add(t.id);
    }
  }
});

test('🛑 TaskBreaker: Throws clean error when dependency cycle is introduced', () => {
  const breaker = new TaskBreaker();
  const cyclicSubtasks = [
    {
      id: 'task_a',
      title: 'Task A',
      goal: 'Goal A',
      department: DEPARTMENTS.DEPT_3_CORE,
      assignedAgent: { name: 'Agent A' },
      dependsOn: ['task_b'],
      fileWhitelist: [],
      microGate: 'GATE',
      contractOutput: 'contract'
    },
    {
      id: 'task_b',
      title: 'Task B',
      goal: 'Goal B',
      department: DEPARTMENTS.DEPT_3_CORE,
      assignedAgent: { name: 'Agent B' },
      dependsOn: ['task_a'],
      fileWhitelist: [],
      microGate: 'GATE',
      contractOutput: 'contract'
    }
  ];

  assert.throws(
    () => breaker.organizeStages(cyclicSubtasks),
    /Cycle detected/i,
    'Expected cycle detection error'
  );
});

test('🖥️ TaskBreaker: Renders visual terminal Flight Board cleanly', () => {
  const breaker = new TaskBreaker();
  const subtasks = breaker.decompose('Add user profile and SQL database storage');
  const stages = breaker.organizeStages(subtasks);
  const board = breaker.renderFlightBoard('Add user profile and SQL database storage', stages);

  assert.ok(typeof board === 'string', 'Flight board must return string');
  assert.ok(board.includes('MISSION FLIGHT BOARD'), 'Must include Flight Board title');
  assert.ok(board.includes('STAGE 1'), 'Must include Stage 1');
  assert.ok(board.includes('Dr. Kofi Mensah'), 'Must list assigned specialist');
  assert.ok(board.includes('Angela Martin'), 'Must list Reality Gate specialist');
});
