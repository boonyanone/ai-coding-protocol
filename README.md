# 🤖 Agentic Workflow Framework

A strict, memory-persistent, and token-efficient framework for developing software alongside AI Coding Agents (Cursor, Windsurf, Cline, Antigravity, Claude, etc.).

[อ่านภาษาไทย](README.th.md)

This protocol combines cutting-edge AI development concepts like **Superpowers**, **Karpathy's LLM Wiki**, **Reflexion**, and strict execution guardrails to eliminate context bloat, hallucination, over-execution, and UI inconsistency.

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
│   │   └── DECISIONS.template.md
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
├── ai-protocol.sh                  # CLI wrapper for automation
├── ai-protocol.js                  # Node.js automation script
├── .cursorrules / SKILL.md         # Core instructions forcing AI to follow the 4 Pillars
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

## 🚀 3. Automation CLI (`ai-protocol.sh`)

We provide a zero-dependency CLI tool to maintain your workspace token-efficiency and safety automatically.
Ensure Node.js is installed.

```bash
# Verify security (e.g. .env ignored) and check file bloat
./ai-protocol.sh check

# Automatically archive old reflections > 15 entries
./ai-protocol.sh prune

# Backup current STATE.md to history and create a fresh one for a new session
./ai-protocol.sh clean

# Install a git pre-commit hook to block commits if safety checks fail
./ai-protocol.sh install-hook
```

---

## 🛠️ 4. Compatibility Matrix

| Tool | Config File |
|------|-------------|
| **Cursor IDE** | `.cursorrules` |
| **Windsurf IDE** | `.windsurfrules` |
| **Cline / Roo Cline** | `.clinerules` |
| **Claude (Pro/Team)** | `Project Instructions` |
| **Antigravity** | `SKILL.md` or native rules |
| **GitHub Copilot** | `.github/copilot-instructions.md` |
| **Aider** | `.aider.conf.yml` + conventions |

---

## 📈 5. Getting Started

```bash
# 1. Clone the protocol
git clone https://github.com/<your-org>/ai-coding-protocol.git

# 2. CD into your project and initialize it
cd /path/to/your/project
/path/to/ai-coding-protocol/ai-protocol.sh init

# 3. Copy the core rules to your AI IDE config
cp /path/to/ai-coding-protocol/.cursorrules .cursorrules

# 4. Start your first AI chat using `.ai/prompts/01-session-start.md`
```
