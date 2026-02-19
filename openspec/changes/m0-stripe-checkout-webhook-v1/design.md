# Design — m0-stripe-checkout-webhook-v1

## Webhook ingestion

- Use a dedicated endpoint with signature verification.
- Persist raw event + processing status (audit).
- Processing MUST be idempotent keyed by `stripe_event_id`.

## Payment → wallet crediting

- On successful payment (PaymentIntent succeeded), create a TOPUP ledger entry.
- Enforce at-most-once by unique constraint on (wallet_id, stripe_payment_intent_id, type=TOPUP) or an explicit idempotency key.

## Refunds

- Prefer credit refunds when policy allows; otherwise trigger Stripe refund.
- Refund processing MUST be idempotent keyed by stripe refund id / event id.

## Failure cases

- Duplicate/late events: safe.
- Partial failures: event remains retryable; processing is transactional.

## Rollback

- Webhook processing behind feature flag.
- DB changes additive.
