'use strict';

/**
 * @file src/providers/base.js
 * @description Abstract base model provider for The Boring Company OS.
 * Enforces unified contract, token tracking, timeouts, and error classification.
 */

class BaseModelProvider {
  constructor(options = {}) {
    this.name = options.name || 'base';
    this.model = options.model || 'default';
    this.timeoutMs = options.timeoutMs || 60000;
  }

  /**
   * Invokes the model with prompt, system instructions, and available tool declarations.
   * @param {Object} params
   * @param {string} params.systemPrompt
   * @param {Array<Object>} params.messages - [{ role: 'user'|'assistant', content: string }]
   * @param {Array<Object>} [params.tools] - Tool definitions
   * @param {Object} [params.options]
   * @returns {Promise<{ content: string, toolCalls: Array<Object>, usage: { inputTokens: number, outputTokens: number, totalTokens: number }, durationMs: number }>}
   */
  async generate(params) {
    throw new Error(`generate() not implemented for provider: ${this.name}`);
  }

  /**
   * Validates provider credentials and configuration.
   * @returns {{ valid: boolean, reason?: string, setupInstructions?: string }}
   */
  validateConfig() {
    return { valid: true };
  }
}

module.exports = { BaseModelProvider };
