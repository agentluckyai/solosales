# email-nurture

## 新增需求

### 需求: SendCloud 发送 + Webhook
必须支持 SendCloud API 发送，并接收 Webhook 事件。

#### 场景: 发送并收到 delivered
- Given: 系统发出一封邮件
- When: SendCloud 回调 delivered
- Then: 系统记录事件并更新对应发送记录

### 需求: 邮件事件落库（审计）
必须记录事件：send / delivered / open / click / reply / suppression。

#### 场景: 查看某封邮件全链路事件
- Given: 一次发送
- When: 查看事件列表
- Then: 能看到从 send 到 reply 的事件序列（若发生）

### 需求: 全局限流/发送窗口 + suppression list + 幂等
必须有全局限流与发送窗口；必须维护 suppression list；Webhook 处理必须幂等。

#### 场景: 重复 webhook 不产生重复记录
- Given: 相同 event 重复到达
- When: webhook handler 处理
- Then: 只保留一条事件记录（或重复被去重），无重复副作用

### 需求: MQL 订单按 lead 跑 sequence
MQL 订单每条 lead 可以跑 sequence，但必须受 suppression/过滤约束。

#### 场景: lead 在 suppression list
- Given: lead email 在 suppression list
- When: 尝试进入 sequence
- Then: 系统跳过发送并记录原因
