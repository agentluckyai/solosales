# Contributing

## OpenSpec workflow (hard constraints)

These rules are mandatory. The goal is to prevent drift, rework, and “chat-only requirements”.

1) **No code without spec + design + tasks**
- For any implementation PR, you MUST have an OpenSpec change under `openspec/changes/<change-id>/` containing:
  - `proposal.md`
  - `design.md`
  - `tasks.md`
  - delta specs under `specs/<capability>/spec.md`
- If `design/tasks/delta spec` are missing or unclear: STOP and update them first.

2) **Coder works only from tasks.md**
- Implementers MUST only work from `tasks.md`.
- If new work is discovered, add it to `tasks.md` (and update design/specs if it changes behavior) before coding.

3) **PR must be linked to an OpenSpec change**
- PR description first line MUST be:
  - `OpenSpec: <change-id>`

4) **QA validates only against specs**
- QA acceptance is based on spec scenarios in `openspec/specs/` (SoT) plus the change’s delta specs.
- QA MUST NOT accept/reject based on chat history.

5) **Specs are the long-term source of truth**
- `openspec/specs/` is the long-term SoT.
- `openspec/changes/<change-id>/specs/` are deltas for that change only.

## Required checks

- `openspec-cn validate <change-id>` MUST pass for any change being implemented.
- CI runs `openspec-cn validate --all` on PRs touching `openspec/**`.
