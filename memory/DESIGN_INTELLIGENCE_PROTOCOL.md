# 📘 THE DESIGN INTELLIGENCE PROTOCOL
### The Boring Company — Expert Pre-Build Research & Reasoning Playbook
**Version 1.0 | Classification: Constitutional | 2026-09-26**

---

> **Founder Law:**
> *"Think properly and reason — this project will need THAT font, THAT color, THAT animation.
> No 3D. 2 MCPs will use. Scroll animation will not use. Don't see one thing — see what, why,
> how, where, everything clear properly — and THEN go to research to build something really cool."*

---

## 🧭 WHY THIS DOCUMENT EXISTS

Most frontend is built backwards.

**Wrong order:**
```
Pick a framework → Pick a template → Pick colors → Start coding
```

**Right order:**
```
Understand the human → Understand their context → Reason what serves them →
Research what premium looks like → Decide tools → THEN build
```

This document is the company's law on HOW to think before building. One expert agent (CPO or Jan Levinson) runs this protocol at the start of EVERY project. The output is a **Design Intelligence Brief** — a complete, reasoned document that becomes the law for Jan, Pam, Robert, and every frontend agent.

Nothing is assumed. Everything is earned through reasoning and evidence.

---

## 📖 PART I: THE 6W INTELLIGENCE FRAMEWORK

Before researching or deciding anything, answer these 6 questions in depth. They cannot be guessed. They must be derived from the project brief, the Founder's intent, and internet research.

---

### W1: WHAT — What Is This Product?

**Not the feature list. The essence.**

Go deeper than "it's a prayer tracker." Ask:

```
WHAT IS THE CORE PROMISE?
→ What does this product GUARANTEE to the user?
→ In one sentence: "This product exists to [core promise]."

WHAT IS THE CATEGORY ARCHETYPE?
→ Is it a TOOL? (users come to accomplish something specific, then leave)
→ Is it a HABIT? (users come daily as part of a ritual)
→ Is it a DESTINATION? (users come to stay, explore, consume)
→ Is it a UTILITY? (users come when they need, not for enjoyment)
→ Is it a SERVICE? (users depend on it for professional output)

WHAT IS THE INTERACTION MODEL?
→ Do users INPUT heavily? (forms, editors, builders)
→ Do users CONSUME heavily? (reading, watching, listening)
→ Do users TRACK? (data entry, logging, habits)
→ Do users DECIDE? (dashboards, analytics, choices)
→ Do users COMMUNICATE? (email, messaging, collaboration)

WHAT IS THE SESSION SHAPE?
→ Quick dip (under 30 seconds) → needs instant value, zero friction
→ Short focused session (1-5 min) → needs efficiency, fast flow
→ Extended engagement (15+ min) → needs depth, discovery, comfort
→ Background/ambient (always-on) → needs minimal UI, trust
```

**Example reasoning for NamazGuard:**
```
Core promise: "You will never miss a prayer again."
Category: HABIT app — not a tool, not a destination. A daily ritual companion.
Interaction: TRACKING — user logs completion, sees progress, feels accountability.
Session shape: Quick dip — prayer reminder fires, user opens app for <30 seconds
              to log. Occasional extended session for Qadha calculator.

Implication: UI must deliver core value in under 3 taps.
Implication: NO heavy content discovery — this is not Instagram.
Implication: NO complex navigation — this is a ritual companion, not a dashboard.
```

---

### W2: WHO — Who Is The User?

**Not demographics. Psychographics and context.**

```
WHO IS THE ACTUAL HUMAN BEING?
→ What do they care about beyond this app? (values, beliefs, lifestyle)
→ What is their relationship with technology? (digital native vs cautious)
→ What is their relationship with this domain? (expert, casual, aspiring)
→ What makes them anxious? What makes them proud?

WHO IS THE PRIMARY USER VS SECONDARY USER?
→ Primary: who uses this daily for its core purpose
→ Secondary: who uses this occasionally or for adjacent features
→ Design for primary. Do not compromise primary for secondary.

WHO ARE THEY WHEN THEY USE THIS APP?
→ Are they a "professional at work" persona?
→ Are they a "person in a private moment" persona?
→ Are they a "student learning" persona?
→ Are they a "customer making a decision" persona?
→ DESIGN FOR THE PERSONA, NOT THE FEATURE.
```

**Example reasoning for NamazGuard:**
```
Primary user: A practicing Muslim aged 18-45. Religiously committed, not casual.
              They take their faith seriously. Missing a prayer is not a small thing.
Values: Spiritual discipline, integrity, community connection, divine accountability.
Tech relationship: Regular smartphone user. Not necessarily a tech enthusiast.
Private moment: Opening this app is a SACRED ACT. They are transitioning into
                a moment of prayer. The UI must honor that transition.

Implication: NEVER make the UI feel like social media or a game.
Implication: Colors must feel spiritually resonant — not corporate, not playful.
Implication: Animations must be CALM, not energetic or attention-grabbing.
Implication: The font must feel trustworthy and clean, not trendy.
Implication: Zero distracting elements during the prayer logging moment.
```

