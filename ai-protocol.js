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

function copyFolderSync(from, to) {
  ensureDir(to);
  fs.readdirSync(from).forEach(element => {
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);
    if (fs.lstatSync(fromPath).isDirectory()) {
      copyFolderSync(fromPath, toPath);
    } else {
      // Safety check: Do not overwrite existing files to protect user's custom docs/prompts
      if (!fs.existsSync(toPath)) {
        fs.copyFileSync(fromPath, toPath);
      }
    }
  });
}

function init() {
  log('cyan', '🤖 Initializing AI Protocol in the current directory...');
  
  const targetDir = process.cwd();
  const sourceDir = __dirname;
  const isSelf = targetDir === sourceDir;
  
  if (isSelf) {
    log('yellow', '⚠️ Warning: Initializing inside the framework directory itself.');
  }

  // 1. Create target directories
  ensureDir(path.join(targetDir, '.ai'));
  ensureDir(path.join(targetDir, '.ai/templates'));
  ensureDir(path.join(targetDir, '.ai/docs'));
  ensureDir(path.join(targetDir, '.ai/docs/api_contracts'));
  ensureDir(path.join(targetDir, '.ai/prompts'));

  // 2. Copy files from framework source to target (if not running on self)
  if (!isSelf) {
    log('cyan', '📦 Copying templates, prompts, and default documentation...');
    try {
      copyFolderSync(path.join(sourceDir, '.ai/templates'), path.join(targetDir, '.ai/templates'));
      copyFolderSync(path.join(sourceDir, '.ai/prompts'), path.join(targetDir, '.ai/prompts'));
      copyFolderSync(path.join(sourceDir, '.ai/docs'), path.join(targetDir, '.ai/docs'));
      
      const cursorrulesSrc = path.join(sourceDir, '.cursorrules');
      if (fs.existsSync(cursorrulesSrc)) {
        fs.copyFileSync(cursorrulesSrc, path.join(targetDir, '.cursorrules'));
        fs.copyFileSync(cursorrulesSrc, path.join(targetDir, '.windsurfrules'));
        fs.copyFileSync(cursorrulesSrc, path.join(targetDir, '.clinerules'));
        fs.copyFileSync(cursorrulesSrc, path.join(targetDir, '.clauderules'));
        fs.copyFileSync(cursorrulesSrc, path.join(targetDir, '.claudecoderc'));
        fs.copyFileSync(cursorrulesSrc, path.join(targetDir, 'SKILL.md'));
        
        ensureDir(path.join(targetDir, '.github'));
        fs.copyFileSync(cursorrulesSrc, path.join(targetDir, '.github/copilot-instructions.md'));
        
        // Copy CLI Scripts to target directory so user can run them locally
        const shSrc = path.join(sourceDir, 'ai-protocol.sh');
        const jsSrc = path.join(sourceDir, 'ai-protocol.js');
        if (fs.existsSync(shSrc) && fs.existsSync(jsSrc)) {
          fs.copyFileSync(shSrc, path.join(targetDir, 'ai-protocol.sh'));
          fs.copyFileSync(jsSrc, path.join(targetDir, 'ai-protocol.js'));
          fs.chmodSync(path.join(targetDir, 'ai-protocol.sh'), 0o755);
        }
        
        log('green', '✅ Created multi-IDE config files (.cursorrules, .windsurfrules, .clinerules, .clauderules, .claudecoderc, SKILL.md, copilot-instructions.md).');
        log('green', '✅ Installed ai-protocol.sh CLI tool in your project.');
      }
      
      log('green', '✅ Copied templates, prompts, and docs successfully.');
    } catch (err) {
      log('red', `❌ Error copying framework files: ${err.message}`);
    }
  }

  // 3. Instantiate active RAM files from templates if they do not exist
  const statePath = path.join(targetDir, '.ai/STATE.md');
  const reflectionsPath = path.join(targetDir, '.ai/REFLECTIONS.md');
  const decisionsPath = path.join(targetDir, '.ai/DECISIONS.md');

  const stateTemplate = path.join(targetDir, '.ai/templates/STATE.template.md');
  const reflectionsTemplate = path.join(targetDir, '.ai/templates/REFLECTIONS.template.md');
  const decisionsTemplate = path.join(targetDir, '.ai/templates/DECISIONS.template.md');

  if (!fs.existsSync(statePath) && fs.existsSync(stateTemplate)) {
    fs.copyFileSync(stateTemplate, statePath);
    log('green', '✅ Instantiated .ai/STATE.md from template.');
  }
  if (!fs.existsSync(reflectionsPath) && fs.existsSync(reflectionsTemplate)) {
    fs.copyFileSync(reflectionsTemplate, reflectionsPath);
    log('green', '✅ Instantiated .ai/REFLECTIONS.md from template.');
  }
  if (!fs.existsSync(decisionsPath) && fs.existsSync(decisionsTemplate)) {
    fs.copyFileSync(decisionsTemplate, decisionsPath);
    log('green', '✅ Instantiated .ai/DECISIONS.md from template.');
  }

  log('green', '🎉 AI Protocol initialization complete!');
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
./ai-protocol.sh check

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

function handoff() {
  log('cyan', '🤝 Generating AI Handoff Prompt...');

  let stateContent = '*(No active state found)*';
  if (fs.existsSync('.ai/STATE.md')) {
    stateContent = fs.readFileSync('.ai/STATE.md', 'utf8').trim();
  }

  let recentReflections = '*(No recent reflections logged)*';
  if (fs.existsSync('.ai/REFLECTIONS.md')) {
    const reflections = fs.readFileSync('.ai/REFLECTIONS.md', 'utf8');
    const sections = reflections.split(/^(?=### )/m);
    const entries = sections.slice(1);
    if (entries.length > 0) {
      recentReflections = entries.slice(0, 5).join('').trim();
    }
  }

  let gitStatus = '*(No changes)*';
  try {
    gitStatus = execSync('git status -s', { encoding: 'utf8' }).trim();
  } catch (err) {
    gitStatus = '*(Git not initialized or not found)*';
  }

  const dateStr = new Date().toLocaleString();

  const handoffPrompt = `# 📌 Project Context & Handover (Generated: ${dateStr})

We are transferring active context for the repository. Please read the current RAM state, recent bug reflections, and modified files to understand the precise workspace state.

## 1. Current Active State (RAM)
\`\`\`markdown
${stateContent}
\`\`\`

## 2. Recent Bug Reflections (Past Mistakes to Avoid)
\`\`\`markdown
${recentReflections}
\`\`\`

## 3. Uncommitted Changes (Git Status)
\`\`\`text
${gitStatus || 'No uncommitted changes.'}
\`\`\`

---
**Your Instructions Now:**
1. Acknowledge that you fully understand the active objectives and state.
2. Formulate your progressive complexity action plan for the next steps.
3. Output \`[WAITING_FOR_USER]\` and wait for my instruction before writing any code.
`;

  console.log('\n----------------- COPY THE TEXT BELOW -----------------');
  console.log(handoffPrompt);
  console.log('-------------------------------------------------------\n');
  log('green', '✅ Handoff prompt generated successfully! Copy the markdown above into your new AI session.');
}

function help() {
  log('blue', `🤖 AI Coding Protocol CLI Tool`);
  log('reset', `Usage: ./ai-protocol.sh [command]\n`);
  log('cyan', `Commands:`);
  log('reset', `  init         Initialize folder structure and copy templates`);
  log('reset', `  check        Run safety and token-efficiency checks`);
  log('reset', `  prune        Archive old reflections`);
  log('reset', `  clean        Backup and reset STATE.md`);
  log('reset', `  handoff      Generate a session handover prompt`);
  log('reset', `  install-hook Install git pre-commit hook`);
}

switch (command) {
  case 'init': init(); break;
  case 'check': check(); break;
  case 'prune': prune(); break;
  case 'clean': clean(); break;
  case 'handoff': handoff(); break;
  case 'install-hook': installHook(); break;
  default: help(); break;
}
