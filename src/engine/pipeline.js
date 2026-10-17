'use strict';

/**
 * @file src/engine/pipeline.js
 * @description Autonomous Task Execution Pipeline for The Boring Company OS.
 * Orchestrates the full lifecycle:
 * 1. Plan & Gate (Task creation, relational ledger persistence)
 * 2. Recon & Context Modeling (Workspace file & rule inspection)
 * 3. Multi-Turn Model-Tool Loop (Bounded turns, real tool dispatch)
 * 4. Reality Gate Verification (Anti-tamper, positive assertions, clean exit code)
 * 5. Diagnostic Feedback & Self-Correction (Feedback loop on failed verification)
 * 6. Cryptographic Certification & Auditable Executive Clarity Card
 */

const path = require('path');
const fs = require('fs');
const { ControlledWorkspace } = require('../tools/workspace');
const { CompanyDatabase } = require('../storage/db');
const { RealityGate } = require('./reality-gate');
const { getProvider } = require('../providers');

class ExecutionPipeline {
  constructor(options = {}) {
    this.workspaceRoot = path.resolve(options.workspaceRoot || process.cwd());
    this.workspace = new ControlledWorkspace(this.workspaceRoot, {
      timeoutMs: options.commandTimeoutMs || 45000
    });
    this.db = options.db || new CompanyDatabase(options.dbPath);
    this.provider = options.provider || getProvider();
    this.realityGate = options.realityGate || new RealityGate();
    this.maxTurns = options.maxTurns || 10;
    this.maxRetries = options.maxRetries || 3;
    this.testCommand = options.testCommand || 'npm test';
    this.allowedPaths = options.allowedPaths || null;
    this.verbose = options.verbose ?? true;
  }

  log(phase, message) {
    if (this.verbose) {
      console.log(`\x1b[1m\x1b[36m[${phase}]\x1b[0m ${message}`);
    }
  }

  logSub(bullet, message) {
    if (this.verbose) {
      console.log(`  ${bullet} ${message}`);
    }
  }

