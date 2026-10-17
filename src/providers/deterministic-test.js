'use strict';

const { BaseModelProvider } = require('./base');

/**
 * Deterministic model provider for automated test suites and hermetic verification.
 * Enables testing the full agent loop (tool calls, multi-turn reasoning, diff creation)
 * without external network or API key requirements.
 */
class DeterministicTestProvider extends BaseModelProvider {
  constructor(options = {}) {
    super({
      name: 'deterministic-test',
      model: options.model || 'test-mock-model',
      timeoutMs: options.timeoutMs || 5000
    });
    this.scriptedResponses = options.responses || [];
    this.callCount = 0;
  }

  setResponses(responses) {
    this.scriptedResponses = responses;
    this.callCount = 0;
  }

  validateConfig() {
    return { valid: true };
  }

  async generate(params) {
    const current = this.scriptedResponses[this.callCount] || {
      content: 'Task completed successfully after inspecting code and applying fixes.',
      toolCalls: []
    };
    this.callCount++;

    return {
      provider: 'deterministic-test',
      model: this.model,
      content: current.content || '',
      toolCalls: current.toolCalls || [],
      usage: {
        inputTokens: 120,
        outputTokens: 45,
        totalTokens: 165
      },
      durationMs: 15
    };
  }
}

module.exports = { DeterministicTestProvider };
