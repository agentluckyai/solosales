# Design — m0-pricing-rules-engine-v1

## Data model

- `pricing_versions`
  - id, version, status(draft|active|archived), created_at
- `pricing_skus`
  - id, sku_code, category, base_unit_credits, active
- `pricing_rules`
  - id, pricing_version_id, sku_id, industry?, mql_enabled?, unit_credits

- Order snapshot fields:
  - `pricing_version` (string or fk)
  - `rules_version`
  - `sku_snapshot` (json)

## Rule evaluation

- Deterministic: (sku_code, industry, mql_enabled, pricing_version) → unit_credits.
- MUST fail closed if rule not found (or use explicit default rule in same version).

## Admin API (minimal)

- Create draft version
- Add/replace rules
- Publish version (activate)
- List versions

## Failure cases

- Missing rules: return validation error at order creation.
- Concurrent publishes: enforce single active version per scope.

## Rollback

- Publishing is reversible by activating previous version.
- DB migrations additive.
