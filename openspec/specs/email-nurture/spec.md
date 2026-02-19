# email-nurture

## 目的

定义邮件孵化自动化（SendCloud）的发送、Webhook 事件接收、审计落库、抑制策略与幂等要求，保证可追溯且不会重复发送/重复写入。

## 需求

### 需求: SendCloud 发送 + Webhook
系统必须支持 SendCloud API 发送，并接收 Webhook 事件。

#### 场景: 发送并收到 delivered
- **当** 系统发送邮件并收到 delivered 回调
- **那么** 系统记录事件并更新对应发送记录

### 需求: 邮件事件落库（审计）
系统必须记录事件：send / delivered / open / click / reply / suppression。

#### 场景: 查看某封邮件全链路事件
- **当** 查看一封邮件的事件历史
- **那么** 能看到从 send 到 reply 的事件序列（若发生）

### 需求: 全局限流/发送窗口 + suppression list + 幂等
系统必须有全局限流与发送窗口；必须维护 suppression list；Webhook 处理必须幂等。

#### 场景: 重复 webhook 不产生重复记录
- **当** 相同 event 重复到达
- **那么** 系统只保留一条事件记录且无重复副作用

### 需求: MQL 订单按 lead 跑 sequence
MQL 订单每条 lead 可以跑 sequence，但必须受 suppression/过滤约束。

#### 场景: lead 在 suppression list
- **当** lead email 在 suppression list
- **那么** 系统跳过发送并记录原因
