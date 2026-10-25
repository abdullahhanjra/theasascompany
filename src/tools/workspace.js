'use strict';

/**
 * @file src/tools/workspace.js
 * @description Controlled Workspace & Subprocess Execution Layer for The Asas Company OS.
 * Restricts all file system and command operations to an authorized workspace root.
 * Captures real diffs, exit codes, execution times, and prevents directory traversal attacks.
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

/**
 * High-Security Dangerous Command Guardrail.
 * Blocks destructive system commands, disk formats, root removals,
 * registry tampering, and unverified pipe-to-shell download scripts.
 */
const DANGEROUS_COMMAND_PATTERNS = [
  // Root or high-level recursive deletions
  /\brm\s+-[a-zA-Z]*[rf][a-zA-Z]*\s+(\/|~|\.\.|\*|[a-zA-Z]:\\)/i,
  /\brmdir\s+.*\/s.*\/q.*([a-zA-Z]:\\|\/|\\\*)/i,
  /\bdel\s+.*\/[fs]\s+.*([a-zA-Z]:\\|\/|\\\*)/i,
  // Disk formatting and partitioning
  /\bformat\s+[a-zA-Z]:/i,
  /\b(mkfs|fdisk|diskpart)\b/i,
  // System shutdown & reboot
  /\b(shutdown|reboot)\b/i,
  /\binit\s+0\b/i,
  // System registry & boot configuration manipulation
  /\breg\s+(delete|add)\b/i,
  /\bbcdedit\b/i,
  // Unverified remote execution pipelines
  /(curl|wget)\s+.*\|\s*(bash|sh|cmd|powershell)/i,
  /Invoke-Expression\s+.*Net\.WebClient/i,
  /\biex\s+.*\(New-Object/i
];

function isDangerousCommand(command) {
  if (!command || typeof command !== 'string') return false;
  return DANGEROUS_COMMAND_PATTERNS.some(pattern => pattern.test(command));
}

class ControlledWorkspace {
  constructor(rootDir, options = {}) {
    if (!rootDir) {
      throw new Error('ControlledWorkspace requires an explicit rootDir parameter.');
    }
    this.rootDir = path.resolve(rootDir);
    if (!fs.existsSync(this.rootDir)) {
      throw new Error(`Target workspace directory does not exist: ${this.rootDir}`);
    }
    this.timeoutDefaultMs = options.timeoutMs || 30000;
    this.maxOutputBytes = options.maxOutputBytes || 1024 * 1024; // 1MB buffer cap
    this.auditLog = [];
  }

  /**
   * Resolves and secures a relative path within the workspace root.
   * Throws an error if path traversal outside the root is attempted.
   */
  resolveSafePath(relPath) {
    if (!relPath || typeof relPath !== 'string') {
      throw new Error(`Invalid relative path: ${relPath}`);
    }
    const resolved = path.resolve(this.rootDir, relPath);
    const rel = path.relative(this.rootDir, resolved);

    if (rel.startsWith('..') || path.isAbsolute(rel)) {
      throw new Error(`Security Violation: Path traversal outside workspace root rejected: ${relPath}`);
    }
    return resolved;
  }

  /**
   * Reads a file within the workspace root.
   */
  readFile(relPath) {
    const fullPath = this.resolveSafePath(relPath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`File not found: ${relPath}`);
    }
    const content = fs.readFileSync(fullPath, 'utf8');
    this.auditLog.push({ action: 'readFile', path: relPath, size: content.length, timestamp: new Date().toISOString() });
    return content;
  }

  /**
   * Writes a file within the workspace root. Creates parent directories automatically.
   */
  writeFile(relPath, content) {
    const fullPath = this.resolveSafePath(relPath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fullPath, content, 'utf8');
    this.auditLog.push({ action: 'writeFile', path: relPath, size: content.length, timestamp: new Date().toISOString() });
    return { path: relPath, bytesWritten: Buffer.byteLength(content, 'utf8') };
  }

  /**
   * Lists files within the workspace root.
   */
  listFiles(relDir = '.', recursive = false) {
    if (typeof recursive === 'object' && recursive !== null) {
      recursive = Boolean(recursive.recursive);
    }
    const fullDir = this.resolveSafePath(relDir);
    if (!fs.existsSync(fullDir)) {
      throw new Error(`Directory not found: ${relDir}`);
    }

    const results = [];
    const walk = (d, r) => {
      const items = fs.readdirSync(d, { withFileTypes: true });
      for (const it of items) {
        if (it.name === '.git' || it.name === 'node_modules') continue;
        const subRel = path.join(r, it.name);
        const subFull = path.join(d, it.name);
        if (it.isDirectory()) {
          results.push({ name: it.name, path: subRel, type: 'directory' });
          if (recursive) walk(subFull, subRel);
        } else {
          results.push({ name: it.name, path: subRel, type: 'file' });
        }
      }
    };

    walk(fullDir, relDir === '.' ? '' : relDir);
    return results;
  }

  /**
   * Searches for a string query in workspace files.
   */
  searchFiles(query, relDir = '.') {
    const files = this.listFiles(relDir, true).filter(f => f.type === 'file');
    const matches = [];

    for (const f of files) {
      try {
        const content = this.readFile(f.path);
        if (content.includes(query)) {
          const lines = content.split('\n');
          const matchingLines = [];
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(query)) {
              matchingLines.push({ lineNumber: i + 1, text: lines[i].trim() });
            }
          }
          matches.push({ path: f.path, occurrences: matchingLines.length, matches: matchingLines.slice(0, 10) });
        }
      } catch (_) {}
    }
    return matches;
  }

  /**
   * Executes a command within the workspace root with controlled environment and timeout.
   * Supports runCommand(command, argsArray, options) or runCommand(command, options)
   */
  async runCommand(command, args = [], options = {}) {
    if (!fs.existsSync(this.rootDir)) {
      throw new Error(`Workspace root does not exist: ${this.rootDir}`);
    }
    if (args && !Array.isArray(args) && typeof args === 'object') {
      options = args;
      args = [];
    }
    if (!Array.isArray(args)) {
      args = [];
    }

    const t0 = Date.now();
    const timeoutMs = options.timeoutMs || this.timeoutDefaultMs;

    return new Promise((resolve) => {
      const fullCmd = args.length > 0 ? `${command} ${args.join(' ')}` : command;

      // Intercept and block dangerous / destructive commands
      if (isDangerousCommand(fullCmd)) {
        const errorMsg = `Security Violation: Dangerous command blocked by system safety guardrail: "${fullCmd}"`;
        const result = {
          command: fullCmd,
          exitCode: 126,
          stdout: '',
          stderr: errorMsg,
          durationMs: 0,
          blocked: true
        };
        this.auditLog.push({ action: 'runCommandBlocked', ...result, timestamp: new Date().toISOString() });
        return resolve(result);
      }

      const child = spawn(fullCmd, [], {
        cwd: this.rootDir,
        shell: true,
        env: {
          ...process.env,
          ...options.env,
          WORKSPACE_ROOT: this.rootDir
        }
      });

      let stdout = '';
      let stderr = '';
      let killed = false;

      const timer = setTimeout(() => {
        killed = true;
        child.kill('SIGTERM');
      }, timeoutMs);

      child.stdout.on('data', (chunk) => {
        if (stdout.length < this.maxOutputBytes) {
          stdout += chunk.toString();
        }
      });

      child.stderr.on('data', (chunk) => {
        if (stderr.length < this.maxOutputBytes) {
          stderr += chunk.toString();
        }
      });

      child.on('close', (code) => {
        clearTimeout(timer);
        const durationMs = Date.now() - t0;
        const result = {
          command: fullCmd,
          exitCode: killed ? 124 : (code ?? 1),
          stdout,
          stderr,
          durationMs,
          timedOut: killed
        };
        this.auditLog.push({ action: 'runCommand', ...result, timestamp: new Date().toISOString() });
        resolve(result);
      });

      child.on('error', (err) => {
        clearTimeout(timer);
        const durationMs = Date.now() - t0;
        const result = {
          command: fullCmd,
          exitCode: 1,
          stdout,
          stderr: err.message,
          durationMs,
          error: err.message
        };
        this.auditLog.push({ action: 'runCommandError', ...result, timestamp: new Date().toISOString() });
        resolve(result);
      });
    });
  }

  /**
   * Returns current Git working-tree status and diff in target repo.
   */
  async getGitDiff() {
    try {
      const status = await this.runCommand('git status --porcelain');
      const diff = await this.runCommand('git diff');
      const diffStat = await this.runCommand('git diff --stat');

      return {
        hasChanges: (status.stdout || '').trim().length > 0,
        statusOutput: (status.stdout || '').trim(),
        diff: diff.stdout || '',
        diffStat: (diffStat.stdout || '').trim()
      };
    } catch {
      return {
        hasChanges: false,
        statusOutput: '',
        diff: '',
        diffStat: ''
      };
    }
  }

  /**
   * Returns list of authorized tool declarations formatted for model schemas.
   */
  getToolDeclarations() {
    return [
      {
        name: 'readFile',
        description: 'Read contents of a file within the workspace root.',
        parameters: {
          type: 'object',
          required: ['path'],
          properties: {
            path: { type: 'string', description: 'Relative file path' }
          }
        }
      },
      {
        name: 'writeFile',
        description: 'Write or replace content in a file within the workspace root.',
        parameters: {
          type: 'object',
          required: ['path', 'content'],
          properties: {
            path: { type: 'string', description: 'Relative file path' },
            content: { type: 'string', description: 'Full file content to write' }
          }
        }
      },
      {
        name: 'listFiles',
        description: 'List files and directories in the workspace.',
        parameters: {
          type: 'object',
          properties: {
            dir: { type: 'string', description: 'Relative directory path (default: .)' },
            recursive: { type: 'boolean', description: 'Whether to list recursively' }
          }
        }
      },
      {
        name: 'searchFiles',
        description: 'Search for text query occurrences across workspace files.',
        parameters: {
          type: 'object',
          required: ['query'],
          properties: {
            query: { type: 'string', description: 'Text to search for' },
            dir: { type: 'string', description: 'Relative directory path to search within' }
          }
        }
      },
      {
        name: 'runCommand',
        description: 'Execute a build, test, or verification command inside the workspace.',
        parameters: {
          type: 'object',
          required: ['command'],
          properties: {
            command: { type: 'string', description: 'Command line to execute' }
          }
        }
      }
    ];
  }

  /**
   * Dispatches a tool call by name and args.
   */
  async executeToolCall(name, args = {}) {
    switch (name) {
      case 'readFile':
        return { content: this.readFile(args.path) };
      case 'writeFile':
        return this.writeFile(args.path, args.content);
      case 'listFiles':
        return { files: this.listFiles(args.dir || '.', args.recursive || false) };
      case 'searchFiles':
        return { matches: this.searchFiles(args.query, args.dir || '.') };
      case 'runCommand':
        return await this.runCommand(args.command);
      default:
        throw new Error(`Unknown tool requested: ${name}`);
    }
  }

  /**
   * Resets the workspace working tree using Git, safely preserving agent coordination metadata.
   */
  async rollback(db = null) {
    if (!fs.existsSync(this.rootDir)) {
      throw new Error(`Workspace root does not exist: ${this.rootDir}`);
    }
    const checkoutResult = await this.runCommand('git checkout -- .');
    const cleanResult = await this.runCommand('git clean -fd -e .agents/teamwork/ -e .agents/scratch/');

    if (db && db.db && typeof db.db.exec === 'function') {
      try {
        db.db.exec('ROLLBACK;');
      } catch {}
    }

    return {
      success: checkoutResult.exitCode === 0 && cleanResult.exitCode === 0,
      checkoutResult,
      cleanResult
    };
  }
}

module.exports = { ControlledWorkspace, isDangerousCommand };