---

### W3: WHY — Why Does The User Come?

**The functional job AND the emotional job.**

Clayton Christensen's "Jobs to Be Done" framework: users don't hire products for features.
They hire them to DO a job in their life. There is always a FUNCTIONAL job and an EMOTIONAL job.

```
FUNCTIONAL JOB (what they are trying to accomplish):
→ "Help me never miss a prayer." (NamazGuard)
→ "Help me send a campaign to 10,000 people." (Email tool)
→ "Help me understand my sales data." (Dashboard)
→ "Help me solve this equation." (Math app)

EMOTIONAL JOB (how they want to feel after using the app):
→ "I want to feel spiritually disciplined." (NamazGuard)
→ "I want to feel like a professional marketer." (Email tool)
→ "I want to feel confident in my decision." (Dashboard)
→ "I want to feel smart." (Math app)

SOCIAL JOB (how they want to appear to others):
→ "I want people to see me as a devoted Muslim." (NamazGuard)
→ "I want my team to see me as organized." (Email tool)
→ "I want stakeholders to trust my data." (Dashboard)
→ "I want my teacher to see my improvement." (Math app)
```

**Design implication rule:**
```
The UI must deliver the EMOTIONAL job, not just the functional job.
A feature that completes the functional job but fails the emotional job is a bad feature.

Example: NamazGuard can technically log a prayer with a checkbox.
That completes the FUNCTIONAL job. But a checkbox feels admin-like.
The EMOTIONAL job (feeling spiritually disciplined) needs:
→ A gentle celebration animation when you mark a prayer complete
→ A warm streak counter that honors your commitment
→ Colors and typography that feel sacred and worthy of the moment
```

---

### W4: HOW — How Does The User Actually Use This?

**The real interaction sequence. Not the ideal user journey. The real one.**

```
HOW DO THEY DISCOVER THIS APP? (affects onboarding design)
→ Word of mouth from friend → social proof is critical at signup
→ App store search → screenshots must sell in 2 seconds
→ Recommendation article → landing page must explain in 5 seconds

HOW DO THEY USE IT FOR THE FIRST TIME?
→ What is the exact sequence of actions on first open?
→ Where do they get confused or drop off?
→ What is the ONE moment that makes them realize "this is worth using"?
   (This is the "Aha Moment" — engineer the UI to get there in <60 seconds)

HOW DO THEY USE IT DAILY / ROUTINELY?
→ What is the exact sequence of actions on return visit?
→ How long does the core action take? (3 seconds? 30 seconds? 5 minutes?)
→ What do they look at first when they open the app?

HOW DO THEY HANDLE FAILURE / EDGE CASES?
→ What happens when they miss a day?
→ What happens when the data is wrong?
→ What happens when they're offline?
→ Does the app make failure feel catastrophic or recoverable?
```

**Example reasoning for NamazGuard:**
```
Daily use: Notification fires → user opens app → sees prayer status →
          taps prayer name → marks complete → app closes. Under 15 seconds.

First thing they see: MUST be today's prayer status. Nothing else matters on open.
Core action duration: Under 5 taps / 15 seconds.

Failure case: Missed a prayer. The app must make this feel RECOVERABLE, not
              shameful. Show Qadha reminder with calm, not red alarm.

Implication: Main screen = today's prayers prominently. No buried navigation.
Implication: Streak counter = motivation, not guilt. Color = warm, not red alarm.
Implication: Offline mode = full functionality. No CDN dependencies.
```

---

### W5: WHERE — Where Does The User Use This?

**Physical and digital context. This changes everything about the UI.**

```
PHYSICAL LOCATION:
→ At home (desk, couch, bed) → more relaxed, may use both mobile and desktop
→ At office (desk) → professional context, likely desktop, distractions low
→ On the go (transit, walking) → mobile only, one-handed, glanceable
→ In a specific ritual space (prayer room, kitchen, gym) → context matters

DEVICE CONTEXT:
→ Mobile only → all design decisions must prioritize 375px first
→ Desktop primary → information density can increase, navigation can expand
→ Both equally → responsive design is non-negotiable, not an afterthought
→ Tablet → often overlooked — design for this explicitly if users use it

CONNECTIVITY CONTEXT:
→ Always online → CDN resources acceptable
→ Sometimes offline → Service Worker, local-first storage
→ Must work offline → 100% offline capability, no CDN, local fonts

AMBIENT CONTEXT:
→ High distraction environment (commute) → high contrast, large touch targets
→ Low distraction (desk) → can use more subtle UI elements
→ Low light (night use) → dark mode consideration, not just preference
→ Bright light (outdoors) → high contrast, readable in sunlight
```

