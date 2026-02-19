# qualification-report

## 目的

确保每条交付的 Qualified Lead 都附带可审计的 Qualification Report（证据链），作为计费、验收与争议仲裁的依据。

## 需求

### 需求: 每条 Qualified Lead 必须生成 Qualification Report
交付的 lead 必须附带 Qualification Report；禁止无报告交付。

#### 场景: Client 下载交付物
- **当** 订单已交付 qualified leads
- **那么** 每条 lead 都能访问对应的 Qualification Report

### 需求: 证据链字段
Report 必须包含可追溯证据链字段（至少）：`source_provider`, `fetched_at`, `confidence`, `rules_version`（以及关键检查的引用/结果）。

#### 场景: 证据链用于仲裁
- **当** 发生争议需要复核
- **那么** 报告可展示 provider、抓取时间、置信度与规则版本

### 需求: 不可篡改（可追加修订）
Report 与交付 lead 绑定后必须保持不可变；如需修订，必须新增版本并保留历史。

#### 场景: 追加修订
- **当** 需要补充证据链字段
- **那么** 系统创建新版本报告并保留旧版本以供审计
