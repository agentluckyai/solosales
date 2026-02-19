## 为什么

MVP 冻结要求订单创建时锁定 `pricing_version` + `rules_version`，并支持 List Building SKU 与（可选）MQL 行业定价。为了避免后续改价引发争议与返工，需要一个最小可用的“定价规则引擎 + 管理入口”，能配置版本、生成 snapshot、并在订单创建时稳定使用。

## 变更内容

- 实现 pricing/rules version 的数据模型与锁定逻辑。
- 实现最小规则引擎：根据 SKU +（可选）行业 + 版本，计算 credits 价格。
- 实现 Admin 最小配置入口（API 即可）：创建/发布新版本、查询历史版本。
- 订单创建时锁定版本 + SKU snapshot（可审计）。

## 功能 (Capabilities)

### 新增功能
- `pricing-versioning`: 版本锁定与 SKU snapshot（实现落地）

### 修改功能
- `wallet-ledger`: 冻结引用 pricing/rules version（集成点）

## 验收口径（DoD）

- Admin 可以创建并发布定价版本；旧版本可查询。
- 创建订单时锁定版本 + SKU snapshot。
- 同一订单后续计算费用始终使用锁定版本。
- 有最小测试覆盖核心场景。

## 非目标

- 完整图形化管理 UI。
- 复杂促销/折扣体系（后续）。
