'use strict';

const { BaseModelProvider } = require('./base');

class AnthropicProvider extends BaseModelProvider {
  constructor(options = {}) {
    super({
      name: 'anthropic',
      model: options.model || process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-latest',
      timeoutMs: options.timeoutMs || 90000
    });
    this.apiKey = options.apiKey || process.env.ANTHROPIC_API_KEY;
    this.baseUrl = options.baseUrl || 'https://api.anthropic.com/v1';
  }

  validateConfig() {
    if (!this.apiKey) {
      return {
        valid: false,
        reason: 'Missing ANTHROPIC_API_KEY environment variable',
        setupInstructions: 'Set ANTHROPIC_API_KEY in your environment: export ANTHROPIC_API_KEY="sk-ant-..." or provide via config.'
      };
    }
    return { valid: true };
  }

  async generate(params) {
    const configCheck = this.validateConfig();
    if (!configCheck.valid) {
      throw new Error(`[AnthropicProvider] Configuration Error: ${configCheck.reason}\n${configCheck.setupInstructions}`);
    }

    const t0 = Date.now();
    const system = params.systemPrompt || 'You are an autonomous senior software engineer.';
    const messages = (params.messages || []).map(m => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: typeof m.content === 'string' ? m.content : JSON.stringify(m.content)
    }));

    const body = {
      model: this.model,
      max_tokens: params.maxTokens || 4096,
      system,
      messages
    };

    if (params.tools && params.tools.length > 0) {
      body.tools = params.tools.map(t => ({
        name: t.name,
        description: t.description,
        input_schema: t.parameters || t.inputSchema || { type: 'object', properties: {} }
      }));
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const res = await fetch(`${this.baseUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify(body),
        signal: controller.signal
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Anthropic API HTTP ${res.status}: ${errText}`);
      }

      const json = await res.json();
      const durationMs = Date.now() - t0;

      let textContent = '';
      const toolCalls = [];

      for (const block of json.content || []) {
        if (block.type === 'text') {
          textContent += block.text;
        } else if (block.type === 'tool_use') {
          toolCalls.push({
            id: block.id,
            name: block.name,
            arguments: block.input || {}
          });
        }
      }

      const usage = {
        inputTokens: json.usage?.input_tokens || 0,
        outputTokens: json.usage?.output_tokens || 0,
        totalTokens: (json.usage?.input_tokens || 0) + (json.usage?.output_tokens || 0)
      };

      return {
        provider: 'anthropic',
        model: this.model,
        content: textContent,
        toolCalls,
        usage,
        durationMs
      };
    } finally {
      clearTimeout(timer);
    }
  }
}

module.exports = { AnthropicProvider };
