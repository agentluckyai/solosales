# payments-stripe

## 新增需求

### 需求: Stripe Checkout + 3DS
必须支持 Stripe Checkout，并支持 3DS。

#### 场景: 3DS 支付
- Given: 银行要求 3DS
- When: Client 完成支付
- Then: 支付成功完成并回写订单/充值状态

### 需求: 下单/支付前置条件
未注册或未邮箱验证的用户不允许下单/支付；必须收集账单信息。

#### 场景: 未邮箱验证禁止支付
- Given: 用户未完成邮箱验证
- When: 试图进入 checkout
- Then: 系统拒绝并引导完成验证

### 需求: 首单风控额度可配置
首单风控额度（或其它风控策略）必须可配置。

#### 场景: 首单超限
- Given: 首单金额超过配置上限
- When: 发起支付
- Then: 系统阻止并记录风控原因