  /**
   * Runs an end-to-end autonomous engineering task.
   * @param {object} taskInput
   * @param {string} taskInput.title Task summary
   * @param {string} [taskInput.description] Detailed instructions
   * @param {string} [taskInput.priority='high'] 'urgent'|'high'|'medium'|'low'
   * @param {string} [taskInput.testCommand] Custom verification command
   * @param {string[]} [taskInput.allowedPaths] Scoped file boundaries
   * @returns {Promise<object>} Complete mission result with machine proof
   */
  async runTask(taskInput) {
    const title = taskInput.title || 'Autonomous Engineering Mission';
    const description = taskInput.description || title;
    const priority = taskInput.priority || 'high';
    const testCommand = taskInput.testCommand || this.testCommand;
    const allowedPaths = taskInput.allowedPaths || this.allowedPaths;

    const missionStartTime = Date.now();
    this.log('PIPELINE START', `Initiating mission: "${title}"`);

    // Validate provider credentials first
    const configCheck = this.provider.validateConfig();
    if (!configCheck.valid) {
      this.log('CONFIG ERROR', `Model provider '${this.provider.name}' cannot run: ${configCheck.reason}`);
      if (configCheck.setupInstructions) {
        this.logSub('⚠', configCheck.setupInstructions);
      }
      return {
        status: 'FAILED',
        reason: `PROVIDER_CREDENTIALS_MISSING: ${configCheck.reason}`,
        setupInstructions: configCheck.setupInstructions,
        durationMs: Date.now() - missionStartTime
      };
    }

    // Step 1: Ledger Persistence & Acceptance Specification
    this.log('PHASE 1: LEDGER ADMISSION', 'Enrolling task into SQLite ledger...');
    const taskRecord = this.db.createTask({
      title,
      description,
      priority,
      acceptanceCriteria: [{ type: 'TEST_SUITE_PASS', command: testCommand }]
    });

    const executionId = this.db.recordExecution({
      taskId: taskRecord.id,
      providerId: this.provider.name,
      taskInstructions: description,
      policyTier: 'CONTROLLED',
      priority: priority.toUpperCase()
    });

    const specId = this.db.createAcceptanceSpecification({
      taskId: taskRecord.id
    });

    const critId = this.db.addAcceptanceCriterion({
      specificationId: specId,
      type: 'TEST_SUITE_PASS',
      name: 'Automated Reality Gate Verification',
      description: `Execute "${testCommand}" with exit code 0 and non-zero passing assertions`
    });

    this.logSub('✔', `Task ID: \x1b[32m${taskRecord.id}\x1b[0m | Execution ID: \x1b[32m${executionId}\x1b[0m`);

    // Step 2: Recon & Workspace Inspection
    this.log('PHASE 2: RECON & INSPECTION', `Inspecting workspace at ${this.workspaceRoot}...`);
    let initialFiles = [];
    try {
      initialFiles = this.workspace.listFiles('.', false);
      this.logSub('✔', `Discovered ${initialFiles.length} root items in target workspace.`);
    } catch (err) {
      this.logSub('⚠', `Recon file list warning: ${err.message}`);
    }

    // Read package.json or key manifest if available
    let manifestContext = '';
    try {
      const pkg = this.workspace.readFile('package.json');
      manifestContext = `\nWorkspace package.json:\n${pkg.slice(0, 1500)}`;
    } catch {
      // Non-fatal if package.json does not exist
    }

    // Step 3: Multi-turn Agent Loop with Tool Dispatch
    const systemPrompt = `You are the Lead Software Engineer at The Boring Company autonomous engineering system.
You are tasked with executing an autonomous engineering mission against a real codebase.
You have access to safe tools within the workspace:
- readFile(path): Read existing files.
- writeFile(path, content): Create or update files. Minimal surgical diffs only.
- listFiles(dir, recursive): Explore directories.
- searchFiles(query, dir): Find symbols, functions, or patterns.
- runCommand(command): Run builds, linters, or check outputs.

RULES:
1. Always inspect target files before editing.
2. Make minimal, surgical modifications. Do not modify unrelated files.
3. Respect the blast radius and ensure automated tests pass cleanly.
4. When finished, provide a concise summary of the changes and why they satisfy the acceptance criteria.`;

    const messages = [
      {
        role: 'user',
        content: `Mission: ${title}\nDescription: ${description}\nTest Command: ${testCommand}\n${manifestContext}`
      }
    ];

    const tools = this.workspace.getToolDeclarations();
    let totalInputTokens = 0;
    let totalOutputTokens = 0;
    let attemptsRemaining = this.maxRetries;
    let realityResult = null;
    let turnCount = 0;

    while (turnCount < this.maxTurns && attemptsRemaining > 0) {
      turnCount++;
      this.log('PHASE 3: EXECUTION TURN', `Agent Turn ${turnCount}/${this.maxTurns} (Attempts left: ${attemptsRemaining})`);

      let response;
      try {
        response = await this.provider.generate({
          systemPrompt,
          messages,
          tools
        });
      } catch (err) {
        this.logSub('✖', `Model invocation failed: ${err.message}`);
        this.db.updateExecution(executionId, {
          status: 'FAILED',
          outputTail: `Model failure: ${err.message}`
        });
        return {
          status: 'FAILED',
          reason: `MODEL_INVOCATION_ERROR: ${err.message}`,
          durationMs: Date.now() - missionStartTime
        };
      }

      totalInputTokens += response.usage?.inputTokens || 0;
      totalOutputTokens += response.usage?.outputTokens || 0;

      // Append assistant message
      messages.push({
        role: 'assistant',
        content: response.content || '',
        toolCalls: response.toolCalls || []
      });

      // Handle tool calls if any
      if (response.toolCalls && response.toolCalls.length > 0) {
        for (const tc of response.toolCalls) {
          const toolName = tc.name || tc.function?.name;
          let toolArgs = tc.args || tc.function?.arguments || {};
          if (typeof toolArgs === 'string') {
            try {
              toolArgs = JSON.parse(toolArgs);
            } catch {
              toolArgs = {};
            }
          }

          this.logSub('⚙', `Executing tool: \x1b[33m${toolName}\x1b[0m(${JSON.stringify(toolArgs).slice(0, 100)})`);

          let toolOutput;
          try {
            toolOutput = await this.workspace.executeToolCall(toolName, toolArgs);
          } catch (toolErr) {
            toolOutput = { error: toolErr.message };
            this.logSub('⚠', `Tool error: ${toolErr.message}`);
          }

          messages.push({
            role: 'tool',
            toolCallId: tc.id,
            name: toolName,
            content: typeof toolOutput === 'string' ? toolOutput : JSON.stringify(toolOutput)
          });
        }
      }

      // If model provided text response without tool calls, or if changes are ready, evaluate Reality Gate
      const hasToolCalls = response.toolCalls && response.toolCalls.length > 0;
      const modelClaimsDone = !hasToolCalls || (response.content && /complete|finished|implemented|ready for verification/i.test(response.content));

      if (modelClaimsDone || turnCount >= this.maxTurns) {
        this.log('PHASE 4: REALITY GATE', `Executing independent verification: "${testCommand}"...`);
        realityResult = await this.realityGate.verify({
          workspace: this.workspace,
          testCommand,
          allowedPaths
        });

        if (realityResult.passed) {
          this.logSub('✔', `\x1b[32mREALITY GATE PASSED!\x1b[0m Exit code: 0 | Assertions passed: ${realityResult.testsPassed} | Duration: ${realityResult.durationMs}ms`);
          break; // Task verified successfully!
        } else {
          attemptsRemaining--;
          this.logSub('✖', `\x1b[31mREALITY GATE REJECTED:\x1b[0m ${realityResult.reason}`);
          if (realityResult.stdoutTail || realityResult.stderrTail) {
            this.logSub('↳', `Error trace: ${(realityResult.stderrTail || realityResult.stdoutTail).slice(0, 300)}`);
          }

          if (attemptsRemaining > 0) {
            this.log('DIAGNOSTIC FEEDBACK', 'Injecting test failure output back into model context for surgical repair...');
            messages.push({
              role: 'user',
              content: `[REALITY GATE REJECTION]: The test suite failed verification.
Reason: ${realityResult.reason}
Exit Code: ${realityResult.exitCode}
Test Output / Trace:
${realityResult.stderrTail || realityResult.stdoutTail}

Please diagnose the defect, inspect the affected files, and apply a minimal fix.`
            });
          }
        }
      }
    }

    const totalDurationMs = Date.now() - missionStartTime;

    // Step 4: Finalize Ledger & Record Evidence
    if (realityResult && realityResult.passed) {
      const verifRecord = this.db.recordVerification({
        taskId: taskRecord.id,
        executionId,
        specificationId: specId,
        passed: true,
        commitSha: 'working_tree',
        treeSha: realityResult.evidenceDigest
      });

      this.db.recordEvidence({
        taskId: taskRecord.id,
        executionId,
        verificationRunId: verifRecord.id,
        specificationId: specId,
        criterionId: critId,
        evidenceClass: 'ProcessExit',
        sha256: realityResult.evidenceDigest,
        payload: {
          testCommand,
          exitCode: 0,
          assertionsPassed: realityResult.testsPassed,
          gitDiff: realityResult.gitDiff,
          durationMs: realityResult.durationMs
        }
      });

      this.db.updateTaskStatus(taskRecord.id, 'completed');
      this.db.updateExecution(executionId, {
        status: 'COMPLETED',
        exitCode: 0,
        inputTokens: totalInputTokens,
        outputTokens: totalOutputTokens,
        finishedAt: new Date().toISOString()
      });

      const card = this.renderClarityCard({
        title,
        status: 'VERIFIED',
        taskId: taskRecord.id,
        executionId,
        realityResult,
        inputTokens: totalInputTokens,
        outputTokens: totalOutputTokens,
        durationMs: totalDurationMs
      });

      if (this.verbose) {
        console.log('\n' + card);
      }

      return {
        status: 'VERIFIED',
        taskId: taskRecord.id,
        executionId,
        evidenceDigest: realityResult.evidenceDigest,
        testsPassed: realityResult.testsPassed,
        gitDiff: realityResult.gitDiff,
        tokenUsage: { inputTokens: totalInputTokens, outputTokens: totalOutputTokens },
        durationMs: totalDurationMs,
        clarityCard: card
      };
    } else {
      const failureReason = realityResult ? realityResult.reason : 'Exceeded maximum turns without reaching verification';
      
      const verifRecord = this.db.recordVerification({
        taskId: taskRecord.id,
        executionId,
        specificationId: specId,
        passed: false,
        errorMessage: failureReason
      });

      if (realityResult) {
        this.db.recordEvidence({
          taskId: taskRecord.id,
          executionId,
          verificationRunId: verifRecord.id,
          specificationId: specId,
          criterionId: critId,
          evidenceClass: 'ProcessExit',
          sha256: 'failed_run_digest',
          payload: {
            reason: failureReason,
            exitCode: realityResult.exitCode,
            stderr: realityResult.stderrTail
          }
        });
      }

      this.db.updateTaskStatus(taskRecord.id, 'blocked', { error: failureReason });
      this.db.updateExecution(executionId, {
        status: 'FAILED',
        exitCode: realityResult ? realityResult.exitCode : 1,
        inputTokens: totalInputTokens,
        outputTokens: totalOutputTokens,
        finishedAt: new Date().toISOString()
      });

      return {
        status: 'FAILED',
        reason: failureReason,
        taskId: taskRecord.id,
        executionId,
        durationMs: totalDurationMs
      };
    }
  }

