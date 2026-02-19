# SoloSales — OpenSpec Project Context

## What this repo is
SoloSales is a web app + backend monorepo.

## Current stack (verify/update as needed)
- Language: TypeScript
- Package manager: pnpm (workspace)
- Backend: Node.js
- DB: Prisma (migrations exist)
- Infra: Docker / docker compose (present)
- Queue: BullMQ (present)

## Engineering constraints (non-negotiable)
- Prefer boring, stable changes over clever ones.
- Any DB schema change must come with:
  - a forward migration that is safe on existing data
  - a rollback plan (down migration or documented recovery)
- Any queue/worker change must be idempotent and safe to retry.
- Cross-platform: assume devs may use macOS/Linux/Windows; avoid hardcoded path separators.

## Testing & verification
- For backend changes: add/adjust tests when behavior changes.
- For migrations: include a quick verification checklist (how to validate on staging/local).

## PR hygiene
- Keep changes small; avoid mixing refactors with feature work.
- Include failure cases and operational notes in design when relevant.
