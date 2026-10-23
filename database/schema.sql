-- ================================================================
-- The Boring Company Software: Relational Operating Schema DDL
-- Autonomous Multi-Agent Engineering Enterprise Engine
-- ================================================================


CREATE TABLE "acceptance_criteria" (
      id TEXT PRIMARY KEY,
      specification_id TEXT NOT NULL,
      criterion_type TEXT NOT NULL CHECK(criterion_type IN (
        'FILE_EXISTS', 'FILE_ABSENT', 'FILE_CONTENT_REGEX',
        'COMMAND_EXIT_CODE', 'COMMAND_EXIT', 'TEST_SUITE_PASS', 'TEST_SUITE',
        'GIT_CLEAN_WORKTREE', 'GIT_WORKTREE', 'ARTIFACT_MANIFEST', 'ARTIFACT_PRESENT',
        'FILE_HASH', 'HUMAN_REVIEW'
      )),
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      is_mandatory INTEGER NOT NULL DEFAULT 1 CHECK(is_mandatory IN (0, 1)),
      configuration_json TEXT NOT NULL DEFAULT '{}',
      created_at TEXT NOT NULL,
      FOREIGN KEY (specification_id) REFERENCES acceptance_specifications(id) ON DELETE CASCADE
    );

CREATE TABLE acceptance_specifications (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      task_id TEXT NOT NULL,
      version INTEGER NOT NULL DEFAULT 1,
      acceptance_policy TEXT NOT NULL DEFAULT 'STRICT_OBJECTIVE_ONLY' CHECK(acceptance_policy IN ('STRICT_OBJECTIVE_ONLY', 'ALLOW_HUMAN_EXCEPTION')),
      status TEXT NOT NULL DEFAULT 'DRAFT' CHECK(status IN ('DRAFT', 'ACTIVE', 'SUPERSEDED', 'ARCHIVED')),
      created_by_employee_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      frozen_at TEXT,
      FOREIGN KEY (company_id) REFERENCES companies(id),
      FOREIGN KEY (task_id) REFERENCES tasks(id),
      UNIQUE(task_id, version)
    );

CREATE TABLE active_emergency_freezes (
      company_id TEXT NOT NULL,
      freeze_tier TEXT NOT NULL,
      target_id TEXT NOT NULL DEFAULT '*',
      event_id TEXT NOT NULL,
      tripped_by_actor_id TEXT NOT NULL,
      tripped_at TEXT NOT NULL,
      PRIMARY KEY (company_id, freeze_tier, target_id),
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
      FOREIGN KEY (event_id) REFERENCES emergency_control_events(id) ON DELETE CASCADE
    );

CREATE TABLE agent_definition_references (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL CHECK(source IN ('internal', 'agency-agents', 'custom')),
  name TEXT NOT NULL,
  version TEXT,
  description TEXT,
  tags_json TEXT NOT NULL DEFAULT '[]',
  metadata_json TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE agent_definitions (
      id TEXT NOT NULL,
      version TEXT NOT NULL,
      name TEXT NOT NULL,
      division TEXT NOT NULL,
      source TEXT NOT NULL,
      license TEXT NOT NULL,
      attribution TEXT NOT NULL,
      description TEXT NOT NULL,
      capabilities_json TEXT NOT NULL,
      responsibilities_json TEXT NOT NULL,
      deliverables_json TEXT NOT NULL,
      seniority_hints_json TEXT NOT NULL,
      suggested_position TEXT NOT NULL,
      suggested_department TEXT NOT NULL,
      content_hash TEXT NOT NULL,
      created_at TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'active', constraints_json TEXT, system_instructions TEXT, source_metadata_json TEXT,
      PRIMARY KEY (id, version)
    );

CREATE TABLE candidate_lessons (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      project_id TEXT,
      originating_execution_id TEXT,
      originating_employee_id TEXT NOT NULL,
      trigger_condition TEXT NOT NULL,
      failure_category TEXT,
      hypothesis TEXT NOT NULL,
      recommended_action TEXT NOT NULL,
      review_status TEXT NOT NULL CHECK(review_status IN ('PENDING', 'ACCEPTED', 'REJECTED', 'MERGED')),
      reviewed_by_actor_id TEXT,
      rejection_reason TEXT,
      promoted_knowledge_item_id TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE RESTRICT,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL,
      FOREIGN KEY (originating_execution_id) REFERENCES executions(id) ON DELETE SET NULL,
      FOREIGN KEY (originating_employee_id) REFERENCES employees(id) ON DELETE RESTRICT,
      FOREIGN KEY (promoted_knowledge_item_id) REFERENCES knowledge_items(id) ON DELETE SET NULL
    );

CREATE TABLE capability_gaps (
  id TEXT PRIMARY KEY,
  management_plan_id TEXT NOT NULL,
  capability TEXT NOT NULL,
  seniority TEXT NOT NULL,
  reason TEXT NOT NULL,
  required_for_project_id TEXT NOT NULL,
  urgency TEXT NOT NULL CHECK(urgency IN ('immediate', 'upcoming', 'future')),
  status TEXT NOT NULL CHECK(status IN ('identified', 'requested', 'fulfilled', 'waived')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (management_plan_id) REFERENCES management_plans(id) ON DELETE CASCADE
);

CREATE TABLE certification_audit_events (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      task_id TEXT NOT NULL,
      event_type TEXT NOT NULL CHECK(event_type IN (
        'SPEC_FROZEN', 'RUN_STARTED', 'RUN_FINISHED', 'CERT_ISSUED',
        'CERT_REVOKED', 'HUMAN_OVERRIDE_RECORDED', 'TASK_COMPLETED_WITH_CERTIFICATE'
      )),
      actor_id TEXT NOT NULL,
      payload_json TEXT NOT NULL DEFAULT '{}',
      created_at TEXT NOT NULL,
      FOREIGN KEY (company_id) REFERENCES companies(id),
      FOREIGN KEY (task_id) REFERENCES tasks(id)
    );

CREATE TABLE certification_revocations (
      id TEXT PRIMARY KEY,
      certification_id TEXT NOT NULL,
      revoked_by_employee_id TEXT NOT NULL,
      reason TEXT NOT NULL,
      revoked_at TEXT NOT NULL,
      incident_report_uri TEXT,
      FOREIGN KEY (certification_id) REFERENCES quality_certifications(id),
      FOREIGN KEY (revoked_by_employee_id) REFERENCES employees(id)
    );

CREATE TABLE collaboration_requests (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      from_employee_id TEXT NOT NULL,
      to_employee_id TEXT NOT NULL,
      project_id TEXT NOT NULL,
      title TEXT NOT NULL,
      request_details TEXT NOT NULL,
      reason TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('OPEN', 'ACCEPTED', 'IN_PROGRESS', 'BLOCKED', 'COMPLETED', 'REJECTED', 'CANCELLED')),
      response_summary TEXT,
      rejection_reason TEXT,
      blocked_reason TEXT,
      idempotency_key TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
      FOREIGN KEY (from_employee_id) REFERENCES employees(id) ON DELETE CASCADE,
      FOREIGN KEY (to_employee_id) REFERENCES employees(id) ON DELETE CASCADE,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    );

CREATE TABLE companies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL CHECK(status IN ('active', 'inactive', 'archived')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE delegations (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      task_id TEXT,
      parent_assignment_id TEXT,
      child_assignment_id TEXT NOT NULL,
      delegator_employee_id TEXT NOT NULL,
      delegatee_employee_id TEXT NOT NULL,
      reason TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'revoked', 'completed')),
      delegated_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
      FOREIGN KEY (delegator_employee_id) REFERENCES employees(id) ON DELETE RESTRICT,
      FOREIGN KEY (delegatee_employee_id) REFERENCES employees(id) ON DELETE RESTRICT,
      FOREIGN KEY (child_assignment_id) REFERENCES work_assignments(id) ON DELETE CASCADE
    );

