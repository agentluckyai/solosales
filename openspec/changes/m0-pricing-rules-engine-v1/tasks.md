# Tasks — m0-pricing-rules-engine-v1

## Definition of Ready
- [ ] proposal.md/design.md/tasks.md complete
- [ ] `openspec-cn validate m0-pricing-rules-engine-v1` is ✅

## 1) Spec delta (owner: pm)
- [ ] 1.1 Confirm SKU list for MVP + industry pricing needs

## 2) DB + migrations (owner: coder)
- [ ] 2.1 Add pricing versions + rules tables
- [ ] 2.2 Add order snapshot fields (pricing_version, rules_version, sku_snapshot)

## 3) Rule engine (owner: coder)
- [ ] 3.1 Implement rule evaluation function
- [ ] 3.2 Integrate into order create (locks versions)

## 4) Admin API (owner: coder)
- [ ] 4.1 CRUD draft version + rules
- [ ] 4.2 Publish version

## 5) Tests (owner: qa)
- [ ] 5.1 Unit tests for rule evaluation
- [ ] 5.2 Integration: order locks version and stays stable across pricing updates
