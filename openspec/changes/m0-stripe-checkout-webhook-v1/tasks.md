# Tasks — m0-stripe-checkout-webhook-v1

## Definition of Ready
- [ ] proposal.md/design.md/tasks.md complete
- [ ] `openspec-cn validate m0-stripe-checkout-webhook-v1` is ✅

## 1) Webhook infra (owner: coder)
- [ ] 1.1 Add webhook route + signature verification
- [ ] 1.2 Persist stripe events (id, type, payload hash, received_at, processed_at, status)

## 2) Checkout (owner: coder)
- [ ] 2.1 Create Stripe Checkout session for top-up
- [ ] 2.2 Enforce email verification gating

## 3) Idempotent processing (owner: coder)
- [ ] 3.1 Implement event processing with idempotency on stripe_event_id
- [ ] 3.2 Map PaymentIntent succeeded → TOPUP ledger entry
- [ ] 3.3 Map refunds → REFUND ledger entry / Stripe refund

## 4) Tests (owner: qa)
- [ ] 4.1 Unit test: duplicate webhook does not double-credit
- [ ] 4.2 Integration test: checkout happy path credits wallet
- [ ] 4.3 Integration test: refund reverses credits (policy)
