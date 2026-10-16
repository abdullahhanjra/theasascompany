# 🤝 THE BORING COMPANY — OFFICIAL MEETING SYSTEM

> Every meeting has a **purpose**, a **format**, a **duration**, and **mandatory attendees**.
> No meeting is optional for mandatory attendees. No meeting runs over time.
> The Boss calls every meeting. Agents do not meet without Boss authorization.
>
> **🚨 THE PRE-CODE WRITING MANDATE (RULE 25):** Every major technical, architectural, design, performance, psychological, or responsive decision MUST author and commit `MEETING_NOTES.md` to disk BEFORE any implementation code is written. No agent may write code without approved meeting notes.

---

## MEETING TYPE 1: WAR ROOM KICKOFF
**When:** Before EVERY major task (feature, redesign, bug fix >5 lines)
**Duration:** 3-5 minutes
**Called by:** The Boss
**Mandatory attendees:** CPO + CTO + Hank Tate + Jim Halpert + The Toolmaster (Chief Tooling Architect)
**Optional attendees:** Any specialist relevant to the task

### Agenda (strict order):
```
0. [Toolmaster] Present 10X MCP Tooling Contract (Empirical Recon, 5 W's, Mathematical Net Yield, Parametric Blueprints, Quotas) (30 seconds)
1. [CPO]        State the requirement in plain English (30 seconds)
2. [CTO]        State the technical approach (30 seconds)
3. [Hank]       Declare what is FROZEN (backend contracts, schemas)
4. [Jim]        Confirm architecture impact (60 seconds)
5. [Boss]       Assign tasks to specific agents with deadlines
6. [All]        Confirm understanding — any confusion = stop and ask Founder NOW
```

### Rules:
- If CPO and CTO disagree → Boss decides immediately (no debate)
- If Hank says FREEZE → nothing proceeds until he unfreezes
- If any agent is confused → say so NOW, not later
- Output: task assignments in MISSION_BRIEF.md

---

## MEETING TYPE 2: DAILY STANDUP (Per-Mission Check-in)
**When:** Every 15 minutes of wall-clock work during active missions
**Duration:** 60 seconds max
**Called by:** The Boss (automatic)
**Mandatory attendees:** All active agents on current mission

### Format (each agent says exactly):
```
[Agent Name]:
✅ DONE: [What I completed]
🔄 DOING: [What I'm working on right now]
🛑 BLOCKED: [What's stopping me — or NONE]
```

### Senior review during standup:
- **CTO** reviews what Stanley/Coder/Ryan said → immediately flags wrong approach
- **Angela** reviews what TDD engine said → immediately flags missing test coverage
- **Hank** reviews what anyone touching backend said → immediately flags risk
- **Robert** reviews what Pam/Ryan said → immediately flags taste failures

### Blocking rules:
- If an agent says BLOCKED → Boss immediately resolves or escalates
- If an agent says they're "done" but senior disagrees → redo requested immediately
- No "almost done" — either done (with proof) or in-progress

---

## MEETING TYPE 3: ARCHITECTURE REVIEW (Jim's Court)
**When:** Before any new module, API, or database change
**Duration:** 5-8 minutes
**Called by:** CTO or Boss
**Mandatory attendees:** Jim Halpert + Hank Tate + Stanley + Oscar
**Optional:** Angela, Dwight, Kevin

### Jim runs this meeting:
```
1. [Jim]     Present proposed architecture (2 min)
2. [Dwight]  Attack it — find the weakest point (1 min)
3. [Hank]    Confirm backend freeze perimeter (30 sec)
4. [Oscar]   Validate API contracts and state machines (1 min)
5. [Stanley] Confirm he understands exactly what to build (30 sec)
6. [Jim]     Finalize and write ARCHITECTURE.md
```

### Jim's veto power:
- Jim can block implementation if it deviates from architecture
- No one codes until Jim's ARCHITECTURE.md is written and approved
- Stanley CANNOT "figure it out while coding" — he follows the blueprint

---

## MEETING TYPE 4: CODE REVIEW SESSION (Senior Beats Junior)
**When:** After every implementation, before testing begins
**Duration:** 5 minutes
**Called by:** Angela or Hank
**Mandatory attendees:** The coder + their senior + Angela

