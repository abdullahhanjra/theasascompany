# 🗂️ TECHNICAL DEBT REGISTRY
**Owner:** Rafael Torres (Staff Engineering Lead — `company_lead`)
**Last Updated:** 2026-09-27
**Registry Location:** `memory/TECH_DEBT_REGISTRY.md`

> **Law**: Every CRITICAL debt must be scheduled within 2 sprints.
> Every HIGH debt within 4 sprints. MEDIUM/LOW reviewed quarterly.
> No debt item is silently accepted — every entry has an owner and a scheduled paydown date.

---

## REGISTRY FORMAT

```
ID:            DEBT-[NNN]
Introduced:    [date] — [sprint/PR reference]
File:          [path:line]
Description:   [exact technical description]
Type:          [Performance / Security / Maintainability / Architecture / Test Coverage]
Risk:          [LOW / MEDIUM / HIGH / CRITICAL]
Interest Rate: [cost per sprint this remains — e.g., "2h slowdown per sprint"]
Paydown Effort: [estimated hours]
Scheduled For: [Sprint N or "Unscheduled"]
Owner:         [agent name]
Status:        [OPEN / IN PROGRESS / RESOLVED]
```

---

## ACTIVE DEBT ENTRIES

### DEBT-001 — Baseline Architecture Verification
- **Introduced:** 2026-09-27 — initial system setup
- **File:** `agents/definitions/company_jim\agent.md`
- **Description:** The new ARCHITECTURE.md 8-section standard has been defined but no existing project has had its architecture formally verified against this new standard. The NamazGuard project (`namaz-helper/`) and the Company server (`src/`) both predate this standard.
- **Type:** Architecture
- **Risk:** MEDIUM
- **Interest Rate:** Growing architectural drift per sprint without a baseline
- **Paydown Effort:** 3 hours — Dr. Anya to produce ARCHITECTURE.md for both systems
- **Scheduled For:** Next Track C mission involving either system
- **Owner:** company_jim (Dr. Anya Sharma)
- **Status:** OPEN

### DEBT-002 — Database Contract Backfill
- **Introduced:** 2026-09-27 — DBA agent created
- **File:** `./namaz-helper\src\db.js` (and equivalents)
- **Description:** Existing database schema predates Dr. Kofi's Database Contract standard. No formal schema DDL with index justifications, invariant documentation, or tested `down()` migrations exists for current tables.
- **Type:** Maintainability / Architecture
- **Risk:** MEDIUM
- **Interest Rate:** Each new schema change risks conflicting with undocumented implicit rules
- **Paydown Effort:** 4 hours — Dr. Kofi to produce retroactive Database Contract for existing schema
- **Scheduled For:** Next sprint that touches db.js
- **Owner:** company_dba (Dr. Kofi Mensah)
- **Status:** OPEN

### DEBT-003 — Test Coverage: Business Rule Invariants
- **Introduced:** 2026-09-27 — QA agent and BA agent created
- **File:** `./tests\company\`
- **Description:** No automated tests currently validate the BA-defined invariants (INV-XXX format). All existing tests are unit-level. The 5-layer QA suite (Isabela's Layer 5) does not yet exist for any feature.
- **Type:** Test Coverage
- **Risk:** HIGH
- **Interest Rate:** Every undetected invariant violation costs 2-5h of debugging in production
- **Paydown Effort:** 6 hours — Isabela to establish Layer 5 invariant test template and run on NamazGuard
- **Scheduled For:** Next sprint after BA produces Business Rules Catalog for NamazGuard
- **Owner:** company_qa (Isabela Carvalho)
- **Status:** OPEN

### DEBT-004 — No Gherkin Acceptance Criteria for Existing Features
- **Introduced:** 2026-09-27 — PO agent created
- **File:** All existing features in `namaz-helper/`
- **Description:** All existing features were built without Gherkin acceptance criteria. Definition of Ready and Definition of Done were not enforced. Edge cases (offline state, concurrent toggle, timezone shifts) have no formal test coverage.
- **Type:** Test Coverage / Maintainability
- **Risk:** HIGH
- **Interest Rate:** Each existing feature is a regression risk without coverage
- **Paydown Effort:** 8 hours — Soo-Jin to retroactively write Gherkin for the 5 core NamazGuard features
- **Scheduled For:** Unscheduled — priority Q4 2026
- **Owner:** company_po (Soo-Jin Park)
- **Status:** OPEN

### DEBT-005 — No Tech Debt History Before 2026-09-27
- **Introduced:** 2026-09-27 — this registry was created
- **File:** N/A — systemic
- **Description:** No formal technical debt was tracked before this registry was created. Unknown debt accumulated in all existing systems. A one-time debt discovery audit is needed.
- **Type:** Maintainability
- **Risk:** LOW
- **Interest Rate:** Unknown debt is harder to manage than known debt
- **Paydown Effort:** 2 hours — Rafael to conduct a one-time debt discovery audit on NamazGuard
- **Scheduled For:** Next available sprint slot
- **Owner:** company_lead (Rafael Torres)
- **Status:** OPEN

---

## RESOLVED DEBT

*(Empty — this registry was created 2026-09-27)*

---

## METRICS

| Risk Level | Open | In Progress | Resolved |
|---|---|---|---|
| CRITICAL | 0 | 0 | 0 |
| HIGH | 2 | 0 | 0 |
| MEDIUM | 2 | 0 | 0 |
| LOW | 1 | 0 | 0 |
| **Total** | **5** | **0** | **0** |

**CRITICAL threshold:** 0 open CRITICAL items (all clear ✅)
**HIGH threshold:** Must be scheduled within 4 sprints of introduction
**Current HIGH items scheduled?** DEBT-003: Partially (next BA sprint). DEBT-004: Unscheduled ⚠️