**Example reasoning for NamazGuard:**
```
Primary: Mobile. On-the-go. Often used outside or in mosque.
        → 375px is the primary canvas. Not an afterthought.
        → One-handed use. Large touch targets (minimum 44px).
        → High-contrast is not optional — may be used in bright outdoor light.

Time of use: Morning (Fajr), midday (Dhuhr), afternoon (Asr), evening (Maghrib),
            night (Isha). User opens at prayer time — possibly with hands just
            washed for wudu. Quick, clear, dignified.

Connectivity: Must work offline. No CDN. Local fonts mandatory.
             (Already implemented — maintain this standard.)
```

---

### W6: WHEN — When Is This Product Used? (The Temporal Dimension)

**Timing shapes everything from notifications to colors.**

```
TIME OF DAY PATTERNS:
→ Morning habit (alarm, prayer, exercise) → design for freshness, gentle start
→ Work hours (productivity, tool) → design for efficiency, professional confidence
→ Evening (entertainment, wind-down) → design for comfort, reduced tension
→ Late night (insomnia browsing, late work) → dark mode critical, calm colors

FREQUENCY PATTERN:
→ Multiple times per day (high frequency habit) → must feel effortless, zero friction
→ Once daily (daily habit) → can have slightly more depth, still fast
→ Weekly (planning, review) → can have more information density
→ Occasional (reference, one-off task) → onboarding clarity is critical every time

EMOTIONAL STATE AT USE:
→ Calm and intentional → can handle nuanced UI
→ Stressed and rushed → must be instantly clear, zero thinking required
→ Curious and exploring → can reward discovery
→ Habitual and automatic → must support muscle memory patterns

LIFE CONTEXT AT USE:
→ Personal time → warmth, humanity, character
→ Professional time → precision, trust, authority
→ Crisis/emergency time → clarity, speed, recovery options
→ Celebratory time → reward, acknowledgment, delight
```

---

## 📖 PART II: THE DESIGN DECISION REASONING ENGINE

After completing the 6W Framework, every design decision is made through evidence-based reasoning. Not defaults. Not templates. Reasoning.

---

### DECISION 1: TYPOGRAPHY — What Fonts Serve This Project?

**The reasoning chain:**

```
STEP 1: What PERSONALITY does this product have?
→ Sacred / Trustworthy / Calm → look for: clean humanist sans-serifs
→ Professional / Authoritative → look for: neutral geometric sans-serifs
→ Warm / Personal / Human → look for: rounded humanist sans-serifs
→ Editorial / Intellectual → look for: serif pairings
→ Technical / Precise → look for: monospace, geometric sans-serif
→ Playful / Youthful → look for: rounded, friendly sans-serifs

STEP 2: What is the primary READING CONTEXT?
→ Small body text on mobile → needs high x-height, open apertures
→ Large headings → more latitude for personality
→ Data / numbers → needs tabular-nums support
→ Long-form reading → needs generous leading, high legibility

STEP 3: What is the TECHNICAL CONSTRAINT?
→ Must be offline? → System font stack ONLY (no Google Fonts CDN)
→ Performance critical? → System fonts or self-hosted WOFF2
→ Brand-critical typography? → Self-host specific font
→ Cross-platform consistency needed? → Variable font with fallbacks

STEP 4: What are PREMIUM APPS IN THIS CATEGORY using?
→ Research 3 premium apps in the same category
→ What fonts do they use? Why might they have chosen them?
→ What fonts do FAILING apps use? What would you avoid?

STEP 5: MAKE THE DECISION WITH EVIDENCE:
Format: "We will use [font] because [reasons from steps 1-4]."
```

**Font Decision Tree by Category:**
```
FAITH / PRAYER apps:
  Primary: -apple-system, 'SF Pro Display', 'Segoe UI' (system — clean, trusted, local)
  Why: Familiar, no loading time, legible at prayer-time glance, respectful
  NEVER: Novelty display fonts, all-caps decorative, comic/casual styles
  Optional accent: A subtle serif for Surah names if Arabic support needed

EMAIL / PRODUCTIVITY tools:
  Primary: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI' (system/Inter)
  Why: Professional, instantly readable, does not compete with content
  NEVER: Personality fonts, scripts, high-stylization

EDUCATION / LEARNING apps:
  Primary: 'Inter' or 'Nunito' (friendly, high legibility, encourages reading)
  Why: Approachable, not intimidating, readable at all sizes for study context
  NEVER: Dense serif or narrow condensed (hard to read for long study sessions)

DASHBOARD / ANALYTICS:
  Primary: 'Inter' with 'tabular-nums' enabled on all data
  Why: Neutral, data-focused, numbers align in columns
  NEVER: Proportional fonts for number columns (digits shift, misread)

LUXURY / PREMIUM BRAND:
  Primary: Serif for headings (authority, premium signal) + Sans for body
  Examples: 'Playfair Display' + 'Inter', 'Cormorant' + 'DM Sans'
  Why: Serif = heritage, exclusivity, premium. Sans body = modern clarity.
  NEVER: Comic Sans, Papyrus, novelty scripts
```

