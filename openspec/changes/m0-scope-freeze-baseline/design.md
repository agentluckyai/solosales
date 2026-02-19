# Design — m0-scope-freeze-baseline

## Goal

Translate the frozen MVP scope (v1.1A CN) into implementable engineering constraints and a stable architecture baseline for SoloSales.

## Architecture overview

- **API**: exposes order lifecycle, client/admin actions, downloads, disputes.
- **DB (Prisma/Postgres)**: stores orders, status transitions, pricing/rules versions, wallet ledger, provider audits, qualification reports, email events.
- **Queue (BullMQ)**: executes external provider calls, enrichment steps, QA checks, email sequences, webhooks processing.
- **External services**:
  - Stripe: payments / checkout
  - RocketReach (+ others): data providers
  - SendCloud: outbound email + webhooks

## Data flow (high level)

1. Client registers + email verifies.
2. Client tops up credits (Stripe) → wallet ledger records top-up.
3. Client creates order → system locks `pricing_version` + `rules_version` and freezes credits.
4. Queue executes list building / provider calls → audits each call.
5. QA#1 (List Building QA): pass → continue; fail/cancel → release frozen credits.
6. If MQL enabled: nurture emails, scoring, qualification decision (versioned rules).
7. QA#2 (MQL QA): qualified → deduct; unqualified → release.
8. Delivery: downloadable leads + Qualification Reports.
9. Disputes/refunds: within window, reason codes, evidence attached, HITL arbitration audit.

## Failure cases / resilience

- **Provider rate limits/outages**: pause lifecycle step, retry with backoff, circuit-breaker for RocketReach.
- **Webhook duplication** (email/events): idempotent processing keyed by provider message/event id.
- **Partial processing**: ensure each step is restartable; store durable checkpoints per order/job.
- **Billing mismatches**: enforce version locks and ledger invariants; audits are append-only.

## Rollback plan

- Changes should be additive where possible (new tables/fields).
- Any migration must be reversible or have a documented data recovery path.
- Feature flags recommended for:
  - new QA gates
  - provider integration switching/degradation paths
  - email sending enablement

## Open questions (to resolve before implementation)

- Exact status enum names + mapping to frontend labels.
- Ledger invariants and reconciliation process.
- Qualified Lead required fields list (per order type).
- “Evidence chain” minimal schema (what fields are mandatory).
