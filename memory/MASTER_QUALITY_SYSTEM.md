# 🏆 MASTER OUTPUT QUALITY SYSTEM v1.0
# The Boring Company — Every Output at Opus / GPT Astra Level

> **Authority:** This document governs quality standards for ALL outputs produced under the `/boss` command.
> **Trigger:** This system activates ONLY via `/boss`. It is NOT a standalone workflow.
> **Last Updated:** 2026-09-27 — Integrated with 67-Agent Architecture (Tier 4.6 Opus 5.5 Specialists)

---

## 📊 THE QUALITY PYRAMID

```
                         ▲
                        /|\
                       / | \
                      /  |  \
                TIER 5: EXCELLENCE
               (World-Class Standard)
              ╱─────────────────────╲
             /   TIER 4: POLISH      \
            /   (Luxury Craftsmanship) \
           ╱────────────────────────────╲
          /   TIER 3: COMPLETENESS       \
         /   (All aspects covered)        \
        ╱────────────────────────────────────╲
       /   TIER 2: CORRECTNESS               \
      /    (It works, all edge cases handled)  \
     ╱──────────────────────────────────────────╲
    /   TIER 1: CLARITY                          \
   /    (Spec is unambiguous, outcome measurable)  \
  ╱──────────────────────────────────────────────────╲
 /   TIER 0: PURPOSE                                  \
/    (Why this exists, who it is for, what it solves)  \
──────────────────────────────────────────────────────
│  TIER -0.5: OPUS DEEP CONTEXT RESEARCH (FOUNDATION) │
│  (User psychology, 8-10 competitors, cultural semiotics)
──────────────────────────────────────────────────────
```

---

## 🔬 TIER -0.5: OPUS DEEP CONTEXT RESEARCH (The Bedrock)

**Owner:** `company_opus_researcher` (Dr. James Okafor)
**Deliverable:** `OPUS_RESEARCH.md` (3,000+ words)
**Time Allocation:** 30–40% of project time spent on research before ANY spec or design begins.

### Gate Criteria
```
□ 3 User Psychological Profiles documented (emotional context, fears, internal language, trust triggers)
□ 8-10 direct/indirect competitors analyzed in depth (color, type, voice, gaps, complaints)
□ Cultural context matrix complete (Hofstede dimensions, religious/regional semiotics)
□ Brand emotional territory defined as a specific feeling (not a marketing feature)
□ The single breakthrough "third-layer insight" identified
□ 7 strategic research questions formulated for team debate
```

### What Failure Looks Like
- Rushing to spec without understanding user psychology → generic AI output
- Designing without cultural semiotics → alienating target audience
- Competitive blindness → cloning flawed patterns from competitors

---

## 🎯 TIER 0: PURPOSE CLARITY (Foundation)

**Owner:** `company_cpo` (Chief Product Officer)
**Deliverable:** `REQUIREMENTS_LOCKED.md`

### Gate Criteria
```
□ The "why" is documented: what problem does this solve?
□ The target user is named (specific persona, not "users")
□ The success metric is measurable (not "it should feel good")
□ The out-of-scope list is explicit (what we are NOT building)
□ Founder has confirmed scope in one sentence
```

### What Failure Looks Like
- Building without knowing WHY → wasted effort
- Vague persona like "all users" → no design focus
- Unmeasurable success → can never call it done

---

## 🎯 TIER 1: CLARITY VERIFICATION (Requirements)

**Owners:** `company_po` (Soo-Jin Park) + `company_qa` (Isabela Carvalho)
**Deliverable:** `SPEC_VERIFICATION.md`

### Gate Criteria
```
□ All user stories follow INVEST format (Independent, Negotiable, Valuable, Estimable, Small, Testable)
□ All Gherkin acceptance criteria are written: Given/When/Then
□ Definition of Ready (DoR) passed: no blocking unknowns
□ Edge cases documented for all critical paths
□ Each story has a clear Definition of Done (DoD)
```