---

### DECISION 2: COLOR — What Palette Serves This Project?

**The reasoning chain:**

```
STEP 1: What EMOTION must the primary surface evoke?
→ Sacred calm → warm whites, soft cream, quiet greens, restrained gold
→ Professional trust → navy, slate, neutral grey, white
→ Energy / excitement → bold saturated colors, high contrast
→ Warmth / humanity → earthy tones, amber, terracotta, soft orange
→ Focus / precision → minimal palette, monochrome, one accent
→ Premium / luxury → dark surfaces OR clean light with expensive materials (glass, gold)

STEP 2: What CONTRAST ratio is required?
→ Body text on background: minimum 4.5:1 (WCAG AA)
→ Large text: minimum 3:1
→ Interactive elements: minimum 3:1
→ Decorative elements: no minimum
→ Test every color pair before finalizing

STEP 3: Are there CULTURAL or DOMAIN constraints?
→ Islamic app: traditional palette: green, white, gold, deep blue
              Avoid: red (associated with danger/prohibition in Islamic context)
→ Medical app: blue (trust, clinical) or white (clinical, clean). Never red as brand.
→ Finance: navy, green (growth), neutral. Conservative.
→ Kids: Primary colors, high saturation, round friendly shapes
→ Luxury: Restraint. Black, white, gold, single premium accent.
→ Environment/Green: Earthy greens, organic tones. Not neon.

STEP 4: What is the COMPETITIVE LANDSCAPE?
→ Research: What colors do the 3 best apps in this category use?
→ Research: What colors do the 3 worst-rated apps use?
→ Find the DIFFERENTIATION: where can we be premium without being same?

STEP 5: MAKE THE DECISION WITH EVIDENCE:
Background: [color with hex + reasoning]
Primary accent: [color + reasoning — what does this color signal?]
Secondary accent: [color + reasoning]
Surface cards: [color + reasoning]
Text primary: [color + contrast ratio]
Text secondary: [color + contrast ratio]
Semantic: Error [red], Success [green], Warning [amber] — always standard
```

**Color Decision Patterns by Project:**
```
NAMAZ / PRAYER APP (Faith category):
  Background: Warm pearlescent — #F8F5F0 (warm ivory, not stark white)
  Cards: #FFFFFF with subtle warm shadow (not floating on cold white)
  Primary accent: Emerald green #1A6B4A (Islamic tradition, growth, life)
  Secondary accent: Soft gold #C9A84C (sacred, premium, not gaudy)
  Text primary: #1A1A1A on light (not pure black — warmer)
  REASONING: Green = Islamic tradition, gold = sacred reverence,
             warm ivory = clean without clinical coldness

EMAIL TOOL (Productivity category):
  Background: Near-white #FAFAFA or dark #141414
  Accent: Single action color — blue #2563EB or brand-specific
  Minimal palette — content IS the color. UI disappears.
  REASONING: Email content must not compete with UI chrome

MATH APP (Education category):
  Background: Clean white or soft #F7F8FC
  Primary: Blue #3B82F6 (trusted, academic, calm)
  Success: Emerald #10B981 (correct answer celebration)
  Warning: Amber #F59E0B (try again, not failure)
  REASONING: Blue = learning, trust. No red for wrong answers — causes anxiety.
            Use amber for "not yet" — it's gentler than red.

ANALYTICS DASHBOARD (B2B category):
  Background: Dark #0F1117 or light #F8FAFC
  Accent: A single brand color for CTAs only
  Data colors: distinct accessible palette for charts (8-color system)
  REASONING: Information density = neutral frame. Color only for signal, not decoration.
```

---

### DECISION 3: ANIMATIONS — What Motion Serves This Project?

**The single most important question in motion design:**

> *"Does this animation help the user understand what happened, where they are,
> or what to do next? Or does it exist to impress the designer?"*

**The reasoning chain:**

```
STEP 1: What is the PACING of this product?
→ Calm / ritual / sacred → slow, gentle, 300-500ms, ease-out curves
→ Productive / efficient → fast, subtle, 100-200ms, no delay
→ Energetic / entertainment → dynamic, spring physics, 200-400ms
→ Serious / authoritative → minimal, only functional animation

STEP 2: What animations are FUNCTIONAL (help users understand)?
→ Loading state (skeleton shimmer) → always required for async content
→ Error shake → communicates "that didn't work"
→ Success pulse → communicates "that worked"
→ Tab transition → communicates "you moved to a different section"
→ Modal open/close → communicates "a layer appeared / left"
→ Scroll reveal → communicates "here is more content"

STEP 3: What animations are DECORATIVE (add delight without friction)?
→ Hover lift on cards → subtle, 150ms, adds tactile feel
→ Active press (scale 0.97) → always on all clickable elements
→ Icon morphing → only if adds clarity (hamburger → X)
→ Number counting → celebration on milestone achievement
→ Confetti → only at real achievements (first prayer logged, 7-day streak)

STEP 4: What animations are COUNTERPRODUCTIVE (slow user down)?
→ Page transitions > 400ms → slows navigation, feels sluggish
→ Mandatory animations before action → users click through, not wait
→ Looping background animations → distracts from content (BANNED unless Category A)
→ Infinite scroll pull-to-refresh theaters → wrong category
→ 3D scene loading → adds cognitive load unless it IS the product

STEP 5: MAKE THE ANIMATION DECISION:
For each possible animation, answer:
  "This animation communicates [X] to the user."
  If you cannot complete that sentence → DO NOT ADD THE ANIMATION.
```

