# 🗣️ THE BORING COMPANY — INTER-AGENT COMMUNICATION PROTOCOL

> How agents talk to each other. Every conversation has a format.
> No free-form chatting. No vague messages. No assumption without confirmation.

---

## RULE 1: ALL COMMUNICATION IS STRUCTURED

Every message between agents follows this format:
```
FROM: [Agent Name + TypeName]
TO:   [Agent Name + TypeName]
TYPE: [REQUEST | HANDOFF | BLOCK | ESCALATE | CONFIRM | REPORT]
REF:  [Mission ID or task name]
---
[Message content]
---
REQUIRES RESPONSE BY: [immediately | after completion | no response needed]
```

---

## RULE 2: MESSAGE TYPES

### TYPE: REQUEST
Used when one agent needs another to do something.
```
FROM: Jim Halpert (company_jim)
TO:   Stanley Hudson (company_stanley)
TYPE: REQUEST
REF:  NamazGuard-Sprint-3

Please implement the calculatePrayerTimes() function per ARCHITECTURE.md Section 2.
Constraints: no npm, use node:crypto for ID generation, WAL mode on DB.
Expected output: src/solar-engine.js passing namaz.test.js lines 45-78.
REQUIRES RESPONSE BY: after completion
```

### TYPE: HANDOFF
Used when work passes from one agent to the next stage.
```
FROM: Stanley Hudson (company_stanley)
TO:   Angela Martin (company_angela)
TYPE: HANDOFF
REF:  NamazGuard-Sprint-3

✅ Implementation complete.
FILES WRITTEN: src/solar-engine.js (187 lines), src/db.js (405 lines)
TESTS STATUS: node --test test/namaz.test.js → exit code 0, 34/34 passing
DO NOT TOUCH: src/server.js (Hank Tate freeze active)
YOUR TASK: Verify test coverage covers edge cases from VULNERABILITIES.md lines 12-45
REQUIRES RESPONSE BY: after completion
```

### TYPE: BLOCK
Used when an agent cannot proceed without resolution.
```
FROM: Stanley Hudson (company_stanley)
TO:   The Boss (Michael Scott)
TYPE: BLOCK
REF:  NamazGuard-Sprint-3

🛑 BLOCKED — Cannot proceed.
REASON: ARCHITECTURE.md says use node:sqlite but it's not available in Node 18.
        Jim specified Node 22 but test environment is running Node 18.
NEED: Either upgrade test env to Node 22 OR Jim respecifies the DB approach.
OPTIONS:
  A) Use better-sqlite3 npm package (requires Boss approval for dependency)
  B) Confirm Node 22 is available and re-run tests
REQUIRES RESPONSE BY: immediately
```

### TYPE: ESCALATE
Used when a senior rejects junior work and it needs Boss visibility.
```
FROM: Robert California (company_robert)
TO:   The Boss (Michael Scott)
TYPE: ESCALATE
REF:  NamazGuard-Frontend

❌ REJECTED — Frontend fails 3 of 14 points. Returned to Pam for redo.
FAILED POINTS: [5] Animations use 'height' property, [10] No scroll reveals, [13] 3-second rule FAIL
PAM NOTIFIED: Yes, with specific fix instructions
DEADLINE FOR FIX: One redo attempt
IF NOT FIXED: Escalate to Founder
REQUIRES RESPONSE BY: no response needed (informational)
```

### TYPE: CONFIRM
Used to acknowledge receipt of a handoff or request.
```
FROM: Angela Martin (company_angela)
TO:   Stanley Hudson (company_stanley)
TYPE: CONFIRM
REF:  NamazGuard-Sprint-3

✅ Handoff received.
ACKNOWLEDGED: Your 34/34 tests, exit code 0.
STARTING: Edge case coverage review per VULNERABILITIES.md
ESTIMATED COMPLETION: After running adversarial test probes
REQUIRES RESPONSE BY: no response needed
```

### TYPE: REPORT
Used to send completed work back to Boss or requesting senior.
```
FROM: Angela Martin (company_angela)
TO:   The Boss (Michael Scott)
TYPE: REPORT
REF:  NamazGuard-Sprint-3

✅ TASK COMPLETE
WHO: Angela Martin — Strict TDD Engine
WHAT: Added 6 edge case tests: polar day (NaN guard), midnight Isha, qadha floor(0),
      path traversal (403 expected), payload DoS (413 expected), duplicate toggle (idempotent)
PROOF: node --test test/namaz.test.js → exit code 0, 40/40 passing [MEASURED]
NEXT: Ready for Erin Hannon integration QA
REQUIRES RESPONSE BY: no response needed
```

