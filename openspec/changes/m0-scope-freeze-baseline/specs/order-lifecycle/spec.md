# order-lifecycle

## 新增需求

### 需求: 端到端订单状态机
系统必须支持订单生命周期（对 Client 前台可见、后端可审计）：

`created → planned → sourced → enriched → nurtured → initial_list → scored → qa_gate → qualified_leads → delivered → closed`

#### 场景: Client 查看订单进度
- Given: Client 已创建订单
- When: Client 打开订单详情页
- Then: 能看到当前状态 + 历史状态流转记录（时间/原因）

### 需求: 状态流转可追踪（审计）
每次状态流转必须记录：`from_status`, `to_status`, `at`, `actor(system/admin/client)`, `reason(可选)`，以及可选的关联 job/event 标识。

#### 场景: 追溯一次失败重试
- Given: 外部数据调用失败触发重试
- When: 系统更新订单状态（含原因）
- Then: 审计记录包含失败原因与关联的 job/event id

### 需求: 外部依赖可暂停/恢复
当外部依赖不可用（provider outage / rate limit）时，流程必须可暂停并可恢复；暂停必须有原因说明与下一步提示。

#### 场景: Provider 限流导致暂停
- Given: RocketReach 返回 rate limit
- When: 订单处于数据获取阶段
- Then: 订单进入可解释的暂停状态；恢复后从最后安全步骤继续
