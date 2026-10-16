'use strict';

/**
 * @file memory/indexer.js
 * @description Context-Optimized Memory Indexer for The Boring Company OS.
 * Parses institutional memory files (anti-patterns, learnings, guides) into
 * discrete, bite-sized knowledge cards (under 50 lines each) to prevent
 * LLM context window exhaustion. Emits memory/index.json.
 */

const fs = require('fs');
const path = require('path');

const MEMORY_DIR = __dirname;
const INDEX_FILE = path.join(MEMORY_DIR, 'index.json');

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'with', 'that', 'this', 'from', 'have', 'were', 'which',
  'then', 'also', 'will', 'when', 'into', 'only', 'than', 'more', 'must', 'each',
  'what', 'happened', 'result', 'never', 'again', 'observed', 'symptom'
]);

function extractTags(text) {
  const words = text.toLowerCase().match(/[a-z0-9_-]{3,}/g) || [];
  const freq = {};
  for (const w of words) {
    if (!STOP_WORDS.has(w)) {
      freq[w] = (freq[w] || 0) + 1;
    }
  }
  return Object.keys(freq).sort((a, b) => freq[b] - freq[a]).slice(0, 10);
}

function parseAntiPatterns(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  // Match either ### [AP-..., ### AP-..., or ## AP-...
  const sections = content.split(/\n(?=#{2,3}\s+(?:\[)?AP-)/);
  const cards = [];

  for (const section of sections) {
    const trimmed = section.trim();
    const lines = trimmed.split('\n');
    if (!lines[0]) continue;

    const headerMatch = lines[0].match(/#{2,3}\s+(?:\[)?(AP-[0-9A-Za-z-]+)(?:\])?[:\s]*(.*)/i);
    if (!headerMatch) continue;

    const id = headerMatch[1].toUpperCase();
    const title = (headerMatch[2] || id).trim();
    const body = lines.slice(1).join('\n').trim();

    const tags = new Set([...extractTags(title), ...extractTags(body).slice(0, 6), 'anti-pattern']);

    // Contextual topic categorizations
    if (/sqlite|sql|db|table|transaction|wal/i.test(trimmed)) tags.add('sqlite');
    if (/windows|cmd|batch|\.bat|powershell/i.test(trimmed)) tags.add('windows');
    if (/test|assert|mock|runner|verification/i.test(trimmed)) tags.add('testing');
    if (/token|budget|throttle|quota/i.test(trimmed)) tags.add('token');
    if (/ipc|mailbox|socket|queue|hook/i.test(trimmed)) tags.add('ipc');
    if (/concurrency|deadlock|race|lock/i.test(trimmed)) tags.add('concurrency');
    if (/auth|jwt|security|secret|cwe/i.test(trimmed)) tags.add('security');
    if (/frontend|css|mobile|viewport|ui|layout|font/i.test(trimmed)) tags.add('frontend');
    if (/api|json|endpoint|server/i.test(trimmed)) tags.add('api');

    cards.push({
      id,
      type: 'anti-pattern',
      title,
      tags: Array.from(tags),
      source: 'memory/anti-patterns.md',
      preview: lines.slice(1, 6).join(' ').replace(/\s+/g, ' ').slice(0, 200) + '...',
      content: trimmed
    });
  }

  return cards;
}

function parseLearnings(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  const sections = content.split(/\n(?=#{2,3}\s+(?:\[)?(?:L-|REC-|LEARNING-|RULE-))/i);
  const cards = [];

  for (const section of sections) {
    const trimmed = section.trim();
    const lines = trimmed.split('\n');
    if (!lines[0]) continue;

    const headerMatch = lines[0].match(/#{2,3}\s+(?:\[)?([A-Za-z0-9_-]+)(?:\])?[:\s]*(.*)/);
    if (!headerMatch) continue;

    const id = headerMatch[1];
    const title = (headerMatch[2] || id).trim();
    const body = lines.slice(1).join('\n').trim();

    const tags = new Set([...extractTags(title), ...extractTags(body).slice(0, 4), 'learning']);
    if (/sqlite|sql|db/i.test(trimmed)) tags.add('sqlite');
    if (/test|gate|verify/i.test(trimmed)) tags.add('testing');
    if (/perf|latency|cache/i.test(trimmed)) tags.add('performance');
    if (/frontend|ui|css|bento/i.test(trimmed)) tags.add('frontend');

    cards.push({
      id,
      type: 'learning',
      title,
      tags: Array.from(tags),
      source: 'memory/learnings.md',
      preview: lines.slice(1, 5).join(' ').replace(/\s+/g, ' ').slice(0, 200) + '...',
      content: trimmed
    });
  }

  return cards;
}

function buildIndex() {
  const startTime = Date.now();
  console.log('[INDEXER] Indexing institutional memory files...');

  const antiPatternCards = parseAntiPatterns(path.join(MEMORY_DIR, 'anti-patterns.md'));
  const learningCards = parseLearnings(path.join(MEMORY_DIR, 'learnings.md'));

  const allCards = [...antiPatternCards, ...learningCards];

  const tagMap = {};
  for (let i = 0; i < allCards.length; i++) {
    const card = allCards[i];
    for (const tag of card.tags) {
      if (!tagMap[tag]) tagMap[tag] = [];
      tagMap[tag].push(i);
    }
  }

  const indexPayload = {
    version: '1.0.0',
    indexedAt: new Date().toISOString(),
    totalCards: allCards.length,
    cardCountByType: {
      antiPatterns: antiPatternCards.length,
      learnings: learningCards.length
    },
    tags: Object.keys(tagMap).sort(),
    tagIndex: tagMap,
    cards: allCards
  };

  fs.writeFileSync(INDEX_FILE, JSON.stringify(indexPayload, null, 2), 'utf8');
  const elapsed = Date.now() - startTime;
  console.log(`[INDEXER] Successfully indexed ${allCards.length} knowledge cards across ${Object.keys(tagMap).length} tags in ${elapsed}ms.`);
  console.log(`[INDEXER] Index saved to: ${INDEX_FILE}`);
  return indexPayload;
}

if (require.main === module) {
  buildIndex();
}

module.exports = { buildIndex, parseAntiPatterns, parseLearnings };