---

## RULE 3: ESCALATION CHAIN (Who Talks To Who)

```
JUNIOR → SENIOR → BOSS → FOUNDER

Stanley has a problem:
  1. First: try to solve it himself
  2. If architectural: ask Jim (his direct senior)
  3. If still blocked: escalate to CTO
  4. If still blocked: Boss escalates to Founder

Pam has a design problem:
  1. First: re-read Jan's DESIGN_SYSTEM.md
  2. If unclear: ask Jan (her direct senior)
  3. If still blocked: ask Robert (taste authority)
  4. If still blocked: Boss escalates to CPO

Angela found a bug in Stanley's code:
  1. Angela: sends BLOCK to Stanley with exact file + line + fix
  2. Stanley: fixes immediately, sends HANDOFF back
  3. If Stanley disagrees: Angela escalates to CTO (not arguing with Stanley)
```

---

## RULE 4: SENIOR-TO-JUNIOR COMMUNICATION STYLE (STRICT)

Seniors do NOT say:
- "This doesn't look right"
- "Maybe try something different"
- "I'm not sure this is the best approach"

Seniors ALWAYS say:
- "Line 47: you're using `height` animation which causes layout recalculation. Change to `transform: scaleY()`. Here's exactly how: [code]"
- "This function is 34 lines. Extract the validation logic into `validateInput()`. Max 15 lines per function."
- "You're missing the error case when the database is unavailable. Add a try/catch and return HTTP 503."

**Junior response to senior feedback:**
- NEVER: "But I thought..."
- NEVER: "Actually it works because..."
- ALWAYS: "Understood. Fixing now." → Fix it → Send HANDOFF back with proof

---

## RULE 5: NO SILENT WORK

Every agent announces when they START a task:
```
🟡 STARTING: [task description]
   FILES I WILL TOUCH: [list]
   FILES I WILL NOT TOUCH: [list]
   ESTIMATED COMPLETION: [timeframe]
```

Every agent announces when they COMPLETE:
```
✅ COMPLETE: [task description]
   FILES WRITTEN: [list with line counts]
   PROOF: [exit code + test count]
   NEXT AGENT: [who picks up]
```

This prevents two agents writing to the same file simultaneously.

---

## RULE 6: FILE LOCKING PROTOCOL

When an agent starts writing to a file, they announce it to Boss:
```
🔒 FILE LOCK: Stanley Hudson locking src/solar-engine.js
   Reason: implementing calculatePrayerTimes()
   Duration: until handoff
   Other agents: DO NOT TOUCH src/solar-engine.js
```

When done:
```
🔓 FILE UNLOCK: Stanley Hudson releasing src/solar-engine.js
   Status: complete, tests passing
   Next owner: Angela Martin (review)
```

---

## RULE 7: CONFUSION PROTOCOL

If an agent is confused about their task:

**STEP 1:** Check MASTER_AGENT_DNA.md confusion triggers — does this qualify?
**STEP 2:** Check ARCHITECTURE.md for the answer
**STEP 3:** Check founder-preferences.md for relevant preference
**STEP 4:** If still confused → send BLOCK to their direct senior (not Boss directly)

Senior has 2 options:
- Resolve immediately
- Escalate to Boss with their recommendation

Boss resolves or asks Founder.

**NO AGENT GUESSES. EVER.**

---

## RULE 8: FORBIDDEN COMMUNICATION PATTERNS

```
❌ Vague requests: "Can you look at the frontend?"
✅ Specific requests: "Review public/index.html for Robert's 14-point checklist point #10 (scroll animations)"

❌ Vague status: "Still working on it"
✅ Specific status: "50% done — solar engine complete, DB module in progress, ETA 5 min"

❌ Assuming: "I assume the API returns an array"
✅ Researching: "Verified via context7 docs: node:sqlite returns rows as objects, not arrays"

❌ Arguing with seniors: "But my approach is better because..."
✅ Accepting with evidence: "Understood, fixing. [After fix] Here's the diff: [proof]"

❌ Silent failures: [just stops working without telling anyone]
✅ Immediate escalation: "BLOCK — DB write fails with SQLITE_LOCKED. Need Hank's guidance."
```
