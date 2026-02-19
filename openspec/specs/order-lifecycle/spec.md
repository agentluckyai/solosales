# order-lifecycle

## 目的

定义订单从创建到关闭的端到端状态机，并要求对 Client 可见、对后端可审计，且在外部依赖异常时可暂停/恢复。

## 需求

### 需求: 端到端订单状态机
系统必须支持订单生命周期：

`created → planned → sourced → enriched → nurtured → initial_list → scored → qa_gate → qualified_leads → delivered → closed`

#### 场景: Client 查看订单进度
- **当** Client 打开订单详情页
- **那么** 系统展示当前状态与状态流转时间线

### 需求: 状态流转可追踪（审计）
系统必须记录每次状态流转：`from_status`, `to_status`, `at`, `actor(system/admin/client)`, `reason(可选)`，以及可选的关联 job/event 标识。

#### 场景: 追溯一次失败重试
- **当** 外部调用失败导致流程暂停或重试
- **那么** 审计记录包含失败原因与关联的 job/event id

### 需求: 外部依赖可暂停/恢复
当 provider outage / rate limit 等外部依赖不可用时，流程必须可暂停并可恢复；暂停必须有原因说明与下一步提示。

#### 场景: Provider 限流导致暂停
- **当** RocketReach 返回 rate limit
- **那么** 订单进入可解释的暂停状态，并可在恢复后从最后安全步骤继续
