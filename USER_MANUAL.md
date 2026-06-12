# User Manual: AI Coding Protocol

This guide explains how to use the protocol to manage AI coding sessions efficiently.

---

## Table of Contents
1. [Installation & Project Initialization](#1-installation--project-initialization)
2. [Setting up the UI Design System](#2-setting-up-the-ui-design-system)
3. [The Daily Workflow](#3-the-daily-workflow)
4. [Managing Memory](#4-managing-memory)
5. [Session Handoff](#5-session-handoff)
6. [Terminal Dashboard](#6-terminal-dashboard)
7. [NotebookLM Integration](#7-notebooklm-integration)
8. [CLI Commands Reference](#8-cli-commands-reference)
9. [Knowledge Graph (Understand-Anything)](#9-knowledge-graph-understand-anything)

---

## 1. Installation & Project Initialization (Beginner Friendly)

This step creates the "memory brain" for the AI inside your project.

**Steps:**
1. Open your Terminal and navigate to your project directory: `cd ~/my-app`
2. Run the initialization command:
   ```bash
   npx --yes github:boonyanone/ai-coding-protocol init
   ```
3. **What happens behind the scenes?**
   - It creates a hidden `.ai/` folder, which acts as a notebook for the AI.
   - It sets up a `STATE.md` file so the AI remembers what task it is currently doing.
   - It enforces strict IDE rules (like `.cursorrules`) so the AI behaves predictably.

**Optional (But Highly Recommended):** Install the Git Hook in "Strict Blocking Mode" to prevent `.env` leaks and enforce that the AI updates memory files (Save Game) before any commit:
```bash
./ai-protocol.sh install-hook
```

---

## 2. Setting up the UI Design System

Set a specific UI guideline so the AI generates consistent designs.

**Steps:**
Choose a template from `.ai/templates/ui/` and copy it to `.ai/docs/ui_guidelines.md`.

### Available Premium Templates:

#### 1. Shadcn UI (Minimalist & Clean)
![Shadcn UI Mockup](https://raw.githubusercontent.com/boonyanone/agent-workflow/main/public/images/shadcn.png)
```bash
cp .ai/templates/ui/shadcn.md .ai/docs/ui_guidelines.md
```

#### 2. Aceternity UI (Space-Dark & Glassmorphism)
![Aceternity UI Mockup](https://raw.githubusercontent.com/boonyanone/agent-workflow/main/public/images/aceternity.png)
```bash
cp .ai/templates/ui/aceternity.md .ai/docs/ui_guidelines.md
```

#### 3. NextUI (Vibrant & Soft)
![NextUI Mockup](https://raw.githubusercontent.com/boonyanone/agent-workflow/main/public/images/nextui.png)
```bash
cp .ai/templates/ui/nextui.md .ai/docs/ui_guidelines.md
```

#### 4. Blocks.so + shadcn/ui (Premium SaaS Dashboards)
![Blocks.so Mockup](https://raw.githubusercontent.com/boonyanone/agent-workflow/main/public/images/blocks.png)
```bash
cp .ai/templates/ui/blocks.md .ai/docs/ui_guidelines.md
```

#### 5. Impeccable Design Critic (Elevate Premium Design)
(NEW!) This feature doesn't dictate a UI framework structure, but rather enforces **Design Psychology Rules** (Spacing, Motion, avoiding generic AI tropes). It can be activated alongside any of the templates above:
```bash
cp .ai/templates/ui/impeccable-principles.md .ai/docs/impeccable-principles.md
```

#### 6. Anti-Slop Design Critic (Taste-Skill)
(NEW!) A rigorous framework specifically designed to force AI to avoid generic 'slop' design tropes (e.g., generic gradients, messy spacing, boring typography). You can activate it by running:
```bash
cp .ai/templates/ui/taste-skill.md .ai/docs/taste-skill.md
```

The AI will read `.ai/docs/ui_guidelines.md` for structure and `.ai/docs/impeccable-principles.md` (or `.ai/docs/taste-skill.md`) to ensure design excellence before generating UI components.

---

## 3. The Daily Workflow

To conserve tokens and maintain context, break tasks into smaller steps.

**Workflow:**
1. **Start a Session:** Open a new chat. Copy the text from `.ai/prompts/01-session-start.md` and paste it as your first prompt.
2. **Assign Micro-tasks:** Ask the AI to edit 2-3 files at a time rather than building an entire feature at once.
3. **Test:** Test the changes frequently. If there are bugs, have the AI fix them immediately.
4. **End the Session:** Copy the text from `.ai/prompts/02-session-end.md` to instruct the AI to update `.ai/STATE.md` with the progress made.

---

## 4. Managing Memory

Keep the files in the `.ai/` folder organized to prevent token bloat.

- **`MEMORY.md`:** (NEW!) Acts as the long-term memory (Save Game). The AI must read this at the start of a session (Load Game) and update it when a feature is complete to prevent AI amnesia.
- **`STATE.md`:** Tracks current tasks (RAM). When starting a completely new feature, back up the old state and start fresh:
  ```bash
  ./ai-protocol.sh clean
  ```
- **`REFLECTIONS.md`:** Tracks lessons learned. If it exceeds 15 entries, archive old ones:
  ```bash
  ./ai-protocol.sh prune
  ```
- **`DECISIONS.md`:** Records major architectural choices.

---

## 5. Session Handoff

When a chat session gets too long, it slows down and costs more. Use the handoff tool to move to a new session without losing context.

**Steps:**
1. Run the handoff command:
   ```bash
   ./ai-protocol.sh handoff
   ```
2. Copy the generated markdown output.
3. Open a new chat session.
4. Paste the output into the new chat to continue working.

---

## 6. Terminal Dashboard

View a quick summary of the project state.

```bash
./ai-protocol.sh dashboard
```
It displays pending tasks, recent reflections, and architectural decisions.

---

## 7. NotebookLM Integration (The Large File Reader)

Feeding entire documentations into the IDE chat wastes tokens and confuses the AI. Instead, we use Google NotebookLM as an external reader.

**Steps:**
1. **Install:** Run `./ai-protocol.sh install-mcp`
2. **Authenticate:** Run `./ai-protocol.sh auth-mcp`
   - *💡 Beginner Note:* This script is "magical". If you already have Google Chrome open and are logged into Google, the script will automatically connect to Chrome and extract the login cookies instantly. You likely won't even see a login prompt!
3. **Prepare your Data in NotebookLM:**
   - Go to the NotebookLM website (notebooklm.google.com).
   - Create a new "Notebook" (e.g., named *AI Coding Protocol*).
   - Upload your large documents, code files, or paste long text into that notebook.
4. **Usage in your IDE:** 
   - In your IDE chat, instruct the AI using the notebook's name: *"Hey AI, please connect to NotebookLM, read the notebook named 'AI Coding Protocol', and use that knowledge to help me write this feature."*
   - The AI will query the notebook via MCP and give you context-rich answers without bloating your chat!

---

## 8. CLI Commands Reference

Run `./ai-protocol.sh [command]` in your project root:

| Command | Usage |
|---|---|
| `init` | Setup the protocol in a project. |
| `check` | Check for `.env` leaks and file sizes. |
| `prune` | Archive old reflections. |
| `clean` | Reset `STATE.md` for a new major task. |
| `handoff` | Generate context for a new chat session. |
| `dashboard` | View project status. |
| `install-hook` | Install a Git pre-commit hook. |
| `install-mcp` | Install NotebookLM integration. |
| `auth-mcp` | Authenticate with NotebookLM. |
| `install-graph` | Install Understand-Anything Knowledge Graph. |
| `scan` | Show instructions to scan the project graph. |

---

## 9. Knowledge Graph (Understand-Anything)

To prevent AI from editing files blindly and breaking the architecture, you can generate a Visual Knowledge Graph of your entire project.

**Steps:**
1. **Install:** Run `./ai-protocol.sh install-graph` to install the `Understand-Anything` plugin into your IDE (Cursor, Copilot, Antigravity).
2. **Scan the Project:** Open your AI chat window in your IDE and type:
   ```
   /understand
   ```
   The AI will scan your repository and create `.understand-anything/knowledge-graph.json`.
3. **View the Dashboard:** To visually explore your codebase architecture, type:
   ```
   /understand-dashboard
   ```
   
**How it helps:**
- The protocol rules (`.cursorrules`) automatically force the AI to read this graph before making any multi-file changes or crossing architectural layers (e.g., UI to Database).
- If you edit more than 10 files without updating the graph, the Git Pre-commit hook will warn you to run `/understand` again to keep the AI's map up-to-date.