### Review format:
```
[Senior reads code line by line]
→ For every concern: "Line [N]: [exact problem] → fix it like [exact solution]"
→ No vague feedback: never "this doesn't look right" — always "here's exactly why and how to fix"
→ Junior takes notes — does not argue
→ Junior fixes ALL items before review closes
→ Senior confirms fixes with eyes on the corrected file
```

### Seniority enforcement:
- CTO reviews Jim's architecture decisions
- Jim reviews Stanley's implementation
- Hank reviews everything touching backend
- Angela reviews all test files
- Robert reviews all frontend files

### Zero tolerance items (automatic redo):
- Hardcoded values that should be configurable
- Missing error handling
- No test for the implemented function
- Functions over 25 lines without clear justification
- Dependency added without Boss approval

---

## MEETING TYPE 5: SECURITY WAR ROOM (Dwight's Combat Session)
**When:** Before any feature with user input, auth, file ops, or network calls
**Duration:** 5-10 minutes
**Called by:** CTO or VP Ops
**Mandatory attendees:** Dwight + Creed + Hank + Inquisitor

### Attack protocol:
```
Round 1 — Dwight:  3-probe chaos/concurrency/security attack
Round 2 — Creed:   Real pen-test simulation with actual curl commands
Round 3 — Inquisitor: Line-by-line code inspection for hidden flaws
Round 4 — Hank:    API contract freeze confirmation
Output:  VULNERABILITIES.md + SECURITY_AUDIT.md
Stanley/Coder must fix ALL CRITICAL and HIGH before shipping
```

---

## MEETING TYPE 6: FRONTEND DESIGN REVIEW (Robert's Court)
**When:** After any frontend implementation, before delivery
**Duration:** 5 minutes
**Called by:** CPO or VP Product
**Mandatory attendees:** Robert California + Pam Beesly + Val Johnson
**Optional:** Jan Levinson (if design direction was set)

### Robert runs this meeting (STRICT):
```
[Robert runs 14-point anti-slop audit — out loud, point by point]
Point 1: Dark mode background ........... PASS / FAIL
Point 2: Typography hierarchy ........... PASS / FAIL
Point 3: Spacing on 4px grid ............ PASS / FAIL
Point 4: Hover + active + focus ......... PASS / FAIL
Point 5: Animations (transform/opacity). PASS / FAIL
Point 6: Mobile 375px ................... PASS / FAIL
Point 7: No placeholder text ............ PASS / FAIL
Point 8: Color palette (max 3 accent) ... PASS / FAIL
Point 9: Loading/empty/error states ..... PASS / FAIL
Point 10: Scroll animations ............. PASS / FAIL
Point 11: Glass/neumorphism quality ..... PASS / FAIL
Point 12: No AI slop patterns ........... PASS / FAIL
Point 13: 3-second rule ................. PASS / FAIL
Point 14: Stripe/Linear engineer pride .. PASS / FAIL

VERDICT: APPROVED ✅ / REJECTED ❌
```

### Robert's enforcement:
- ANY FAIL → entire frontend returned to Pam for redo
- Robert NEVER says "mostly good" — it's binary PASS or FAIL
- Pam gets ONE redo opportunity before Robert escalates to Boss
- After redo: Robert re-runs all 14 points from scratch

---

## MEETING TYPE 7: PRE-SHIP FINAL CHECKLIST (Oscar + Gabe Gate)
**When:** After ALL work is complete, BEFORE delivery to Founder
**Duration:** 5-10 minutes
**Called by:** Boss
**Mandatory attendees:** Oscar Martinez + Gabe Lewis + David Wallace

### This is the final gate. Nothing ships without both clearing it.

**OSCAR'S TECHNICAL COMPLETENESS CHECKLIST:**
```
[ ] 1.  All API endpoints implemented and tested?
[ ] 2.  Database schema complete and migrations run?
[ ] 3.  All unit tests passing? (exit code 0 attached)
[ ] 4.  All integration tests passing? (exit code 0 attached)
[ ] 5.  start.bat working? Browser opens automatically?
[ ] 6.  App runs 100% offline? No CDN calls?
[ ] 7.  Performance: API <100ms, UI 60fps?
[ ] 8.  Error states handled? (404, 500, empty DB, etc.)
[ ] 9.  Frontend complete with scroll animations?
[ ] 10. Mobile 375px layout verified?
[ ] 11. Security: path traversal tested and blocked?
[ ] 12. ARCHITECTURE.md, API_CONTRACT.md written?
```

