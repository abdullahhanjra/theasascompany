'use strict';

/**
 * @file src/storage/db.js
 * @description Native SQLite Ledger Database Adapter for The Boring Company OS.
 * Uses Node.js native `node:sqlite` (DatabaseSync) with zero external npm dependencies.
 * Provides transactional state persistence, execution leases, verification run logs,
 * token accounting, and tamper-proof governance audit events.
 */

const fs = require('fs');
const path = require('path');
let DatabaseSync;
try {
  DatabaseSync = require('node:sqlite').DatabaseSync;
} catch (e) {
  throw new Error(
    `The Boring Company OS native SQLite ledger requires Node.js >= 22.5.0 (found ${process.version}). Please upgrade Node.js.`
  );
}

const DEFAULT_DB_PATH = path.resolve(__dirname, '../../database/company.db');
const SCHEMA_FILE = path.resolve(__dirname, '../../database/schema.sql');

class CompanyDatabase {
  constructor(dbPath = DEFAULT_DB_PATH) {
    this.dbPath = dbPath;
    this.db = null;
    this.init();
  }

  init() {
    if (this.dbPath !== ':memory:') {
      const dir = path.dirname(this.dbPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }

    this.db = new DatabaseSync(this.dbPath);
    this.db.exec('PRAGMA journal_mode = WAL;');
    this.db.exec('PRAGMA foreign_keys = ON;');
    this.db.exec('PRAGMA busy_timeout = 5000;');

    // Check if tables already exist
    const checkTable = this.db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='tasks';").get();
    if (!checkTable) {
      if (fs.existsSync(SCHEMA_FILE)) {
        const ddl = fs.readFileSync(SCHEMA_FILE, 'utf8');
        this.db.exec(ddl);
      }
    }

    // Ensure default relational root entities exist
    this.db.exec(`
      INSERT OR IGNORE INTO companies (id, name, description, status, created_at, updated_at)
      VALUES ('comp_boring', 'The Boring Company Software', 'Autonomous Multi-Agent Enterprise', 'active', datetime('now'), datetime('now'));

      INSERT OR IGNORE INTO departments (id, company_id, name, description, created_at, updated_at)
      VALUES ('dept_eng', 'comp_boring', 'Engineering & Operations', 'Autonomous Software Delivery', datetime('now'), datetime('now'));

      INSERT OR IGNORE INTO positions (id, department_id, title, seniority, created_at, updated_at)
      VALUES ('pos_lead', 'dept_eng', 'Lead Software Engineer', 'STAFF', datetime('now'), datetime('now'));

      INSERT OR IGNORE INTO employees (id, company_id, position_id, department_id, name, display_name, status, seniority, created_at, updated_at)
      VALUES ('emp_jim', 'comp_boring', 'pos_lead', 'dept_eng', 'Jim Halpert', 'Jim (Lead Coder)', 'active', 'STAFF', datetime('now'), datetime('now'));

      INSERT OR IGNORE INTO employees (id, company_id, position_id, department_id, name, display_name, status, seniority, created_at, updated_at)
      VALUES ('emp_angela', 'comp_boring', 'pos_lead', 'dept_eng', 'Angela Martin', 'Angela (Reality Gate)', 'active', 'STAFF', datetime('now'), datetime('now'));

      INSERT OR IGNORE INTO products (id, company_id, name, description, status, created_at, updated_at)
      VALUES ('prod_default', 'comp_boring', 'Boring Software Suite', 'Core Autonomous Engineering', 'active', datetime('now'), datetime('now'));

      INSERT OR IGNORE INTO projects (id, product_id, name, description, status, created_at, updated_at)
      VALUES ('proj_default', 'prod_default', 'Autonomous Mission Engine', 'Engineering Task Pipeline', 'in_progress', datetime('now'), datetime('now'));

      INSERT OR IGNORE INTO milestones (id, project_id, title, description, status, created_at, updated_at)
      VALUES ('ms_default', 'proj_default', 'Continuous Engineering Delivery', 'Default Mission Milestone', 'in_progress', datetime('now'), datetime('now'));
    `);
  }

  createTask(task) {
    const id = task.id || `task_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const productId = task.productId || 'prod_default';
    const projectId = task.projectId || 'proj_default';
    const milestoneId = task.milestoneId || 'ms_default';
    const assignedEmployeeId = task.assignedEmployeeId || 'emp_jim';

    let status = (task.status || 'ready').toLowerCase();
    if (!['backlog', 'ready', 'in_progress', 'blocked', 'completed', 'cancelled'].includes(status)) {
      status = 'ready';
    }

    let priority = (task.priority || 'high').toLowerCase();
    if (!['urgent', 'high', 'medium', 'low'].includes(priority)) {
      priority = 'high';
    }

    const stmt = this.db.prepare(`
      INSERT INTO tasks (
        id, product_id, project_id, milestone_id, assigned_employee_id,
        title, description, status, priority,
        dependencies_json, acceptance_criteria_json, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, datetime('now'), datetime('now')
      );
    `);

    stmt.run(
      id,
      productId,
      projectId,
      milestoneId,
      assignedEmployeeId,
      task.title,
      task.description || '',
      status,
      priority,
      JSON.stringify(task.dependencies || []),
      JSON.stringify(task.acceptanceCriteria || [])
    );

    return this.getTask(id);
  }

  updateTaskStatus(taskId, status, metadata = {}) {
    let normalizedStatus = String(status).toLowerCase();
    if (normalizedStatus === 'verified' || normalizedStatus === 'done') {
      normalizedStatus = 'completed';
    }
    if (!['backlog', 'ready', 'in_progress', 'blocked', 'completed', 'cancelled'].includes(normalizedStatus)) {
      normalizedStatus = 'in_progress';
    }

    const stmt = this.db.prepare(`
      UPDATE tasks
      SET status = ?, updated_at = datetime('now')
      WHERE id = ?;
    `);
    stmt.run(normalizedStatus, taskId);

    if (metadata.error && metadata.executionId) {
      try {
        const errStmt = this.db.prepare(`
          INSERT INTO execution_events (
            id, execution_id, company_id, event_type, from_status, to_status,
            actor_employee_id, payload_json, timestamp
          ) VALUES (
            ?, ?, 'comp_boring', 'TASK_ERROR', 'RUNNING', 'FAILED',
            'emp_jim', ?, datetime('now')
          );
        `);
        errStmt.run(`evt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`, metadata.executionId, JSON.stringify({ taskId, error: metadata.error }));
      } catch {}
    }

    return this.getTask(taskId);
  }

  getTask(taskId) {
    return this.db.prepare('SELECT * FROM tasks WHERE id = ?;').get(taskId);
  }

  listTasks(status = null) {
    if (status) {
      return this.db.prepare('SELECT * FROM tasks WHERE status = ? ORDER BY created_at DESC;').all(status.toLowerCase());
    }
    return this.db.prepare('SELECT * FROM tasks ORDER BY created_at DESC;').all();
  }

  findExecutionByIdempotencyKey(key) {
    if (!key) return null;
    return this.db.prepare('SELECT * FROM executions WHERE idempotency_key = ?;').get(key);
  }

  saveCheckpoint(taskId, executionId, stepName, payload = {}) {
    const id = `chk_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const stmt = this.db.prepare(`
      INSERT INTO execution_events (
        id, execution_id, company_id, event_type, from_status, to_status,
        actor_employee_id, payload_json, timestamp
      ) VALUES (
        ?, ?, 'comp_boring', 'CHECKPOINT', 'RUNNING', 'RUNNING',
        'emp_jim', ?, datetime('now')
      );
    `);
    const data = JSON.stringify({ taskId, executionId, stepName, payload, timestamp: new Date().toISOString() });
    stmt.run(id, executionId, data);
    return id;
  }

  getLatestCheckpoint(taskId) {
    const events = this.db.prepare(`
      SELECT * FROM execution_events
      WHERE event_type = 'CHECKPOINT'
      ORDER BY timestamp DESC;
    `).all();

    for (const ev of events) {
      try {
        const parsed = JSON.parse(ev.payload_json);
        if (parsed.taskId === taskId) {
          return parsed;
        }
      } catch {}
    }
    return null;
  }

  reconcileOrphanedExecutions() {
    const orphaned = this.db.prepare(`
      SELECT * FROM executions
      WHERE status IN ('RUNNING', 'STARTING', 'ADMITTED', 'PROVISIONING')
    `).all();

    for (const exec of orphaned) {
      this.updateExecution(exec.id, {
        status: 'FAILED',
        outputTail: 'INTERRUPTED: Process restarted while execution was in active flight'
      });
      const task = this.getTask(exec.task_id);
      if (task && (task.status === 'in_progress' || task.status === 'ready')) {
        this.updateTaskStatus(task.id, 'blocked', { error: 'Interrupted by process termination or restart' });
      }
    }
    return orphaned;
  }

  recordExecution(exec) {
    const id = exec.id || `exec_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const idempotencyKey = exec.idempotencyKey || null;

    if (idempotencyKey) {
      const existing = this.findExecutionByIdempotencyKey(idempotencyKey);
      if (existing) {
        return existing.id;
      }
    }

    const employeeId = exec.employeeId || 'emp_jim';
    const providerId = exec.providerId || 'native_engine';
    const policyTier = exec.policyTier || 'CONTROLLED';
    const priority = exec.priority || 'HIGH';
    const status = exec.status || 'RUNNING';
    const timeoutMs = exec.timeoutMs || 60000;
    const taskInstructions = exec.taskInstructions || exec.instructions || 'Execute autonomous engineering task';

    const stmt = this.db.prepare(`
      INSERT INTO executions (
        id, company_id, task_id, employee_id, provider_id,
        policy_tier, priority, status, timeout_ms, task_instructions,
        idempotency_key, requested_at, launch_lease_token, input_tokens, output_tokens,
        created_at, updated_at
      ) VALUES (
        ?, 'comp_boring', ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, datetime('now'), ?, ?, ?,
        datetime('now'), datetime('now')
      );
    `);

    stmt.run(
      id,
      exec.taskId,
      employeeId,
      providerId,
      policyTier,
      priority,
      status,
      timeoutMs,
      taskInstructions,
      idempotencyKey,
      exec.leaseToken || `lease_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      exec.inputTokens || 0,
      exec.outputTokens || 0
    );

    return id;
  }