CREATE TABLE departments (
  id TEXT PRIMARY KEY,
  company_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

CREATE TABLE emergency_control_events (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      event_type TEXT NOT NULL CHECK(event_type IN ('TRIP', 'RELEASE')),
      freeze_tier TEXT NOT NULL CHECK(freeze_tier IN (
        'EXECUTION_FREEZE',
        'TASK_TRANSITION_FREEZE',
        'PLANNING_FREEZE',
        'WORKFORCE_FREEZE',
        'PROVIDER_FREEZE',
        'MASTER_KILL_SWITCH'
      )),
      target_id TEXT NOT NULL DEFAULT '*',
      actor_id TEXT NOT NULL,
      actor_role TEXT NOT NULL,
      reason TEXT NOT NULL,
      idempotency_key TEXT UNIQUE,
      created_at TEXT NOT NULL,
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
    );

CREATE TABLE employee_hiring_records (
      hiring_record_id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      idempotency_key TEXT NOT NULL,
      hiring_request_id TEXT NOT NULL,
      capability_gap_id TEXT,
      agent_definition_id TEXT NOT NULL,
      agent_definition_version TEXT NOT NULL,
      employee_id TEXT NOT NULL,
      status TEXT NOT NULL,
      hired_at TEXT NOT NULL,
      match_reason TEXT NOT NULL,
      metadata_json TEXT NOT NULL,
      UNIQUE (company_id, idempotency_key),
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
      FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
    );

CREATE TABLE employee_performance_records (
      employee_id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      total_assignments_completed INTEGER NOT NULL DEFAULT 0,
      total_executions_attempted INTEGER NOT NULL DEFAULT 0,
      total_executions_succeeded INTEGER NOT NULL DEFAULT 0,
      total_executions_failed INTEGER NOT NULL DEFAULT 0,
      total_tokens_consumed INTEGER NOT NULL DEFAULT 0,
      total_cost_usd REAL NOT NULL DEFAULT 0.0,
      mean_execution_duration_ms INTEGER NOT NULL DEFAULT 0,
      last_execution_at TEXT,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE RESTRICT,
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE RESTRICT
    );

CREATE TABLE employees (
  id TEXT PRIMARY KEY,
  company_id TEXT NOT NULL,
  position_id TEXT NOT NULL,
  department_id TEXT NOT NULL,
  team_id TEXT,
  manager_employee_id TEXT,
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('active', 'inactive', 'suspended', 'archived', 'terminated', 'proposed')),
  seniority TEXT NOT NULL,
  capabilities_json TEXT NOT NULL DEFAULT '[]',
  agent_definition_id TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL, max_concurrent_assignments INTEGER DEFAULT 3,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  FOREIGN KEY (position_id) REFERENCES positions(id) ON DELETE RESTRICT,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE RESTRICT,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL,
  FOREIGN KEY (agent_definition_id) REFERENCES agent_definition_references(id) ON DELETE SET NULL
);

CREATE TABLE evidence_records (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      task_id TEXT NOT NULL,
      verification_run_id TEXT NOT NULL,
      execution_id TEXT NOT NULL,
      criterion_id TEXT NOT NULL,
      evidence_class TEXT NOT NULL CHECK(evidence_class IN (
        'ProcessExit', 'TAPStream', 'FileDigest', 'GitWorktree', 'ArtifactManifest'
      )),
      sha256_digest TEXT NOT NULL,
      payload_json TEXT NOT NULL DEFAULT '{}',
      captured_at TEXT NOT NULL,
      collector_actor_id TEXT NOT NULL,
      FOREIGN KEY (company_id) REFERENCES companies(id),
      FOREIGN KEY (task_id) REFERENCES tasks(id),
      FOREIGN KEY (criterion_id) REFERENCES acceptance_criteria(id),
      FOREIGN KEY (verification_run_id, execution_id) REFERENCES verification_runs(id, execution_id) ON DELETE CASCADE,
      UNIQUE(verification_run_id, criterion_id)
    );

CREATE TABLE execution_events (
      id TEXT PRIMARY KEY,
      execution_id TEXT NOT NULL,
      company_id TEXT NOT NULL,
      event_type TEXT NOT NULL,
      from_status TEXT,
      to_status TEXT NOT NULL,
      actor_employee_id TEXT,
      payload_json TEXT,
      timestamp TEXT NOT NULL,
      FOREIGN KEY (execution_id) REFERENCES executions(id) ON DELETE CASCADE
    );

