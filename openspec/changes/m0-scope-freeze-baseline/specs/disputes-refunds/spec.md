# disputes-refunds

## 新增需求

### 需求: 交付后 7 天争议/退款窗口 + 理由代码
必须支持交付后 7 天内提出争议/退款，并要求 reason codes。

#### 场景: 超过窗口拒绝
- Given: 已交付超过 7 天
- When: Client 提交争议
- Then: 系统拒绝并提示窗口规则

### 需求: 自动附带证据链
争议必须自动附带证据链（Qualification Report）。

#### 场景: 提交争议时自动附带报告
- Given: Client 对某条 lead 争议
- When: 提交 dispute
- Then: 关联的 Qualification Report 自动附加到争议记录

### 需求: Admin/HITL 仲裁留痕
Admin/HITL 仲裁必须留痕（可审计）。

#### 场景: 仲裁通过并退款
- Given: Admin 判定争议成立
- When: 执行退款
- Then: 仲裁记录包含决策与证据引用

### 需求: 优先返还 credits，必要时原路退款
优先返还 credits；必要时原路退款；账本必须可审计。

#### 场景: 优先返还 credits
- Given: 争议成立
- When: 处理退款
- Then: credits 返还优先，账本记录 refund