**Animation Decision by Category:**
```
FAITH / PRAYER APP:
  ✅ YES: Gentle fade-in on app open (100ms, opacity only)
  ✅ YES: Prayer complete → soft green pulse (sacred, not party)
  ✅ YES: Streak count tick-up on completion (acknowledges consistency)
  ✅ YES: Active press on prayer toggle (tactile feedback)
  ✅ YES: Skeleton shimmer for loading prayer times (functional)
  ❌ NO: Confetti on every prayer (sacred moment ≠ game)
  ❌ NO: 3D animations (wrong context — sacred ≠ tech showcase)
  ❌ NO: Parallax scroll effects (wrong pacing for ritual app)
  ❌ NO: Entrance animations > 300ms (user wants to log quickly)
  ❌ NO: Looping background motion (distracts from prayer focus)

EMAIL TOOL:
  ✅ YES: Send animation (satisfying completion moment)
  ✅ YES: Toast notifications (confirmation of action)
  ✅ YES: Skeleton loading for inbox items
  ✅ YES: Active press on buttons (tactile)
  ❌ NO: Scroll reveal (user scrolls inbox — don't animate inbox rows)
  ❌ NO: Page transitions (users want instant navigation)
  ❌ NO: 3D or parallax (professional tool — not a landing page)

MATH LEARNING APP:
  ✅ YES: Correct answer celebration (dopamine hit on mastery)
  ✅ YES: Progress bar fill on completing exercises
  ✅ YES: Level-up sequence (milestone)
  ✅ YES: Shake on wrong answer (gentle correction signal)
  ✅ YES: Streak counter increment
  ❌ NO: Distraction animations during problem-solving
  ❌ NO: 3D (adds cognitive load when user is solving equations)

DASHBOARD / ANALYTICS:
  ✅ YES: Chart data enter animation (one-time on page load)
  ✅ YES: Number count-up on KPI cards (satisfying)
  ✅ YES: Tooltip fade-in on data points
  ✅ YES: Skeleton loading for all data areas
  ❌ NO: Scroll-triggered animations (distracts from data reading)
  ❌ NO: Looping animations (creates visual noise in data context)
  ❌ NO: 3D (never adds clarity to data — always adds noise)
```

---

### DECISION 4: MCPs — Which Tools Does This Project Actually Need?

**The most expensive mistake is using tools because you CAN, not because you SHOULD.**

**The reasoning chain:**

```
STEP 1: What is the VISUAL COMPLEXITY of this project?
→ Simple/functional (email tool, tracker) → 1-2 MCPs max
→ Premium landing page → 3-4 MCPs acceptable
→ Entertainment / portfolio → 4-5 MCPs
→ 3D interactive experience → specialized MCPs only

STEP 2: For EACH possible MCP, answer these questions:
→ glassmorphism MCP: "Does this project have overlapping surfaces that benefit from depth?"
→ neumorphism MCP: "Is the design direction tactile/physical surface-based?"
→ scroll_animation MCP: "Does this project have sections that users scroll through progressively?"
→ microinteraction MCP: "Does this project need spring-physics button behavior?"
→ magicui MCP: "Does this project need animated visual effects (particles, borders, globes)?"
→ autosize MCP: "Does this project have components that must fluidly resize?"
→ shape_morph MCP: "Does this project have elements that change shape on interaction?"

STEP 3: MAP required MCPs to project type:
```

**MCP Selection by Project Type:**
```
FAITH APP (NamazGuard):
  ✅ microinteraction_get_spring_preset — prayer toggle press physics
  ✅ autosize_generate_container_query — responsive prayer card layout
  ❌ glassmorphism — no overlapping surfaces; clean design = no glass
  ❌ shape_morph — no morphing shapes needed
  ❌ scroll_animation — quick-dip app, not a scroll journey
  ❌ magicui — no particle effects in sacred app
  Total MCPs needed: 2

EMAIL TOOL:
  ✅ microinteraction_get_spring_preset — button press feedback
  ✅ autosize_generate_container_query — adaptive email preview panels
  ❌ glassmorphism — professional tool, no frosted glass needed
  ❌ scroll_animation — inbox list, not a marketing scroll page
  ❌ magicui — no visual effects in productivity tool
  Total MCPs needed: 2

PREMIUM LANDING PAGE:
  ✅ glassmorphism — hero cards, pricing tiers, feature highlights
  ✅ scroll_animation — progressive section reveals
  ✅ microinteraction — button CTAs, hover states
  ✅ magicui — hero background effects, border beam on CTA
  Optional: shape_morph — if hero has organic blob shapes
  Total MCPs needed: 3-4

DASHBOARD / ANALYTICS:
  ✅ microinteraction — button/tab press states
  ✅ autosize — responsive chart containers
  ❌ glassmorphism — data clarity > visual effects
  ❌ scroll_animation — dashboard is above-fold, not scroll journey
  ❌ magicui — data context requires zero visual noise
  Total MCPs needed: 2
```

