# 🤖 Agentic Workflow Framework

A strict, memory-persistent, and token-efficient framework for developing software alongside AI Coding Agents (Cursor, Windsurf, Cline, Antigravity, Claude, etc.).

[อ่านภาษาไทย](README.th.md)

This protocol combines cutting-edge AI development concepts like **Superpowers**, **Karpathy's LLM Wiki**, **Reflexion**, and strict execution guardrails to eliminate context bloat, hallucination, over-execution, and UI inconsistency.

📖 **[Read the Detailed User Manual](USER_MANUAL.md)**

---

## 🌟 Why Use This Framework? (The Pain Points it Solves)

If you've spent hours coding with AI tools in your IDE, you've likely encountered these common pain points:
- ⚠️ **Context Bloat:** The AI chat gets too long, slows down, and becomes expensive.
- ⚠️ **Agent Amnesia:** When you start a new chat, the AI forgets the project's rules, architecture, and previous bug fixes.
- ⚠️ **UI Inconsistency:** The AI generates random colors or layouts instead of following your design system.

**AI Coding Protocol** solves this by acting as an **Active Governance Framework** directly inside your IDE (Cursor, Windsurf, Cline). 

It provides:
- ✅ **Active Memory Management (`STATE.md`):** Keeps track of the current task and past learnings across chat sessions.
- ✅ **One-Click Handoffs:** A CLI tool to easily pack up the context of an old chat and hand it over to a fresh, clean session.
- ✅ **Safety Guardrails:** Pre-commit hooks to prevent accidental `.env` leaks and keep your memory files optimized.
- ✅ **Auto-Updating CLI:** A built-in script (`ai-protocol.sh`) that manages your workflow and keeps the protocol up to date.
- ✅ **Deep Research Hub (New!):** Automatically installs NotebookLM MCP to allow agents to upload and query massive documents without context bloat (`./ai-protocol.sh install-mcp`).

---

## 📚 Deep Research Hub (NotebookLM)

Stop pasting massive documents into the IDE and breaking the chat context! 
This framework includes built-in **NotebookLM MCP** support (`./ai-protocol.sh install-mcp`).

The AI uploads heavy documents into Google NotebookLM and queries it directly, extracting only what it needs to write code.

**Key Advantages:**
- **Token Savings:** Stop paying to re-read massive documents.
- **Context Preservation:** Keeps the IDE chat fast and focused.
- **High Accuracy:** Uses Google's dedicated RAG engine instead of raw IDE context.
- **Project-Local Accounts:** The MCP server is patched to store credentials locally (`.ai/mcp/auth/auth.json`), allowing you to use **different Google accounts for different projects** without conflict.

---

## 🛡️ Enterprise-Grade Security & Safety

Running automated AI agents directly on your machine requires strict guardrails. This protocol is hardened against common and advanced AI execution vulnerabilities:
- **Cryptographically Secure Atomic Writes:** Temp files are generated with `crypto.randomBytes(16)` and written with strict OS-level exclusive locks (`wx` and `COPYFILE_EXCL`). This completely neutralizes Race Conditions and prevents malicious agents or scripts from performing Symlink Hijacking attacks.
- **Network & DoS Resilience:** Downloads enforce strict 5-second connection timeouts, preventing the AI from hanging the system indefinitely via malicious or stuck server connections.
- **Deep Git Security Audits:** Pre-commit hooks run recursive checks (`**/.env*`) down to the deepest directory levels, ensuring no secrets are ever committed, even if manually staged.

---

## 📁 1. The Second Brain (.ai/ Directory)

We separate the AI's memory into **RAM** (short, concise, read every session) and **Hard Drive** (read only when needed):

