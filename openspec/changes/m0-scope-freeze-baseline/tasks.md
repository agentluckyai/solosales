# Tasks — m0-scope-freeze-baseline

> This change establishes the **spec baseline** for SoloSales MVP scope freeze (v1.1A CN).
> Implementation work should reference these specs and may be tracked in separate changes.

## 0. Repo wiring (OpenSpec)
- [ ] 0.1 Add `openspec/` to version control (commit baseline files)
- [ ] 0.2 Add a short note to `README.md` about where MVP specs live (optional)

## 1. Spec completeness pass
- [ ] 1.1 Review `order-lifecycle` spec: confirm exact statuses + pause/resume semantics
- [ ] 1.2 Review `wallet-ledger` spec: confirm ledger event types + invariants
- [ ] 1.3 Review `qualification` + `qualification-report`: confirm required evidence fields and versioning
- [ ] 1.4 Review `external-data-providers`: confirm provider audit fields and retry/circuit breaker expectations
- [ ] 1.5 Review `email-nurture`: confirm suppression/idempotency keys + event schema
- [ ] 1.6 Review `disputes-refunds`: confirm reason codes + arbitration audit fields
- [ ] 1.7 Review `auth-permissions`: confirm role boundaries for MVP

## 2. Sync baseline specs to main specs directory
- [ ] 2.1 Run `openspec-cn validate --change m0-scope-freeze-baseline`
- [ ] 2.2 Run `openspec-cn sync m0-scope-freeze-baseline` (merge delta specs into `openspec/specs/`)
- [ ] 2.3 Run `openspec-cn verify m0-scope-freeze-baseline` (if available in your toolchain)
- [ ] 2.4 Run `openspec-cn archive m0-scope-freeze-baseline` when ready

## 3. Kick off implementation changes (separate OpenSpec changes)
- [ ] 3.1 Create change: `m0-order-status-ledger` (DB + API + UI timeline)
- [ ] 3.2 Create change: `m0-wallet-ledger` (credits, freeze/deduct/release)
- [ ] 3.3 Create change: `m0-provider-audit-queue` (RocketReach integration + audit)
- [ ] 3.4 Create change: `m0-qualification-report` (evidence chain + report generation)
- [ ] 3.5 Create change: `m0-email-nurture` (SendCloud send + webhooks + suppression)

## Verification checklist (for this change)
- `openspec-cn status --change m0-scope-freeze-baseline` shows 4/4 artifacts complete.
- Specs are readable, stable, and map directly to the frozen Must list.