---

### DECISION 5: 3D — Should This Project Use 3D?

**3D is a tool, not a signal of quality. Most projects should NOT use 3D.**

```
USE 3D ONLY WHEN:
→ The product IS the 3D experience (portfolio, game, spatial UI)
→ The product sells physical goods (product visualization)
→ The brand positioning demands cutting-edge tech impression
→ The 3D element directly helps the user understand something
→ You have the performance budget (mobile loading time acceptable)

DO NOT USE 3D WHEN:
→ The project is a functional tool (email, tracker, dashboard)
→ The 3D would load on mobile and slow the primary interaction
→ The user's sacred/professional context makes tech-showcase inappropriate
→ The 3D is decorative background that competes with content
→ You cannot justify "this 3D helps the user accomplish [X]"

REASONING EXAMPLE — NamazGuard:
"Should we use 3D for NamazGuard?"
→ Is NamazGuard a 3D experience? No.
→ Does 3D help user log prayers faster? No.
→ Does 3D feel appropriate for a sacred moment? No.
→ Does 3D load acceptably on mobile at prayer time? Probably not.
→ DECISION: No 3D. Verdict: ruled out in 4 reasoning steps.

REASONING EXAMPLE — Tech company landing page:
"Should we use 3D for this SaaS landing page?"
→ Is 3D experience the product? No, but it signals technical sophistication.
→ Does 3D help explain the product? Yes — a rotating product visualization helps.
→ Is performance acceptable? Check mobile load time target.
→ Is it a hero section only (not full-page)? Yes.
→ DECISION: Hero 3D model acceptable if under 200KB gzipped. Verdict: Yes with constraints.
```

---

### DECISION 6: SCROLL ANIMATIONS — Does This Project Need Them?

**Scroll animations exist to pace a journey, not to decorate a tool.**

```
USE SCROLL ANIMATIONS WHEN:
→ User reads a long landing page (marketing, portfolio, product page)
→ The page tells a story that benefits from progressive reveal
→ Content exists below the fold that users should discover
→ The animation helps user understand what the section is about

DO NOT USE SCROLL ANIMATIONS WHEN:
→ The app is a quick-dip tool (prayer tracker, email, calculator)
→ The user's first action is NOT to scroll — they tap immediately
→ The content is a list or data grid (rows should not entrance-animate)
→ The scroll animation delays the user's primary action
→ The app is used in distracted or rushed context (prayer time, transit)

RULE: If a user would ever think "why is this animating — just show me" → remove it.
RULE: If a user would never notice the animation was gone → remove it.
RULE: If the animation communicates "here is new content appearing" → keep it.

REASONING EXAMPLE — NamazGuard:
"Should we use scroll animations in NamazGuard?"
→ Does user scroll through a story? No — they tap prayer names.
→ Is there content below fold that needs discovery reveal? No — 5 prayers, all known.
→ Does user have time to watch scroll animations at prayer time? No.
→ DECISION: No scroll animations. Skeleton loading only.

REASONING EXAMPLE — SaaS Landing Page:
"Should we use scroll animations on our landing page?"
→ Does user scroll through sections? Yes — Features, Pricing, Testimonials.
→ Does progressive reveal help them process information? Yes.
→ Do the animations pace the narrative? Yes.
→ DECISION: Scroll reveal for sections. translateY(24px) → 0, opacity 0→1. 400ms ease-out.
```

---

## 📖 PART III: THE INTERNET RESEARCH METHODOLOGY

After completing 6W reasoning and forming hypotheses, research CONFIRMS or CHALLENGES them.

**The 5-Source Research Protocol:**

