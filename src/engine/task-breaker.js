'use strict';

/**
 * @file src/engine/task-breaker.js
 * @description Professional Task Breaker & Staged Dependency Sequencer (DAG)
 * for The Asas Company Autonomous Engineering Enterprise OS.
 *
 * Responsibilities:
 * 1. Deep Task Understanding & Domain Decomposition (WBS).
 * 2. Topological Dependency Sorting (Kahn's DAG Algorithm).
 * 3. Department Routing & Specialist Agent Assignment (72-Agent Roster).
 * 4. Contract Handoff Specification (Stage N output ➔ Stage N+1 input).
 * 5. Micro-Reality-Gate Assignment per stage.
 * 6. Pure Node.js — Zero external dependencies.
 */

// Official 6 Departments and Primary Specialists
const DEPARTMENTS = {
  DEPT_1_EXEC: {
    id: 'DEPT_1_EXEC',
    num: 1,
    name: 'Executive Board & Strategy',
    lead: 'Michael Scott (CEO) & Marcus Chen (CPO)',
    defaultAgent: { id: 'company_cpo', name: 'Marcus Chen', role: 'Chief Product Officer' }
  },
  DEPT_2_RED: {
    id: 'DEPT_2_RED',
    num: 2,
    name: 'The Red Team & Security Guard',
    lead: 'Dwight Schrute (Red Team Lead) & Hank Tate (Security Sentinel)',
    defaultAgent: { id: 'company_inquisitor', name: 'Dwight Schrute', role: 'Adversarial Inquisitor' }
  },
  DEPT_3_CORE: {
    id: 'DEPT_3_CORE',
    num: 3,
    name: 'Core Engineering & Database',
    lead: 'Jim Halpert (Lead Coder) & Dr. Kofi Mensah (DBA)',
    defaultAgent: { id: 'company_coder', name: 'Jim Halpert', role: 'Lead Minimal Coder' }
  },
  DEPT_4_REALITY: {
    id: 'DEPT_4_REALITY',
    num: 4,
    name: 'Delivery, QA & Reality Gate',
    lead: 'Angela Martin (Reality Gate Auditor) & Ryan Howard (TDD)',
    defaultAgent: { id: 'company_angela', name: 'Angela Martin', role: 'Reality Gate Auditor' }
  },
  DEPT_5_DESIGN: {
    id: 'DEPT_5_DESIGN',
    num: 5,
    name: 'Design, Brand & User Interface',
    lead: 'Pam Beesly (Frontend DOM) & Zara Ahmed (Senior UX)',
    defaultAgent: { id: 'company_ui', name: 'Pam Beesly', role: 'Frontend DOM Architect' }
  },
  DEPT_6_OPS: {
    id: 'DEPT_6_OPS',
    num: 6,
    name: 'Operations & SRE',
    lead: 'Darryl Philbin (VP Ops) & Dr. Amira Hassan (Principal SRE)',
    defaultAgent: { id: 'company_vpops', name: 'Darryl Philbin', role: 'VP Operations' }
  }
};

