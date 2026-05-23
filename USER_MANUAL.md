# 📖 Detailed User Manual

Welcome to the **AI Coding Protocol** in-depth manual. This guide will teach you how to effectively use each component of the system to maximize your productivity with AI Coding Agents while avoiding common pitfalls like context bloat and hallucination.

---

## 📑 Table of Contents
1. [Installation & Project Initialization](#1-installation--project-initialization)
2. [Setting up the UI Design System](#2-setting-up-the-ui-design-system)
3. [The AI Daily Workflow](#3-the-ai-daily-workflow)
4. [Managing AI Memory (RAM & Reflexion)](#4-managing-ai-memory-ram--reflexion)
5. [AI Session Handoff](#5-ai-session-handoff)
6. [AI Terminal Dashboard](#6-ai-terminal-dashboard)
7. [Deep Research Hub (NotebookLM MCP)](#7-deep-research-hub-notebooklm-mcp)
8. [Deep-Dive Security (Atomic Writes)](#8-deep-dive-security-atomic-writes)
9. [CLI Commands Reference](#9-cli-commands-reference)

---

## 1. Installation & Project Initialization

Before an AI starts generating code in your repository, you must initialize the protocol to enforce strict guardrails.

**Steps:**
1. Navigate to your project directory (e.g., `cd ~/my-new-app`).
2. Run the `init` command pointing to where you stored the AI Protocol:
   ```bash
   /path/to/ai-coding-protocol/ai-protocol.sh init
   ```
3. Once completed, your repository will contain:
   - An `.ai/` directory housing the memory files (`STATE.md`, `REFLECTIONS.md`, `DECISIONS.md`).
   - IDE rules files configured for your agents (`.cursorrules`, `.clinerules`, `.windsurfrules`).
   - The `ai-protocol.sh` CLI script copied locally for easy access.

**Recommendation:** After initializing, it's highly recommended to install the Git Hook for automated safety checks:
```bash
./ai-protocol.sh install-hook
```
This hook will verify repository health before every `git commit`.

---

## 2. Setting up the UI Design System

To prevent the AI from generating random colors, spacing, or inconsistent layouts, you must enforce a "Single Source of Truth" for your Design System.

**Steps:**
The protocol provides 4 premium UI standard templates. Copy your preferred style to overwrite the default guidelines:

1. **Futuristic Space-Dark** (Aceternity style, glassmorphism, dark mode) - *Default*
   ```bash
   cp .ai/templates/ui/futuristic.md .ai/docs/ui_guidelines.md
   ```
2. **Minimalist & Clean** (shadcn/ui style, flat, high-contrast)
   ```bash
   cp .ai/templates/ui/minimal.md .ai/docs/ui_guidelines.md
   ```
3. **Modern Vibrant** (HeroUI/NextUI style, colorful, glassy)
   ```bash
   cp .ai/templates/ui/vibrant.md .ai/docs/ui_guidelines.md
   ```
4. **Data-Heavy Dashboard** (Tremor style, metric-focused)
   ```bash
   cp .ai/templates/ui/data_heavy.md .ai/docs/ui_guidelines.md
   ```

From now on, the AI will always read `.ai/docs/ui_guidelines.md` before generating UI components, ensuring a consistent aesthetic.

---

## 3. The AI Daily Workflow

Working with AI under this protocol emphasizes **"Micro-Stepping"** and keeping chat sessions short to conserve tokens and prevent hallucination.

**Best Practices:**
1. **Start a New Session:** Open a new chat in Cursor/IDE. Copy and paste the text from `.ai/prompts/01-session-start.md` to feed the AI the current project state.
2. **Assign Tasks:** Do **NOT** ask the AI to build an entire massive feature at once. Assign micro-tasks (editing max 2-3 files at a time).
3. **Test Iteratively:** When the AI outputs `[WAITING_FOR_USER]`, it means you should manually test the app. If it works, tell the AI to continue. If it fails, ask the AI to fix the bug immediately. Never accumulate technical debt.
4. **End the Session:** Once the micro-feature is complete, copy and paste `.ai/prompts/02-session-end.md` to instruct the AI to update the `STATE.md` RAM file and summarize the work.

---

## 4. IDE Task Menu Integration (No-CLI Mode)

If you prefer not to type CLI commands, the initialization script (`init`) automatically integrates with your IDE (VS Code, Cursor, Antigravity, Windsurf) by generating a `.vscode/tasks.json` file.

This allows you to access all AI Protocol commands from a graphical dropdown menu:
1. Open the command palette or click **Terminal -> Run Task...** in your IDE top menu.
2. Select the command you want to run from the list (e.g. `🚀 AI Protocol: Dashboard`).

Alternatively, if you are using an AI chat interface, you can simply **tell the AI** to run the commands for you (e.g., *"AI, open the dashboard"*, or *"Run the security check"*).

---

## 5. Managing AI Memory (RAM & Reflexion)

The `.ai/` folder acts as the AI's brain. You must keep it clean and organized:

- **`STATE.md` (RAM):** Tracks "What are we currently doing?". NEVER let this file exceed 20 lines. When you finish a major milestone and want to pivot to a completely new feature, run:
  ```bash
  ./ai-protocol.sh clean
  ```
  This creates a backup of the old state and generates a fresh, blank `STATE.md`.
- **`REFLECTIONS.md` (Lessons Learned):** Every time the AI solves a tricky bug, it logs it here so it won't repeat the mistake. If this file gets too long (over 15 entries), token usage will spike. Run:
  ```bash
  ./ai-protocol.sh prune
  ```
  This archives older reflections into a permanent storage file.
- **`DECISIONS.md` (Architecture Records):** The AI is forbidden from making unilateral technological choices (e.g., swapping databases). It must ask you first, and then log the decision here.

---

## 5. AI Session Handoff

When an AI chat gets too long, the LLM starts to degrade in quality (forgetting things, writing slower, costing more tokens). You MUST start a new chat session.

But how do you retain context? Use the **Handoff** command.

**How to Use:**
1. Run the command in your terminal:
   ```bash
   ./ai-protocol.sh handoff
   ```
2. The CLI will aggregate the current `STATE.md`, `REFLECTIONS.md`, `DECISIONS.md`, and any uncommitted Git changes into a single, optimized prompt.
3. Copy the outputted markdown text and paste it into your brand-new AI chat window.
4. The new AI instance will instantly ingest the exact context and continue working flawlessly!

---

## 6. AI Terminal Dashboard

If you want to quickly view the overall project status without opening individual files inside `.ai/`, you can use the interactive dashboard:

```bash
./ai-protocol.sh dashboard
```

**What the Dashboard Displays:**
- **📍 Pending Tasks:** Quick summary of active tasks and action steps (from `STATE.md`).
- **📚 Recent Reflections:** The latest lessons learned to prevent recurring bugs.
- **🏗️ Architecture Decisions:** Major technology choices logged in `DECISIONS.md`.

This gives developers a 1-second mental synchronization with the AI's current state!

---

## 7. Deep Research Hub (NotebookLM MCP)

**When to use:** You have a massive document, API reference, or manual (thousands of lines long) and you don't want to paste it directly into your IDE, which would bloat your context and consume excessive tokens.

**✨ What is it and how does it help?**
We have integrated the **NotebookLM MCP** directly into the protocol to act as your project's "Deep Research Assistant"!
- 💰 **Extreme Token Savings:** Instead of reading a 10,000-line file, the AI in your IDE will "chat" with NotebookLM to extract only the necessary information.
- 🧠 **Context Preservation:** Your chat remains fast and fluid because the heavy lifting of reading massive files is offloaded to Google's servers.
- 📚 **Seamless Integration:** Once installed, your IDE's AI (Cursor/Windsurf) can automatically create notebooks, upload files/links, and retrieve summaries to write code without you ever leaving the editor!

**📝 How to Install and Use:**
1. **Install (One-time):** Run `./ai-protocol.sh install-mcp` in your project terminal.
2. **Authenticate:** Run `./ai-protocol.sh auth-mcp` in your terminal and follow the prompts to securely link your Google account.
3. **Usage:** In your Cursor/Windsurf chat, simply tell the AI:
   > *"Please load the document from this link [insert link] into a new NotebookLM notebook, and then summarize how to use this component for me."*

---

## 8. Deep-Dive Security (Atomic Writes)

The AI Coding Protocol uses an advanced underlying robust infrastructure to prevent data corruption and IDE race conditions:

1. **Transactional Pruning:** When running `prune`, older entries are fully written to the archive file *before* the active RAM file is truncated. This eliminates the risk of data loss if a process crashes mid-execution.
2. **Atomic Write Fallbacks:** On Windows, aggressive indexers and IDEs (like VS Code) often lock active files. If the script encounters an `EBUSY` lock during a standard rename, it automatically triggers a fallback mechanism to write data safely and clean up orphaned `.tmp` files.
3. **Cross-Platform Formatting:** Completely normalized handling for Windows Carriage Returns (`\r\n`), ensuring 100% accurate regex parsing for handoffs and formatting.

---

## 9. CLI Commands Reference

You can access these tools by running `./ai-protocol.sh [command]` in your project root:

| Command | Description | When to use |
|---|---|---|
| `init` | Installs the protocol, copies templates, and generates IDE configs. | Run once when starting a new project. |
| `check` | Verifies repository health (checks `.env` leaks, RAM bloat). | Run daily or before a `git push`. |
| `prune` | Archives old reflections to save tokens. | When `REFLECTIONS.md` exceeds 15 entries. |
| `clean` | Backs up `STATE.md` and generates a blank one. | When completing a major feature milestone. |
| `handoff` | Generates a context-rich prompt for a new AI session. | When the current AI chat becomes too long. |
| `dashboard` | Opens the AI Second Brain Terminal Dashboard. | When you want an overview of pending tasks and memories. |
| `install-hook` | Installs a Git Pre-commit hook to automate safety checks. | Run once after `git init`. |
| `install-mcp` | Installs the NotebookLM Deep Research Hub integration. | Run once to enable deep document research capabilities. |
| `auth-mcp` | Launches the browser to authenticate the NotebookLM MCP. | Run when logging in for the first time or when your session expires. |

---
**You are now fully equipped!** 🚀 You are ready to build software alongside AI with maximum efficiency, safety, and architectural discipline.