```text
/ (Root Project)
├── .ai/
│   ├── STATE.md                    # [RAM] Current active task & next steps (Max 20 lines)
│   ├── REFLECTIONS.md              # [Reflexion] Lessons learned & bug fixes (Max 15 entries)
│   ├── DECISIONS.md                # [ADR] Architecture Decision Records
│   ├── templates/                  # Blank templates for new projects
│   │   ├── STATE.template.md
│   │   ├── REFLECTIONS.template.md
│   │   ├── DECISIONS.template.md
│   │   └── ui/                     # Swappable UI Design System themes
│   │       ├── futuristic.md       # Space-Dark + Glassmorphism (Default)
│   │       ├── minimal.md          # Clean & Flat (shadcn/ui style)
│   │       ├── vibrant.md          # Colorful & Playful (HeroUI style)
│   │       └── data_heavy.md       # Data Dashboard (Tremor style)
│   ├── prompts/                    # [Shortcuts] Copy-paste prompts for the AI chat
│   │   ├── 01-session-start.md
│   │   ├── 02-session-end.md
│   │   ├── 03-bug-hunting.md
│   │   └── 04-code-review.md
│   └── docs/                       # [Hard Drive] Architecture and Rules (On-demand reading)
│       ├── api_contracts/          # Schema definitions to prevent hallucination
│       ├── architecture.md         # Tech stack & folder structure
│       ├── ui_guidelines.md        # Design system (Colors, Fonts, Layout)
│       ├── database.md             # DB Schema and Sync Rules
│       └── security_policy.md      # Security rules, Env management
├── .gitignore                       # Security: prevents .env, node_modules, etc.
├── ai-protocol.sh                   # CLI wrapper for automation
├── ai-protocol.js                   # Node.js automation script
├── .cursorrules / SKILL.md          # Core instructions forcing AI to follow the 4 Pillars
└── (Source Code...)
```

---

## 📜 2. The 4 Core Pillars of Control

When an AI operates in a repository utilizing this protocol, it MUST strictly adhere to these 4 pillars.

### 🏛️ Pillar 1: Strict Execution & Safety
- **Progressive Complexity:** Scale the workflow to the task:
  - *Minor:* Execute directly.
  - *Standard:* Micro-Stepping (Max 2 files).
  - *Major:* Create an ADR in `DECISIONS.md` and write tests first.
- **API Contract-First:** NEVER hallucinate API endpoints or payloads. Before writing an API call, AI must write/read a schema in `.ai/docs/api_contracts/` or run a `curl` test.
- **AI-TDD (Test-Driven):** AI must write automated test cases or local verification scripts for complex business logic before implementing it.
- **No Vibe Coding:** Plan before writing code. Summarize requirements and list files to touch.
- **Architectural Fork Rule:** Never autonomously decide between multiple architectural options. Present alternatives first.
- **No Double-Dipping:** Never combine refactoring and feature implementation in a single step.
- **Error Retry Limit (Max 3):** If an error isn't fixed after 3 retries, stop, analyze the root cause, and propose a solution or rollback.
- **Rapid Rollback:** If a fix causes cascading failures, immediately propose `git restore .` instead of patching further.
- **Read Before Reference:** AI must read file contents before referencing functions/APIs from them.
- **Security Protocol:** Never hardcode secrets. Always use `.env` and verify `.gitignore`.
- **Conventional Commits:** Enforce strict commit formatting (`feat:`, `fix:`, `refactor:`).

### 🧠 Pillar 2: Memory & Reflexion
- **Session Startup Protocol:** AI must always read `.ai/STATE.md` and `.ai/REFLECTIONS.md` first.
- **ADR Maintenance:** Document all major library, database, or architectural decisions in `.ai/DECISIONS.md`.
- **Reflections Pruning:** Keep only the 15 most recent entries in `REFLECTIONS.md`. Move older ones to `.ai/docs/reflections_archive.md` (or use `ai-protocol.sh prune`).
- **Context Window Alert:** Auto-detect when the context gets too long, update `STATE.md`, and ask the user to start a new session.