**GABE'S QUALITY & ACCOUNTABILITY CHECKLIST:**
```
[ ] 1.  Every assigned task actually completed (not skipped)?
[ ] 2.  README.md beginner-friendly and accurate?
[ ] 3.  No hardcoded credentials or secrets in code?
[ ] 4.  Licensing: zero GPL/AGPL runtime dependencies?
[ ] 5.  Database schema: all changes additive-only?
[ ] 6.  No TODO / FIXME left in production code?
[ ] 7.  Code review completed by correct senior?
[ ] 8.  All VULNERABILITIES.md issues addressed?
[ ] 9.  David Wallace completed Kaizen debrief?
[ ] 10. Anti-patterns.md updated for this session?
[ ] 11. Darryl verified start.bat on clean machine?
[ ] 12. Val completed accessibility audit?
```

### ENFORCEMENT (Non-Negotiable):
- Any unchecked box → **DELIVERY HALTED**
- Oscar or Gabe names the specific agent responsible for the gap
- That agent is called out DIRECTLY: "[Agent], you missed [X]. Fix it NOW."
- Agent has one chance to fix before Boss escalates to Founder
- After fix: Oscar/Gabe re-verify that specific item before clearing

---

## MEETING TYPE 8: POST-MISSION KAIZEN (David's Debrief)
**When:** After every completed mission
**Duration:** 3 minutes
**Called by:** Boss or David Wallace
**Mandatory attendees:** David Wallace + Boss + any agent who had failures

### David's agenda:
```
1. What went perfectly? (add to learnings.md)
2. What went wrong? (add to anti-patterns.md)
3. Who missed a task? (specific agent + lesson)
4. What rule do we add to prevent recurrence?
5. Is Founder preference updated if needed?
6. Deliver 3-bullet card to Founder
```

---

## 📅 MEETING TRIGGER MAP

| Trigger | Meeting | Called By | Mandatory Pre-Code Artifact |
|---|---|---|---|
| Founder sends /boss [task] | War Room Kickoff | Boss | MISSION_BRIEF.md |
| Agent reports blocked | Immediate mini-standup | Boss | STANDUP_LOG.md |
| Code implementation complete | Code Review | Angela/Hank | CODE_REVIEW.md |
| New module/API/schema | Architecture Review | CTO | ARCHITECTURE.md |
| User input / file ops / auth | Security War Room | CTO/VP Ops | SECURITY_AUDIT.md |
| Frontend implementation done | Design Review | CPO | TASTE_AUDIT.md |
| All work complete | Pre-Ship Checklist | Boss | PRE_SHIP_CHECKLIST.md |
| Mission delivered | Kaizen Debrief | David Wallace | KAIZEN_REPORT.md |
| Monthly / "what should we build next?" | Vision Room | CEO | VISION_BOARD.md |
| Two agents disagree | Debate Room | Any agent | DEBATE_OUTCOME.md |
| Feature costs >2 hours to build | Research Sprint | CPO or Boss | RESEARCH_BRIEF.md |
| Complex backend / concurrency / high-load API | Meeting Type 12: Technical Alignment | CTO / Lead Dev | MEETING_NOTES.md (Technical) |
| UI layouts / visual styles / user copy | Meeting Type 13: Design Decision | VP Creative / CPO | MEETING_NOTES.md (Design) |
| Animations / 3D WebGL / heavy interactive effects | Meeting Type 14: Effects & Performance | Effects Lead / Kevin | MEETING_NOTES.md (Effects) |
| Onboarding / habit loops / retention / rewards | Meeting Type 15: Psychology & Engagement | CPO / Psychology Lead | MEETING_NOTES.md (Psychology) |
| Multi-viewport refactor / responsive screens | Meeting Type 16: Responsive Design | Responsive Lead / Maya | MEETING_NOTES.md (Responsive) |

---

## MEETING TYPE 9: THE VISION ROOM (Monthly Roadmap Planning)

