## 为什么

MVP 范围冻结要求“credits 钱包/账本闭环”作为计费与 QA 的基础设施：充值/赠送/冻结/扣减/释放/退款必须可审计、可追溯，并且与订单的 pricing/rules version 锁定一致。当前仓库仅有骨架与高层规范，需要一个实现型 change 将其落到可运行的 API + DB 模型 + 最小前台/管理入口（如必要）。

## 变更内容

- 实现 credits 钱包与账本 v1：充值入账、赠送、冻结、扣减、释放、退款/chargeback、手工调账。
- 为每笔账本事件建立不可篡改审计记录（append-only）。
- 与订单创建的 `pricing_version` + `rules_version` 锁定对齐（冻结/扣减/释放事件必须引用锁定版本）。
- 明确并冻结 credits model（spec 1.1）：最小充值、汇率、加赠阶梯、消费顺序、退款/chargeback 处理。
- 提供最小 API：查询余额/账本、创建手工调账（Admin/HITL）、订单冻结/扣减/释放接口（服务端内部调用也可）。

## 功能 (Capabilities)

### 新增功能
- `wallet-ledger`: credits 钱包/账本闭环（实现层）

### 修改功能
- `order-lifecycle`: 在订单创建/QA 过程中调用冻结/扣减/释放（仅接口集成，不改状态机定义）

## 验收口径（DoD）

- 功能：充值、加赠、冻结、扣减、释放、退款/chargeback、手工调账均可通过 API 驱动完成。
- Credits model（spec 1.1）冻结并可实现：
  - 最小充值：$200；允许自定义金额（>= $200）
  - 汇率：$1 = 10 credits（1 credit = $0.10）
  - Tier bonus（按单笔充值）：$200–$999 无；$1000–$1999 +10%；>= $2000 +15%
  - 消费顺序：先扣 paid credits；bonus 不先消耗
  - 退款/chargeback：先全额回收该笔 bonus；再仅对未消耗的 paid credits 退款（不允许退款使余额为负；若余额不足回收 bonus 则拒绝或需人工处理）
- 审计：所有账本事件可追溯（事件类型、金额、余额变化、关联订单/支付/争议、操作者、原因/证据、时间）。
- 幂等：关键写入接口（如 webhook/扣减/释放/退款）具备幂等键或等价机制，重复请求不会产生重复扣费/重复入账。
- 迁移：Prisma migration 可在空库与已有数据上安全执行；提供回滚策略。
- 测试：至少覆盖核心场景（见 delta spec 场景），并覆盖“退款时先回收 bonus”的逻辑。

## 非目标

- 完整 Admin UI（仅最小入口/接口即可）。
- 复杂对账报表导出（后续迭代）。

## 影响

- 新增/调整 DB 表（wallet、ledger entries、adjustments 等）。
- 新增后端 API/服务模块；可能影响订单创建与 QA 流程的调用点。
