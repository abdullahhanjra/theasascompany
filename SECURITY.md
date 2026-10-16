# Security Policy

The Boring Company OS is designed for enterprise autonomy where AI agents execute code, manage files, and interact with operating system environments. Because agents possess autonomous execution capabilities, security and fail-closed isolation are foundational requirements.

---

## 🛡️ Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

---

## 🔒 Security Architecture Principles

1. **Reality Gate Interlock**: No task is certified as complete without machine verification.
2. **Fail-Closed Execution**: If any process fails, produces an unhandled exception, or exits with non-zero status, the task is marked as halted and control escalates to the supervisory agent.
3. **Token Circuit Breakers**: The Hive proxy implements a 3-tier throttle:
   - `steer`: Suggests bounded responses when token expenditure approaches 75% of quota.
   - `constrain`: Restricts tool invocations to essential read/test actions at 90% of quota.
   - `stop`: Hard circuit break if quota is exceeded, preventing runaway agent loops.
4. **Environment Isolation**: No hardcoded API keys, database credentials, or private file system paths are permitted in repository commits.

---

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability within The Boring Company OS, please do **NOT** open a public issue.

Instead, please send an advisory email directly to:

**[youtubrabdullah1626@gmail.com](mailto:youtubrabdullah1626@gmail.com)**

### What to Include in Your Report:
- A clear description of the vulnerability and attack vector.
- Steps to reproduce or a minimal proof-of-concept (PoC).
- Potential impact on host systems, agent mailboxes, or token budgets.
- Any suggested remediation or patch.

### Response Timeline:
- **Initial Acknowledgement**: Within 48 hours.
- **Triage & Assessment**: Within 5 business days.
- **Patch & Public Advisory**: Coordinated disclosure after remediation is verified across the Reality Gate test matrix.

---

## 📜 Safe Harbor

We consider security research conducted under this policy to be authorized, and we will not pursue legal action against researchers who:
- Make a good faith effort to avoid privacy violations and destruction of data.
- Give us reasonable time to remediate before public disclosure.
- Do not exploit a vulnerability beyond what is strictly necessary to demonstrate risk.
