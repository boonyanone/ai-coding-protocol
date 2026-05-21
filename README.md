# 🤖 AI Coding Protocol

A strict, memory-persistent, and token-efficient framework for developing software alongside AI Coding Agents (Cursor, Windsurf, Cline, Antigravity, etc.).

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
│   ├── templates/                  # Blank templates for new projects
│   │   ├── STATE.template.md
│   │   └── REFLECTIONS.template.md
│   └── docs/                       # [Hard Drive] Architecture and Rules (On-demand reading)
│       ├── architecture.md         # Tech stack & folder structure
│       ├── ui_guidelines.md        # Design system (Colors, Fonts, Layout)
│       ├── database.md             # DB Schema and Sync Rules
│       └── security_policy.md      # Security rules, Env management
├── .cursorrules / SKILL.md         # Core instructions forcing AI to follow the 4 Pillars
└── (Source Code...)
```

---

## 📜 2. The 4 Core Pillars of Control

When an AI operates in a repository utilizing this protocol, it MUST strictly adhere to these 4 pillars.

### 🏛️ Pillar 1: Strict Execution & Safety
- **No Vibe Coding:** Plan before writing code. Summarize requirements and list files to touch.
- **Architectural Fork Rule:** Never autonomously decide between multiple architectural options. Present 2+ alternatives with pros/cons to the human first.
- **Micro-Stepping (Max 2 Files):** Edit at most 2 files per step, test, output `[WAITING_FOR_USER]`, and halt.
- **No Double-Dipping:** Never combine refactoring and feature implementation in a single step.
- **Error Retry Limit (Max 3):** If an error isn't fixed after 3 retries, stop, analyze the root cause, and propose a solution or rollback.
- **Rapid Rollback:** If a fix causes cascading failures, immediately propose `git restore .` instead of patching further.
- **Read Before Reference:** AI must read file contents before referencing functions/APIs from them.
- **Security Protocol:** Never hardcode secrets. Always use `.env` and verify `.gitignore`.
- **Conventional Commits:** Enforce strict commit formatting (`feat:`, `fix:`, `refactor:`).

### 🧠 Pillar 2: Memory & Reflexion
- **Session Startup Protocol:** AI must always read `.ai/STATE.md` and `.ai/REFLECTIONS.md` first upon starting a new chat.
- **Reflections Pruning:** Keep only the 15 most recent entries in `REFLECTIONS.md`. Move older ones to `.ai/docs/reflections_archive.md`.
- **Context Window Alert:** Auto-detect when the context gets too long, update `STATE.md`, and ask the user to start a new session.

### 🎨 Pillar 3: Premium UX/UI & Design System
- **Design Tokens First:** Always read `.ai/docs/ui_guidelines.md` or `tailwind.config` before writing UI. No arbitrary colors.
- **Single Source of Truth:** Use standard component libraries (e.g., shadcn/ui) instead of custom HTML/CSS elements.
- **Layout Uniformity:** Inherit global layout wrappers. Do not invent isolated page structures.

### ⚡ Pillar 4: Token-Saving & Efficiency
- **Clean Session Protocol:** Reset chat context frequently after committing code. The state is safe in `STATE.md`.
- **Diff-Only Output:** AI must not output entire files for small changes. Use diff blocks or search-and-replace.
- **Context Paging:** Do not blindly read massive files. Search for specific symbols or line ranges.

---

## 🛠️ 3. Compatibility Matrix

| Tool | Config File |
|------|-------------|
| **Cursor IDE** | `.cursorrules` |
| **Windsurf IDE** | `.windsurfrules` |
| **Cline / Roo Cline** | `.clinerules` |
| **GitHub Copilot** | `.github/copilot-instructions.md` |
| **Aider** | `.aider.conf.yml` + conventions |

---

## 📈 4. Getting Started

```bash
# 1. Clone the protocol
git clone https://github.com/<your-org>/ai-coding-protocol.git

# 2. Copy the .ai/ directory into your project
cp -r ai-coding-protocol/.ai/ /path/to/your/project/.ai/

# 3. Copy the core rules to your AI IDE config (e.g., Cursor)
cp ai-coding-protocol/.cursorrules /path/to/your/project/.cursorrules

# 4. Start your first AI chat with:
# "Please read .ai/STATE.md and .ai/REFLECTIONS.md and begin."
```
