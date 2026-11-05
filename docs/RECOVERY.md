# Recovery and AI Handoff Protocol

This repository, not chat history, is the source of truth.

## Resume procedure
1. Open the canonical repository: https://github.com/pooya-labs/pooya-labs-platform
2. Read `AGENTS.md`.
3. Read `docs/project-state.json`.
4. Read `docs/STATUS.md`, `docs/NEXT.md`, and the relevant `docs/ROADMAP.md) phase.
5. Inspect the latest commits and working tree before editing.
6. Read the architecture and ADRs related to the next task.
7. Continue only the task named in `docs/NEXT.md`. Do not redo completed work without evidence of regression.
8. After a milestone, run checks and update all state/handoff files in the same commit.

## Required checkpoint fields
Every checkpoint must record:
- Current phase and task ID.
- Latest verified commit SHA.
- Files added/changed.
- Commands/tests run and exact results.
- Manual checks still required.
- Known bugs, blockers, and assumptions.
- Deployment state (never infer it from source changes).
- Exact next atomic task.
- Whether previous projects were inspected, imported, or modified.

## Offline backup
For a local clone, create a complete Git bundle:
```bash
git bundle create pooya-labs-platform-backup.bundle --all
```
Verify it:
```bash
git bundle verify pooya-labs-platform-backup.bundle
```
Also keep a normal remote clone where possible. Do not commit the bundle to the public repository if it contains secrets or unnecessary large history.

## Recovery after interrupted work
- Inspect `git status` and `git log -5 --oneline`.
- Compare actual repository files with STATUS/NEXT.
- Treat code and test output as evidence; documentation claims alone do not prove implementation.
- If a task was partially completed, finish or safely revert it before starting another task.
- Never reset, force-push, or overwrite unknown user changes without explicit authorization.

## Security
Never store tokens, passwords, private keys, deployment URLs/IDs when avoidable, customer records, or personal booking information in Git. Use GitHub Actions secrets for CI-only values and server-side Script Properties for runtime secrets. The browser diagnostic workflow expects `GAS_WEB_APP_URL` as a repository Actions secret; it is intentionally not stored in the workflow source.
