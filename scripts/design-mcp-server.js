'use strict';

/**
 * @file design-mcp-server.js
 * @description Native stdio JSON-RPC MCP Server for Advanced Design Systems:
 * - Glassmorphism
 * - Neumorphism & Depth
 * - Microinteractions
 * - Auto-Size Components
 * - Shape Morphing & Squircles
 * - Scroll Animations
 */

const readline = require('node:readline');

const TOOLS = [
  {
    name: 'glassmorphism_generate_spec',
    description: 'Generates multi-layer glass specs with blur levels (sm, md, xl, 3xl), specular borders, and refractive saturation.',
    inputSchema: {
      type: 'object',
      properties: {
        blurLevel: { type: 'string', enum: ['sm', 'md', 'xl', '3xl'], default: 'xl' },
        theme: { type: 'string', enum: ['obsidian-dark', 'crystal-light', 'sapphire-glow'], default: 'obsidian-dark' }
      }
    }
  },
  {
    name: 'neumorphism_generate_surface',
    description: 'Generates soft extruded or debossed tactile surface styles with dual-light 45-degree shadow vectors.',
    inputSchema: {
      type: 'object',
      properties: {
        state: { type: 'string', enum: ['flat', 'extruded', 'pressed', 'concave', 'convex'], default: 'extruded' },
        surfaceColor: { type: 'string', default: '#0D131F' }
      }
    }
  },
  {
    name: 'microinteraction_get_spring_preset',
    description: 'Retrieves calibrated spring physics bezier curves and stiffness/damping ratios for buttons and cards.',
    inputSchema: {
      type: 'object',
      properties: {
        interactionType: { type: 'string', enum: ['button-press', 'magnetic-hover', 'modal-spring', 'toggle-snap'], default: 'button-press' }
      }
    }
  },
  {
    name: 'autosize_generate_container_query',
    description: 'Calculates fluid container query rules (@container) and fluid clamp math for responsive components.',
    inputSchema: {
      type: 'object',
      properties: {
        minWidthPx: { type: 'number', default: 320 },
        maxWidthPx: { type: 'number', default: 1200 }
      }
    }
  },
  {
    name: 'shape_morph_generate_blob',
    description: 'Generates organic liquid blob keyframes and Apple-grade squircle curvature masks.',
    inputSchema: {
      type: 'object',
      properties: {
        shapeType: { type: 'string', enum: ['squircle', 'liquid-blob', 'card-expander'], default: 'squircle' }
      }
    }
  },
  {
    name: 'scroll_animation_get_pipeline',
    description: 'Generates modern CSS animation-timeline: scroll() and view() recipes for scrub reveals and progress bars.',
    inputSchema: {
      type: 'object',
      properties: {
        effectType: { type: 'string', enum: ['progress-bar', 'scrub-reveal', 'pinned-track', 'parallax-layer'], default: 'scrub-reveal' }
      }
    }
  }
];