### What Failure Looks Like
- Stories with "TBD" acceptance criteria → untestable work
- Stories that can't be verified → no Quality Gate possible
- Missing edge cases → bugs shipped to production

---

## 🎯 TIER 2: CORRECTNESS VERIFICATION (It Works)

**Owners:** `company_dwight` (Red Team) + `company_creed` (AppSec) + `company_inquisitor` (Deep Attack)
**Deliverable:** `CORRECTNESS_VERIFICATION.md`

### Gate Criteria
```
□ All unit and integration tests pass ($? === 0)
□ 3-Probe adversarial attack protocol completed:
    Probe 1: Crash — null inputs, missing fields, corrupt state
    Probe 2: Concurrency — race conditions, rapid repeated actions, simultaneous requests
    Probe 3: Injection — XSS, path traversal, SQLi, command injection
□ Zero critical or high vulnerabilities from AppSec scan
□ All error states return human-readable messages (no stack traces)
□ State machine transitions verified: every state transitions correctly
```

### What Failure Looks Like
- Tests passing but edge cases crashing → brittle code
- Race conditions in production → data corruption
- Stack traces in UI → security exposure

---

## 🎯 TIER 3: COMPLETENESS VERIFICATION (Everything Done)

**Owners:** `company_finish_auditor` + `company_tdd` + `company_brand_auditor`
**Deliverable:** `COMPLETENESS_VERIFICATION.md`

### Gate Criteria
```
□ 6-State Law satisfied for every dynamic component:
    1. Blank (initial, no data loaded)
    2. Skeleton (loading, data in flight)
    3. Populated (data loaded successfully)
    4. Empty (loaded but zero results)
    5. Error (load failed — human message)
    6. Partial (some loaded, some pending)
□ All DOM IDs and data attributes required by JS are present
□ Test coverage ≥ 85% for business logic paths
□ Brand compliance verified (BRAND_DESIGN_GUIDELINES.md)
□ Zero TODO / FIXME / lorem ipsum in production code
□ All 5 navigation views functional (or all app views, as applicable)
```

### What Failure Looks Like
- Missing loading states → users think app is broken
- Missing empty states → users think data is missing
- Untested business logic → silent production failures

---

## 🎯 TIER 4: POLISH VERIFICATION (Luxury Craftsmanship)

**Owners:** `company_robert` (Robert California) + `company_luxury_designer` + `company_copywriter`
**Deliverable:** `POLISH_VERIFICATION.md`

### Gate Criteria
```
□ Robert California's 14-Point Anti-Slop Audit: 14/14 PASS
□ Luxury Design Enforcer's 8-Dimension Polish Audit: APPROVED
□ Brand Storyteller narrative cohesion check: APPROVED
□ All microcopy (buttons, empty states, errors) brand-voiced
□ Mobile 375px layout verified: no overflow, no cramped elements
□ All interactions have 3-state choreography:
    Default → Hover → Active → Default (spring return)
□ Zero `transition: all` — only GPU-composited (transform, opacity)
□ Shadow depth hierarchy verified (5 elevation levels distinct)
□ Typography rhythm verified (clear H1 > H2 > H3 > body hierarchy)
```

### What Failure Looks Like
- Generic SaaS aesthetic → undifferentiated product
- Missing hover states → dead-feeling buttons
- Cramped mobile layout → users leave
- Robotic error messages → brand broken

---

## 🎯 TIER 5: EXCELLENCE GATE (World-Class Standard)

**Owners:** `company_cto` (Dr. Riya Patel) + `company_vpeng` + `company_robert`
**Deliverable:** `EXCELLENCE_VERIFICATION.md`

### Gate Criteria
```
□ Performance: Sub-100ms INP, zero jank at 60fps on mid-range device
□ DevicePixelRatio clamped to 2.0 (zero canvas over-rendering)
□ Zero shadowBlur in rAF canvas loops
□ Lighthouse Score: Performance ≥ 90, Accessibility ≥ 90
□ Reality Gate: $? === 0 (all tests passing, clean exit)
□ Would a Stripe / Linear / Apple engineer be proud of this?
□ Brand Auditor: BRAND_COMPLIANT final verdict
□ CTO Technical Certification: architecture holds under load
□ VP Engineering Release Authorization: pipeline green
```