**When:** Monthly cadence OR when Founder asks "what should we build next?" / "what's our big move?"
**Duration:** 15-20 minutes
**Called by:** Michael Scott (CEO)
**Mandatory attendees:** CEO + CPO + CTO + Robert California + VP Product + CRO

### Purpose
Think 10 steps ahead. Not tactical execution — strategic direction.
Every Vision Room ends with 3 concrete quarterly priorities backed by K-factor math.

### Agenda (Run In This Exact Order)
```
1. [CPO — 3 min]      USER PAIN REPORT
   → Present top 3 real user pain points
   → Each must have Reddit/AppStore/real-world evidence (not assumptions)
   → Format: "Users hate [X] because [evidence source]"

2. [CTO — 3 min]      TECHNICAL MOAT
   → What technical capability do we have that competitors can't easily replicate?
   → What tech trend should we exploit in the next 90 days?
   → Format: "Our unfair advantage is [X] because [technical reason]"

3. [Robert — 2 min]   DESIGN VISION
   → What one feature or design direction would make users emotionally attached?
   → What would make them show the app to a friend unprompted?
   → Format: "Users would share this if [emotional hook]"

4. [VP Product — 3 min] K-FACTOR PROPOSAL
   → Propose 1 feature with viral math
   → MUST show: K = i × c ≥ 1.2
   → i = invites per active user, c = conversion rate of invitees
   → Format: "Feature [X] creates K = [i] × [c] = [K value]"

5. [CRO — 2 min]      MONETIZATION LEVER
   → What revenue mechanism are we missing?
   → What would move free users to paid?
   → Format: "The missing lever is [X] — projected uplift [Y]%"

6. [CEO — 5 min]      PRIORITIZATION & OUTPUT
   → Weigh all inputs against Founder vision
   → Select top 3 quarterly priorities
   → Write VISION_BOARD.md with owner, K-factor, and timeline
```

### Required Output: VISION_BOARD.md
```markdown
# Q[N] Vision Board — [Date]

## Priority 1: [Initiative Name]
- Owner: [Agent]
- K-factor: K = [i] × [c] = [value]
- User Pain it solves: [evidence-backed]
- Technical approach: [brief]
- Timeline: [weeks]

## Priority 2: ...
## Priority 3: ...
```

---

## MEETING TYPE 10: THE DEBATE ROOM (Conflict Resolution)

**When:** Auto-triggered when any agent says "I disagree" and 2 exchanges haven't resolved it
**Duration:** 3 minutes STRICT — Boss enforces time
**Called by:** ANY agent who disagrees
**Attendees:** The two disagreeing agents + one neutral domain judge

### Protocol (Strictly 3 Minutes)
```
ROUND 1 (60 sec) — Agent A:
  State position + 3 evidence points
  "I propose [X] because: (1) [evidence] (2) [evidence] (3) [evidence]"

ROUND 2 (60 sec) — Agent B:
  Counter-position + 3 evidence points
  "I counter with [Y] because: (1) [evidence] (2) [evidence] (3) [evidence]"

ROUND 3 (30 sec) — Judge:
  Rules immediately. No further discussion.
  "[Agent A/B] approach is correct because [1-sentence reason]. Proceed."

OUTCOME (30 sec):
  Loser: "I disagree but I commit."
  Winner: "Thank you. I'll make it work."
  All: Move forward immediately. No re-litigation.
```

### Judge Assignment
| Dispute Type | Judge |
|---|---|
| Technical / architecture | CTO |
| Design / UX / taste | Robert California |
| Testing / quality | Angela Martin |
| Security / safety | Hank Tate |
| Product / features | CPO |
| Any other | Michael Scott (CEO) — final |

### Banned Behaviors
- Re-litigating after commitment
- "Passive commitment" (agreeing verbally, implementing differently)
- Bringing cosmetic micro-decisions to Debate Room
- Personal attacks or blame

---

## MEETING TYPE 11: THE RESEARCH SPRINT (Pre-Build Forensic Intelligence)

**When:** Mandatory before any feature costing >2 hours to build
**Duration:** 10-15 minutes
**Called by:** CPO or Boss
**Attendees:** CPO + VP Product + domain specialist (CTO if technical, Robert if design)

### Purpose
Stop. Research. Know the graveyard. Find the anomaly. Calculate the math. THEN build.
No feature gets built on assumptions.

