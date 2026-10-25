#!/usr/bin/env node
'use strict';

const tokenA = process.env.GITHUB_TOKEN_A || process.env.GITHUB_PERSONAL_ACCESS_TOKEN || '';
const tokenB = process.env.GITHUB_TOKEN_B || '';

const releaseBody = `# 🏢 The Asas Company OS — Release v1.2.0
### Staged Dependency Engine & Task Breaker DAG

### 🚀 What's New in v1.2.0

1. **🧩 The Task Breaker & Staged Dependency Engine (\`src/engine/task-breaker.js\`)**:
   - Deep-level domain decomposition (WBS): automatically breaks any user prompt into discrete, bounded subtasks.
   - Kahn's topological DAG algorithm organizes work into strictly staged assembly lines (Foundation ➔ Core APIs ➔ UI & Design ➔ Red Team ➔ Reality Gate).
   - Downstream stages are locked until upstream contracts pass validation.
   - Independent subtasks run in parallel.

2. **🖥️ Live Mission Control Flight Board**:
   - Visual ASCII terminal flight control board rendered before every mission execution.
   - Preview mode via \`--break\` or \`--plan\`:
     \`\`\`bash
     boss --break "Build user authentication with SQL database and responsive Login Form"
     \`\`\`

3. **👥 Complete 72-Agent Enterprise Fleet**:
   - Exactly 72 specialist agent manifests across 6 collaborative departments.
   - Full integration with Cursor (\`.cursor/rules/\`), Claude Code (\`~/.claude/agents/\`), and Antigravity (\`.agents/\`).

4. **🛡️ 37/37 Reality Gate Tests Passing Cleanly**:
   - Machine proof: 37 automated tests passing with exit code 0 (\`$? === 0\`).
   - Anti-tamper test file fingerprinting, post-verification snapshot integrity check, and local SQLite persistence (\`company.db\`).

5. **⚡ Zero External Dependencies**:
   - Pure native Node.js standard library (Node.js >= 22.5.0).
`;

async function createRelease(token, owner) {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/theasascompany/releases`, {
      method: 'POST',
      headers: {
        Authorization: `token ${token}`,
        'User-Agent': 'BoringCompany-Sync',
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tag_name: 'v1.2.0',
        name: 'v1.2.0: Staged Dependency Engine & Task Breaker DAG',
        body: releaseBody,
        draft: false,
        prerelease: false
      })
    });
    const data = await res.json();
    console.log(`[RELEASE] ${owner}: HTTP ${res.status} | URL: ${data.html_url || data.message}`);
    return res.ok;
  } catch (err) {
    console.error(`[ERROR] ${owner}:`, err.message);
    return false;
  }
}

async function main() {
  console.log('Publishing v1.2.0 Release to GitHub...\n');
  await createRelease(tokenA, 'abdullahhanjraa');
  await createRelease(tokenB, 'abdullahhanjra153');
  console.log('\nDone!');
}

main();