```
SOURCE 1: PREMIUM REFERENCE RESEARCH
→ Search "[app category] best app design 2024"
→ Go to Dribbble / Behance — search "[category] app UI"
→ Identify: what do TOP-RATED apps in this category look like?
→ Note: fonts, colors, animation style, information density
→ Question: WHY do these design decisions work for this category?

SOURCE 2: COMPETITOR COMPLAINT RESEARCH
→ Search: site:reddit.com "[category app]" complaints OR "what I hate"
→ Search: "[app name] 1-star review" on Google
→ App Store: filter 1-star reviews, read patterns
→ Note: What do users hate about existing apps? This is your opportunity.
→ Question: Can we design the opposite of what users complain about?

SOURCE 3: CULTURAL / DOMAIN AUTHORITY RESEARCH
→ For faith apps: research Islamic design principles, traditional color meanings
→ For medical: research healthcare UX guidelines
→ For finance: research banking UI conventions and trust signals
→ For education: research cognitive load theory, learning UX research
→ Note: What conventions exist in this domain? Which must be respected? Which can be challenged?

SOURCE 4: PERFORMANCE BENCHMARK RESEARCH
→ Search: "mobile web performance [category] app case study"
→ Check: What load time do premium apps in this category achieve?
→ Establish: our performance target before designing
→ This constrains: 3D (too heavy?), external fonts (too slow?), animations (too janky?)

SOURCE 5: PSYCHOLOGICAL RESEARCH (Use PSYCHOLOGY_UX_PLAYBOOK.md)
→ After Section 0 classification, which levers apply to this project?
→ Find ONE case study of a company using this lever successfully in this category
→ Find ONE case study of a company using this lever wrong in this category
→ Establish: our specific psychology application plan for this project
```

---

## 📖 PART IV: THE DESIGN INTELLIGENCE BRIEF

**The output of all this work is one document: the Design Intelligence Brief.**

This is NOT a mood board. This is a REASONED DOCUMENT. Every decision has a justification.

---

### TEMPLATE: DESIGN_INTELLIGENCE_BRIEF.md

```markdown
# Design Intelligence Brief — [Project Name]
**Author:** [Agent who ran this protocol]
**Date:** [Date]
**Status:** Awaiting Founder approval → then Jan implements

---

## THE 6W SUMMARY

| Question | Answer | Design Implication |
|---|---|---|
| WHAT is it? | [essence + archetype] | [implication] |
| WHO uses it? | [psychographic] | [implication] |
| WHY do they use it? | [functional + emotional job] | [implication] |
| HOW do they use it? | [session shape + sequence] | [implication] |
| WHERE do they use it? | [physical + device context] | [implication] |
| WHEN do they use it? | [timing + emotional state] | [implication] |

---

## DESIGN DECISIONS

### Typography Decision
**Font chosen:** [font name or system stack]
**Reasoning:** [3-step reasoning chain from the protocol]
**Research support:** [what premium apps in this category use]
**Rejected alternatives:** [what we considered and rejected, and why]

### Color Decision
**Palette:**
- Background: [hex + reasoning]
- Primary accent: [hex + reasoning + what this color signals]
- Secondary accent: [hex + reasoning]
- Text primary: [hex + contrast ratio]
- Text secondary: [hex + contrast ratio]
**Reasoning:** [cultural, emotional, category-based reasoning]
**Research support:** [competitor palette analysis]
**Rejected alternatives:** [colors considered and rejected, why]

### Animation Decision
**WILL USE:**
- [animation type]: [why — what it communicates to user]
- [animation type]: [why]
**WILL NOT USE:**
- Scroll reveal animations — [reason specific to this project]
- 3D elements — [reason specific to this project]
- [other] — [reason]
**Reasoning:** [pacing, user context, functional vs decorative analysis]

### MCP Decision
**MCPs SELECTED:** [list — max 4]
- [MCP 1]: [exactly why this project needs it]
- [MCP 2]: [exactly why this project needs it]
**MCPs REJECTED:**
- glassmorphism: [reason not needed for this project]
- scroll_animation: [reason not needed for this project]
- [other]: [reason]
**Total MCP count:** [N] — justified by [reasoning]

### 3D Decision
**Decision:** [YES with constraints / NO]
**Reasoning:** [4-step reasoning chain]

---

## PSYCHOLOGICAL LEVERS (from PSYCHOLOGY_UX_PLAYBOOK.md Section 0)

**Project Category:** [Category A-G]
**Active Levers:**
- [Lever]: [how it applies specifically to this project]
- [Lever]: [specific implementation planned]
**Inactive Levers:** [levers that were rejected and why]

---

## RESEARCH CITATIONS

| Source | Finding | Impact on Decision |
|---|---|---|
| Reddit r/[community] | [what users complain about] | [how we address it] |
| [App name] App Store reviews | [pattern found] | [how we avoid this] |
| [Reference app] design | [what they do well] | [what we adopt] |
| [Domain authority] | [cultural/domain insight] | [how we respect it] |

---

## WHAT THIS BRIEF AUTHORIZES

Based on this research and reasoning, the following decisions are locked:
- Jan Levinson: Implement DESIGN_SYSTEM.md using these exact parameters
- Robert California: Audit against THIS design direction, not generic defaults
- Pam Beesly: Implement from Jan's DESIGN_SYSTEM.md — no invention
- Agents: Use ONLY the MCPs listed above — no additions without re-running this brief

---

## WHAT THIS BRIEF PROHIBITS

The following are explicitly ruled out for this project:
- 3D: [reason]
- Scroll animations: [reason]
- [specific color]: [reason]
- [specific font]: [reason]
- [other]: [reason]

---

**Founder Review Required Before Implementation**
Jan Levinson may not begin until Founder confirms this brief.
```

