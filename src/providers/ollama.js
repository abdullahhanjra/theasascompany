'use strict';

const { BaseModelProvider } = require('./base');

class OllamaProvider extends BaseModelProvider {
  constructor(options = {}) {
    super({
      name: 'ollama',
      model: options.model || process.env.OLLAMA_MODEL || 'llama3:latest',
      timeoutMs: options.timeoutMs || 120000
    });
    this.baseUrl = options.baseUrl || process.env.OLLAMA_HOST || 'http://localhost:11434';
  }

  validateConfig() {
    return { valid: true };
  }

  async generate(params) {
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
      messages,
      stream: false
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
      const res = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Ollama API HTTP ${res.status}: ${errText}`);
      }

      const json = await res.json();
      const durationMs = Date.now() - t0;
      const msg = json.message || {};

      const toolCalls = (msg.tool_calls || []).map(tc => ({
        id: `call_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        name: tc.function.name,
        arguments: tc.function.arguments || {}
      }));

      const usage = {
        inputTokens: json.prompt_eval_count || 0,
        outputTokens: json.eval_count || 0,
        totalTokens: (json.prompt_eval_count || 0) + (json.eval_count || 0)
      };

      return {
        provider: 'ollama',
        model: this.model,
        content: msg.content || '',
        toolCalls,
        usage,
        durationMs
      };
    } finally {
      clearTimeout(timer);
    }
  }
}

module.exports = { OllamaProvider };
