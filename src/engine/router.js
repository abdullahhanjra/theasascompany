'use strict';

/**
 * @file src/engine/router.js
 * @description Enterprise Engineering Router (ask-matt Integration)
 * for The Boring Company Autonomous Engineering Enterprise OS.
 *
 * Provides sub-15ms deterministic routing across the 6 operational departments,
 * mapping human queries into disciplined engineering workflows:
 * Idea -> Requirements -> Red Team -> Minimal TDD Code -> Reality Gate -> Retro.
 *
 * Pure Node.js — Zero runtime external dependencies.
 */

const { performance } = require('node:perf_hooks');

const ROUTE_DOMAINS = {
  BUG_FIX: {
    id: 'BUG_FIX',
    title: 'Defect Diagnosis & Surgical Bugfix',
    leadDept: 'DEPT_2_RED',
    leadAgent: 'Dwight Schrute (Red Team) & Jim Halpert (Minimal Coder)',
    lifecycle: [
      { step: 1, action: 'Diagnose Bug', agent: 'Dwight Schrute', detail: 'Establish tight reproduction feedback loop before proposing code' },
      { step: 2, action: 'Adversarial Check', agent: 'Hank Tate', detail: 'Stress-test edge cases, concurrency, and race conditions' },
      { step: 3, action: '50-Line Minimal Fix', agent: 'Jim Halpert', detail: 'Zero orthogonal drift; surgical bugfix strictly under 50 lines' },
      { step: 4, action: 'Reality Gate Pass', agent: 'Angela Martin', detail: 'Execute native test suite to verify exit code 0 ($? === 0)' },
      { step: 5, action: 'Kaizen Retro', agent: 'Kaizen Coach', detail: 'Log regression into memory/anti-patterns.db to prevent recurrence' }
    ]
  },
  FEATURE_BUILD: {
    id: 'FEATURE_BUILD',
    title: 'End-to-End Feature Sprint',
    leadDept: 'DEPT_1_EXEC',
    leadAgent: 'Marcus Chen (CPO) & Jim Halpert (Lead Coder)',
    lifecycle: [
      { step: 1, action: 'Requirements Grilling', agent: 'Marcus Chen', detail: 'Socratic interview settling scope into PRODUCT_REQUIREMENTS.md' },
      { step: 2, action: 'Red Team Inquest', agent: 'Dwight Schrute', detail: 'Probe network failure, concurrency limits, and boundary cases' },
      { step: 3, action: 'Tracer Tickets', agent: 'Stanley Hudson', detail: 'Breakdown into DAG tickets with explicit blocking edges' },
      { step: 4, action: 'Strict TDD Cycle', agent: 'Jim Halpert', detail: 'Red -> Green -> Refactor; 1 ticket at a time, clear context' },
      { step: 5, action: 'Two-Axis Review', agent: 'Two-Axis Reviewer', detail: 'Verify Standards (deep modules) and Spec fidelity' },
      { step: 6, action: 'Reality Gate', agent: 'Angela Martin', detail: 'Live test pass and commit to SQLite ledger' }
    ]
  },
  DATABASE_INFRA: {
    id: 'DATABASE_INFRA',
    title: 'Database Reliability & ACID Ledger Management',
    leadDept: 'DEPT_3_CORE',
    leadAgent: 'Dr. Kofi Mensah (Lead DBA) & Oscar Martinez',
    lifecycle: [
      { step: 1, action: 'Schema & Migration Audit', agent: 'Dr. Kofi Mensah', detail: 'Verify zero-downtime, idempotent schema migration' },
      { step: 2, action: 'Transaction Lock Check', agent: 'Oscar Martinez', detail: 'Row-level locking and transaction isolation benchmarks' },
      { step: 3, action: 'Integrity PRAGMA', agent: 'Angela Martin', detail: 'PRAGMA integrity_check and WAL checkpoint verification' }
    ]
  },
  SECURITY_APPSEC: {
    id: 'SECURITY_APPSEC',
    title: 'AppSec, Secret Scanning & Safe Execution',
    leadDept: 'DEPT_2_RED',
    leadAgent: 'Hank Tate (Security Sentinel) & Toby Flenderson',
    lifecycle: [
      { step: 1, action: 'Secret & Permission Scan', agent: 'Hank Tate', detail: 'AgentShield scan for leaked API keys, tokens, and unsafe paths' },
      { step: 2, action: 'Command Boundary Audit', agent: 'Toby Flenderson', detail: 'Validate shell commands against sandbox security tier' }
    ]
  },
  DESIGN_FRONTEND: {
    id: 'DESIGN_FRONTEND',
    title: 'Frontend UI, Accessibility & Motion Design',
    leadDept: 'DEPT_5_DESIGN',
    leadAgent: 'Pam Beesly (DOM Architect) & Zara Ahmed (UX Lead)',
    lifecycle: [
      { step: 1, action: 'Anti-Slop Audit', agent: 'Zara Ahmed', detail: 'Audit contrast (WCAG AA), responsive layout, and typography' },
      { step: 2, action: 'Component Implementation', agent: 'Pam Beesly', detail: 'Build accessible, minimal DOM structures with clean CSS variables' }
    ]
  },
  WAYFINDER_AMBIGUOUS: {
    id: 'WAYFINDER_AMBIGUOUS',
    title: 'Socratic Wayfinder & Architectural Exploration',
    leadDept: 'DEPT_1_EXEC',
    leadAgent: 'Marcus Chen (CPO) & Jim Halpert (Systems Architect)',
    lifecycle: [
      { step: 1, action: 'Interactive Socratic Interview', agent: 'Marcus Chen', detail: 'Run interactive terminal frontier to settle design ambiguities' },
      { step: 2, action: 'ADR & Glossary Recording', agent: 'Jim Halpert', detail: 'Document hard decisions in docs/adr/ and docs/GLOSSARY.md' }
    ]
  }
};

