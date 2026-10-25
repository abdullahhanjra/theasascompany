'use strict';

/**
 * @file src/tools/redact.js
 * @description Secret Redactor & Credential Sanitizer for The Asas Company OS.
 * Strips API keys, authorization bearer tokens, passwords, and private hashes
 * from logs, tool outputs, error traces, and persisted database payloads.
 */

const SECRET_PATTERNS = [
  // Anthropic API keys (sk-ant-...)
  /sk-ant-[a-zA-Z0-9_\-]{15,}/g,
  // OpenAI API keys (sk-..., sk-proj-...)
  /sk-(?:proj-)?[a-zA-Z0-9_\-]{15,}/g,
  // Google Gemini API keys (AIzaSy...)
  /AIzaSy[a-zA-Z0-9_\-]{25,}/g,
  // GitHub tokens (ghp_..., gho_..., ghu_..., ghs_..., ghr_...)
  /gh[pousr]_[a-zA-Z0-9]{30,}/g,
  // Bearer tokens
  /Bearer\s+[a-zA-Z0-9\-_.~+/]+=*/gi,
  // Key / token / secret assignments: apiKey="...", token: "..."
  /(["']?(?:api[_-]?key|access[_-]?token|secret|password|auth[_-]?token)["']?\s*[:=]\s*["'])([^"']{6,})(["'])/gi
];

function redactSecrets(input) {
  if (!input) return input;
  let isObject = false;
  let text = '';

  if (typeof input === 'object') {
    isObject = true;
    text = JSON.stringify(input);
  } else {
    text = String(input);
  }

  for (const pattern of SECRET_PATTERNS) {
    text = text.replace(pattern, (match, prefix, secretVal, suffix) => {
      // If matched the 3-group assignment regex (prefix, secretVal, suffix)
      if (prefix && secretVal && suffix) {
        return `${prefix}[REDACTED_SECRET]${suffix}`;
      }
      if (match.toLowerCase().startsWith('bearer ')) {
        return 'Bearer [REDACTED_TOKEN]';
      }
      return '[REDACTED_SECRET]';
    });
  }

  if (isObject) {
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }
  return text;
}

module.exports = { redactSecrets };