---

## 📖 PART V: HOW THIS PROTOCOL RUNS IN A REAL MEETING

This is how The Boring Company runs the Design Intelligence Meeting.
Not a slide deck. Not a reading session. A real strategic conversation.

```
⏱ DURATION: 20-30 minutes
👥 ATTENDEES: CPO (leads) + Jan Levinson + Robert California + VP Product
📋 OUTPUT: Signed Design Intelligence Brief
🔒 GATE: Nothing is designed until Founder reviews and approves the brief

MEETING AGENDA:

[0-5 min] CPO leads the 6W walk-through
  → Reads each W answer aloud
  → Jan or Robert can challenge any answer
  → If an answer is guessed (not researched) → STOP, research it first

[5-10 min] Jan presents the design hypotheses
  → Based on 6W, what direction does she think this project needs?
  → "I believe this project needs [X] because [reason from 6W]"
  → Robert challenges: "I agree / I challenge — here's why"

[10-18 min] Decisions matrix run through (protocol sections)
  → Typography: 3 options considered → 1 chosen with evidence
  → Color: palette justified color by color
  → Animation: what's in, what's out — and WHY for THIS project
  → MCPs: which 2-3 are genuinely needed? Others killed here.
  → 3D: 4-question test → yes with constraints or no
  → Scroll animation: context test → yes or no

[18-25 min] Robert reads the brief back cold
  → Reads it as if he's never heard it before
  → "Does this brief hang together? Is anything contradictory?"
  → "Is there anything here that doesn't serve the 6W?"

[25-30 min] CPO writes final brief
  → All decisions locked
  → Founder review requested
  → Jan is briefed: "Wait for Founder approval before designing"
```

---

## 📖 PART VI: THE SENIOR ACCOUNTABILITY RULE

**The senior who runs this brief is accountable for the whole frontend.**

If Jan builds wrong colors → the CPO who approved the brief is accountable.
If Robert misses a context issue → the CPO who wrote the brief is accountable.
If Pam implements wrong fonts → Jan is accountable for insufficient DESIGN_SYSTEM.md.

**The brief chain:**
```
Founder approves brief
  ↓
CPO owns brief
  ↓
Jan owns DESIGN_SYSTEM.md (derived from brief)
  ↓
Pam owns implementation (derived from DESIGN_SYSTEM.md)
  ↓
Robert audits against DESIGN_SYSTEM.md (NOT against personal taste)
  ↓
VP Engineering Reality Gates the output
```

Every step is traceable to the brief. Every mistake is traceable to whoever broke the chain.

---

## 📖 PART VII: ANTI-PATTERNS THIS PROTOCOL PREVENTS

```
❌ AP-BANNED-01: "Dark Obsidian by default"
   Root cause: Skipped 6W. Skipped context research.
   Protocol fix: W1 (App category) + W2 (User persona) + Color decision chain.

❌ AP-BANNED-02: "Let's add 3D because it looks cool"
   Root cause: No reasoning about whether 3D serves the user.
   Protocol fix: Decision 5 (3D reasoning chain) — 4 questions eliminate it in minutes.

❌ AP-BANNED-03: "Scroll animations on everything"
   Root cause: Default behavior — agents added scrollreveal because they always do.
   Protocol fix: Decision 6 (scroll animation reasoning) — ruled in or out per project.

❌ AP-BANNED-04: "Use all available MCPs"
   Root cause: More tools = more professional (false). No selection reasoning.
   Protocol fix: Decision 4 (MCP selection) — every tool must pass "why THIS project needs it."

❌ AP-BANNED-05: "Variable reward scroll psychology for a prayer app"
   Root cause: Psychology applied without project classification.
   Protocol fix: PSYCHOLOGY_UX_PLAYBOOK.md Section 0 — classify FIRST.

❌ AP-BANNED-06: "Google Fonts because they look nice"
   Root cause: No performance/offline constraint check.
   Protocol fix: Typography Decision STEP 3 — technical constraint check before font selection.

❌ AP-BANNED-07: "White #ffffff because light mode"
   Root cause: No color reasoning. Browser default used as design decision.
   Protocol fix: Color Decision STEP 1 — what emotion must the primary surface evoke?

❌ AP-BANNED-08: "We'll figure out the design as we code"
   Root cause: No pre-build intelligence phase. Design invented during implementation.
   Protocol fix: This entire document. The Brief must exist BEFORE Jan begins.
```

---

*This document is permanent institutional memory of The Boring Company.*
*It is the founding law of how we think before we build.*
*Authority: MASTER_AGENT_DNA.md → AGENTS.md (repository constitution)*
*Last Updated: 2026-09-26 — Design Intelligence Protocol v1.0*
