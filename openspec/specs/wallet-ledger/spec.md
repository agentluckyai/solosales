# wallet-ledger

## 目的

定义 Credits 钱包与账本（ledger）的可审计闭环，用于支持订单冻结/扣减/释放与退款，并与 QA 流程与版本锁定一致。

## 需求

### 需求: Credits 模型（spec 1.1）
系统必须实现 Credits 模型（以下为冻结口径，M0 以此为准）：

#### 1.1.1 汇率
- 1 USD = 10 credits（即 1 credit = $0.10）

#### 1.1.2 最小充值 & 自定义金额
- 最低充值：200 USD
- 允许自定义金额：是（>= 200 USD）

#### 1.1.3 Tier bonus（按单笔 top-up 金额区间）
- 200–999 USD：不加赠
- 1000–1999 USD：加赠 10%（按该笔 base credits 的百分比计算）
- >= 2000 USD：加赠 15%（按该笔 base credits 的百分比计算）

#### 1.1.4 消费与退款/chargeback（冻结规则）
- 消费扣减顺序：先扣 paid credits；bonus credits 不先消耗
- 退款/chargeback 顺序：
  1) 先全额回收该笔 top-up 对应的 bonus credits
  2) 再仅对未消耗的 paid credits 退款
- 约束：不允许退款使钱包余额为负；若余额不足以回收 bonus，默认拒绝退款或进入 HITL（人工处理）

> 例：充值 $1500 → paid=15000, bonus=1500, 总计 16500。
> 若已消耗 5000（从 paid 扣）后退款：先回收 bonus 1500；再对剩余 paid 10000 退款（对应 $1000）。

#### 1.1.5 Ledger 必须记录的审计字段（最低合规集合）
- 关联：wallet_id，topup_id?，order_id?，payment_intent_id?，dispute_id?，external_ref（webhook_event_id / request_id）
- 事件：entry_type（TOPUP/BONUS/FREEZE/DEDUCT/RELEASE/REFUND/CHARGEBACK/ADJUST），amount_credits(±)
- 幂等：idempotency_key（唯一约束：wallet_id + entry_type + idempotency_key）
- 版本锁定（FREEZE/DEDUCT/RELEASE 必填）：pricing_version，rules_version
- 操作者：actor_type（system/admin/client），actor_id?
- 审计：reason_code，created_at，meta(json)
- 余额：balance_before / balance_after（至少记录总余额；如需严格实现 1.1.4，建议额外记录 paid/bonus before/after）

#### 场景: Client 最低充值限制
- **当** Client 尝试充值 < 200 USD
- **那么** 系统拒绝并提示最低充值规则

### 需求: 账本（Ledger）可审计
系统必须记录可审计账本事件：top-up / gift / freeze / deduct / release / refund。

#### 场景: 对账审计
- **当** Admin 查看某个钱包的账本
- **那么** 能看到完整链路与每笔事件的关联信息（如订单/支付/争议）

### 需求: 冻结/扣减与 QA 对齐（Must）
系统必须在下单时冻结：`list_building_credits` +（如选 MQL）`mql_credits`，并锁定 `pricing_version` + `rules_version`。
- QA#1 失败/取消：按规则释放冻结
- QA#2（MQL QA）Qualified MQL 通过：冻结转扣减；不合格：释放

#### 场景: QA#1 失败释放
- **当** QA#1 判定失败
- **那么** 系统释放冻结并记录 RELEASE 事件

#### 场景: QA#2 通过扣减
- **当** QA#2 判定 Qualified MQL 通过
- **那么** 系统将冻结转为扣减并记录 DEDUCT 事件
