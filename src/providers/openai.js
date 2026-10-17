'use strict';

const { BaseModelProvider } = require('./base');

class OpenAIProvider extends BaseModelProvider {
  constructor(options = {}) {
    super({
      name: 'openai',
      model: options.model || process.env.OPENAI_MODEL || 'gpt-4o',
      timeoutMs: options.timeoutMs || 90000
    });
    this.apiKey = options.apiKey || process.env.OPENAI_API_KEY;
    this.baseUrl = options.baseUrl || 'https://api.openai.com/v1';
  }

  validateConfig() {
    if (!this.apiKey) {
      return {
        valid: false,
        reason: 'Missing OPENAI_API_KEY environment variable',
        setupInstructions: 'Set OPENAI_API_KEY in your environment: export OPENAI_API_KEY="sk-..." or provide via config.'
      };
    }
    return { valid: true };
  }

  async generate(params) {
    const configCheck = this.validateConfig();
    if (!configCheck.valid) {
      throw new Error(`[OpenAIProvider] Configuration Error: ${configCheck.reason}\n${configCheck.setupInstructions}`);
    }

    const t0 = Date.now();
    const messages = [];

    if (params.systemPrompt) {
      messages.push({ role: 'system', content: params.systemPrompt });
    }

    for (const m of params.messages || []) {
      messages.push({
        role: m.role,
        content: typeof m.content === 'string' ? m.content : JSON.stringify(m.content)
      });
    }

    const body = {
      model: this.model,
      messages
    };

    if (params.tools && params.tools.length > 0) {
      body.tools = params.tools.map(t => ({
        type: 'function',
        function: {
          name: t.name,
          description: t.description,
          parameters: t.parameters || t.inputSchema || { type: 'object', properties: {} }
        }
      }));
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const res = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(body),
        signal: controller.signal
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`OpenAI API HTTP ${res.status}: ${errText}`);
      }

      const json = await res.json();
      const durationMs = Date.now() - t0;
      const choice = json.choices?.[0]?.message || {};

      const toolCalls = (choice.tool_calls || []).map(tc => {
        let args = {};
        try { args = JSON.parse(tc.function.arguments || '{}'); } catch (_) {}
        return {
          id: tc.id,
          name: tc.function.name,
          arguments: args
        };
      });

      const usage = {
        inputTokens: json.usage?.prompt_tokens || 0,
        outputTokens: json.usage?.completion_tokens || 0,
        totalTokens: json.usage?.total_tokens || 0
      };

      return {
        provider: 'openai',
        model: this.model,
        content: choice.content || '',
        toolCalls,
        usage,
        durationMs
      };
    } finally {
      clearTimeout(timer);
    }
  }
}

module.exports = { OpenAIProvider };