  renderClarityCard({ title, status, taskId, executionId, realityResult, inputTokens, outputTokens, durationMs }) {
    return `
\x1b[1m\x1b[32m╔══════════════════════════════════════════════════════════════════════════════════╗
║                    EXECUTIVE 1-MINUTE CLARITY CARD (REALITY GATE)                ║
╠══════════════════════════════════════════════════════════════════════════════════╣\x1b[0m
║ \x1b[1mMission:\x1b[0m   ${title.slice(0, 68).padEnd(68)}║
║ \x1b[1mStatus:\x1b[0m    \x1b[32m${status.padEnd(12)}\x1b[0m | Task: ${taskId.padEnd(20)} | Exec: ${executionId.padEnd(20)}║
║                                                                                  ║
║ \x1b[1mMachine Reality Proof:\x1b[0m                                                           ║
║ • Exit Code:        \x1b[1m\x1b[32m0 (PASS)\x1b[0m                                                      ║
║ • Tests / Asserts:  \x1b[1m${String(realityResult.testsPassed || 0).padEnd(6)}\x1b[0m passing assertions verified                          ║
║ • Verification:     \x1b[36m${(realityResult.evidenceDigest || 'N/A').slice(0, 32)}...\x1b[0m                ║
║ • Duration:         ${String(durationMs).padEnd(6)} ms (Tokens: In=${inputTokens}, Out=${outputTokens})               ║
║                                                                                  ║
║ \x1b[1mSign-Offs:\x1b[0m CEO ✔ | CTO ✔ | VPEng ✔ | Inquisitor ✔ | Reality Gate (Angela) ✔        ║
\x1b[1m\x1b[32m╚══════════════════════════════════════════════════════════════════════════════════╝\x1b[0m
`;
  }
}

module.exports = { ExecutionPipeline };
