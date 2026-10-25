'use strict';

/**
 * @file src/engine/planner.js
 * @description Autonomous Sprint Planner & Relational DAG Sequencer
 * for The Asas Company Autonomous Engineering Enterprise OS.
 *
 * Responsibilities:
 * 1. Takes Executive Council decisions and translates them into an acyclic topological DAG.
 * 2. Validates DAG acyclicity via Kahn's algorithm before writing to SQLite.
 * 3. Persists tickets and blocking_edges into SQLite company.db atomically inside a transaction.
 * 4. Renders an executive ASCII Flight Board for terminal display.
 * 5. Interfaces with ExecutionPipeline.runFrontier() to drive autonomous execution.
 *
 * Pure Node.js — Zero external runtime npm dependencies.
 */

const { CompanyDatabase } = require('../storage/db');

class AutonomousPlanner {
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * Validates that an array of tickets forms an acyclic directed graph (DAG) using Kahn's algorithm.
   * Throws an error if a cycle or unresolvable dependency is detected.
   * @param {Array<object>} tickets
   * @returns {Array<object>} Topologically ordered stages
   */
  validateAcyclic(tickets) {
    const ticketMap = new Map();
    const inDegree = new Map();
    const adj = new Map();

    for (const t of tickets) {
      ticketMap.set(t.id, t);
      inDegree.set(t.id, 0);
      adj.set(t.id, []);
    }

    // Verify all dependencies exist and build adjacency
    for (const t of tickets) {
      for (const depId of (t.dependsOn || [])) {
        if (!ticketMap.has(depId)) {
          throw new Error(`Orphan dependency detected: Ticket '${t.id}' depends on non-existent '${depId}'`);
        }
        adj.get(depId).push(t.id);
        inDegree.set(t.id, inDegree.get(t.id) + 1);
      }
    }

    // Queue of nodes with zero in-degree
    const queue = [];
    for (const [id, deg] of inDegree.entries()) {
      if (deg === 0) queue.push(id);
    }

    const order = [];
    while (queue.length > 0) {
      const u = queue.shift();
      order.push(u);

      for (const v of adj.get(u)) {
        inDegree.set(v, inDegree.get(v) - 1);
        if (inDegree.get(v) === 0) {
          queue.push(v);
        }
      }
    }

    if (order.length !== tickets.length) {
      throw new Error(`Dependency cycle detected in sprint tickets! Topological sort could only resolve ${order.length} of ${tickets.length} tickets.`);
    }

    // Group into execution stages
    const depthMap = new Map();
    for (const id of order) {
      const t = ticketMap.get(id);
      let maxDepDepth = -1;
      for (const depId of (t.dependsOn || [])) {
        maxDepDepth = Math.max(maxDepDepth, depthMap.get(depId) || 0);
      }
      depthMap.set(id, maxDepDepth + 1);
    }

    const maxDepth = Math.max(...Array.from(depthMap.values()), 0);
    const stages = [];
    for (let d = 0; d <= maxDepth; d++) {
      const stageTickets = order
        .filter(id => depthMap.get(id) === d)
        .map(id => ticketMap.get(id));
      if (stageTickets.length > 0) {
        stages.push({ stageNumber: d + 1, tickets: stageTickets });
      }
    }

    return stages;
  }

  /**
   * Persists council sprint tickets into SQLite tasks and blocking_edges tables in an atomic transaction.
   * @param {CompanyDatabase|string} db - CompanyDatabase instance or SQLite DB path.
   * @param {Array<object>} tickets - Array of sprint tickets from Executive Council.
   * @param {string} [milestoneId='sprint_latest']
   * @returns {object} Summary of persisted plan
   */
  persistSprintDAG(db, tickets, milestoneId = 'sprint_latest') {
    const database = (typeof db === 'string' || !db)
      ? new CompanyDatabase(typeof db === 'string' ? db : './database/company.db')
      : db;

    // Validate acyclicity before DB operations
    const stages = this.validateAcyclic(tickets);

    return database.executeInTransaction(() => {
      // Create tasks
      for (const t of tickets) {
        database.createTask({
          id: t.id,
          title: t.title,
          description: t.goal || t.title,
          milestoneId,
          projectId: 'proj_boring',
          status: 'ready',
          priority: 'high',
          dependencies: t.dependsOn || [],
          acceptanceCriteria: t.microGate ? [t.microGate] : []
        });
      }

      // Create blocking edges
      for (const t of tickets) {
        for (const depId of (t.dependsOn || [])) {
          database.insertBlockingEdge(t.id, depId);
        }
      }

      return {
        success: true,
        ticketsCount: tickets.length,
        stagesCount: stages.length,
        stages,
        readyFrontier: database.getReadyFrontier(milestoneId)
      };
    });
  }

  /**
   * Renders an executive ASCII Flight Board representing the staged sprint plan.
   * @param {string} goal - Mission goal.
   * @param {Array<object>} stages - Topologically ordered stages.
   * @returns {string}
   */
  renderFlightBoard(goal, stages) {
    const border = '\x1b[36m' + '═'.repeat(82) + '\x1b[0m';
    const lines = [
      '',
      border,
      `\x1b[1m\x1b[32m🏛️  THE ASAS COMPANY — AUTONOMOUS SPRINT FLIGHT BOARD\x1b[0m`,
      `\x1b[90mTarget Objective:\x1b[0m \x1b[1m"${goal}"\x1b[0m`,
      border,
      ''
    ];

    for (const stage of stages) {
      lines.push(`\x1b[1m\x1b[33mSTAGE ${stage.stageNumber}\x1b[0m (${stage.tickets.length} atomic ticket${stage.tickets.length > 1 ? 's' : ''}):`);
      for (const t of stage.tickets) {
        const blockerText = (t.dependsOn && t.dependsOn.length > 0)
          ? `\x1b[31m[blocked by: ${t.dependsOn.join(', ')}]\x1b[0m`
          : `\x1b[32m[READY ON FRONTIER]\x1b[0m`;
        lines.push(`  ├─ \x1b[36m${t.id}\x1b[0m: \x1b[1m${t.title}\x1b[0m`);
        lines.push(`  │  \x1b[90mSpecialist:\x1b[0m ${t.assignedSpecialist || 'Team'} | \x1b[90mGate:\x1b[0m \x1b[35m${t.microGate || 'TEST_PASS'}\x1b[0m | ${blockerText}`);
      }
      lines.push('  │');
    }

    lines.push(`  └─ \x1b[1m\x1b[32mREALITY GATE INTERLOCK:\x1b[0m Exit code 0 ($? === 0) & 50-line diff guard`);
    lines.push(border);
    lines.push('');

    return lines.join('\n');
  }
}

module.exports = {
  AutonomousPlanner
};
