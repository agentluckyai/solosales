# Tasks — m0-wallet-ledger-v1

## Definition of Ready (must be true before coder writes code)
- [ ] proposal.md/design.md/tasks.md complete (including spec 1.1 credits model details)
- [ ] `pnpm openspec:validate` (or `openspec-cn validate m0-wallet-ledger-v1`) is ✅
- [ ] Owners assigned for each task section

## 1) Spec delta (owner: pm)
- [ ] 1.1 Confirm credits model details (min top-up, tier bonuses) and required audit fields

## 2) DB + migrations (owner: coder)
- [ ] 2.1 Add Prisma models: wallets, ledger_entries (append-only)
- [ ] 2.2 Add unique constraints for idempotency keys
- [ ] 2.3 Write migration + rollback notes

## 3) Domain logic (owner: coder)
- [ ] 3.1 Implement ledger write service with transactional invariants
- [ ] 3.2 Implement idempotent FREEZE/DEDUCT/RELEASE flows
- [ ] 3.3 Implement admin ADJUST (manual adjustment) with audit

## 4) API surface (owner: coder)
- [ ] 4.1 Endpoint: get wallet balance + ledger entries
- [ ] 4.2 Endpoint/internal API: freeze/deduct/release by order
- [ ] 4.3 Endpoint: admin manual adjust

## 5) Tests + QA evidence (owner: qa)
- [ ] 5.1 Unit tests for idempotency + invariants
- [ ] 5.2 Integration test: freeze → QA#1 fail → release
- [ ] 5.3 Integration test: freeze → QA#2 pass → deduct

## 6) Docs & handoff (owner: pm)
- [ ] 6.1 Update API docs (minimal)
- [ ] 6.2 Add runbook notes (reconciliation, common failures)
