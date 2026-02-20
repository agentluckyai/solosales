# Design — m0-wallet-ledger-v1

## Key decisions

- Ledger MUST be **append-only** (no in-place edits). Corrections use compensating entries.
- Balance is derived from ledger (preferred) or maintained as cached projection with reconciliation.
- All write operations MUST be idempotent.
- Credits model (spec 1.1) is frozen for implementation (see below).

## Credits model (spec 1.1 frozen)

### Top-up
- Minimum top-up: **$200**
- Custom amount: **allowed** (>= $200)
- FX: **$1 = 10 credits** (1 credit = $0.10)

### Tier bonus (per single top-up)
- $200–$999: **no bonus**
- $1000–$1999: **+10%** bonus credits (computed on base credits)
- >= $2000: **+15%** bonus credits (computed on base credits)

### Consumption + refund/chargeback
- Consumption order: **paid credits first**; bonus credits are not consumed before paid credits.
- Refund/chargeback order:
  1) **reclaim full bonus** for that top-up first
  2) then refund only the remaining **unconsumed paid credits**
- Guardrail: refunds MUST NOT make wallet negative; if balance is insufficient to reclaim bonus, default behavior is **deny refund / require HITL**.

Implication: the system MUST be able to attribute balances to **paid vs bonus buckets** (or per-topup lots) so that the above ordering is enforceable and auditable.

## Data model (proposed)

- `wallets` (per account/client)
  - id, account_id, currency(USD)
  - paid_credits_balance (cached)
  - bonus_credits_balance (cached)
  - credits_balance_cached (optional projection = paid + bonus)
  - created_at
- `ledger_entries`
  - id
  - wallet_id
  - entry_type: TOPUP | BONUS | FREEZE | DEDUCT | RELEASE | REFUND | CHARGEBACK | ADJUST
  - amount_credits (signed)
  - refs: order_id?, topup_id?, payment_intent_id?, dispute_id?
  - pricing_version?, rules_version? (required for FREEZE/DEDUCT/RELEASE)
  - idempotency_key (unique per wallet + entry_type scope)
  - actor_type: system | admin | client
  - actor_id?
  - reason_code
  - external_ref (e.g., webhook_event_id / request_id)
  - balance_before_paid, balance_after_paid
  - balance_before_bonus, balance_after_bonus
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
