# qualification

## 目的

定义 MVP 阶段 Qualified Lead 的判定规则：版本化、可解释、可追溯，并为后续争议/仲裁提供依据。

## 需求

### 需求: Qualified Lead 判定（MVP）
Lead 被判定为 Qualified 必须同时满足：
- 必填字段完整度 100%
- ICP 匹配通过
- ICP 评分 ≥ 75
- 去重通过
- 置信度阈值通过

#### 场景: 必填字段不全
- **当** lead 缺少必填字段
- **那么** lead 不应被标记为 Qualified，且报告列出缺失字段

### 需求: 规则版本化
系统必须在每次判定中引用 `rules_version`；若订单开启 MQL，MQL 规则也必须版本化并纳入判定。

#### 场景: 规则升级不影响已创建订单
- **当** 系统发布了新规则版本
- **那么** 历史订单仍使用其锁定的 `rules_version` 完成判定

### 需求: 可解释、可追溯
系统必须保留关键依据（signals）与证据引用（evidence refs），用于复核与仲裁。

#### 场景: Admin/HITL 复核
- **当** Client 对某条 lead 提出争议
- **那么** Admin/HITL 可查看 ICP 得分、去重 key、置信度阈值与证据来源
