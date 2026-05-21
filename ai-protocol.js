#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const command = args[0];

const COLORS = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

function log(color, msg) {
  console.log(`${COLORS[color]}${msg}${COLORS.reset}`);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function init() {
  log('cyan', '🤖 Initializing AI Protocol in the current directory...');
  
  ensureDir('.ai');
  ensureDir('.ai/templates');
  ensureDir('.ai/docs');
  ensureDir('.ai/docs/api_contracts');
  ensureDir('.ai/prompts');
  
  log('green', '✅ Folders created successfully.');
  log('cyan', 'ℹ️ Note: To fully set up, ensure you copy the templates and .cursorrules from the framework repo.');
}

function check() {
  log('cyan', '🔍 Running AI Protocol Compliance Check...');
  let hasError = false;

  // 1. Check .gitignore
  if (fs.existsSync('.gitignore')) {
    const gitignore = fs.readFileSync('.gitignore', 'utf8');
    if (!gitignore.includes('.env')) {
      log('red', '❌ Security Warning: .env is missing from .gitignore!');
      hasError = true;
    } else {
      log('green', '✅ .gitignore secures .env');
    }
  } else {
    log('yellow', '⚠️ No .gitignore found.');
  }

  // 2. Check STATE.md
  if (fs.existsSync('.ai/STATE.md')) {
    const state = fs.readFileSync('.ai/STATE.md', 'utf8');
    const lines = state.split('\n').length;
    if (lines > 20) {
      log('yellow', `⚠️ STATE.md is getting bloated (${lines} lines). Keep it under 20 lines for token efficiency.`);
      hasError = true;
    } else {
      log('green', `✅ STATE.md size is optimal (${lines} lines).`);
    }
  }

  // 3. Check REFLECTIONS.md
  if (fs.existsSync('.ai/REFLECTIONS.md')) {
    const reflections = fs.readFileSync('.ai/REFLECTIONS.md', 'utf8');
    // Count entries (assuming they start with ### or - **)
    const entries = (reflections.match(/^### |^- \*\*/gm) || []).length;
    if (entries > 15) {
      log('yellow', `⚠️ REFLECTIONS.md has ${entries} entries (Limit: 15). Run 'ai-protocol prune' to archive older entries.`);
      hasError = true;
    } else {
      log('green', `✅ REFLECTIONS.md has ${entries} entries.`);
    }
  }

  if (!hasError) {
    log('green', '🎉 All checks passed! Your AI workspace is optimized.');
  } else {
    log('yellow', '👀 Please review the warnings above to maintain peak AI efficiency.');
  }
}

function prune() {
  log('cyan', '🧹 Pruning REFLECTIONS.md...');
  const refPath = '.ai/REFLECTIONS.md';
  const archPath = '.ai/docs/reflections_archive.md';
  
  if (!fs.existsSync(refPath)) {
    log('yellow', 'No REFLECTIONS.md found.');
    return;
  }

  const content = fs.readFileSync(refPath, 'utf8');
  const sections = content.split(/^(?=### )/m);
  
  // First section is usually header
  const header = sections[0];
  const entries = sections.slice(1);
  
  if (entries.length <= 15) {
    log('green', `✅ Only ${entries.length} entries found. No pruning needed.`);
    return;
  }
  
  const keep = entries.slice(0, 15);
  const archive = entries.slice(15);
  
  fs.writeFileSync(refPath, header + keep.join(''));
  
  ensureDir('.ai/docs');
  if (!fs.existsSync(archPath)) {
    fs.writeFileSync(archPath, '# 🗄️ Reflections Archive\n\n');
  }
  fs.appendFileSync(archPath, archive.join(''));
  
  log('green', `✅ Pruned ${archive.length} entries and moved them to reflections_archive.md.`);
}

function clean() {
  log('cyan', '🧼 Cleaning STATE.md for a new session...');
  ensureDir('.ai/docs/state_history');
  
  if (fs.existsSync('.ai/STATE.md')) {
    const date = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `.ai/docs/state_history/STATE_${date}.md`;
    fs.copyFileSync('.ai/STATE.md', backupPath);
    log('green', `✅ Backed up current STATE.md to ${backupPath}`);
  }

  const templatePath = '.ai/templates/STATE.template.md';
  if (fs.existsSync(templatePath)) {
    fs.copyFileSync(templatePath, '.ai/STATE.md');
    log('green', `✅ Reset STATE.md from template.`);
  } else {
    fs.writeFileSync('.ai/STATE.md', '# 📍 Active State (RAM)\n\n## 🚀 Current Objective\n\n## 📋 Action Plan\n');
    log('yellow', `⚠️ Template not found. Created generic STATE.md.`);
  }
}

function installHook() {
  log('cyan', '🪝 Installing Git pre-commit hook...');
  ensureDir('.git/hooks');
  const hookPath = '.git/hooks/pre-commit';
  const hookContent = `#!/bin/sh
# AI Protocol Pre-commit Hook

echo "🤖 Running AI Protocol Check..."
node ./ai-protocol.js check

if [ $? -ne 0 ]; then
  echo "❌ AI Protocol Check Failed. Please fix the warnings."
  # Uncomment the next line to block commits if check fails
  # exit 1
fi
exit 0
`;
  
  fs.writeFileSync(hookPath, hookContent, { mode: 0o755 });
  log('green', '✅ Pre-commit hook installed successfully! (Currently non-blocking)');
}

function help() {
  log('blue', `🤖 AI Coding Protocol CLI Tool`);
  log('reset', `Usage: ./ai-protocol.sh [command]\n`);
  log('cyan', `Commands:`);
  log('reset', `  init         Initialize folder structure`);
  log('reset', `  check        Run safety and token-efficiency checks`);
  log('reset', `  prune        Archive old reflections`);
  log('reset', `  clean        Backup and reset STATE.md`);
  log('reset', `  install-hook Install git pre-commit hook`);
}

switch (command) {
  case 'init': init(); break;
  case 'check': check(); break;
  case 'prune': prune(); break;
  case 'clean': clean(); break;
  case 'install-hook': installHook(); break;
  default: help(); break;
}