function handleToolCall(name, args = {}) {
  switch (name) {
    case 'glassmorphism_generate_spec': {
      const blur = args.blurLevel || 'xl';
      const blurs = { sm: '4px', md: '12px', xl: '24px', '3xl': '40px' };
      const opacities = { sm: '0.04', md: '0.07', xl: '0.10', '3xl': '0.14' };
      return {
        css: `background: rgba(15, 23, 42, ${opacities[blur]}); backdrop-filter: blur(${blurs[blur]}) saturate(180%); -webkit-backdrop-filter: blur(${blurs[blur]}) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.08); border-top: 1px solid rgba(255, 255, 255, 0.22); box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);`,
        tailwind: `bg-slate-900/[${opacities[blur]}] backdrop-blur-${blur} backdrop-saturate-180 border border-white/10 border-t-white/25 shadow-2xl shadow-black/50`,
        blurPx: blurs[blur]
      };
    }
    case 'neumorphism_generate_surface': {
      const state = args.state || 'extruded';
      const color = args.surfaceColor || '#0D131F';
      const shadow = state === 'pressed' 
        ? 'inset 6px 6px 14px rgba(0, 0, 0, 0.7), inset -6px -6px 14px rgba(255, 255, 255, 0.04)'
        : '-8px -8px 20px rgba(255, 255, 255, 0.04), 8px 8px 20px rgba(0, 0, 0, 0.6)';
      return {
        surfaceColor: color,
        state,
        boxShadow: shadow,
        css: `background: ${color}; box-shadow: ${shadow}; border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.03);`
      };
    }
    case 'microinteraction_get_spring_preset': {
      const type = args.interactionType || 'button-press';
      const presets = {
        'button-press': { curve: 'cubic-bezier(0.4, 0, 0.2, 1)', scale: '0.97', duration: '120ms' },
        'magnetic-hover': { curve: 'cubic-bezier(0.16, 1, 0.3, 1)', strength: '0.3', duration: '400ms' },
        'modal-spring': { curve: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', duration: '350ms' },
        'toggle-snap': { curve: 'cubic-bezier(0.34, 1.56, 0.64, 1)', duration: '200ms' }
      };
      return presets[type] || presets['button-press'];
    }
    case 'autosize_generate_container_query': {
      const min = args.minWidthPx || 320;
      const max = args.maxWidthPx || 1200;
      return {
        containerDefinition: 'container-type: inline-size; container-name: card;',
        fluidFont: `clamp(1rem, 0.8rem + 1cqi, 1.5rem)`,
        fluidPadding: `clamp(12px, 2cqi + 8px, 32px)`,
        gridAutoFit: `repeat(auto-fit, minmax(clamp(${min}px, 25cqi, ${max}px), 1fr))`
      };
    }
    case 'shape_morph_generate_blob': {
      const shape = args.shapeType || 'squircle';
      if (shape === 'squircle') {
        return {
          css: 'border-radius: 28px; clip-path: inset(0 round 24px);',
          technique: 'Continuous curvature derivative with smooth corners'
        };
      }
      return {
        keyframes: '@keyframes liquidMorph { 0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; } 50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; } 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; } }',
        css: 'animation: liquidMorph 8s ease-in-out infinite alternate; will-change: border-radius; filter: blur(40px);'
      };
    }
    case 'scroll_animation_get_pipeline': {
      const effect = args.effectType || 'scrub-reveal';
      if (effect === 'progress-bar') {
        return {
          css: 'animation: growProgress auto linear; animation-timeline: scroll(root block); transform-origin: left;'
        };
      }
      return {
        css: 'animation: revealCard auto cubic-bezier(0.16, 1, 0.3, 1) both; animation-timeline: view(); animation-range: entry 10% cover 30%;',
        gpuOptimized: true,
        reducedMotionSafe: true
      };
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });

rl.on('line', (line) => {
  if (!line.trim()) return;
  try {
    const req = JSON.parse(line);
    const { id, method, params } = req;

    if (method === 'initialize') {
      const resp = {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: { name: 'design-taste-mcp', version: '1.0.0' }
        }
      };
      process.stdout.write(JSON.stringify(resp) + '\n');
      return;
    }

    if (method === 'notifications/initialized') {
      return;
    }

    if (method === 'tools/list') {
      const resp = {
        jsonrpc: '2.0',
        id,
        result: { tools: TOOLS }
      };
      process.stdout.write(JSON.stringify(resp) + '\n');
      return;
    }

    if (method === 'tools/call') {
      const toolName = params.name;
      const toolArgs = params.arguments || {};
      const resultData = handleToolCall(toolName, toolArgs);
      const resp = {
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            { type: 'text', text: JSON.stringify(resultData, null, 2) }
          ]
        }
      };
      process.stdout.write(JSON.stringify(resp) + '\n');
      return;
    }

    // Default error
    process.stdout.write(JSON.stringify({
      jsonrpc: '2.0',
      id,
      error: { code: -32601, message: `Method not found: ${method}` }
    }) + '\n');
  } catch (err) {
    process.stdout.write(JSON.stringify({
      jsonrpc: '2.0',
      id: null,
      error: { code: -32700, message: err.message }
    }) + '\n');
  }
});
