# Design — m0-wallet-ledger-v1

## Key decisions

- Ledger MUST be **append-only** (no in-place edits). Corrections use compensating entries.
- Balance is derived from ledger (preferred) or maintained as cached projection with reconciliation.
- All write operations MUST be idempotent.

## Data model (proposed)

- `wallets` (per account/client)
  - id, account_id, currency(USD), credits_balance_cached (optional), created_at
- `ledger_entries`
  - id
  - wallet_id
  - type: TOPUP | GIFT | FREEZE | DEDUCT | RELEASE | REFUND | ADJUST
  - amount_credits (signed)
  - refs: order_id?, payment_intent_id?, dispute_id?
  - pricing_version?, rules_version? (required for FREEZE/DEDUCT/RELEASE)
  - idempotency_key (unique per wallet + type scope)
  - actor: system | admin | client
  - meta (json)
  - created_at

## Idempotency strategy

- For externally-triggered writes (Stripe webhooks, admin actions): require an explicit idempotency key.
- For internal flows (order freeze/deduct/release): compute deterministic idempotency key from (order_id, action, version).
- Enforce uniqueness at DB level.

## Flow: order freeze → QA → deduct/release

1) On order creation, system MUST create FREEZE entries for list_building (+ optional mql) with locked pricing/rules versions.
2) QA#1 fail/cancel → RELEASE corresponding frozen amount.
3) QA#2 pass → DEDUCT (frozen → deducted).

## Failure cases

- Duplicate requests/webhooks: idempotency key prevents double-write.
- Partial failures: operations are transactional; retries safe.
- Negative balance prevention: DEDUCT MUST fail if available credits insufficient (unless admin override).

## Rollback

- DB migrations are additive; rollback via down migration or documented recovery.
- Feature flag for enabling wallet enforcement on order creation.