CREATE TABLE execution_launch_leases (
      execution_id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      lease_token TEXT NOT NULL UNIQUE,
      acquired_at INTEGER NOT NULL,
      expires_at INTEGER NOT NULL,
      state TEXT NOT NULL CHECK(state IN ('ACQUIRED', 'SPAWNED', 'ABORTED', 'EXPIRED')),
      pid INTEGER,
      FOREIGN KEY (execution_id) REFERENCES executions(id) ON DELETE CASCADE
    );

CREATE TABLE executions (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      task_id TEXT NOT NULL,
      employee_id TEXT NOT NULL,
      project_id TEXT,
      work_assignment_id TEXT,
      attempt_number INTEGER NOT NULL DEFAULT 1,
      retry_of_execution_id TEXT,
      team_id TEXT,
      provider_id TEXT NOT NULL,
      model_id TEXT,
      policy_tier TEXT NOT NULL CHECK(policy_tier IN ('SAFE', 'CONTROLLED', 'DANGEROUS')),
      priority TEXT NOT NULL CHECK(priority IN ('CRITICAL', 'HIGH', 'NORMAL', 'LOW')),
      status TEXT NOT NULL CHECK(status IN ('SUBMITTED', 'QUEUED', 'ADMITTED', 'PROVISIONING', 'STARTING', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED', 'TIMED_OUT')),
      requested_by_employee_id TEXT,
      requested_at TEXT NOT NULL,
      admitted_at TEXT,
      started_at TEXT,
      finished_at TEXT,
      timeout_ms INTEGER NOT NULL,
      runtime_type TEXT NOT NULL DEFAULT 'pty' CHECK(runtime_type IN ('pty', 'process', 'mock')),
      pty_session_id TEXT,
      pid INTEGER,
      worktree_path TEXT,
      git_branch TEXT,
      base_branch TEXT,
      exit_code INTEGER,
      termination_signal TEXT,
      output_tail TEXT,
      failure_category TEXT CHECK(failure_category IS NULL OR failure_category IN ('system_error', 'timeout', 'user_cancelled', 'process_crash', 'admission_rejected', 'security_violation')),
      failure_reason TEXT,
      input_tokens INTEGER NOT NULL DEFAULT 0,
      output_tokens INTEGER NOT NULL DEFAULT 0,
      total_cost REAL NOT NULL DEFAULT 0.0,
      token_reservation_id TEXT,
      budget_id TEXT,
      estimated_tokens INTEGER NOT NULL DEFAULT 0,
      actual_tokens_json TEXT,
      raw_result_json TEXT,
      requested_capabilities_json TEXT NOT NULL DEFAULT '[]',
      task_instructions TEXT NOT NULL,
      idempotency_key TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL, role_id TEXT, identity_id TEXT, engine_id TEXT DEFAULT 'munder-pty', launch_lease_token TEXT, evidence_json TEXT,
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
      FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
      FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL,
      FOREIGN KEY (work_assignment_id) REFERENCES work_assignments(id) ON DELETE SET NULL,
      FOREIGN KEY (retry_of_execution_id) REFERENCES executions(id) ON DELETE SET NULL,
      FOREIGN KEY (requested_by_employee_id) REFERENCES employees(id) ON DELETE SET NULL
    );

CREATE TABLE executive_decisions (
  id TEXT PRIMARY KEY,
  source_role TEXT NOT NULL CHECK(source_role IN ('ceo', 'cto', 'manager')),
  title TEXT NOT NULL,
  reason TEXT NOT NULL,
  decision_json TEXT NOT NULL,
  related_objective_id TEXT,
  related_product_id TEXT,
  related_project_id TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE founder_accounts (
      id TEXT PRIMARY KEY,
      display_name TEXT NOT NULL,
      key_fingerprint TEXT NOT NULL,
      is_active INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0, 1)),
      created_at TEXT NOT NULL
    );

CREATE TABLE founder_objectives (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      founder_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      target_outcome TEXT,
      priority TEXT NOT NULL,
      constraints_json TEXT NOT NULL DEFAULT '[]',
      priorities_json TEXT NOT NULL DEFAULT '[]',
      success_criteria_json TEXT NOT NULL DEFAULT '[]',
      idempotency_key TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
      UNIQUE(company_id, idempotency_key)
    );

CREATE TABLE governance_approvals (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      task_id TEXT,
      execution_id TEXT,
      action_code TEXT NOT NULL,
      scope_hash TEXT NOT NULL,
      requested_by_employee_id TEXT NOT NULL,
      approver_actor_id TEXT NOT NULL,
      approver_role TEXT NOT NULL CHECK(approver_role IN ('founder', 'executive', 'manager')),
      status TEXT NOT NULL DEFAULT 'APPROVED' CHECK(status IN ('APPROVED', 'CONSUMED', 'REJECTED', 'EXPIRED', 'REVOKED')),
      justification TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      consumed_at TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
      FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE RESTRICT,
      FOREIGN KEY (execution_id) REFERENCES executions(id) ON DELETE RESTRICT
    );

CREATE TABLE governance_audit_events (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      event_type TEXT NOT NULL,
      actor_id TEXT NOT NULL,
      actor_type TEXT NOT NULL CHECK(actor_type IN ('founder', 'employee', 'system')),
      target_resource_type TEXT NOT NULL,
      target_resource_id TEXT NOT NULL,
      policy_id TEXT,
      policy_version INTEGER,
      decision TEXT NOT NULL CHECK(decision IN ('ALLOW', 'DENY')),
      reason TEXT NOT NULL,
      payload_json TEXT NOT NULL DEFAULT '{}',
      created_at TEXT NOT NULL,
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE RESTRICT
    );

CREATE TABLE governance_policies (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      name TEXT NOT NULL,
      version INTEGER NOT NULL DEFAULT 1,
      status TEXT NOT NULL DEFAULT 'DRAFT' CHECK(status IN ('DRAFT', 'ACTIVE', 'SUPERSEDED', 'ARCHIVED')),
      enforcement TEXT NOT NULL CHECK(enforcement IN ('STRICT', 'WARN_AUDIT', 'REQUIRE_HUMAN_APPROVAL')),
      rules_json TEXT NOT NULL DEFAULT '{}',
      created_by_actor_id TEXT NOT NULL,
      ratified_by_founder_id TEXT,
      effective_at TEXT,
      superseded_at TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
      UNIQUE(company_id, name, version)
    );

CREATE TABLE human_exceptions (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      task_id TEXT NOT NULL,
      execution_id TEXT NOT NULL,
      verification_run_id TEXT NOT NULL,
      approver_actor_id TEXT NOT NULL,
      justification TEXT NOT NULL,
      risk_waiver_category TEXT NOT NULL CHECK(risk_waiver_category IN (
        'ACCEPT_TEST_DEBT', 'TIME_CRITICAL_EMERGENCY', 'ENVIRONMENT_DEFECT', 'DESIGN_EXPLORATION_SPIKE', 'LOW_RISK_DOCUMENTATION_ONLY'
      )),
      approval_id TEXT,
      status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK(status IN ('ACTIVE', 'CONSUMED', 'REVOKED', 'EXPIRED')),
      created_at TEXT NOT NULL,
      expires_at TEXT,
      FOREIGN KEY (company_id) REFERENCES companies(id),
      FOREIGN KEY (task_id) REFERENCES tasks(id),
      FOREIGN KEY (execution_id) REFERENCES executions(id),
      FOREIGN KEY (verification_run_id) REFERENCES verification_runs(id)
    );

CREATE TABLE knowledge_contradictions (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      existing_knowledge_item_id TEXT NOT NULL,
      consecutive_failures_count INTEGER NOT NULL DEFAULT 1,
      conflicting_execution_id TEXT,
      conflicting_lesson_id TEXT,
      description TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('DETECTED', 'IN_REVIEW', 'RESOLVED_SUPERSEDED', 'RESOLVED_DISMISSED')),
      resolved_by_actor_id TEXT,
      resolution_notes TEXT,
      detected_at TEXT NOT NULL,
      resolved_at TEXT,
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE RESTRICT,
      FOREIGN KEY (existing_knowledge_item_id) REFERENCES knowledge_items(id) ON DELETE CASCADE,
      FOREIGN KEY (conflicting_execution_id) REFERENCES executions(id) ON DELETE SET NULL,
      FOREIGN KEY (conflicting_lesson_id) REFERENCES candidate_lessons(id) ON DELETE SET NULL
    );

