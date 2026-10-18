# 👥 Agent Fleet Catalog

The Boring Company OS operates as a coordinated virtual software enterprise with **72 specialist agent roles** divided into core functional squads.

---

## 🏛️ Executive Board & Governance

| Agent Role | Codename / Persona | Primary Focus | Authority & Responsibilities |
|---|---|---|---|
| **CEO / Supreme Conductor** | Michael | Floor Operations & Arbitration | Ingests `/boss` prompts, orchestrates division leads, resolves deadlocks, conducts final delivery sign-offs. |
| **Chief Product Officer (CPO)** | Marcus | Requirement Elaboration | Translates ambiguous founder prompts into bulletproof user stories, invariants, and acceptance criteria. |
| **Chief Technology Officer (CTO)** | Stanley | Systems Architecture | Evaluates architectural tradeoffs, determines Track A/B/C routing, sets non-negotiable tech invariants. |
| **VP of Engineering** | David | Delivery & Execution Pace | Assigns specialist squads, manages execution leases, monitors sprint throughput. |
| **Chief Revenue Officer (CRO)** | Jan | Product Commercialization | Evaluates customer-facing value, pricing models, and business alignment of features. |
| **VP of Operations** | Darryl | Systems Reliability & Infrastructure | Monitors token consumption, database ledger health, and process runtime health. |

---

## ⚔️ The Adversarial Sparring Arena (Claudex Loop)

| Agent Role | Persona | Weapon / Methodology | Role Description |
|---|---|---|---|
| **Software Architect** | Stanley | Domain-Driven Design & Bounded Contexts | Authors the 5-bullet Smallest Justified Design. Proves why zero extra abstraction is introduced. |
| **Adversarial Inquisitor** | Dwight | 3-Probe Chaos, Concurrency & Fragility Scorecard | Aggressively attacks proposed designs looking for race conditions, edge cases, and memory leaks before coding begins. |
| **Fresh Reviewer** | Creed | Zero-Author-Bias Code Inspection | Evaluates diffs in total isolation from the writing agent to prevent cognitive blind spots and assumed context. |

---

## 💻 Engineering & Implementation Specialists

| Agent Role | Persona | Core Discipline | Operating Constraints |
|---|---|---|---|
| **Lead Coder (Minimal Change)** | Jim | Surgical Bounded Diffs | Enforces the Karpathy 50-Line Razor: touches only direct call chains, zero orthogonal refactoring. |
| **TDD Automation Engineer** | Ryan | Test-Driven Development (RED ➔ GREEN) | Writes failing boundary tests first; writes minimal code to pass; verifies 100% assertion green. |
| **Database Reliability Engineer (DBRE)** | Oscar | SQLite / PostgreSQL Schema & Migrations | Index optimization, zero-downtime schema evolution, deadlock elimination, query plan profiling. |
| **Application Security (AppSec)** | Toby | CWE Elimination & Secret Scanning | Pre-commit security scanning, threat modeling, injection prevention, token circuit-breaker enforcement. |
| **API Platform Architect** | Andy | Contract-First API Design | OpenAPI specifications, idempotent endpoints, versioning policies, rate-limiting headers. |

---

## 🎨 Design, Brand & User Interface

| Agent Role | Persona | Aesthetic & Standards | Deliverables |
|---|---|---|---|
| **Executive UI Designer** | Pam | Apple-Grade Interfaces & Spatial Rhythm | High typographic contrast, warm monochrome palettes, CSS grid choreography, micro-interactions. |
| **Brand & Design Architect** | Kelly | Visual Identity & Component Systems | Consistent design tokens, typography scales, accessibility (WCAG AA), responsive breakpoints. |

---

## 🛡️ Delivery & Verification (The Reality Gate)

| Agent Role | Persona | Enforcement Gate | Verification Standard |
|---|---|---|---|
| **Reality Gate Auditor** | Angela | Exit-Code Machine Interlock | Refuses completion unless native test runners report clean exit status `0`. Enforces triple-evidence logging. |
| **Deadline & Acceptance Auditor** | Kevin | Definition of Done Enforcer | Cross-checks implementation deliverables against CPO acceptance criteria. Defaults to `NEEDS WORK`. |

---

## 📁 Agent Manifest Directory Structure

Every specialist agent in the fleet is defined as a portable markdown manifest:

```
agents/definitions/
├── company_angela/agent.md
├── company_architect/agent.md
├── company_dwight/agent.md
├── company_jim/agent.md
├── company_pam/agent.md
├── company_ryan/agent.md
└── ... (72 total agent definitions)
```
