#!/usr/bin/env node
'use strict';

/**
 * @file memory/search.js
 * @description Fast Sub-10ms CLI & programmatic memory retriever.
 * Queries indexed cards from memory/index.json to return bounded,
 * context-preserving knowledge snippets instead of entire multi-megabyte files.
 */

const fs = require('fs');
const path = require('path');
const { buildIndex } = require('./indexer');

const INDEX_FILE = path.join(__dirname, 'index.json');

function loadIndex() {
  if (!fs.existsSync(INDEX_FILE)) {
    return buildIndex();
  }
  return JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8'));
}

function searchMemory(query, options = {}) {
  const startTime = Date.now();
  const index = loadIndex();
  const limit = options.limit || 3;
  const tagFilter = options.tag ? options.tag.toLowerCase() : null;

  const qTerms = String(query || '').toLowerCase().match(/[a-z0-9_-]{2,}/g) || [];

  const scoredCards = [];

  for (let i = 0; i < index.cards.length; i++) {
    const card = index.cards[i];
    if (tagFilter && !card.tags.includes(tagFilter)) continue;

    let score = 0;
    const cardText = `${card.title} ${card.tags.join(' ')} ${card.preview}`.toLowerCase();

    for (const term of qTerms) {
      if (card.title.toLowerCase().includes(term)) score += 10;
      if (card.tags.includes(term)) score += 5;
      if (cardText.includes(term)) score += 2;
    }

    if (score > 0) {
      scoredCards.push({ card, score });
    }
  }

  scoredCards.sort((a, b) => b.score - a.score);
  const results = scoredCards.slice(0, limit).map(s => s.card);
  const elapsedMs = Date.now() - startTime;

  return {
    query,
    count: results.length,
    elapsedMs,
    results
  };
}

function runCli() {
  const args = process.argv.slice(2);
  let query = '';
  let tag = null;
  let limit = 3;
  let asJson = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--query' || args[i] === '-q') {
      query = args[++i];
    } else if (args[i] === '--tag' || args[i] === '-t') {
      tag = args[++i];
    } else if (args[i] === '--limit' || args[i] === '-n') {
      limit = parseInt(args[++i], 10);
    } else if (args[i] === '--json') {
      asJson = true;
    } else if (!query && !args[i].startsWith('-')) {
      query = args[i];
    }
  }

  if (!query && !tag) {
    console.log(`
Usage:
  node memory/search.js --query "keyword" [--tag <tag>] [--limit 3] [--json]

Examples:
  node memory/search.js "deadlock"
  node memory/search.js --query "intent classifier" --tag testing
`);
    process.exit(1);
  }

  const { count, elapsedMs, results } = searchMemory(query, { tag, limit });

  if (asJson) {
    console.log(JSON.stringify({ query, count, elapsedMs, results }, null, 2));
    return;
  }

  console.log(`\x1b[1m\x1b[32m[MEMORY SEARCH]\x1b[0m Query: "${query}" | Found ${count} card(s) in \x1b[33m${elapsedMs}ms\x1b[0m\n`);

  if (results.length === 0) {
    console.log('No matching institutional memory cards found.');
    return;
  }

  for (let i = 0; i < results.length; i++) {
    const card = results[i];
    console.log(`\x1b[1m\x1b[36m--- [${card.id}] ${card.title} ---\x1b[0m`);
    console.log(`Source: \x1b[90m${card.source}\x1b[0m | Tags: \x1b[35m${card.tags.join(', ')}\x1b[0m`);
    console.log(`\n${card.content}\n`);
  }
}

if (require.main === module) {
  runCli();
}

module.exports = { searchMemory, loadIndex };
