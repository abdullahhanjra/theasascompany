# ⚡ FRONTEND COMPUTATIONAL PHYSICS & PERFORMANCE GUIDE
**Authority:** Dr. Aris Thorne (Principal Computational Physicist — `company_physics`)
**Location:** `memory/FRONTEND_PHYSICS_AND_PERF_GUIDE.md`
**Mandatory For:** Pam Beesly, Ryan Howard, Yuki Tanaka, Elena Vasquez, Stanley Hudson

> **The Universal Axiom:**
> Rendering is an applied physics simulation executed under strict thermodynamic, memory bandwidth, and clock cycle constraints. A web application does not "feel fast" by chance; it feels fast when every frame completes within its mathematical deadline.

---

## 📐 SECTION 1: THE MATHEMATICAL REFRESH RATE & FRAME BUDGETS

A display refreshes at a fixed frequency $F$ (in Hertz). The total available time for all browser operations per frame is:
$$T_{\text{frame}} = \frac{1000}{F} \text{ ms}$$

### A. The Three Refresh Rate Tiers

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 60 FPS / 60 Hz Standard (Default Web & Standard Mobile)                      │
│ Total Window: 16.67 ms                                                      │
│ ├─ Browser Internal Overhead & V-Sync: ~6.00 ms                             │
│ └─ Maximum Allowable JS Execution + Style + Layout Budget: ≤ 10.67 ms        │
├─────────────────────────────────────────────────────────────────────────────┤
│ 90 FPS / 90 Hz High-Refresh (Modern Android, Pixel, OnePlus)               │
│ Total Window: 11.11 ms                                                      │
│ ├─ Browser Internal Overhead & V-Sync: ~5.00 ms                             │
│ └─ Maximum Allowable JS Execution + Style + Layout Budget: ≤ 6.11 ms         │
├─────────────────────────────────────────────────────────────────────────────┤
│ 120 FPS / 120 Hz Ultra-Fluid (Apple ProMotion, iPad Pro, Gaming Displays)   │
│ Total Window: 8.33 ms                                                       │
│ ├─ Browser Internal Overhead & V-Sync: ~4.00 ms                             │
│ └─ Maximum Allowable JS Execution + Style + Layout Budget: ≤ 4.33 ms         │
└─────────────────────────────────────────────────────────────────────────────┘
```

*Rule 1 (The Deadline Invariant):* Any task running on the JavaScript main thread that consumes more than **10ms** at 60Hz or **4ms** at 120Hz will drop a frame, generating perceptible jank.

---

## 🌀 SECTION 2: DAMPED HARMONIC OSCILLATOR EQUATIONS (SPRING PHYSICS)

Physical UI interactions (buttons, card swipes, drawer snaps) do not move according to linear or cubic bezier curves. They obey the second-order differential equation of motion:

$$m \frac{d^2 x}{dt^2} + c \frac{dx}{dt} + k x = 0$$

Where:
- $m$ = mass (the inertial weight of the UI element)
- $c$ = damping coefficient (viscous resistance against motion)
- $k$ = spring constant / stiffness (the restoring force pulling towards equilibrium)

### A. The Damping Ratio ($\zeta$) & Behavioral Modes

$$\zeta = \frac{c}{2\sqrt{km}}, \quad \omega_n = \sqrt{\frac{k}{m}}$$

1. **Underdamped ($\zeta < 1$):**
   - Bounces past target with diminishing oscillations.
   - Natural frequency with damping: $\omega_d = \omega_n \sqrt{1 - \zeta^2}$.
   - **Use Case:** Joyous celebration moments, streak counters, playful badges.
   - **Recommended Constants:** $k = 180, c = 12, m = 1 \implies \zeta \approx 0.45$.

2. **Critically Damped ($\zeta = 1$):**
   - Returns to equilibrium in the fastest possible time without a single overshoot.
   - **Use Case:** Standard interactive buttons, dropdowns, navigation docks, modal drawers.
   - **Recommended Constants:** $k = 300, c = 34.64, m = 1 \implies \zeta = 1.00$.

3. **Overdamped ($\zeta > 1$):**
   - Sluggish, non-oscillating return.
   - **Banned for UI:** Feels sticky, delayed, and unresponsive.

### B. High-Precision CSS Spring Tokens (Ready to Inject)

```css
:root {
  /* Critically Damped Snappy Spring (Zero Overshoot, Maximum Speed: 150ms) */
  --spring-snappy: cubic-bezier(0.2, 0, 0, 1);

  /* Tactile Interactive Spring (Gentle 3% Overshoot, High Responsiveness) */
  --spring-tactile: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* High-Resolution CSS linear() Spring Simulation (Native Engine) */
  --spring-physics-engine: linear(
    0, 0.006, 0.027 2.4%, 0.111 6.8%, 0.301 13.9%, 0.448 18.5%,
    0.584 23.5%, 0.697 28.5%, 0.785 33.7%, 0.85 39.1%, 0.899 44.9%,
    0.934 50.8%, 0.957 56.9%, 0.973 63.3%, 0.984 70%, 0.99 77.1%,
    0.993 84.7%, 1
  );
}
```

---

## 🎮 SECTION 3: 3D, WEBGL & GPU FILL-RATE CALCULUS

When integrating 3D elements, Three.js canvases, or custom shaders (e.g. Namaz celestial arc, sun position tracking, or video particle effects), the GPU workload must adhere to these mathematical ceilings:

### A. The Draw Call Formula
Each distinct mesh, material change, or texture binding creates a CPU-to-GPU draw call ($N_{\text{draw}}$).
- **Mobile Hardware Budget:** $N_{\text{draw}} \le 50$ per frame.
- **Desktop Budget:** $N_{\text{draw}} \le 150$ per frame.
- **Optimization:** Use `THREE.InstancedMesh` for repeated objects (stars, particles, prayer beads). Combine geometries sharing the same material into a single `BufferGeometry`.

### B. Fill-Rate & Overdraw Multiplier ($M_{\text{fill}}$)
Overdraw occurs when transparent layers or overlapping geometries are drawn on top of identical pixels:
$$\text{Pixel Render Load} = \text{Width} \times \text{Height} \times (\text{DPR})^2 \times M_{\text{fill}} \times F$$

*The Danger of Retina Displays:*
A 1440x900 viewport on a 3x Retina display has $1440 \times 900 \times 9 = 11.66 \text{ million pixels}$.
At 60fps with an overdraw multiplier of $2.5x$, the GPU must process **1.75 billion fragments per second**!
*The Law:* Always clamp device pixel ratio:
```javascript
const dpr = Math.min(window.devicePixelRatio || 1, 2.0);
renderer.setPixelRatio(dpr);
```

### C. Geometry & Vertex Memory Budgets
- **Mobile Triangle Cap:** $\le 100,000$ visible triangles.
- **Precision:** Use `precision mediump float;` in fragment shaders. High precision (`highp`) is reserved strictly for vertex position calculations to avoid 30% GPU memory bus overhead on mobile chips.

---

## 🎯 SECTION 4: ROLE-BY-ROLE PERFORMANCE DIRECTIVES

### 1. Directive for Pam Beesly (`company_pam` — DOM & CSS Engineer)
- **Zero Reflow Invariant:** Only animate `transform` and `opacity`. Never touch `height`, `width`, `top`, `left`, `margin`, or `padding` in any transition.
- **DOM Node Budget:** Total nodes in DOM must remain $\le 1,200$. Virtualize prayer histories or logging tables exceeding 30 items.
- **Layer Memory:** Do not place `will-change: transform` on dozens of elements. Each layer consumes VRAM equal to $\text{Width} \times \text{Height} \times 4 \text{ bytes}$.

### 2. Directive for Ryan Howard (`company_ryan` — Micro-Interactions Developer)
- **Input-to-Next-Paint (INP):** Tap event handlers must finish synchronous execution within **12ms**. Never run database queries, JSON parsing, or heavy algorithms inside a pointerdown/click handler.
- **Touch Responsiveness:** Use `touch-action: manipulation` to eliminate the 300ms mobile tap delay.

### 3. Directive for Yuki Tanaka (`company_motion` — Motion Director)
- **Refresh Alignment:** Animations must look equally coherent at 60Hz and 120Hz. Use spring physics by default, because springs calculate position dynamically per frame regardless of whether the display ticks every 16.6ms or 8.3ms.
- **Stagger Threshold:** Stagger between sequential list elements must equal exactly 40ms–60ms. Staggers $> 80$ms make the interface feel laggy.

### 4. Directive for Elena Vasquez (`company_ui` — Visual UI Designer)
- **Shadow Rasterization:** Box shadows with blur radius $R > 16$px cost quadratic GPU fragment processing time ($O(R^2)$). Never stack more than 2 box shadows on interactive cards.
- **Frosted Glass Blur:** Always provide `-webkit-backdrop-filter` alongside `backdrop-filter`. Limit backdrop filter usage to persistent navigation bars or modals; never apply backdrop filter to 20 scrolling cards simultaneously.

### 5. Directive for Stanley Hudson (`company_stanley` — Fullstack Implementer)
- **Local State Optimism:** When an interactive toggle is clicked, update the UI state immediately ($< 16$ms). Send the SQLite or network request in the background. If it fails, animate a rollback spring. Never block UI state on an asynchronous I/O completion.

---

## 🏆 SECTION 5: THE 60/90/120Hz HARDWARE CERTIFICATION PROTOCOL

Before any frontend release is certified:
1. **Chromium DevTools Performance Trace:**
   - Execute 10 rapid interactions.
   - Main thread long tasks ($> 50$ms): **0**.
   - Cumulative Layout Shift (CLS): **$< 0.05$**.
   - Interaction to Next Paint (INP): **$< 50$ms**.
2. **GPU Memory Allocation:**
   - No continuous memory climb (memory leak test).
   - Zero WebGL context lost warnings.
3. **Reduced Motion Safety:**
   - `@media (prefers-reduced-motion: reduce)` verified — transforms and animations drop to instantaneous duration ($0.01$ms).
