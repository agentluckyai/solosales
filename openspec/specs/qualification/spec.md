# qualification

## 新增需求

### 需求: Qualified Lead 判定（MVP）
Lead 被判定为 Qualified 必须同时满足：
- 必填字段完整度 100%
- ICP 匹配通过
- ICP 评分 ≥ 75
- 去重通过
- 置信度阈值通过

#### 场景: 必填字段不全
- Given: lead 缺少必填字段
- When: 执行 qualification
- Then: lead 不应被标记为 Qualified；报告中列出缺失字段

### 需求: 规则版本化
Qualification 必须引用 `rules_version`；若订单开启 MQL，则 MQL 规则同样必须版本化并纳入判定。

#### 场景: 规则升级不影响已创建订单
- Given: 系统更新了规则版本
- When: 对历史订单的 lead 做 qualification
- Then: 使用订单锁定的 `rules_version` 进行判定

### 需求: 可解释、可追溯
每次判定必须保留关键依据（signals）与证据引用（evidence refs），便于复核与仲裁。

#### 场景: Admin/HITL 复核
- Given: Client 对某条 lead 提出争议
- When: Admin/HITL 查看判定依据
- Then: 能看到 ICP 得分、去重 key、置信度等，以及对应证据来源
