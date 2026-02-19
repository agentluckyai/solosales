# payments-stripe (delta)

## 修改需求

### 需求: Webhook 幂等处理
系统必须通过 Stripe webhook 回写支付与退款结果；webhook 处理必须幂等，重复投递不会产生重复入账/重复退款。

#### 场景: 重复支付成功事件
- Given: Stripe 同一 event 被重复投递
- When: webhook handler 处理该 event
- Then: 只产生一次 TOPUP 入账

### 需求: 签名校验与审计
系统必须校验 webhook 签名，并记录审计信息（至少包含 stripe_event_id, type, received_at, processing status）。

#### 场景: 签名错误拒绝
- Given: webhook 签名不合法
- When: 请求到达
- Then: 系统拒绝处理并记录审计
