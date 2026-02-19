# OpenSpec in SoloSales

## What OpenSpec is used for here

- Turn PRD/milestones into auditable artifacts: proposal → specs → design → tasks.
- Prevent implementation drift: tasks/specs are the contract.

## Directory layout

- `openspec/specs/`: source of truth (long-lived capabilities)
- `openspec/changes/`: per-change artifacts and delta specs

## Lifecycle

1) Create change folder: `openspec/changes/<change-id>/`
2) Complete artifacts: proposal/design/tasks + delta specs
3) Gate: `openspec-cn validate <change-id>` ✅
4) Implement in a dedicated PR (first line: `OpenSpec: <change-id>`)
5) Merge and then:
   - backport any accepted behavior changes into `openspec/specs/`
   - archive the change (keep for audit)

## Current baseline

- `m0-scope-freeze-baseline`
