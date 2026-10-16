# ✅ PRE-SHIP QUALITY CHECKLIST
# The Boring Company — Master Quality Gate Template

> **Usage:** Copy this file into the project directory at mission start. Each tier owner fills in their section before handing off to the next tier.
> **Authority:** `MASTER_QUALITY_SYSTEM.md` defines the full criteria behind each checkbox.
> **Trigger:** Created automatically for every `/boss` mission.

---

## 📋 MISSION METADATA

```
Mission ID:       _______________
Project:          _______________
Founder Request:  _______________
Mission Date:     _______________
Boss Track:       □ Track A (Surgical)  □ Track B (Sprint)  □ Track C (Enterprise)
```

---

## 🏗️ TIER 0: PURPOSE CLARITY
**Owner:** company_cpo
**Deliverable:** REQUIREMENTS_LOCKED.md

```
□ Why this exists is documented in ≤ 3 sentences
□ Target user persona is named and specific
□ Success metric is measurable (not subjective)
□ Out-of-scope list is explicit
□ Founder has confirmed scope
```

**Verdict:** □ LOCKED  □ NEEDS CLARIFICATION
**Signed by CPO:** _______________ **Date:** _______________

---

## 🗺️ TIER 1: CLARITY VERIFICATION
**Owner:** company_po + company_qa
**Deliverable:** SPEC_VERIFICATION.md

```
□ All user stories follow INVEST format
□ All acceptance criteria written as Given/When/Then
□ Definition of Ready (DoR) passed — no blocking unknowns
□ Critical path edge cases documented
□ Definition of Done (DoD) agreed for each story
```

**Verdict:** □ VERIFIED  □ INCOMPLETE
**Signed by PO:** _______________ **Date:** _______________

---

## 🔬 TIER 2: CORRECTNESS VERIFICATION
**Owner:** company_dwight + company_creed + company_inquisitor
**Deliverable:** CORRECTNESS_VERIFICATION.md

```
□ All tests pass (npm test / node --test): exit code 0 ($? === 0)
□ Adversarial Probe 1 (Crash): null inputs, missing fields, corrupt state — PASSED
□ Adversarial Probe 2 (Concurrency): race conditions, rapid clicks — PASSED
□ Adversarial Probe 3 (Injection): XSS, traversal, SQLi attempts — PASSED
□ Zero critical/high vulnerabilities from AppSec scan
□ All error states return human-readable messages (zero stack traces)
□ State machine transitions verified for all critical paths
```

**Test Count:** _______  **Passing:** _______  **Exit Code:** _______
**Verdict:** □ CORRECT  □ DEFECTS FOUND
**Signed by Dwight:** _______________ **Date:** _______________

---

## 🏁 TIER 3: COMPLETENESS VERIFICATION
**Owner:** company_finish_auditor + company_tdd + company_brand_auditor
**Deliverable:** COMPLETENESS_VERIFICATION.md

```
□ 6-State Law verified for ALL dynamic components:
    □ Blank (initial state)
    □ Skeleton (loading state)
    □ Populated (success state)
    □ Empty (zero results)
    □ Error (failure — human message)
    □ Partial (some loaded)
□ All required DOM IDs and data attributes present
□ Test coverage ≥ 85% for business logic
□ Brand compliance: BRAND_DESIGN_GUIDELINES.md checked → COMPLIANT
□ Zero TODO / FIXME / lorem ipsum in production code
□ All application views functional and wired
```

**Verdict:** □ COMPLETE  □ INCOMPLETE
**Signed by Finish Auditor:** _______________ **Date:** _______________

---

## 💎 TIER 4: POLISH VERIFICATION
**Owner:** company_robert + company_luxury_designer + company_copywriter
**Deliverable:** POLISH_VERIFICATION.md

```
□ Robert California 14-Point Anti-Slop Audit: 14/14 PASS
□ Luxury Design Enforcer 8-Dimension Audit: APPROVED
□ Brand Storyteller narrative cohesion: APPROVED
□ All microcopy (buttons, errors, empty states) brand-voiced
□ Mobile 375px verified: no overflow, no crammed elements
□ All interactive elements have hover + active + focus states
□ Zero `transition: all` — GPU-only (transform, opacity)
□ Shadow elevation depth hierarchy: 5 levels distinct
□ Typography rhythm: H1 > H2 > H3 > body > caption clear
□ Robert California final seal: ✅ ROBERT CALIFORNIA — APPROVED TO SHIP
```

**Robert's Score:** ___/14 points
**Verdict:** □ POLISHED  □ REJECTED (requires rework)
**Signed by Robert California:** _______________ **Date:** _______________

---

## 🏆 TIER 5: EXCELLENCE GATE
**Owner:** company_cto + company_vpeng + company_robert
**Deliverable:** EXCELLENCE_VERIFICATION.md

```
□ Performance: Sub-100ms INP on mid-range device
□ 60fps verified (zero dropped frames in rAF loops)
□ DevicePixelRatio clamped to Math.min(DPR, 2.0) — zero over-rendering
□ Zero shadowBlur in canvas animation loops
□ Lighthouse: Performance ≥ 90, Accessibility ≥ 90
□ Reality Gate: $? === 0 (all tests passing, clean terminal)
□ Brand Auditor: BRAND_COMPLIANT final verdict
□ CTO Technical Certification issued
□ VP Engineering Release Authorization granted
□ "Would a Stripe / Linear / Apple engineer be proud?" → YES
```

**Lighthouse Score:** Performance: ___ / Accessibility: ___
**Verdict:** □ EXCELLENCE ACHIEVED  □ BELOW STANDARD
**Signed by CTO:** _______________ **Date:** _______________

---

## 🚀 FINAL SHIP GATE

```
□ TIER 0: LOCKED     (CPO signed)
□ TIER 1: VERIFIED   (PO + QA signed)
□ TIER 2: CORRECT    (Dwight signed, $? === 0)
□ TIER 3: COMPLETE   (Finish Auditor signed)
□ TIER 4: POLISHED   (Robert California APPROVED)
□ TIER 5: EXCELLENT  (CTO + VP Eng signed)
□ start.bat verified by Darryl Philbin (cold boot tested)
□ Kaizen debrief completed by David Wallace
    → learnings.md updated
    → anti-patterns.md updated
```

**MISSION STATUS:** □ ✅ SHIPPED  □ ⏸️ BLOCKED  □ ❌ FAILED

**Final Ship Authorization:**
```
CTO:         _______________  Date: _______________
VP Eng:      _______________  Date: _______________
Robert:      _______________  Date: _______________
Boss (CEO):  _______________  Date: _______________
```

---

> **Constitutional Note:** No task is complete without ALL 6 tier verdicts above filled and signed by active subagents (not text simulations). Rule 22 mandates `invoke_subagent` for every specialist. Textual simulation of sign-offs is AP-060 (Level-0 Constitutional Violation).
