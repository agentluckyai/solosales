## 为什么

我们需要把 SoloSales MVP（v1.1A CN）的范围冻结、验收口径、计费/QA规则与关键能力用“可审计的制品”固化到仓库里，作为后续开发/测试/验收的唯一对齐依据。否则需求只存在于聊天/文档里，会导致实现偏差、验收争议与返工成本上升。

## 变更内容

- 新增一组 MVP 基线规范（capabilities），覆盖：订单状态机、Qualified Lead 判定、Qualification Report、钱包 credits/ledger、pricing/rules version 锁定、支付、外部数据源/队列与审计、邮件孵化、争议与退款、权限模型、SKU/定价管理等。
- 明确 Must/Should/Could/Out-of-scope 的边界与验收口径。
- 明确计费拆分与 QA 次数规则，并要求所有关键决策可追溯（规则版本 + 证据链）。

## 功能 (Capabilities)

### 新增功能
- `order-lifecycle`: 订单端到端状态机（可见/可追踪/可暂停继续）
- `qualification`: Qualified Lead 判定（含 ICP、置信度、去重、规则版本化与可解释性）
- `qualification-report`: 线索 Qualification Report（证据链）
- `wallet-ledger`: Credits 钱包与账本（充值/赠送/冻结/扣减/释放/退款；与 QA 对齐）
- `pricing-versioning`: 定价版本与规则版本锁定（订单创建锁定；SKU snapshot 可审计）
- `payments-stripe`: Stripe Checkout + 3DS（注册/邮箱验证/账单信息/首单风控）
- `external-data-providers`: 外部数据源集成（RocketReach 主 + 其他；队列/限流/熔断/降级；审计落库；校验）
- `email-nurture`: 邮件孵化自动化（SendCloud；Webhook；抑制/限流/幂等；事件审计）
- `disputes-refunds`: 争议与退款（7 天窗口；理由代码；证据链；HITL 仲裁留痕；优先返还 credits）
- `auth-permissions`: 权限模型（Client vs Admin/HITL）

### 修改功能
- （无）

## 影响

- 在仓库中引入/扩充 `openspec/specs/` 作为需求“source of truth”，后续所有实现与验收将对齐这些规范。
- 后续 API、DB schema、队列 worker、支付与邮件集成的实现将以这些规范为约束。
