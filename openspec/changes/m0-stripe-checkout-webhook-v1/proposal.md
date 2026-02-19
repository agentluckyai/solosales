## 为什么

MVP 必须支持 Stripe Checkout + 3DS，并且支付结果需要通过 webhook 回写到钱包/订单状态。Webhook 天生可能重复投递或乱序，因此我们需要最小闭环：checkout 创建→支付确认→入账→（可选）退款/争议路径，并保证幂等与可审计。

## 变更内容

- 实现 Stripe Checkout（充值/购买 credits）与 3DS。
- 实现 Stripe webhooks：支付成功/失败、退款事件等，并做到幂等。
- 打通最小退款/争议路径：在符合规则的情况下触发 credits 返还或原路退款（先做最小闭环，复杂仲裁后续迭代）。

## 功能 (Capabilities)

### 新增功能
- `payments-stripe`: Stripe Checkout + 3DS + webhook 幂等处理

### 修改功能
- `wallet-ledger`: 支付成功入账、退款出账与审计

## 验收口径（DoD）

- 能在测试环境完成 Checkout + 3DS，并通过 webhook 正确入账。
- webhook 重复投递不产生重复入账/重复退款（幂等）。
- 退款最小路径可执行并可审计。
- 关键事件有审计字段（stripe event id / payment intent id / amount / at / actor）。

## 非目标

- Stripe Radar / Identity（Post-MVP）。
- 复杂争议仲裁 UI（先做最小可用闭环）。