  updateExecution(execId, updates) {
    const fields = [];
    const values = [];

    if (updates.status) {
      fields.push('status = ?');
      values.push(updates.status);
    }
    if (updates.outputTail !== undefined) {
      fields.push('output_tail = ?');
      values.push(updates.outputTail);
    }
    if (updates.exitCode !== undefined) {
      fields.push('exit_code = ?');
      values.push(updates.exitCode);
    }
    if (updates.inputTokens !== undefined) {
      fields.push('input_tokens = ?');
      values.push(updates.inputTokens);
    }
    if (updates.outputTokens !== undefined) {
      fields.push('output_tokens = ?');
      values.push(updates.outputTokens);
    }
    if (updates.finishedAt) {
      fields.push('finished_at = ?');
      values.push(updates.finishedAt);
    }

    fields.push("updated_at = datetime('now')");

    const sql = `UPDATE executions SET ${fields.join(', ')} WHERE id = ?;`;
    values.push(execId);

    this.db.prepare(sql).run(...values);
  }

  createAcceptanceSpecification(spec) {
    const id = spec.id || `aspec_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const version = spec.version || 1;
    const policy = spec.policy || 'STRICT_OBJECTIVE_ONLY';
    const status = spec.status || 'ACTIVE';
    const createdBy = spec.createdBy || 'emp_angela';

    const stmt = this.db.prepare(`
      INSERT INTO acceptance_specifications (
        id, company_id, task_id, version, acceptance_policy, status,
        created_by_employee_id, created_at
      ) VALUES (
        ?, 'comp_boring', ?, ?, ?, ?,
        ?, datetime('now')
      );
    `);

    stmt.run(id, spec.taskId, version, policy, status, createdBy);
    return id;
  }

  addAcceptanceCriterion(criterion) {
    const id = criterion.id || `crit_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const type = criterion.type || 'TEST_SUITE_PASS';
    const name = criterion.name || 'Automated Test Reality Gate';
    const description = criterion.description || 'Exit code 0 and non-zero assertion count';
    const isMandatory = criterion.isMandatory !== undefined ? (criterion.isMandatory ? 1 : 0) : 1;
    const configJson = JSON.stringify(criterion.config || {});

    const stmt = this.db.prepare(`
      INSERT INTO acceptance_criteria (
        id, specification_id, criterion_type, name, description,
        is_mandatory, configuration_json, created_at
      ) VALUES (
        ?, ?, ?, ?, ?,
        ?, ?, datetime('now')
      );
    `);

    stmt.run(id, criterion.specificationId, type, name, description, isMandatory, configJson);
    return id;
  }

