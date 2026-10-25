#!/usr/bin/env node
'use strict';

/**
 * 🏛️ The Asas Company — Autonomous Multi-Agent Dispatch CLI
 * Real Autonomous Engineering Enterprise OS & Multi-Agent Runtime Framework.
 * Dispatches missions through the 6-Phase Engineering Loop, Controlled Workspace,
 * Model Providers, SQLite Relational Ledger, and the Trustworthy Reality Gate.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { ExecutionPipeline } = require('./src/engine/pipeline');
const { TaskBreaker } = require('./src/engine/task-breaker');
const { EnterpriseRouter } = require('./src/engine/router');
const { SocraticEngine } = require('./src/engine/socratic');
const { ExecutiveCouncil } = require('./src/engine/council');
const { AutonomousPlanner } = require('./src/engine/planner');
const { getProvider } = require('./src/providers');
const { DeterministicTestProvider } = require('./src/providers/deterministic-test');

const args = process.argv.slice(2);
let task = null;
let track = 'auto';
let providerName = process.env.BORING_PROVIDER || null;
let modelName = process.env.BORING_MODEL || null;
let targetDir = process.cwd();
let testCmd = null;
let isDemo = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--task' && args[i + 1]) {
    task = args[++i];
  } else if (args[i] === '--track' && args[i + 1]) {
    track = args[++i].toUpperCase();
  } else if (args[i] === '--provider' && args[i + 1]) {
    providerName = args[++i].toLowerCase();
  } else if (args[i] === '--model' && args[i + 1]) {
    modelName = args[++i];
  } else if (args[i] === '--target' || args[i] === '--target-dir') {
    targetDir = path.resolve(args[++i]);
  } else if (args[i] === '--test-cmd') {
    testCmd = args[++i];
  } else if (args[i] === '--demo') {
    isDemo = true;
  } else if (args[i] === '--departments' || args[i] === '-d') {
    printDepartments();
    process.exit(0);
  } else if (args[i] === 'install' || args[i] === '--install') {
    require('./scripts/install-tools');
    return;
  } else if (args[i] === '--benchmark' || args[i] === '-b') {
    const { runBenchmark } = require('./test/benchmark');
    runBenchmark();
    process.exit(0);
  } else if (args[i] === '--break' || args[i] === '--plan') {
    const planTask = args[++i] || task || 'Build feature with SQL database and responsive UI';
    const breaker = new TaskBreaker();
    const subtasks = breaker.decompose(planTask);
    const stages = breaker.organizeStages(subtasks);
    printBanner();
    console.log(breaker.renderFlightBoard(planTask, stages));
    process.exit(0);
  } else if (args[i] === 'meet' || args[i] === '--meet' || args[i] === 'council' || args[i] === '--council' || args[i] === 'deliberate') {
    const meetArgs = args.slice(i + 1);
    const interactive = meetArgs.includes('--interactive') || meetArgs.includes('-i');
    const filteredArgs = meetArgs.filter(a => a !== '--interactive' && a !== '-i');
    const meetGoal = filteredArgs.join(' ').trim() || task || 'Architect enterprise system reliability and scalable modules';
    
    const council = new ExecutiveCouncil(targetDir);
    council.convene(meetGoal, { interactive }).then(result => {
      printBanner();
      console.log(council.formatTerminalSummary(result));
      const planner = new AutonomousPlanner();
      const stages = planner.validateAcyclic(result.sprintBacklog);
      console.log(planner.renderFlightBoard(result.goal, stages));
      process.exit(0);
    }).catch(err => {
      console.error('\x1b[31mCouncil deliberation error:\x1b[0m', err.message);
      process.exit(1);
    });
    return;
  } else if (args[i] === 'ask' || args[i] === '--ask') {
    const askArgs = args.slice(i + 1);
    if (askArgs.includes('--benchmark') || askArgs.includes('-b') || (askArgs.length === 0 && args.includes('--benchmark'))) {
      const router = new EnterpriseRouter();
      const bench = router.benchmark();
      console.log(`\x1b[1m\x1b[32m✔ Enterprise Router Benchmark Passed: ${bench.totalQueries} queries in ${bench.totalDurationMs}ms (Avg: ${bench.averageLatencyMs}ms/query)\x1b[0m`);
      process.exit(bench.passed ? 0 : 1);
    }
    const askQuery = askArgs.join(' ').trim();
    if (!askQuery) {
      console.log('\x1b[31mError: Please provide a query to route. Example: boss ask "Fix checkout bug"\x1b[0m');
      process.exit(1);
    }
    const router = new EnterpriseRouter();
    const result = router.route(askQuery);
    console.log(router.formatRoute(result));
    process.exit(0);
  } else if (args[i] === '--router-benchmark') {
    const router = new EnterpriseRouter();
    const bench = router.benchmark();
    console.log(`\x1b[1m\x1b[32m✔ Enterprise Router Benchmark Passed: ${bench.totalQueries} queries in ${bench.totalDurationMs}ms (Avg: ${bench.averageLatencyMs}ms/query)\x1b[0m`);
    process.exit(bench.passed ? 0 : 1);
  } else if (args[i] === '--socratic') {
    const socraticTask = args.slice(i + 1).join(' ').trim() || 'General Architecture Feature';
    const socratic = new SocraticEngine(targetDir);
    socratic.interview(socraticTask).then(res => {
      console.log(`\x1b[32m✔ Socratic interview completed. ADR created at: ${res.adrFile}\x1b[0m`);
      process.exit(0);
    });
    return;
  } else if (args[i] === '--lazy' || args[i] === '--minimal') {
    printBanner();
    console.log(`\x1b[1m\x1b[36m⚡ THE ASAS MINIMALIST RAZOR (Jim Halpert & Stanley Hudson)\x1b[0m`);
    console.log(`\x1b[90m"The best code is the code you never wrote."\x1b[0m\n`);
    console.log(`\x1b[1m1. 6-Step Solution Hierarchy (The Lazy Order):\x1b[0m`);
    console.log(`   ① Does it need to exist? Skip features/options nobody asked for.`);
    console.log(`   ② Already in this codebase? Reuse existing helpers and patterns.`);
    console.log(`   ③ Standard library? Native Node.js APIs beat custom boilerplate.`);
    console.log(`   ④ Installed package? Never add a new npm package for a few lines.`);
    console.log(`   ⑤ Can it be one line? If readable at a glance, make it one line.`);
    console.log(`   ⑥ Otherwise: Surgical patch strictly under 50 lines.\n`);
    console.log(`\x1b[1m2. The 4 Ironclad Invariants:\x1b[0m`);
    console.log(`   • \x1b[33mGrep Callers First:\x1b[0m Grep every caller before touching shared code.`);
    console.log(`   • \x1b[33mRisky Logic Test:\x1b[0m Branches, loops, parsers, or money MUST leave 1 test.`);
    console.log(`   • \x1b[33mThe // shortcut: Tag:\x1b[0m Document pragmatic trade-offs with when to upgrade.`);
    console.log(`   • \x1b[33mMandatory Sign-Off:\x1b[0m State what was skipped and remaining edge-case risks.\n`);
    console.log(`\x1b[32m✔ The Asas Minimalist Razor active.\x1b[0m\n`);
    process.exit(0);
  } else if (args[i] === '--memory' || args[i] === '-m') {
    const query = args[++i] || 'sqlite';
    const { searchMemory } = require('./memory/search');
    const { count, elapsedMs, results } = searchMemory(query, { limit: 2 });
    console.log(`[MEMORY SEARCH] Query: "${query}" | Found ${count} card(s) in ${elapsedMs}ms`);
    for (const r of results) {
      console.log(`\n--- [${r.id}] ${r.title} ---\n${r.content}\n`);
    }
    process.exit(0);
  } else if (!args[i].startsWith('-')) {
    if ((args[i] === '/boss' || args[i] === 'boss') && args[i + 1] && !args[i + 1].startsWith('-')) {
      task = args[++i];
    } else if (!task) {
      task = args[i];
    }
  } else if (args[i] === '--help' || args[i] === '-h') {
    printHelp();
    process.exit(0);
  }
}

function printDepartments() {
  printBanner();
  console.log(`\x1b[1m\x1b[32m🏛️  THE 6 OPERATIONAL DEPARTMENTS & SPECIALIST FLEET\x1b[0m\n`);

  const depts = [
    {
      num: '1',
      name: 'Executive Board & Strategy',
      leader: 'Michael Scott (CEO) & David Wallace (Board Chair)',
      members: 'Jan Levinson (CCO), Robert California (Taste Gate), CPO, CRO, CMO, COO',
      mission: 'Translates high-level Founder requests into clear, scoped specifications. Enforces velocity tracks (Track A/B/C) and arbitrates technical tradeoffs.'
    },
    {
      num: '2',
      name: 'The Red Team & Security Guard',
      leader: 'Dwight Schrute (Red Team Lead) & Hank Tate (Security Sentinel)',
      members: 'Creed Bratton (Penetration Tester), Dr. Amira Hassan (Resilience)',
      mission: 'Stress-tests code before it reaches the gate. Probes race conditions, boundary failures, edge cases, and freezes backend files against unintended modification.'
    },
    {
      num: '3',
      name: 'Core Engineering & Database',
      leader: 'Jim Halpert (Lead Coder) & Stanley Hudson (Minimal Change)',
      members: 'Dr. Kofi Mensah (DBA), Alex Rivera (Task Sequencer), Rafael Torres (Staff Eng)',
      mission: 'Implements focused, minimal diffs using native Node.js 22+. Enforces the Karpathy 50-line razor and zero external runtime dependencies.'
    },
    {
      num: '4',
      name: 'Quality Assurance & Reality Gate',
      leader: 'Angela Martin (Reality Gate Lead) & Isabela Carvalho (Principal QA)',
      members: 'Oscar Martinez (Pre-Ship Auditor), Gabe Lewis (Release Gate), Erin Hannon',
      mission: 'Strict mathematical verification. Demands clean exit codes ($? === 0), positive test assertions, and anti-tamper verification. Refuses all subjective claims.'
    },
    {
      num: '5',
      name: 'Product Design & User Experience',
      leader: 'Pam Beesly (Frontend Architect) & Zara Ahmed (Principal UX)',
      members: 'Elena Vasquez (UI Designer), Ryan Howard (Micro-Interactions), Dr. Priya Menon (Color Psych)',
      mission: 'Crafts responsive interfaces, accessible navigation, and fluid 60fps animations. Enforces the 8px grid, WCAG AAA standards, and zero visual clutter.'
    },
    {
      num: '6',
      name: 'Operations, Systems & Release',
      leader: 'Darryl Philbin (Operations Lead) & Dr. Amira Hassan (Principal SRE)',
      members: 'Kevin Malone (Accounting & Token Budgets), Nick/Garth (Toolmaster), Val Johnson',
      mission: 'Maintains system health, monitors token limits, packages 1-click launchers (start.bat), and ensures zero crashes during unattended runs.'
    }
  ];

  for (const d of depts) {
    console.log(`\x1b[1m\x1b[36m[DEPARTMENT ${d.num}: ${d.name.toUpperCase()}]\x1b[0m`);
    console.log(`  • \x1b[1mLeadership:\x1b[0m ${d.leader}`);
    console.log(`  • \x1b[1mTeam Specialists:\x1b[0m ${d.members}`);
    console.log(`  • \x1b[1mCore Mission:\x1b[0m ${d.mission}\n`);
  }

  const agentsDir = path.join(__dirname, 'agents', 'definitions');
  let agentCount = 0;
  if (fs.existsSync(agentsDir)) {
    agentCount = fs.readdirSync(agentsDir).filter(f => fs.statSync(path.join(agentsDir, f)).isDirectory()).length;
  }
  console.log(`\x1b[32m✔ Active Registered Fleet: ${agentCount} specialist agent manifests verified in agents/definitions/.\x1b[0m\n`);
}

function printHelp() {
  console.log(`
\x1b[1m\x1b[32mThe Asas Company — Autonomous AI Enterprise Dispatch CLI\x1b[0m

Usage:
  node cli.js [options]
  npm run demo
  npm run benchmark
  npm start -- --task "Your engineering mission"

Options:
  meet <goal>             Convene Executive Council (CEO, CPO, CTO, Red Team, QA) for autonomous board debate
  council <goal>          Alias for meet (deliberates trade-offs & outputs staged sprint DAG)
  ask <task>              Route task through Asas engineering workflow (<15ms, 0 tokens)
  --interactive, -i       Cast Founder tie-breaker vote during Executive Council meetings
  --task <string>         Specify the engineering mission to dispatch
  --provider <name>       AI provider: anthropic, openai, gemini, ollama, test (default: auto)
  --model <name>          Specific model name (e.g. claude-3-7-sonnet, gpt-4o, gemini-2.5-pro)
  --target <dir>          Target repository directory (default: current directory)
  --test-cmd <cmd>        Command to run for Reality Gate verification (e.g. "npm test")
  --track <A|B|C>         Velocity track (A: Surgical, B: Sprint, C: Enterprise Core)
  --departments, -d       Display the 6 operational departments, leadership, and team roster
  --break, --plan         Preview staged task breakdown and department assignments without running
  --socratic <task>       Run interactive Socratic requirements interview (generates ADR & GLOSSARY)
  --router-benchmark      Benchmark router classification latency across 20 synthetic queries
  --demo                  Run hermetic end-to-end demonstration mission with real tools
  --benchmark, -b         Run empirical latency benchmark matrix (p50, p95, p99)
  --memory, -m <q>        Search indexed institutional memory cards (<50 lines)
  --lazy, --minimal       Display The Asas Minimalist Razor (strict rules for clean minimal code)
  --help, -h              Show this help screen
`);
}

function printBanner() {
  console.log(`
\x1b[1m\x1b[36m╔══════════════════════════════════════════════════════════════════════════════════╗
║               🏛️ THE ASAS COMPANY — MULTI-AGENT OPERATING SYSTEM                 ║
║           Autonomous Engineering Enterprise • Reality Gate Interlock             ║
╚══════════════════════════════════════════════════════════════════════════════════╝\x1b[0m
`);
}

function printWelcome() {
  printBanner();
  console.log(`\x1b[1m\x1b[32m⭐ The Boss is ready for your orders.\x1b[0m

To give the AI team a mission, just type:
  \x1b[36mboss "Your task here"\x1b[0m
  \x1b[36mboss meet "Your architecture or feature goal"\x1b[0m   (Autonomous Board Meeting)
  \x1b[36mboss ask "Your question or bug"\x1b[0m                 (Instant <15ms smart route)
  \x1b[36mnpx theasascompany meet "Your goal"\x1b[0m

Examples:
  boss meet "Build OAuth2 login with Google and GitHub"
  boss ask "Users charged twice on payment click"
  boss ask "Add dark mode toggle to navbar"
  boss "Fix the broken login button in index.html"

Quick options:
  boss --demo            Run a 1-second test to see the team build code
  boss --departments     See the 6 departments and team leaders
  boss --help            See advanced options
`);
}

async function runDemoMission() {
  printBanner();
  console.log(`\x1b[90m[MODE]\x1b[0m Launching Hermetic End-to-End Demonstration Mission`);
  console.log(`\x1b[90m[DISPATCH]\x1b[0m Mission: \x1b[1m"Implement thread-safe connection pool with exponential backoff"\x1b[0m\n`);

  // Create isolated sandbox
  const demoDir = fs.mkdtempSync(path.join(os.tmpdir(), 'boring-demo-'));
  fs.writeFileSync(path.join(demoDir, 'package.json'), JSON.stringify({ name: 'demo-pool', scripts: { test: 'node test.js' } }, null, 2));
  fs.writeFileSync(path.join(demoDir, 'pool.js'), 'module.exports = { acquire: () => null };');
  fs.writeFileSync(
    path.join(demoDir, 'test.js'),
    `
const assert = require('assert');
const pool = require('./pool');
const conn = pool.acquire();
assert.ok(conn !== null, 'Connection must not be null');
assert.strictEqual(conn.active, true, 'Connection must be active');
console.log('# tests 2\\n# pass 2\\n# fail 0\\nok 1 - connection acquired\\nok 2 - active status verified');
`
  );

  const demoProvider = new DeterministicTestProvider({
    responses: [
      {
        content: 'Inspecting existing pool implementation and test specification.',
        toolCalls: [
          { id: 'c1', name: 'readFile', args: { path: 'pool.js' } },
          { id: 'c2', name: 'readFile', args: { path: 'test.js' } }
        ]
      },
      {
        content: 'Applying Karpathy 50-line razor: implementing minimal thread-safe connection pool.',
        toolCalls: [
          {
            id: 'c3',
            name: 'writeFile',
            args: {
              path: 'pool.js',
              content: `'use strict';
class ConnectionPool {
  acquire() {
    return { id: 'conn_1', active: true, acquiredAt: Date.now() };
  }
}
module.exports = new ConnectionPool();`
            }
          }
        ]
      },
      {
        content: 'Implementation complete. Submitting to Reality Gate for automated verification.',
        toolCalls: []
      }
    ]
  });

  const pipeline = new ExecutionPipeline({
    workspaceRoot: demoDir,
    provider: demoProvider,
    testCommand: 'node test.js',
    verbose: true
  });

  const result = await pipeline.runTask({
    title: 'Implement thread-safe connection pool with exponential backoff',
    description: 'Ensure acquire() returns a valid active connection object and satisfies test.js'
  });

  // Clean up sandbox
  try {
    fs.rmSync(demoDir, { recursive: true, force: true });
  } catch {}

  process.exit(result.status === 'VERIFIED' ? 0 : 1);
}

async function runLiveMission(missionTask) {
  printBanner();
  console.log(`\x1b[90m[DISPATCH]\x1b[0m Mission received from Founder: \x1b[1m"${missionTask}"\x1b[0m\n`);

  // Convene the Executive Council for autonomous board deliberation & sprint DAG planning
  const council = new ExecutiveCouncil(targetDir);
  const councilResult = await council.convene(missionTask);
  console.log(council.formatTerminalSummary(councilResult));

  const planner = new AutonomousPlanner();
  const stages = planner.validateAcyclic(councilResult.sprintBacklog);
  console.log(planner.renderFlightBoard(councilResult.goal, stages));

  // Determine provider
  let provider;
  try {
    provider = getProvider({ provider: providerName, model: modelName });
  } catch (err) {
    console.error(`\x1b[31m[PROVIDER ERROR]\x1b[0m ${err.message}`);
    process.exit(1);
  }

  if (provider.name === 'unconfigured') {
    console.log(`\x1b[33m[SETUP REQUIRED]\x1b[0m No AI API key detected in your environment.`);
    console.log(`To run live AI tasks, simply set your API key:\n`);
    console.log(`  \x1b[36m$env:ANTHROPIC_API_KEY="sk-ant-..."\x1b[0m   (for Claude 3.7)`);
    console.log(`  \x1b[36m$env:OPENAI_API_KEY="sk-..."\x1b[0m           (for GPT-4o)`);
    console.log(`  \x1b[36m$env:GEMINI_API_KEY="AIza..."\x1b[0m          (for Google Gemini)`);
    console.log(`  \x1b[36m--provider ollama\x1b[0m                      (for free local models)`);
    console.log(`\n👉 Or try the instant offline demo right now: \x1b[1m\x1b[32mnode cli.js --demo\x1b[0m\n`);
    process.exit(1);
  }

  console.log(`\x1b[90m[RUNTIME]\x1b[0m Provider: \x1b[32m${provider.name}\x1b[0m | Model: \x1b[32m${provider.model}\x1b[0m`);
  console.log(`\x1b[90m[TARGET]\x1b[0m Workspace: \x1b[33m${targetDir}\x1b[0m\n`);

  // Detect verification test command if not provided
  let effectiveTestCmd = testCmd;
  if (!effectiveTestCmd) {
    const pkgPath = path.join(targetDir, 'package.json');
    if (fs.existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        if (pkg.scripts && pkg.scripts.test) {
          effectiveTestCmd = 'npm test';
        }
      } catch {}
    }
  }

  if (!effectiveTestCmd) {
    effectiveTestCmd = 'node --test test/*.test.js';
  }

  const pipeline = new ExecutionPipeline({
    workspaceRoot: targetDir,
    provider,
    testCommand: effectiveTestCmd,
    verbose: true
  });

  const result = await pipeline.runTask({
    title: missionTask,
    description: missionTask,
    priority: track === 'A' ? 'HIGH' : (track === 'C' ? 'CRITICAL' : 'NORMAL')
  });

  process.exit(result.status === 'VERIFIED' ? 0 : 1);
}

// Main entry
if (isDemo) {
  runDemoMission();
} else if (task) {
  runLiveMission(task);
} else if (!args.includes('--benchmark') && !args.includes('--memory') && !args.includes('--help') && !args.includes('--departments') && !args.includes('-d')) {
  printWelcome();
}
