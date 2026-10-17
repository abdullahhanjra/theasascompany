'use strict';

const { AnthropicProvider } = require('./anthropic');
const { OpenAIProvider } = require('./openai');
const { GeminiProvider } = require('./gemini');
const { OllamaProvider } = require('./ollama');
const { DeterministicTestProvider } = require('./deterministic-test');

function resolveProvider(options = {}) {
  const providerName = (options.provider || process.env.BORING_PROVIDER || '').toLowerCase();
  const modelName = options.model || process.env.BORING_MODEL;

  if (providerName === 'anthropic' || (!providerName && process.env.ANTHROPIC_API_KEY)) {
    return new AnthropicProvider({ model: modelName });
  }

  if (providerName === 'openai' || (!providerName && process.env.OPENAI_API_KEY)) {
    return new OpenAIProvider({ model: modelName });
  }

  if (providerName === 'gemini' || (!providerName && process.env.GEMINI_API_KEY)) {
    return new GeminiProvider({ model: modelName });
  }

  if (providerName === 'ollama') {
    return new OllamaProvider({ model: modelName, baseUrl: options.baseUrl });
  }

  if (providerName === 'deterministic-test' || providerName === 'test') {
    return new DeterministicTestProvider(options);
  }

  // If explicit provider was requested but missing keys
  if (providerName) {
    throw new Error(
      `[Provider Resolver] Requested provider '${providerName}' is not configured or unsupported.\n` +
      `Ensure corresponding API key is set in environment (e.g. ANTHROPIC_API_KEY, OPENAI_API_KEY, GEMINI_API_KEY) ` +
      `or specify provider 'ollama' or 'test'.`
    );
  }

  // Fallback: No provider keys detected
  return {
    name: 'unconfigured',
    model: 'none',
    validateConfig: () => ({
      valid: false,
      reason: 'No model provider credentials configured in environment',
      setupInstructions:
        'Export ANTHROPIC_API_KEY, OPENAI_API_KEY, or GEMINI_API_KEY, or run with --provider ollama or --provider test.'
    }),
    generate: async () => {
      throw new Error('Cannot invoke unconfigured model provider.');
    }
  };
}

module.exports = {
  resolveProvider,
  getProvider: resolveProvider,
  AnthropicProvider,
  OpenAIProvider,
  GeminiProvider,
  OllamaProvider,
  DeterministicTestProvider
};