  recordVerification(verif) {
    const id = verif.id || `vrun_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    let specId = verif.specificationId;

    if (!specId) {
      // Find or create default spec for this task
      const existing = this.db.prepare('SELECT id FROM acceptance_specifications WHERE task_id = ?;').get(verif.taskId);
      if (existing) {
        specId = existing.id;
      } else {
        specId = this.createAcceptanceSpecification({ taskId: verif.taskId });
      }
    }

    const nonce = verif.nonce || `nonce_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const verifierId = verif.verifierId || 'emp_angela';
    const status = verif.passed ? 'PASSED' : 'FAILED';

    const stmt = this.db.prepare(`
      INSERT INTO verification_runs (
        id, company_id, task_id, execution_id, specification_id,
        specification_version, run_nonce, status, commit_sha, tree_sha,
        verifier_actor_id, started_at, finished_at, error_message
      ) VALUES (
        ?, 'comp_boring', ?, ?, ?,
        1, ?, ?, ?, ?,
        ?, datetime('now'), datetime('now'), ?
      );
    `);

    stmt.run(
      id,
      verif.taskId,
      verif.executionId,
      specId,
      nonce,
      status,
      verif.commitSha || 'local_working_tree',
      verif.treeSha || 'uncommitted_changes',
      verifierId,
      verif.errorMessage || null
    );

    return { id, specificationId: specId };
  }

