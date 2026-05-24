# Agentic Workflow Framework

A framework for organizing AI coding sessions (Cursor, Windsurf, Cline, Antigravity, Claude, etc.) to manage context size, state, and UI consistency.

[อ่านภาษาไทย](README.th.md)

📖 **[User Manual](USER_MANUAL.md)**

---

## The Problems It Solves

When working on longer projects with AI assistants in IDEs, common issues arise:
- **Context Size:** Chats become too long, slowing down responses and increasing token usage.
- **Context Loss:** Starting a new chat causes the AI to forget project rules, structure, and past bug fixes.
- **Inconsistency:** The AI may drift from the project's design system or architectural guidelines.

This protocol provides a structure to manage these issues:
- **State Tracking (`STATE.md`):** Keeps a summary of the current task and past learnings.
- **Session Management:** A script to help summarize and hand over context to new chat sessions.
- **Pre-commit Hooks:** Basic checks to prevent committing `.env` files.
- **NotebookLM Integration:** Optional tool to offload large documentation to NotebookLM to save IDE token limits.

---

## Deep Research Hub (NotebookLM)

You can use NotebookLM to handle large documentation instead of pasting it into the IDE chat. The framework provides a script (`./ai-protocol.sh install-mcp`) to set up the NotebookLM MCP.

**Benefits:**
- Reduces token usage in the IDE.
- Keeps the IDE chat context focused on code.
- Uses Google's RAG for querying large documents.
- Stores credentials locally per-project (`.ai/mcp/auth/auth.json`), allowing different Google accounts for different projects.

---

## Built-in Security Measures

The protocol includes basic safeguards for running AI agents locally:
- **File Operations:** Uses randomized temporary files and OS-level write locks to prevent accidental overwrites or symlink issues.
- **Network Timeouts:** Download requests have a 5-second timeout.
- **Secret Scanning:** Git pre-commit hooks check for `.env` files to prevent accidental commits.

---

## 1. Directory Structure (.ai/)

The framework organizes context into short-term and long-term memory:

```text
/ (Root Project)
├── .ai/
│   ├── STATE.md                    # Current active task & next steps
│   ├── REFLECTIONS.md              # Lessons learned & bug fixes
│   ├── DECISIONS.md                # Architecture Decision Records
│   ├── templates/                  # Blank templates
│   ├── prompts/                    # Example prompts for chat sessions
│   └── docs/                       # Project documentation
│       ├── api_contracts/          
│       ├── architecture.md         
│       ├── ui_guidelines.md        
│       ├── database.md             
│       └── security_policy.md      
├── .gitignore                       
├── ai-protocol.sh                   # Helper script
├── ai-protocol.js                   # Node.js script
└── .cursorrules / SKILL.md          # Core instructions
```

---

## 2. Core Guidelines

When an AI operates in a repository using this protocol, it should follow these guidelines:

### Execution & Safety
- **Progressive Complexity:** Scale the workflow to the task.
- **API Contract-First:** Verify API schemas before writing calls.
- **Test-Driven:** Write tests for complex logic first.
- **Plan First:** Summarize requirements before coding.
- **Security:** Do not hardcode secrets. Use `.env`.

### Memory Management
- **Startup:** Read `.ai/STATE.md` and `.ai/REFLECTIONS.md` first.
- **Decisions:** Document major changes in `.ai/DECISIONS.md`.
- **Context Limits:** Suggest starting a new session if the chat gets too long.

### UI Consistency
- **Design Tokens:** Follow `.ai/docs/ui_guidelines.md`.

### Efficiency
- **Diff Output:** Output only changed code when possible.

---

## 3. UI Themes

The `.ai/templates/ui/` folder contains standard UI guidelines. Copy one to `.ai/docs/ui_guidelines.md` to set your project's design system:

- **🌌 Futuristic**: Dark mode, glassmorphism, space-themed (Default)
- **📊 Data Heavy**: Tremor style, table-focused, clean data visualization
- **⚪ Minimal**: Vercel style, black & white, high contrast, simple
- **🍭 Vibrant**: HeroUI style, colorful, rounded corners, lively

```bash
cp .ai/templates/ui/minimal.md .ai/docs/ui_guidelines.md
```

---

## 4. Helper Script (`ai-protocol.sh`)

A CLI tool is included to help manage the workspace:

```bash
# Initialize the protocol in your project
./ai-protocol.sh init

# Check safety rules and file sizes
./ai-protocol.sh check

# Archive old reflections
./ai-protocol.sh prune

# Backup current STATE.md and create a fresh one
./ai-protocol.sh clean

# Generate a prompt for handing off to a new session
./ai-protocol.sh handoff

# Open a summary dashboard
./ai-protocol.sh dashboard

# Install a git pre-commit hook
./ai-protocol.sh install-hook

# Update the protocol scripts
./ai-protocol.sh update
```

---

## 5. Getting Started & Daily Workflow

### Step 1: Installation
To add the protocol to an existing project or a new one:

```bash
# 1. Clone this repository anywhere on your machine
git clone https://github.com/<your-org>/ai-coding-protocol.git ~/.ai-coding-protocol

# 2. Go to your target project folder
cd /path/to/your/project

# 3. Initialize the protocol in your project
~/.ai-coding-protocol/ai-protocol.sh init
```

The `init` command will generate a `.ai/` folder in your project containing necessary templates, prompts, and config files for your IDE.

### Step 2: Starting a Work Session
Whenever you open your IDE and start a new chat with the AI, you should provide it with the current project state.
1. Open `.ai/prompts/01-session-start.md`.
2. Copy the text and paste it into your AI chat as the first message.
3. The AI will read `.ai/STATE.md` and know exactly what to do next without you having to re-explain the project.

### Step 3: Ending a Session & Handoff
When the chat gets too long or you finish a task, you should save the memory and start a fresh chat.
1. Run `./ai-protocol.sh handoff` in your terminal.
2. The script will summarize your current progress and generate a prompt.
3. Clear your IDE chat (start a new session).
4. Paste the generated prompt into the new chat to continue seamlessly.

### Optional: Setting up NotebookLM
If your project relies on large documentation (like a massive API reference), you can use NotebookLM instead of pasting it into the IDE:
1. Run `./ai-protocol.sh install-mcp`.
2. Follow the instructions to log in to Google.
3. Create a notebook in Google NotebookLM and upload your documents there.
4. The AI in your IDE can now query those documents directly.
