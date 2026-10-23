---
name: ask-matt
description: Master Engineering Router for The Boring Company. Navigates human intent across the 6 departments and 72 specialists using Matt Pocock's disciplined lifecycle.
disable-model-invocation: true
---

# Ask Matt — The Boring Company Master Engineering Router

You don't need to memorize 72 specialists or guess which agent to call. Ask Matt.

Before writing code or guessing requirements, this router classifies any engineering prompt into the right disciplined path, strictly protecting the model's ~150k token Smart Zone.

---

## 1. The Main Lifecycle: Idea ➔ Ship

```
IDEA ➔ /grill-with-docs ➔ /to-spec ➔ /to-tickets ➔ /implement ➔ /tdd ➔ /code-review ➔ /retro
```

1. **Requirements Grilling (`Marcus Chen · CPO`)**:
   Never build on fuzzy requirements. Run `/grill-with-docs` (or terminal `boss ask`) to interview the user, challenge fuzzy terms, and record architectural invariants in `docs/GLOSSARY.md` and `docs/adr/`.
2. **Adversarial Inquest (`Dwight Schrute · Red Team Lead`)**:
   Before proposing code, stress-test the proposal against race conditions, network failures, and edge cases.
3. **Tracer-Bullet Breakdown (`Stanley Hudson · CTO`)**:
   Break the spec into atomic tickets declaring explicit blocking edges. Enforce the **Under 50-Line Rule**.
4. **Strict TDD Cycle (`Jim Halpert · Lead Minimal Coder`)**:
   Drive `/tdd` one red-green-refactor slice at a time. The test must fail for the expected reason before code is written. Clear context (`/clear`) between tickets to prevent token bloat.
5. **Two-Axis Code Review (`Angela Martin & Two-Axis Reviewer`)**:
   Inspect diffs against **Standards** (deep modules, clean seams) and **Spec** (ticket acceptance criteria).
6. **Reality Gate Vault (`Angela Martin · Reality Gate Auditor`)**:
   Native tests must exit cleanly with code 0 (`$? === 0`). No code is released on narrative claims.
7. **Kaizen Retrospective (`Continuous Learning Engine`)**:
   Run `/retro` to commit learnings into `memory/anti-patterns.db` so mistakes never recur.

---

## 2. Fast On-Ramps

- **Defect / Crash / Flaky Test** ➔ `BUG_FIX` flow.
  Lead: Dwight Schrute + Jim Halpert. Refuse to theorize until a single reproduction feedback loop is established.
- **Database / Transaction Contention** ➔ `DATABASE_INFRA` flow.
  Lead: Dr. Kofi Mensah + Oscar Martinez. Row-level transaction locks, PRAGMA checks, zero-downtime migrations.
- **Security / Permissions / Leaks** ➔ `SECURITY_APPSEC` flow.
  Lead: Hank Tate + Toby Flenderson. Secret scanning and command tier audits.
- **Foggy Greenfield Project** ➔ `WAYFINDER_AMBIGUOUS` flow.
  Run the Socratic Terminal Frontier (`theboringcompany --socratic`) to resolve the design tree.

---

## 3. Terminal Quick Commands

```bash
# Instant sub-15ms heuristic route
$ boss ask "Fix Stripe double charge bug"

# Interactive requirements interview
$ boss --socratic "Payment idempotent token"

# Benchmark classification latency
$ boss --router-benchmark
```