### The 5-Stage Sprint
```
STAGE 1: FREEZE ASSUMPTIONS (3 min)
  → List every assumption being made: "We assume users will [X]"
  → Identify which assumptions are unverified
  → Mark the 2 highest-risk assumptions for research

STAGE 2: GRAVEYARD AUTOPSY (4 min)
  → Search: site:reddit.com "[competitor/domain]" "stopped using" OR "deleted" OR "waste of time"
  → Search: "[competitor app name] 1-star review" complaints
  → Find 3 apps that attempted this feature and failed
  → Extract: WHY they failed (not just THAT they failed)

STAGE 3: ANOMALY HUNTING (3 min)
  → Find 1 app that broke through with similar concept
  → Use tavily/exa: "[domain] app viral growth how"
  → Extract: What was their SPECIFIC differentiator? (Not "great UX" — the actual mechanism)

STAGE 4: VIRAL MATH (2 min)
  → K = i × c
  → i = avg invites per active user this feature drives
  → c = % of invitees who convert to active users
  → K < 1.0 = sub-viral → redesign or kill
  → 1.0 ≤ K < 1.2 = marginal → consider alternatives
  → K ≥ 1.2 = approved → build with confidence

STAGE 5: VERDICT (1 min)
  → GO: Evidence supports building. Proceed with spec.
  → PIVOT: Different approach identified. Redesign before spec.
  → KILL: No viable path found. Kill feature. Log why.
```

### Required Output: RESEARCH_BRIEF.md (attached to feature spec)
```markdown
# Research Brief — [Feature Name] — [Date]

## Assumptions Frozen
- [List assumptions made going in]

## Graveyard Evidence
- App 1 [name]: Failed because [reason]
- App 2 [name]: Failed because [reason]
- App 3 [name]: Failed because [reason]

## Anomaly Analysis
- Breakout: [App name] — Secret: [specific mechanism]

## Viral Math
- K = [i] × [c] = [value] → [GO/MARGINAL/KILL]

## Verdict: [GO / PIVOT / KILL]
- Reason: [evidence-based]
```

---

## MEETING TYPE 12: TECHNICAL ALIGNMENT MEETING (CTO + Lead Dev + SRE)

**When:** Before implementing complex architecture, high-load subsystems, concurrency mechanisms, or distributed state
**Duration:** 5-8 minutes
**Called by:** Dr. Riya Patel (CTO) or Rafael Torres (Lead Dev)
**Mandatory attendees:** CTO (`company_cto`) + Lead Dev (`company_lead`) + SRE (`company_sre`)
**Optional attendees:** Priya Sharma (`company_backend_platform`), Dr. Kofi Mensah (`company_dba`)

### Purpose
Align technical contracts, verify transaction isolation levels, enforce sub-100ms latency budgets, and lock automated recovery procedures before touching production services.

### Agenda:
```
1. [CTO — 2 min]      State technical requirements, data flow boundaries, and concurrency model
2. [Lead Dev — 2 min] Review implementation approach, error handling paths, and API contracts
3. [SRE — 2 min]      Audit SLO/Error budgets, connection pooling limits, and crash-recovery procedures
4. [All — 1 min]      Verify zero backward-incompatible changes and sign off on MEETING_NOTES.md
```

### Pre-Code Writing Gate:
- **Mandatory Output:** Section in `MEETING_NOTES.md` (Technical Alignment)
- Implementation code is strictly **LOCKED** until CTO, Lead Dev, and SRE all record unanimous approval.

---

## MEETING TYPE 13: DESIGN DECISION MEETING (VP Creative + UI Designer + Simple English Specialist)

**When:** Before finalizing new layouts, major visual changes, user-facing feature descriptions, or marketing interfaces
**Duration:** 5 minutes
**Called by:** Jan Levinson (VP Creative / CCO) or Chief Product Officer (`company_cpo`)
**Mandatory attendees:** Jan Levinson (`company_jan`) + Elena Vasquez (`company_ui`) + Maya Angelou / Alan Alda (`company_simple_english_specialist`)
**Optional attendees:** Robert California (`company_robert`), Chloe Park (`company_simplicity_guardian`)

### Purpose
Harmonize luxury visual design with effortless human understanding. Ensure visual hierarchy, typography scales, and color harmonies are paired with everyday, jargon-free English so ANY user can understand every feature instantly.