### What Failure Looks Like
- Dropped frames at 60Hz → unprofessional, cheap feel
- Lighthouse below 85 → real users experience the pain
- Backend breakage from frontend changes → catastrophic

---

## 🔄 THE COMPLETE QUALITY FLOW (Every /boss Mission)

```
TIER -0.5: Dr. James Okafor → OPUS_RESEARCH.md (3,000+ words, 8-10 competitors, psychology)
    ↓
TIER 0: CPO → REQUIREMENTS_LOCKED.md
    ↓
TIER 1: PO + QA → SPEC_VERIFICATION.md
    ↓
TIER 2: Dwight + Creed + Inquisitor → CORRECTNESS_VERIFICATION.md
    ↓
TIER 3: Finish Auditor + TDD + Brand Auditor → COMPLETENESS_VERIFICATION.md
    ↓
TIER 4: Robert + Luxury Designer + Copywriter → POLISH_VERIFICATION.md
    ↓
TIER 4.5/4.6: Brand Council & Opus Specialists
    • Dr. Priya Menon → COLOR_PSYCHOLOGY.md (WCAG AAA locked palette)
    • Yuto Nakamura → ANIMATION_AUDIT.md (60fps, 5 classes, reduced-motion)
    • Dr. Sofia Marchetti → PSYCHOLOGY_AUDIT.md (7 ethical techniques, zero darks)
    • Wei Zhang → DESIGN_SYSTEM.md (Tokens → Components → Patterns, 5,000+ words)
    • Marcus Webb → OPUS_AUDIT.md (8-section audit, ≥9.0/10 ship threshold)
    ↓
TIER 5: CTO + VP Eng + Robert → EXCELLENCE_VERIFICATION.md
    ↓
🚀 PRODUCTION SHIP — Darryl packages start.bat → David runs Kaizen debrief
```

> **Rule:** No tier may be skipped. No tier gates forward without its deliverable document written to disk.
> **Override:** Only the Founder can waive a tier gate, explicitly, in writing.

---

## 📋 QUICK REFERENCE: TIER-TO-AGENT MAP

| Tier | Name | Primary Owner | Supporting Agents | Deliverable |
|---|---|---|---|---|
| Tier -0.5 | Opus Deep Research | `company_opus_researcher` | `company_brand_researcher`, `company_cpo` | OPUS_RESEARCH.md |
| Tier 0 | Purpose Clarity | `company_cpo` | `company_pm`, `company_ba` | REQUIREMENTS_LOCKED.md |
| Tier 1 | Clarity Verification | `company_po` | `company_qa` | SPEC_VERIFICATION.md |
| Tier 2 | Correctness | `company_dwight` | `company_creed`, `company_inquisitor` | CORRECTNESS_VERIFICATION.md |
| Tier 3 | Completeness | `company_finish_auditor` | `company_tdd`, `company_brand_auditor` | COMPLETENESS_VERIFICATION.md |
| Tier 4 | Polish & Luxury | `company_robert` | `company_luxury_designer`, `company_copywriter` | POLISH_VERIFICATION.md |
| Tier 4.6 | Opus 5.5 Systems | `company_design_system_architect` | `company_color_psychologist`, `company_animation_strategist`, `company_opus_psychology` | DESIGN_SYSTEM.md, OPUS_AUDIT.md |
| Tier 5 | World-Class Excellence | `company_cto` | `company_vpeng`, `company_opus_auditor`, `company_robert` | EXCELLENCE_VERIFICATION.md |

---

## 🏆 DEFINITION OF DONE (DoD) — Quality System Edition

A task is **DONE** when ALL of the following are true, with machine-observable proof:

1. `$? === 0` — All tests pass. No exceptions.
2. `OPUS_RESEARCH.md` exists on disk (≥ 3,000 words, deep context research complete).
3. All 6 Tier deliverable files exist on disk (REQUIREMENTS_LOCKED.md through EXCELLENCE_VERIFICATION.md).
4. `OPUS_AUDIT.md` shows `OPUS_APPROVED` with weighted score $\ge 9.0/10$ (no dimension $< 8.0$).
5. Robert California's verdict: `✅ ROBERT CALIFORNIA — APPROVED TO SHIP`.
6. Brand Auditor's verdict: `BRAND_COMPLIANT`.
7. CTO signs `EXCELLENCE_VERIFICATION.md` with technical certification.
8. Darryl Philbin packages and verifies `start.bat` cold boot.
9. David Wallace completes Kaizen debrief and updates `learnings.md` + `anti-patterns.md`.

---

## ⚠️ QUALITY ANTI-PATTERNS (Never Repeat)

| Anti-Pattern | Consequence | Prevention |
|---|---|---|
| Skipping Tier 0 (no requirements) | Building the wrong thing completely | CPO mandatory first |
| Simulated agent sign-offs (text only) | Rule 22 constitutional violation | invoke_subagent EVERY time |
| Merging polish into implementation | Rushed polish, visible degradation | Tier 4 runs AFTER Tier 3 |
| Approving without screenshots | Audit based on code, not reality | Robert requires rendered UI |
| "Mostly compliant" brand approval | Brand dilution | Binary: COMPLIANT or fix |


---

## ⚡ QUALITY RESTORATION MANDATE — 2026-10-03
### The 14-Law Upgrade: Thinking, Developing, Reasoning, Collaborating, Tool Usage

> **Enacted by:** Founder Abdullah Hanjra — after identifying quality degradation in company operations
> **Full Rule:** `agents/rules\25-quality-restoration-enforcement.md` (MANDATORY reading)

### THE 7 ORIGINAL DEGRADATION PROBLEMS → FIXES

| Problem | Fix | Law |
|---------|-----|-----|
| Agents doing each other's jobs | Job lane enforcement with file locks | Law 1 |
| Fast output over deep quality | 10X WOW standard — never just "okay" | Law 2 |
| Not asking questions before starting | 5+ simple questions mandatory first | Law 3 |
| Not using MCP tools | MCP Pre-Flight Checklist mandatory | Law 4 |
| Restarting after network drops | Resume protocol: read transcript → continue | Law 5 |
| Complex English to Founder | Grade 2-4 only. 10-year-old test. | Law 6 |
| Boss coding solo (not spawning agents) | AP-060 law: spawn always | Law 7 |

### THE 7 NEW CAPABILITY UPGRADES

| Upgrade | What It Does | Law |
|---------|-------------|-----|
| Thinking Protocol | WHY→RISKS→SMALLEST FIX→PROOF before any action | Law 8 |
| Development Protocol | READ→UNDERSTAND→PLAN→MCPs→CODE→TEST→VERIFY→REPORT | Law 9 |
| Collaboration Protocol | Announce files, report completion, no silence when blocked | Law 10 |
| Meeting Protocol | 8 triggers → STOP AND MEET format → commit after decision | Law 11 |
| Founder Preferences | Sacred laws about design, communication, quality, store identity | Law 12 |
| Confusion Protocol | Stop→2 options→ask Founder→wait→do exactly as told | Law 13 |
| Tool/MCP/Skill Access | Pre-flight checklist + skill SKILL.md must be read first | Law 14 |

### QUALITY FLOORS (After Rule 25)

| Quality Dimension | Minimum Score | How Measured |
|--|--|--|
| Deep work standard | WOW (not just okay) | Founder reaction |
| MCP tool usage | 100% when relevant | Pre-flight checklist pass |
| Simple English | Grade 2-4 | 10-year-old test |
| Machine proof | Exit code 0 | Terminal output |
| UI verification | Screenshot taken | chrome-devtools-mcp |
| Clarification questions | 5+ before starting | ask_question tool |

### COMPLETE SELF-CHECK (Run Before AND After Every Task)
See: `agents/rules\25-quality-restoration-enforcement.md` — COMPLETE SELF-CHECK section