class TaskBreaker {
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * Deconstructs any mission prompt into structured, domain-bound subtasks.
   * @param {string} title - Mission title or short prompt.
   * @param {string} [description] - Extended task instructions.
   * @returns {Array<object>} Array of structured subtasks with dependencies.
   */
  decompose(title, description = '') {
    const text = `${title} ${description}`.toLowerCase();
    const subtasks = [];

    const hasDatabase = /db|database|sqlite|postgres|sql|schema|migration|model|table|column|entity/i.test(text);
    const hasFrontend = /ui|frontend|css|html|view|page|form|button|modal|component|screen|design|card|layout|navbar/i.test(text);
    const hasAuth = /auth|login|signup|jwt|session|token|password|logout|credential/i.test(text);
    const hasApi = /api|endpoint|route|backend|controller|service|crud|rest|graphql|handler/i.test(text) || hasAuth;

    let subtaskIndex = 1;

    // Stage 1: Foundation (Database & Schema) if applicable
    let dbSubtaskId = null;
    if (hasDatabase || hasAuth) {
      dbSubtaskId = `subtask_${subtaskIndex++}_db`;
      subtasks.push({
        id: dbSubtaskId,
        title: 'Define Relational Schema & State Storage Models',
        goal: 'Author database tables, indexes, and migrations with backwards compatibility.',
        department: DEPARTMENTS.DEPT_3_CORE,
        assignedAgent: { id: 'company_dba', name: 'Dr. Kofi Mensah', role: 'Database Reliability Engineer' },
        dependsOn: [],
        fileWhitelist: ['database/**', 'src/storage/**', 'schema.sql', 'migrations/**'],
        microGate: 'SCHEMA_SYNTAX_VALIDATION',
        contractOutput: 'schema.sql'
      });
    }

    // Stage 2: Core Engineering / Business Logic / API
    let apiSubtaskId = `subtask_${subtaskIndex++}_core`;
    const coreDependsOn = dbSubtaskId ? [dbSubtaskId] : [];
    subtasks.push({
      id: apiSubtaskId,
      title: 'Implement Core Business Logic & Endpoints',
      goal: 'Author minimal surgical functions and handlers satisfying the functional requirement.',
      department: DEPARTMENTS.DEPT_3_CORE,
      assignedAgent: { id: 'company_coder', name: 'Jim Halpert', role: 'Lead Minimal Coder' },
      dependsOn: coreDependsOn,
      fileWhitelist: ['src/**', 'lib/**', 'routes/**', 'controllers/**', 'api/**', 'server.js'],
      microGate: 'UNIT_TEST_ASSERTIONS',
      contractOutput: 'api_contract.json'
    });

    // Stage 3: User Interface & Frontend if applicable
    let uiSubtaskId = null;
    if (hasFrontend || (!hasDatabase && !hasApi)) {
      uiSubtaskId = `subtask_${subtaskIndex++}_ui`;
      const uiDependsOn = [apiSubtaskId];
      subtasks.push({
        id: uiSubtaskId,
        title: 'Author User Interface, Components & Responsive Views',
        goal: 'Implement accessible, semantic markup, high-contrast styles, and responsive layout.',
        department: DEPARTMENTS.DEPT_5_DESIGN,
        assignedAgent: { id: 'company_ui', name: 'Pam Beesly', role: 'Frontend DOM Architect' },
        dependsOn: uiDependsOn,
        fileWhitelist: ['public/**', 'views/**', 'components/**', 'src/ui/**', 'style.css', 'index.html'],
        microGate: 'COMPILER_BUILD_AND_LINT',
        contractOutput: 'ui_bundle.manifest'
      });
    }

    // Stage 4: Red Team & Security Probe
    const redTeamSubtaskId = `subtask_${subtaskIndex++}_red`;
    const redDependsOn = [apiSubtaskId];
    if (uiSubtaskId) redDependsOn.push(uiSubtaskId);

    subtasks.push({
      id: redTeamSubtaskId,
      title: 'Adversarial Security & Edge-Case Probing',
      goal: 'Audit injection vectors, unhandled rejections, parameter tampering, and concurrency leaks.',
      department: DEPARTMENTS.DEPT_2_RED,
      assignedAgent: { id: 'company_inquisitor', name: 'Dwight Schrute', role: 'Adversarial Inquisitor' },
      dependsOn: redDependsOn,
      fileWhitelist: ['test/**', 'audit/**'],
      microGate: 'ADVERSARIAL_EDGE_PROBE',
      contractOutput: 'security_audit_report.json'
    });

    // Stage 5: Final Reality Gate Verification
    const realitySubtaskId = `subtask_${subtaskIndex++}_reality`;
    subtasks.push({
      id: realitySubtaskId,
      title: 'Automated Reality Gate Certification ($? === 0)',
      goal: 'Execute native machine test runner, verify zero post-verification mutations, and stamp ledger.',
      department: DEPARTMENTS.DEPT_4_REALITY,
      assignedAgent: { id: 'company_angela', name: 'Angela Martin', role: 'Reality Gate Auditor' },
      dependsOn: [redTeamSubtaskId],
      fileWhitelist: ['test/**', 'package.json'],
      microGate: 'REALITY_GATE_CLEAN_EXIT',
      contractOutput: 'reality_gate_certificate.json'
    });

    return subtasks;
  }