  recordEvidence(evidence) {
    const id = evidence.id || `ev_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    let criterionId = evidence.criterionId;

    if (!criterionId) {
      // Find or create default criterion for specification
      const existing = this.db.prepare('SELECT id FROM acceptance_criteria WHERE specification_id = ?;').get(evidence.specificationId);
      if (existing) {
        criterionId = existing.id;
      } else {
        criterionId = this.addAcceptanceCriterion({
          specificationId: evidence.specificationId,
          type: 'TEST_SUITE_PASS',
          name: 'Reality Gate Exit Code Gate'
        });
      }
    }

    const evidenceClass = ['ProcessExit', 'TAPStream', 'FileDigest', 'GitWorktree', 'ArtifactManifest'].includes(evidence.evidenceClass)
      ? evidence.evidenceClass
      : 'ProcessExit';

    const stmt = this.db.prepare(`
      INSERT INTO evidence_records (
        id, company_id, task_id, verification_run_id, execution_id,
        criterion_id, evidence_class, sha256_digest, payload_json,
        captured_at, collector_actor_id
      ) VALUES (
        ?, 'comp_boring', ?, ?, ?,
        ?, ?, ?, ?,
        datetime('now'), ?
      );
    `);

    stmt.run(
      id,
      evidence.taskId,
      evidence.verificationRunId,
      evidence.executionId,
      criterionId,
      evidenceClass,
      evidence.sha256 || 'sha256_placeholder',
      typeof evidence.payload === 'string' ? evidence.payload : JSON.stringify(evidence.payload || {}),
      evidence.collectorId || 'emp_angela'
    );

    return id;
  }

  getVerification(verificationId) {
    return this.db.prepare('SELECT * FROM verification_runs WHERE id = ?;').get(verificationId);
  }

  getEvidenceForRun(verificationRunId) {
    return this.db.prepare('SELECT * FROM evidence_records WHERE verification_run_id = ?;').all(verificationRunId);
  }

  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

module.exports = { CompanyDatabase };