CREATE TABLE knowledge_events (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      knowledge_item_id TEXT,
      candidate_lesson_id TEXT,
      event_type TEXT NOT NULL CHECK(event_type IN ('CREATED', 'PROMOTED', 'SUPERSEDED', 'REVOKED', 'CONTRADICTION_FLAGGED', 'EXPIRED')),
      actor_employee_id TEXT NOT NULL,
      payload_json TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE RESTRICT
    );

CREATE VIRTUAL TABLE knowledge_fts USING fts5(
      knowledge_item_id UNINDEXED,
      company_id UNINDEXED,
      scope UNINDEXED,
      category,
      title,
      summary,
      content,
      tokenize = 'porter unicode61'
    );











CREATE TABLE knowledge_items (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      scope TEXT NOT NULL CHECK(scope IN ('COMPANY', 'DEPARTMENT', 'PROJECT', 'TEAM', 'EMPLOYEE')),
      department_id TEXT,
      project_id TEXT,
      team_id TEXT,
      employee_id TEXT,
      category TEXT NOT NULL CHECK(category IN ('ARCHITECTURE', 'STANDARD', 'PATTERN', 'POST_MORTEM', 'CONSTRAINT', 'GUIDELINE')),
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      summary TEXT NOT NULL,
      epistemic_state TEXT NOT NULL CHECK(epistemic_state IN ('CLAIM', 'REPORTED', 'OBSERVED', 'EXECUTION_EVIDENCE', 'VALIDATED', 'SUPERSEDED', 'REVOKED')),
      confidence_score REAL NOT NULL DEFAULT 1.0,
      version INTEGER NOT NULL DEFAULT 1,
      superseded_by_id TEXT,
      created_by_employee_id TEXT NOT NULL,
      verified_by_actor_id TEXT,
      verified_at TEXT,
      expires_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE RESTRICT,
      FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE RESTRICT,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE RESTRICT,
      FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL,
      FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE RESTRICT,
      FOREIGN KEY (created_by_employee_id) REFERENCES employees(id) ON DELETE RESTRICT,
      FOREIGN KEY (superseded_by_id) REFERENCES knowledge_items(id) ON DELETE SET NULL
    );

CREATE TABLE knowledge_sources (
      id TEXT PRIMARY KEY,
      knowledge_item_id TEXT NOT NULL,
      knowledge_version INTEGER NOT NULL DEFAULT 1,
      source_type TEXT NOT NULL CHECK(source_type IN ('EXECUTION', 'DECISION', 'TASK', 'HUMAN', 'DOCUMENT')),
      execution_id TEXT,
      task_id TEXT,
      decision_id TEXT,
      external_uri TEXT,
      evidence_hash TEXT NOT NULL,
      structured_evidence_json TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (knowledge_item_id) REFERENCES knowledge_items(id) ON DELETE CASCADE,
      FOREIGN KEY (execution_id) REFERENCES executions(id) ON DELETE SET NULL,
      FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE SET NULL,
      FOREIGN KEY (decision_id) REFERENCES executive_decisions(id) ON DELETE SET NULL
    );

CREATE TABLE knowledge_versions (
      id TEXT PRIMARY KEY,
      knowledge_item_id TEXT NOT NULL,
      version INTEGER NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      summary TEXT NOT NULL,
      changed_by_employee_id TEXT NOT NULL,
      change_reason TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (knowledge_item_id) REFERENCES knowledge_items(id) ON DELETE CASCADE,
      FOREIGN KEY (changed_by_employee_id) REFERENCES employees(id) ON DELETE RESTRICT,
      UNIQUE(knowledge_item_id, version)
    );

