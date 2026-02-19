# qualification-report

## 新增需求

### 需求: 每条 Qualified Lead 必须生成 Qualification Report
交付的 lead 必须附带 Qualification Report；不允许无报告交付。

#### 场景: Client 下载交付物
- Given: 订单已交付 qualified leads
- When: Client 下载 lead
- Then: 每条 lead 都能访问对应的 Qualification Report

### 需求: 证据链字段
Report 必须包含可追溯证据链字段（至少）：
- `source_provider`
- `fetched_at`
- `confidence`
- `rules_version`（以及关键检查的引用/结果）

#### 场景: 证据链用于仲裁
- Given: 发生争议
- When: Admin/HITL 打开 Qualification Report
- Then: 能看到 provider、抓取时间、置信度与规则版本

### 需求: 不可篡改（可追加修订）
Report 一旦与交付 lead 绑定，应保持不可变；如需修订，必须新增版本并保留历史。

#### 场景: 追加修订
- Given: 发现证据链字段需要补充
- When: 生成修订版 report
- Then: 新旧版本都可审计与追溯