class EnterpriseRouter {
  constructor() {
    this.patterns = [
      {
        regex: /\b(bug|crash|error|exception|fail|failed|failure|broken|flake|reproduce|regression|stacktrace|double[\s-]charge)\b/i,
        domain: 'BUG_FIX'
      },
      {
        regex: /\b(db|sql|database|sqlite|postgres|migration|index|table|query|acid|schema|transaction|lock)\b/i,
        domain: 'DATABASE_INFRA'
      },
      {
        regex: /\b(security|secret|leak|token|sandbox|permission|appsec|cve|injection|vulnerability|auth|jwt)\b/i,
        domain: 'SECURITY_APPSEC'
      },
      {
        regex: /\b(ui|frontend|css|style|tailwind|html|button|toggle|dark mode|responsive|animation|accessibility|wcag|design)\b/i,
        domain: 'DESIGN_FRONTEND'
      },
      {
        regex: /\b(build|feature|implement|add|create|new|api|endpoint|service|flow|user story|spec)\b/i,
        domain: 'FEATURE_BUILD'
      }
    ];
  }

  /**
   * Fast-Path Deterministic Routing (<15ms, 0 tokens)
   * @param {string} query Human task description
   * @returns {Object} Route result
   */
  route(query) {
    const t0 = performance.now();
    const cleanQuery = (query || '').trim();

    if (!cleanQuery) {
      return {
        matched: false,
        domain: ROUTE_DOMAINS.WAYFINDER_AMBIGUOUS,
        query: cleanQuery,
        latencyMs: +(performance.now() - t0).toFixed(2),
        tokensUsed: 0
      };
    }

    for (const p of this.patterns) {
      if (p.regex.test(cleanQuery)) {
        const domain = ROUTE_DOMAINS[p.domain];
        return {
          matched: true,
          domainKey: p.domain,
          domain,
          query: cleanQuery,
          latencyMs: +(performance.now() - t0).toFixed(2),
          tokensUsed: 0
        };
      }
    }

    return {
      matched: false,
      domainKey: 'WAYFINDER_AMBIGUOUS',
      domain: ROUTE_DOMAINS.WAYFINDER_AMBIGUOUS,
      query: cleanQuery,
      latencyMs: +(performance.now() - t0).toFixed(2),
      tokensUsed: 0
    };
  }

  /**
   * Format route result for high-contrast terminal display
   */
  formatRoute(result) {
    const { domain, query, latencyMs } = result;
    const lines = [];

    lines.push('\x1b[1m\x1b[36m🏢 THE BORING COMPANY — ENGINEERING ROUTER (ask-matt Engine)\x1b[0m');
    lines.push(`\x1b[90mTask:\x1b[0m "${query}"`);
    lines.push(`\x1b[90mClassification:\x1b[0m \x1b[1m\x1b[32m${domain.title}\x1b[0m (\x1b[33m${latencyMs}ms\x1b[0m, 0 LLM tokens)`);
    lines.push(`\x1b[90mAssigned Leadership:\x1b[0m ${domain.leadAgent}`);
    lines.push('\n\x1b[1m\x1b[37mDisciplined Execution Path:\x1b[0m');

    for (const step of domain.lifecycle) {
      lines.push(`  \x1b[32m${step.step}.\x1b[0m \x1b[1m${step.action.padEnd(24, ' ')}\x1b[0m \x1b[36m[${step.agent}]\x1b[0m`);
      lines.push(`     \x1b[90m↳ ${step.detail}\x1b[0m`);
    }

    lines.push('\n\x1b[32m✔ Ready for Autonomous Execution. Guardrails: 50-Line Max Diff & Reality Gate Interlock.\x1b[0m');
    return lines.join('\n');
  }

  /**
   * Run benchmark over 20 representative queries
   */
  benchmark() {
    const testCases = [
      'Fix double-charge bug on checkout button click',
      'Users getting 500 error on Stripe payment failure',
      'Create SQLite migration for user subscription history',
      'Optimize database query latency and add index on order_id',
      'Scan repository for leaked AWS secrets and API keys',
      'Build dark mode toggle with Tailwind CSS and localStorage',
      'Add responsive mobile navigation drawer',
      'Implement idempotent refund API endpoint',
      'Refactor billing service to follow deep module architecture',
      'Flaky test failing intermittently in CI runner',
      'Check PRAGMA integrity on company.db ledger',
      'Add automated test suite for network drop recovery',
      'Enforce under 50-line rule across all checkout files',
      'Build new user onboarding questionnaire',
      'Detect race condition in concurrent inventory decrement',
      'Audit WCAG AA color contrast on marketing buttons',
      'Sanitize user inputs against SQL injection attacks',
      'Draft formal PRD for team collaboration features',
      'Fix CSS layout glitch on Safari mobile browser',
      'Measure SQLite row-level transaction commit latency'
    ];

    const tStart = performance.now();
    const results = testCases.map(tc => this.route(tc));
    const totalDuration = +(performance.now() - tStart).toFixed(2);
    const avgLatency = +(totalDuration / testCases.length).toFixed(3);

    return {
      totalQueries: testCases.length,
      totalDurationMs: totalDuration,
      averageLatencyMs: avgLatency,
      passed: totalDuration < 15.0,
      details: results.map((r, i) => ({ query: testCases[i], domain: r.domain.title, ms: r.latencyMs }))
    };
  }
}

module.exports = {
  EnterpriseRouter,
  ROUTE_DOMAINS
};