### Agenda:
```
1. [VP Creative — 2 min]     Present aesthetic vision, mood board tokens, and layout composition
2. [UI Designer — 1.5 min]   Validate 8px grid alignment, elevation hierarchy, and color contrast
3. [Simple English — 1.5 min] Purge all technical/marketing jargon; author 3-bullet "Show Don't Tell" feature explainer
```

### Pre-Code Writing Gate:
- **Mandatory Output:** Section in `MEETING_NOTES.md` (Design Decision & Simple English Explainer)
- No CSS, HTML, or component code may be written until every button, tooltip, and label is written in simple, everyday English (<15 words/sentence).

---

## MEETING TYPE 14: EFFECTS & PERFORMANCE MEETING (Effects Specialist + Motion Strategist + Performance Lead)

**When:** Before introducing animations, canvas/WebGL scenes, 3D graphics, particle engines, or scroll effects
**Duration:** 5 minutes
**Called by:** John Carmack / Paul Irish (`company_effects_performance_specialist`) or Kevin Malone (`company_kevin`)
**Mandatory attendees:** Effects Specialist (`company_effects_performance_specialist`) + Motion Strategist (`company_animation_strategist`) + Performance Lead (`company_kevin`)
**Optional attendees:** Dr. Aris Thorne (`company_physics`), Yuki Tanaka (`company_motion`)

### Purpose
Enforce silky smooth 60fps visual excellence under ruthless hardware performance budgets. Validate that every visual effect uses researched, vetted libraries (GSAP, CSS3, Three.js, Lottie) without burning CPU, leaking memory, or causing scroll lag.

### Hard Performance Budgets (Carmack-Irish Protocol):
- Peak CPU: `< 60%` (Sub-15% idle)
- Memory allocation: `< 50MB RAM` heap footprint
- Frame rate: Rock-solid `60fps` (16.6ms frame budget, zero long tasks >50ms)
- Zero scroll lag: Passive listeners and scroll virtualization
- Automatic pause: Must halt rendering loop within 100ms when tab is hidden (`document.hidden === true`) or off-screen (`IntersectionObserver`)

### Pre-Code Writing Gate:
- **Mandatory Output:** Section in `MEETING_NOTES.md` (Effects & Performance Budget Contract)
- No animation or graphics code may be committed without explicit GPU compositing confirmation (`transform`/`opacity` only).

---

## MEETING TYPE 15: PSYCHOLOGY & ENGAGEMENT MEETING (Psychology Specialist + CPO + Growth Lead)

**When:** Before drafting onboarding funnels, reward systems, streak mechanics, retention loops, or notification strategies
**Duration:** 5-8 minutes
**Called by:** Chief Product Officer (`company_cpo`) or Psychology Specialist (`company_psychology_engagement_specialist`)
**Mandatory attendees:** Psychology Specialist (`company_psychology_engagement_specialist`) + CPO (`company_cpo`) + VP Product & Growth (`company_vpprod`)
**Optional attendees:** Dr. Sofia Marchetti (`company_opus_psychology`), Dr. Amina Al-Rashid (`company_brand_researcher`)

### Purpose
Apply the **6 Core Psychological Principles** (Autonomy, Mastery, Purpose, Progress, Community, Rewards) and architect the **Lifetime Engagement Curve** (Day 1 to Year 1) to build enduring user habits—while rigorously certifying **ZERO Dark Patterns**.

### Evaluation Criteria:
1. **Autonomy:** Is participation 100% voluntary with clear dismiss/exit options?
2. **Mastery:** Does the interface teach competence and progressive capability?
3. **Purpose:** Does this feature connect directly to the user's authentic life goals?
4. **Progress:** Are milestones celebrated without anxiety or punishment?
5. **Community:** Is social proof respectful, uplifting, and free from shame?
6. **Rewards:** Are rewards meaningful and delightful without manipulative addiction loops?
7. **Dark Pattern Scan:** Confirm ZERO roach motels, confirmshaming, false urgency, or hidden continuity.

### Pre-Code Writing Gate:
- **Mandatory Output:** Section in `MEETING_NOTES.md` (Psychology & Ethical Engagement Spec)
- No gamification, streak, or onboarding code may be written if any dark pattern is present.

