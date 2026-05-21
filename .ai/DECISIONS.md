# 📐 Architecture Decision Records (ADR)
*Log of all significant architectural decisions, library choices, and structural changes.*

---

## [YYYY-MM-DD] 001: Example Decision
- **Context:** We needed a way to manage global state.
- **Decision:** Chose Zustand instead of Redux.
- **Rationale:** Lighter weight, less boilerplate, and integrates seamlessly with our specific React architecture.
- **Consequences:** We lose Redux DevTools out of the box, but gain significant development speed.

