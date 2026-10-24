'use strict';

const { BaseModelProvider } = require('./base');

class GeminiProvider extends BaseModelProvider {
  constructor(options = {}) {
    super({
      name: 'gemini',
      model: options.model || process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      timeoutMs: options.timeoutMs || 90000
    });
    this.apiKey = options.apiKey || process.env.GEMINI_API_KEY;
    this.baseUrl = options.baseUrl || 'https://generativelanguage.googleapis.com/v1beta';
  }

  validateConfig() {
    if (!this.apiKey) {
      return {
        valid: false,
        reason: 'Missing GEMINI_API_KEY environment variable',
        setupInstructions: 'Set GEMINI_API_KEY in your environment: export GEMINI_API_KEY="AIzaSy..." or provide via config.'
      };
    }
    return { valid: true };
  }

  async generate(params) {
    const configCheck = this.validateConfig();
    if (!configCheck.valid) {
      throw new Error(`[GeminiProvider] Configuration Error: ${configCheck.reason}\n${configCheck.setupInstructions}`);
    }

    const t0 = Date.now();
    const contents = (params.messages || []).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: typeof m.content === 'string' ? m.content : JSON.stringify(m.content) }]
    }));

    const body = {
      contents
    };

    if (params.systemPrompt) {
      body.systemInstruction = {
        parts: [{ text: params.systemPrompt }]
      };
    }

    if (params.tools && params.tools.length > 0) {
      body.tools = [{
        functionDeclarations: params.tools.map(t => ({
          name: t.name,
          description: t.description,
          parameters: t.parameters || t.inputSchema || { type: 'object', properties: {} }
        }))
      }];
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    const url = `${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Gemini API HTTP ${res.status}: ${errText}`);
      }

      const json = await res.json();
      const durationMs = Date.now() - t0;
      const candidate = json.candidates?.[0]?.content?.parts || [];

      let content = '';
      const toolCalls = [];

      for (const part of candidate) {
        if (part.text) {
          content += part.text;
        } else if (part.functionCall) {
          toolCalls.push({
            id: `call_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            name: part.functionCall.name,
            arguments: part.functionCall.args || {}
          });
        }
      }

      const usageMetadata = json.usageMetadata || {};
      const usage = {
        inputTokens: usageMetadata.promptTokenCount || 0,
        outputTokens: usageMetadata.candidatesTokenCount || 0,
        totalTokens: usageMetadata.totalTokenCount || 0
      };

      return {
        provider: 'gemini',
        model: this.model,
        content,
        toolCalls,
        usage,
        durationMs
      };
    } finally {
      clearTimeout(timer);
    }
  }
}

module.exports = { GeminiProvider };