---

## MEETING TYPE 16: RESPONSIVE DESIGN MEETING (Responsive Specialist + Frontend Lead + Simplicity Guardian)

**When:** Before implementing or refactoring screens, layouts, navigation, or interactive elements across viewports
**Duration:** 5 minutes
**Called by:** Dieter Rams / Ethan Marcotte (`company_responsive_design_specialist`) or Frontend Lead (`company_frontend_platform`)
**Mandatory attendees:** Responsive Specialist (`company_responsive_design_specialist`) + Frontend Lead (`company_frontend_platform` / `company_pam`) + Simplicity Guardian (`company_simplicity_guardian`)
**Optional attendees:** Val Johnson (`company_val`), Elena Vasquez (`company_ui`)

### Purpose
Enforce **ONE SINGLE DESIGN** that adapts seamlessly from iPhone SE (320px) to 4K desktop (2560px). Guarantee zero layout breaks, zero horizontal overflow, touch targets >= 48px, 8px grid alignment, and fluid typographic scaling.

### Core Invariants:
- **Zero Horizontal Overflow:** Body scroll width equals window inner width across 320px, 375px, 768px, 1440px, and 2560px.
- **Touch Target Floor:** All interactive controls >= 48px × 48px on mobile viewports.
- **Universal Grid:** Strict adherence to 8px spatial intervals (4px half-steps).
- **Design Continuity:** The soul, colors, buttons, and elevation of the design remain identical across all screens.

### Pre-Code Writing Gate:
- **Mandatory Output:** Section in `MEETING_NOTES.md` (Responsive Architecture Specification)
- No responsive styles or layout wrappers may be implemented without validated breakpoint mappings.

---

## 📝 MANDATORY PRE-CODE ARTIFACT: MEETING_NOTES.md

> **CONSTITUTIONAL MANDATE:** Before ANY agent writes a single line of implementation code for a major technical, design, effects, psychological, or responsive decision, a formal `MEETING_NOTES.md` file MUST be authored and saved in the project or mission directory.

### Canonical Schema: `MEETING_NOTES.md`

```markdown
# MEETING NOTES — [Mission / Feature Name]
**Meeting Type:** [e.g. Type 12 Technical Alignment / Type 13 Design Decision / Type 14 Effects / Type 15 Psychology / Type 16 Responsive]
**Date & Time:** [ISO 8601 Timestamp]
**Attendees:** [List of participating agents]
**Status:** APPROVED TO CODE ✅ / BLOCKED 🛑

---

## 1. DECISION SUMMARY & PLAIN ENGLISH OBJECTIVE
- **What is being built:** [1-sentence plain English definition]
- **Why it matters:** [Direct human benefit]

---

## 2. KEY ARCHITECTURAL & DESIGN DECISIONS
- [Decision 1 + Rationale]
- [Decision 2 + Rationale]

---

## 3. SPECIALIST REVIEWS & INVARIANTS LOCKED
- **Technical Alignment (CTO / SRE):** [Contracts locked, SLOs preserved, zero breaking changes]
- **Design & Simple English (Jan / UI / Simple English):** [3-bullet explainer, everyday words, 8px grid]
- **Effects & Performance (Effects / Kevin):** [<60% CPU, <50MB RAM, 60fps, tab hidden pause]
- **Psychology & Ethics (Psychology / CPO):** [6 principles scored, 0 dark patterns certified]
- **Responsive Architecture (Responsive / Pam):** [320px to 2560px verified, touch targets >= 48px, 0 overflow]

---

## 4. ASSIGNMENTS & EXECUTION GATES
| Agent | Exact Task Assigned | Expected Deliverable | Verification Gate |
|---|---|---|---|
| [Agent] | [Task] | [File / Test] | [$? === 0] |

---

## 5. SIGN-OFF & CODE RELEASE AUTHORIZATION
- [x] All mandatory attendees concur
- [x] Zero unresolved objections
- [x] Code writing authorized by Meeting Lead
```

---

*Meeting System last updated: 2026-09-28 — 72-Agent Architecture (Meeting Types 12-16 added + Mandatory MEETING_NOTES.md Pre-Code Gate)*
*Authority: MASTER_AGENT_DNA.md → AGENTS.md*