  /**
   * Performs Kahn's algorithm (Topological Sort) to organize subtasks into sequential stages.
   * Subtasks with no inter-dependencies inside the same stage can run in parallel.
   * @param {Array<object>} subtasks - Decomposed subtasks.
   * @returns {Array<object>} Array of stages, each containing parallel-ready subtasks.
   */
  organizeStages(subtasks) {
    const taskMap = new Map();
    const inDegree = new Map();
    const adjList = new Map();

    for (const st of subtasks) {
      taskMap.set(st.id, st);
      inDegree.set(st.id, st.dependsOn.length);
      adjList.set(st.id, []);
    }

    // Build adjacency list
    for (const st of subtasks) {
      for (const depId of st.dependsOn) {
        if (!adjList.has(depId)) {
          throw new Error(`Invalid dependency: Subtask '${st.id}' depends on non-existent '${depId}'`);
        }
        adjList.get(depId).push(st.id);
      }
    }

    const stages = [];
    let currentTier = [];

    // Find all zero-in-degree nodes (Root tasks)
    for (const [id, deg] of inDegree.entries()) {
      if (deg === 0) {
        currentTier.push(id);
      }
    }

    let processedCount = 0;
    let stageNumber = 1;

    while (currentTier.length > 0) {
      const stageTasks = currentTier.map(id => {
        const task = taskMap.get(id);
        return {
          ...task,
          stage: stageNumber,
          canRunInParallel: currentTier.length > 1
        };
      });

      stages.push({
        stageNumber,
        tasks: stageTasks
      });

      processedCount += currentTier.length;
      const nextTier = [];

      for (const id of currentTier) {
        for (const neighbor of adjList.get(id)) {
          const newDeg = inDegree.get(neighbor) - 1;
          inDegree.set(neighbor, newDeg);
          if (newDeg === 0) {
            nextTier.push(neighbor);
          }
        }
      }

      currentTier = nextTier;
      stageNumber++;
    }

    if (processedCount !== subtasks.length) {
      throw new Error('Cycle detected in task dependencies! Topological sort failed.');
    }

    return stages;
  }

  /**
   * Validates DAG with Kahn's algorithm and persists tasks and blocking edges in an atomic transaction.
   * @param {object} db - CompanyDatabase instance.
   * @param {Array<object>} subtasks - Subtasks to persist.
   * @returns {object} Summary of persisted DAG.
   */
  persistDAG(db, subtasks) {
    const stages = this.organizeStages(subtasks);
    return db.executeInTransaction(() => {
      for (const st of subtasks) {
        db.createTask({
          id: st.id,
          title: st.title,
          description: st.goal || st.description || '',
          milestoneId: st.milestoneId || 'ms_default',
          projectId: st.projectId || 'proj_default',
          status: 'ready',
          priority: 'high',
          dependencies: st.dependsOn || [],
          acceptanceCriteria: st.microGate ? [st.microGate] : []
        });
      }
      for (const st of subtasks) {
        for (const depId of (st.dependsOn || [])) {
          db.insertBlockingEdge(st.id, depId);
        }
      }
      return { success: true, subtasksCount: subtasks.length, stagesCount: stages.length, stages };
    });
  }

  /**
   * Generates a clean, readable ASCII flight-control board of the execution plan.
   * @param {string} missionTitle - Mission title.
   * @param {Array<object>} stages - Staged execution plan.
   * @returns {string} Formatted terminal string.
   */
  renderFlightBoard(missionTitle, stages) {
    let out = '\n';
    out += '╔══════════════════════════════════════════════════════════════════════════════════════╗\n';
    out += '║                🏛️ THE ASAS COMPANY — STAGED MISSION FLIGHT BOARD                     ║\n';
    out += `║ Mission: ${missionTitle.padEnd(76).slice(0, 76)} ║\n`;
    out += '╠══════════════════════════════════════════════════════════════════════════════════════╣\n';

    for (const stage of stages) {
      const parallelTag = stage.tasks.length > 1 ? ' [PARALLEL BATCH]' : ' [SEQUENTIAL]';
      out += `║ STAGE ${stage.stageNumber}${parallelTag.padEnd(74)} ║\n`;

      for (const t of stage.tasks) {
        out += `║   ├─ 🏛️  Dept: ${t.department.name.padEnd(30).slice(0, 30)} (Specialist: ${t.assignedAgent.name}) ║\n`;
        out += `║   │   └─ Goal: ${t.goal.padEnd(68).slice(0, 68)} ║\n`;
        out += `║   │   └─ Micro-Gate: ${t.microGate.padEnd(62).slice(0, 62)} ║\n`;
      }
      out += '╟──────────────────────────────────────────────────────────────────────────────────────╢\n';
    }

    out += '║ Policy: Downstream stages are locked until upstream contracts pass Micro-Gates.      ║\n';
    out += '╚══════════════════════════════════════════════════════════════════════════════════════╝\n';
    return out;
  }
}

module.exports = {
  TaskBreaker,
  DEPARTMENTS
};