### 🎨 Pillar 3: Premium UX/UI & Design System
- **Design Tokens First:** Always read `.ai/docs/ui_guidelines.md` or `tailwind.config` before writing UI. No arbitrary colors.
- **Single Source of Truth:** Use standard component libraries (e.g., shadcn/ui) instead of custom HTML/CSS elements.
- **Layout Uniformity:** Inherit global layout wrappers. Do not invent isolated page structures.

### ⚡ Pillar 4: Token-Saving & Efficiency
- **Clean Session Protocol:** Reset chat context frequently. Use `.ai/prompts/` to quickly close and start sessions.
- **Diff-Only Output:** AI must not output entire files for small changes. Use diff blocks or search-and-replace.
- **Context Paging:** Do not blindly read massive files. Search for specific symbols or line ranges.

---

## 🎨 3. Choosing a UI Design Theme

By default, the framework enforces a **Space-Dark Glassmorphism** theme. However, we provide 4 distinct premium UI standard templates.

To change your project's design system, simply copy your preferred theme from `.ai/templates/ui/` and overwrite `.ai/docs/ui_guidelines.md`:

```bash
# Option A: Minimalist & Clean (shadcn/ui style, high contrast, flat)
cp .ai/templates/ui/minimal.md .ai/docs/ui_guidelines.md

# Option B: Modern Vibrant (HeroUI/NextUI style, colorful, glassmorphism)
cp .ai/templates/ui/vibrant.md .ai/docs/ui_guidelines.md

# Option C: Data-Heavy (Tremor style, dashboards, metrics)
cp .ai/templates/ui/data_heavy.md .ai/docs/ui_guidelines.md

# Option D: Futuristic Space-Dark (Default, Aceternity style)
cp .ai/templates/ui/futuristic.md .ai/docs/ui_guidelines.md
```
Once copied, the AI will strictly follow the new visual guidelines, preventing "UI hallucination" and ensuring consistent aesthetics.

---

## 🚀 4. Automation CLI (`ai-protocol.sh`)

We provide a zero-dependency CLI tool to maintain your workspace token-efficiency and safety automatically.
Ensure Node.js is installed.

```bash
# Initialize the protocol in your project (copies templates, prompts, docs, and multi-IDE configs)
./ai-protocol.sh init

# Verify security (e.g. .env ignored) and check file bloat
./ai-protocol.sh check

# Automatically archive old reflections > 15 entries
./ai-protocol.sh prune

# Backup current STATE.md to history and create a fresh one for a new session
./ai-protocol.sh clean

# Generate a context-rich handoff prompt for starting a new AI chat session
./ai-protocol.sh handoff

# Open the AI Second Brain Terminal Dashboard
./ai-protocol.sh dashboard

# Install a git pre-commit hook to block commits if safety checks fail
./ai-protocol.sh install-hook

# Update the AI Protocol to the latest version directly from GitHub
./ai-protocol.sh update
```

---

## 🛠️ 5. Compatibility Matrix

All config files below are auto-generated by `./ai-protocol.sh init`.

| Tool | Config File |
|------|-------------|
| **Cursor IDE** | `.cursorrules` |
| **Windsurf IDE** | `.windsurfrules` |
| **Cline / Roo Cline** | `.clinerules` |
| **Claude Code / Claude** | `.clauderules` / `.claudecoderc` |
| **Antigravity** | `SKILL.md` |
| **GitHub Copilot** | `.github/copilot-instructions.md` |
| **Aider** | `.aider.conf.yml` + conventions |

---

## 📈 6. Getting Started

```bash
# 1. Clone the protocol
git clone https://github.com/<your-org>/ai-coding-protocol.git

# 2. CD into your project and initialize it
cd /path/to/your/project
/path/to/ai-coding-protocol/ai-protocol.sh init

# 3. That's it! The init command automatically:
#    - Creates .ai/ directory with templates, prompts, and docs
#    - Generates config files for all supported AI tools
#    - Instantiates STATE.md, REFLECTIONS.md, and DECISIONS.md

# 4. Start your first AI chat using `.ai/prompts/01-session-start.md`
```