CREATE TABLE management_plans (
  id TEXT PRIMARY KEY,
  technical_plan_id TEXT NOT NULL,
  project_id TEXT NOT NULL,
  workforce_assignments_json TEXT NOT NULL DEFAULT '[]',
  proposed_milestones_json TEXT NOT NULL DEFAULT '[]',
  capability_gaps_json TEXT NOT NULL DEFAULT '[]',
  blocker_mitigations_json TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL CHECK(status IN ('draft', 'approved', 'in_progress', 'completed')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (technical_plan_id) REFERENCES technical_plans(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE milestones (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL CHECK(status IN ('pending', 'in_progress', 'achieved', 'missed')),
  target_date TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE permissions (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  description TEXT,
  risk_tier TEXT NOT NULL CHECK(risk_tier IN ('safe', 'controlled', 'dangerous')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE policies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  permission_codes_json TEXT NOT NULL DEFAULT '[]',
  target_role TEXT,
  enforcement TEXT NOT NULL CHECK(enforcement IN ('audit', 'require_approval', 'block')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE positions (
  id TEXT PRIMARY KEY,
  department_id TEXT NOT NULL,
  title TEXT NOT NULL,
  seniority TEXT NOT NULL,
  description TEXT,
  responsibilities_json TEXT NOT NULL DEFAULT '[]',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE products (
  id TEXT PRIMARY KEY,
  company_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  repository_url TEXT,
  status TEXT NOT NULL CHECK(status IN ('active', 'maintenance', 'deprecated', 'archived')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  lead_employee_id TEXT,
  status TEXT NOT NULL CHECK(status IN ('planned', 'in_progress', 'completed', 'paused', 'cancelled')),
  start_date TEXT,
  target_date TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (lead_employee_id) REFERENCES employees(id) ON DELETE SET NULL
);

CREATE TABLE provider_selection_decisions (
      id TEXT PRIMARY KEY,
      request_id TEXT NOT NULL,
      selected_provider_id TEXT NOT NULL,
      selected_model_id TEXT NOT NULL,
      candidate_models_json TEXT NOT NULL,
      reason TEXT NOT NULL,
      estimated_input_tokens INTEGER NOT NULL,
      estimated_output_tokens INTEGER NOT NULL,
      estimated_total_cost REAL NOT NULL,
      budget_max_tokens INTEGER NOT NULL,
      budget_remaining_tokens INTEGER NOT NULL,
      fallbacks_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

CREATE TABLE "quality_certifications" (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      task_id TEXT NOT NULL,
      task_version INTEGER NOT NULL DEFAULT 1,
      execution_id TEXT NOT NULL,
      specification_id TEXT NOT NULL,
      verification_run_id TEXT NOT NULL,
      certification_type TEXT NOT NULL CHECK(certification_type IN ('OBJECTIVELY_VERIFIED', 'HUMAN_EXCEPTION_APPROVED', 'EXCEPTION_APPROVED')),
      commit_sha TEXT NOT NULL,
      tree_sha TEXT NOT NULL,
      artifact_manifest_digest TEXT,
      issued_at TEXT NOT NULL,
      issuer_actor_id TEXT NOT NULL,
      override_justification TEXT,
      failing_results_snapshot_json TEXT,
      status TEXT NOT NULL DEFAULT 'ISSUED' CHECK(status = 'ISSUED'),
      FOREIGN KEY (company_id) REFERENCES companies(id),
      FOREIGN KEY (task_id) REFERENCES tasks(id),
      FOREIGN KEY (execution_id) REFERENCES executions(id),
      FOREIGN KEY (specification_id) REFERENCES acceptance_specifications(id),
      FOREIGN KEY (verification_run_id) REFERENCES verification_runs(id),
      UNIQUE(task_id, task_version, execution_id)
    );

CREATE TABLE resource_health_states (
      resource_key TEXT PRIMARY KEY,
      provider_id TEXT NOT NULL,
      model_id TEXT NOT NULL,
      status TEXT NOT NULL,
      active_executions INTEGER NOT NULL DEFAULT 0,
      concurrency_limit INTEGER NOT NULL DEFAULT 2,
      cooldown_until TEXT,
      last_failure_reason TEXT,
      updated_at TEXT NOT NULL
    );

CREATE TABLE resource_usage_records (
      id TEXT PRIMARY KEY,
      idempotency_key TEXT UNIQUE NOT NULL,
      request_id TEXT NOT NULL,
      provider_id TEXT NOT NULL,
      model_id TEXT NOT NULL,
      input_tokens INTEGER NOT NULL,
      output_tokens INTEGER NOT NULL,
      total_cost REAL NOT NULL,
      created_at TEXT NOT NULL
    );

CREATE TABLE revoked_founder_sessions (
      session_id TEXT PRIMARY KEY,
      founder_id TEXT NOT NULL,
      revoked_at TEXT NOT NULL,
      reason TEXT NOT NULL
    );

CREATE TABLE role_permission_grants (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      role_name TEXT NOT NULL,
      permission_code TEXT NOT NULL,
      granted_by_actor_id TEXT NOT NULL,
      granted_at TEXT NOT NULL,
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
      UNIQUE(company_id, role_name, permission_code)
    );

CREATE TABLE "strategic_plans" (
        id TEXT PRIMARY KEY,
        company_id TEXT NOT NULL,
        founder_objective_id TEXT NOT NULL,
        title TEXT NOT NULL DEFAULT '',
        executive_summary TEXT NOT NULL,
        initiatives_json TEXT NOT NULL,
        requires_cto_review INTEGER NOT NULL DEFAULT 1,
        requires_manager_execution INTEGER NOT NULL DEFAULT 1,
        strategic_risks_json TEXT NOT NULL DEFAULT '[]',
        status TEXT NOT NULL CHECK(status IN (
          'draft', 'approved', 'rejected', 'superseded',
          'requested', 'planning', 'generated', 'validated', 'ready_for_founder_review', 'failed', 'cancelled',
          'REQUESTED', 'PLANNING', 'GENERATED', 'VALIDATED', 'READY_FOR_FOUNDER_REVIEW', 'FAILED', 'REJECTED', 'CANCELLED'
        )),
        founder_id TEXT,
        reasoning_request_id TEXT,
        provider_id TEXT,
        model_id TEXT,
        plan_json TEXT,
        idempotency_key TEXT,
        schema_version TEXT NOT NULL DEFAULT '1.0.0',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
      );

CREATE TABLE tasks (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  project_id TEXT NOT NULL,
  milestone_id TEXT NOT NULL,
  assigned_employee_id TEXT,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL CHECK(status IN ('backlog', 'ready', 'in_progress', 'blocked', 'completed', 'cancelled')),
  priority TEXT NOT NULL CHECK(priority IN ('urgent', 'high', 'medium', 'low')),
  dependencies_json TEXT NOT NULL DEFAULT '[]',
  acceptance_criteria_json TEXT NOT NULL DEFAULT '[]',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (milestone_id) REFERENCES milestones(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_employee_id) REFERENCES employees(id) ON DELETE SET NULL
);

CREATE TABLE team_members (
  team_id TEXT NOT NULL,
  employee_id TEXT NOT NULL, company_id TEXT, role TEXT NOT NULL DEFAULT "member", status TEXT NOT NULL DEFAULT "active", joined_at TEXT, left_at TEXT,
  PRIMARY KEY (team_id, employee_id),
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

CREATE TABLE teams (
  id TEXT PRIMARY KEY,
  company_id TEXT NOT NULL,
  department_id TEXT NOT NULL,
  manager_employee_id TEXT,
  name TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('active', 'inactive', 'disbanded')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL, description TEXT, lead_employee_id TEXT,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE technical_plans (
  id TEXT PRIMARY KEY,
  strategic_plan_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  architectural_overview TEXT NOT NULL,
  decisions_json TEXT NOT NULL,
  engineering_standards_json TEXT NOT NULL DEFAULT '[]',
  technical_constraints_json TEXT NOT NULL DEFAULT '[]',
  proposed_deliverables_json TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL CHECK(status IN ('draft', 'approved', 'rejected')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (strategic_plan_id) REFERENCES strategic_plans(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE token_budgets (
      id TEXT PRIMARY KEY,
      entity_id TEXT NOT NULL,
      max_input_tokens INTEGER NOT NULL,
      max_output_tokens INTEGER NOT NULL,
      max_total_tokens INTEGER NOT NULL,
      reserved_tokens INTEGER NOT NULL DEFAULT 0,
      consumed_tokens INTEGER NOT NULL DEFAULT 0,
      remaining_tokens INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'active',
      updated_at TEXT NOT NULL
    );

CREATE TABLE "verification_results" (
      id TEXT PRIMARY KEY,
      verification_run_id TEXT NOT NULL,
      criterion_id TEXT NOT NULL,
      evidence_id TEXT,
      status TEXT NOT NULL CHECK(status IN (
        'PASS', 'FAIL', 'PARTIAL', 'BLOCKED', 'NOT_VERIFIABLE', 'REQUIRES_HUMAN_REVIEW', 'SKIPPED', 'ERROR'
      )),
      failure_reason TEXT,
      evaluated_at TEXT NOT NULL,
      duration_ms INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (verification_run_id) REFERENCES verification_runs(id) ON DELETE CASCADE,
      FOREIGN KEY (criterion_id) REFERENCES acceptance_criteria(id),
      UNIQUE(verification_run_id, criterion_id)
    );

CREATE TABLE "verification_runs" (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      task_id TEXT NOT NULL,
      execution_id TEXT NOT NULL,
      specification_id TEXT NOT NULL,
      specification_version INTEGER NOT NULL DEFAULT 1,
      run_nonce TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'PENDING' CHECK(status IN (
        'PENDING', 'RUNNING', 'PASSED', 'FAILED', 'PARTIAL', 'BLOCKED',
        'NOT_VERIFIABLE', 'REQUIRES_HUMAN_REVIEW', 'ERROR'
      )),
      commit_sha TEXT NOT NULL,
      tree_sha TEXT NOT NULL,
      verifier_actor_id TEXT NOT NULL,
      started_at TEXT NOT NULL,
      finished_at TEXT,
      error_message TEXT,
      FOREIGN KEY (company_id) REFERENCES companies(id),
      FOREIGN KEY (task_id) REFERENCES tasks(id),
      FOREIGN KEY (execution_id) REFERENCES executions(id),
      FOREIGN KEY (specification_id) REFERENCES acceptance_specifications(id),
      UNIQUE(execution_id, specification_id),
      UNIQUE(id, execution_id)
    );

CREATE TABLE "work_assignments" (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      employee_id TEXT NOT NULL,
      project_id TEXT NOT NULL,
      team_id TEXT,
      task_id TEXT,
      milestone_id TEXT,
      responsibility TEXT NOT NULL,
      priority TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN (
        'assigned', 'accepted', 'in_progress', 'blocked', 'completed', 'cancelled', 'rejected',
        'ASSIGNED', 'ACCEPTED', 'IN_PROGRESS', 'BLOCKED', 'COMPLETED', 'CANCELLED', 'REJECTED'
      )),
      expected_outcome TEXT,
      blocked_reason TEXT,
      idempotency_key TEXT,
      start_date TEXT,
      deadline TEXT,
      completed_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      assigned_by_employee_id TEXT,
      role_id TEXT,
      agent_definition_id TEXT,
      accepted_at TEXT,
      started_at TEXT,
      cancelled_at TEXT,
      rejected_at TEXT,
      metadata_json TEXT,
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
      FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
      FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL,
      FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE SET NULL,
      FOREIGN KEY (milestone_id) REFERENCES milestones(id) ON DELETE SET NULL
    );

CREATE TABLE work_dependencies (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      dependent_assignment_id TEXT NOT NULL,
      required_assignment_id TEXT NOT NULL,
      dependency_type TEXT NOT NULL CHECK(dependency_type IN ('blocks', 'requires')),
      reason TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('pending', 'satisfied', 'waived')),
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(dependent_assignment_id, required_assignment_id),
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
      FOREIGN KEY (dependent_assignment_id) REFERENCES work_assignments(id) ON DELETE CASCADE,
      FOREIGN KEY (required_assignment_id) REFERENCES work_assignments(id) ON DELETE CASCADE
    );

CREATE TABLE work_handoffs (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      source_employee_id TEXT NOT NULL,
      destination_employee_id TEXT NOT NULL,
      related_assignment_id TEXT,
      related_collaboration_request_id TEXT,
      deliverable_summary TEXT NOT NULL,
      deliverable_payload_json TEXT,
      status TEXT NOT NULL CHECK(status IN ('draft', 'transferred', 'accepted', 'declined')),
      declined_reason TEXT,
      transferred_at TEXT,
      reviewed_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
      FOREIGN KEY (source_employee_id) REFERENCES employees(id) ON DELETE CASCADE,
      FOREIGN KEY (destination_employee_id) REFERENCES employees(id) ON DELETE CASCADE,
      FOREIGN KEY (related_assignment_id) REFERENCES work_assignments(id) ON DELETE SET NULL,
      FOREIGN KEY (related_collaboration_request_id) REFERENCES collaboration_requests(id) ON DELETE SET NULL
    );

CREATE TABLE workforce_audit_events (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      actor_id TEXT NOT NULL,
      action TEXT NOT NULL,
      target_id TEXT NOT NULL,
      previous_state TEXT,
      new_state TEXT,
      reason TEXT,
      correlation_id TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
    );

CREATE TRIGGER trg_gov_audit_prevent_delete
    BEFORE DELETE ON governance_audit_events
    BEGIN
      SELECT RAISE(ABORT, 'GovernanceAuditSecurityError: Deletion of governance audit records is strictly prohibited by SQLite engine policy.');
    END;

CREATE TRIGGER trg_gov_audit_prevent_update
    BEFORE UPDATE ON governance_audit_events
    BEGIN
      SELECT RAISE(ABORT, 'GovernanceAuditSecurityError: Mutation of governance audit records is strictly prohibited by SQLite engine policy.');
    END;


CREATE INDEX idx_acc_crit_spec ON acceptance_criteria(specification_id);

CREATE INDEX idx_acc_spec_task ON acceptance_specifications(task_id, status);

CREATE INDEX idx_agent_definitions_division ON agent_definitions(division);

CREATE INDEX idx_assignments_agent_def ON work_assignments(agent_definition_id);

CREATE INDEX idx_assignments_assigned_by ON work_assignments(assigned_by_employee_id);

CREATE INDEX idx_assignments_employee ON work_assignments(employee_id);

CREATE UNIQUE INDEX idx_assignments_idempotency 
      ON work_assignments(company_id, idempotency_key) 
      WHERE idempotency_key IS NOT NULL;

CREATE INDEX idx_assignments_project ON work_assignments(project_id);

CREATE INDEX idx_assignments_status ON work_assignments(status);

CREATE INDEX idx_cae_task ON certification_audit_events(task_id, created_at);

CREATE INDEX idx_cap_gaps_plan ON capability_gaps(management_plan_id);

CREATE INDEX idx_cl_company_status ON candidate_lessons(company_id, review_status);

CREATE UNIQUE INDEX idx_cl_originating_execution ON candidate_lessons(originating_execution_id) WHERE originating_execution_id IS NOT NULL;

CREATE INDEX idx_collab_from_emp ON collaboration_requests(from_employee_id);

CREATE UNIQUE INDEX idx_collab_idempotency 
      ON collaboration_requests(company_id, idempotency_key) 
      WHERE idempotency_key IS NOT NULL;

CREATE INDEX idx_collab_status ON collaboration_requests(status);

CREATE INDEX idx_collab_to_emp ON collaboration_requests(to_employee_id);

CREATE INDEX idx_cr_cert ON certification_revocations(certification_id);

CREATE INDEX idx_delegations_child_assignment ON delegations(child_assignment_id);

CREATE INDEX idx_delegations_company ON delegations(company_id);

CREATE INDEX idx_delegations_delegatee ON delegations(delegatee_employee_id);

CREATE INDEX idx_delegations_delegator ON delegations(delegator_employee_id);

CREATE INDEX idx_delegations_parent_assignment ON delegations(parent_assignment_id);

CREATE INDEX idx_delegations_status ON delegations(status);

CREATE INDEX idx_departments_company ON departments(company_id);

CREATE INDEX idx_ece_lookup ON emergency_control_events(company_id, freeze_tier);

CREATE INDEX idx_employees_company ON employees(company_id);

CREATE INDEX idx_employees_dept ON employees(department_id);

CREATE INDEX idx_employees_manager ON employees(manager_employee_id);

CREATE INDEX idx_employees_team ON employees(team_id);

CREATE INDEX idx_er_exec ON evidence_records(execution_id);

CREATE INDEX idx_er_run ON evidence_records(verification_run_id);

CREATE INDEX idx_exec_dec_obj ON executive_decisions(related_objective_id);

CREATE INDEX idx_exec_dec_role ON executive_decisions(source_role);

CREATE INDEX idx_exec_events_exec ON execution_events(execution_id);

CREATE INDEX idx_executions_employee ON executions(employee_id);

CREATE UNIQUE INDEX idx_executions_idempotency
      ON executions(company_id, task_id, idempotency_key)
      WHERE idempotency_key IS NOT NULL;

CREATE INDEX idx_executions_identity ON executions(identity_id);

CREATE INDEX idx_executions_lease ON executions(launch_lease_token);

CREATE INDEX idx_executions_priority_queue ON executions(status, priority, created_at);

CREATE INDEX idx_executions_project ON executions(project_id);

CREATE INDEX idx_executions_role ON executions(role_id);

CREATE INDEX idx_executions_status ON executions(status);

CREATE INDEX idx_executions_task ON executions(task_id);

CREATE INDEX idx_founder_obj_comp ON founder_objectives(company_id);

CREATE INDEX idx_founder_obj_founder ON founder_objectives(founder_id);

CREATE INDEX idx_founder_obj_idemp ON founder_objectives(company_id, idempotency_key);

CREATE INDEX idx_gov_appr_lookup ON governance_approvals(company_id, action_code, status);

CREATE INDEX idx_gov_audit_actor ON governance_audit_events(actor_id);

CREATE INDEX idx_gov_audit_comp ON governance_audit_events(company_id);

CREATE INDEX idx_gov_audit_type ON governance_audit_events(event_type);

CREATE INDEX idx_gov_pol_active ON governance_policies(company_id, status);

CREATE INDEX idx_handoffs_dest ON work_handoffs(destination_employee_id);

CREATE INDEX idx_handoffs_src ON work_handoffs(source_employee_id);

CREATE INDEX idx_he_exec ON human_exceptions(execution_id);

CREATE INDEX idx_he_run ON human_exceptions(verification_run_id);

CREATE INDEX idx_he_task ON human_exceptions(task_id);

CREATE INDEX idx_hiring_records_company_gap ON employee_hiring_records(company_id, capability_gap_id);

CREATE INDEX idx_hiring_records_employee ON employee_hiring_records(employee_id);

CREATE INDEX idx_kc_item ON knowledge_contradictions(existing_knowledge_item_id);

CREATE INDEX idx_ke_company_time ON knowledge_events(company_id, created_at);

CREATE INDEX idx_ki_company_scope ON knowledge_items(company_id, scope);

CREATE INDEX idx_ki_dept ON knowledge_items(department_id) WHERE department_id IS NOT NULL;

CREATE INDEX idx_ki_project ON knowledge_items(project_id) WHERE project_id IS NOT NULL;

CREATE INDEX idx_ki_state ON knowledge_items(epistemic_state);

CREATE INDEX idx_ks_execution ON knowledge_sources(execution_id) WHERE execution_id IS NOT NULL;

CREATE INDEX idx_ks_item ON knowledge_sources(knowledge_item_id);

CREATE INDEX idx_ks_item_version ON knowledge_sources(knowledge_item_id, knowledge_version);

CREATE INDEX idx_launch_lease_lookup ON execution_launch_leases(company_id, state);

CREATE INDEX idx_mgmt_plans_proj ON management_plans(project_id);

CREATE INDEX idx_mgmt_plans_tech ON management_plans(technical_plan_id);

CREATE INDEX idx_milestones_project ON milestones(project_id);

CREATE INDEX idx_positions_dept ON positions(department_id);

CREATE INDEX idx_products_company ON products(company_id);

CREATE INDEX idx_projects_product ON projects(product_id);

CREATE INDEX idx_qc_exec ON quality_certifications(execution_id);

CREATE INDEX idx_qc_task ON quality_certifications(task_id, task_version);

CREATE INDEX idx_revoked_sessions ON revoked_founder_sessions(session_id);

CREATE INDEX idx_rpg_lookup ON role_permission_grants(company_id, role_name);

CREATE INDEX idx_selection_decisions_req ON provider_selection_decisions(request_id);

CREATE INDEX idx_strat_plans_comp ON strategic_plans(company_id);

CREATE INDEX idx_strat_plans_idemp ON strategic_plans(company_id, founder_objective_id, idempotency_key);

CREATE INDEX idx_strat_plans_obj ON strategic_plans(founder_objective_id);

CREATE INDEX idx_strat_plans_status ON strategic_plans(status);

CREATE INDEX idx_tasks_employee ON tasks(assigned_employee_id);

CREATE INDEX idx_tasks_milestone ON tasks(milestone_id);

CREATE INDEX idx_tasks_product ON tasks(product_id);

CREATE INDEX idx_tasks_project ON tasks(project_id);

CREATE INDEX idx_tasks_status ON tasks(status);

CREATE INDEX idx_teams_company ON teams(company_id);

CREATE INDEX idx_teams_dept ON teams(department_id);

CREATE INDEX idx_teams_lead ON teams(lead_employee_id);

CREATE INDEX idx_tech_plans_prod ON technical_plans(product_id);

CREATE INDEX idx_tech_plans_strat ON technical_plans(strategic_plan_id);

CREATE INDEX idx_tm_company ON team_members(company_id);

CREATE INDEX idx_tm_employee ON team_members(employee_id);

CREATE INDEX idx_tm_status ON team_members(status);

CREATE INDEX idx_token_budgets_entity ON token_budgets(entity_id);

CREATE INDEX idx_usage_records_provider ON resource_usage_records(provider_id, model_id);

CREATE INDEX idx_usage_records_request ON resource_usage_records(request_id);

CREATE INDEX idx_vr_exec ON verification_runs(execution_id);

CREATE INDEX idx_vr_res_run ON verification_results(verification_run_id);

CREATE INDEX idx_vr_task ON verification_runs(task_id);

CREATE INDEX idx_wf_audit_action ON workforce_audit_events(action);

CREATE INDEX idx_wf_audit_actor ON workforce_audit_events(actor_id);

CREATE INDEX idx_wf_audit_company ON workforce_audit_events(company_id);

CREATE INDEX idx_wf_audit_created ON workforce_audit_events(created_at);

CREATE INDEX idx_wf_audit_target ON workforce_audit_events(target_id);

CREATE INDEX idx_work_dep_req ON work_dependencies(required_assignment_id);

CREATE TABLE IF NOT EXISTS "blocking_edges" (
  ticket_id TEXT NOT NULL,
  blocked_by_ticket_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (ticket_id, blocked_by_ticket_id),
  FOREIGN KEY (ticket_id) REFERENCES tasks(id) ON DELETE CASCADE,
  FOREIGN KEY (blocked_by_ticket_id) REFERENCES tasks(id) ON DELETE CASCADE,
  UNIQUE(ticket_id, blocked_by_ticket_id)
);

CREATE INDEX IF NOT EXISTS idx_blocking_edges_ticket ON blocking_edges(ticket_id);
CREATE INDEX IF NOT EXISTS idx_blocking_edges_blocker ON blocking_edges(blocked_by_ticket_id);
