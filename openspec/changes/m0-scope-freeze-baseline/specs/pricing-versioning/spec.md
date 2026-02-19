# pricing-versioning

## 新增需求

### 需求: 订单创建锁定版本
每个订单创建时必须锁定：`pricing_version` 与 `rules_version`。

#### 场景: 后续改价不影响历史订单
- Given: 系统更新了定价版本
- When: 查询历史订单应付费用
- Then: 按订单锁定的 `pricing_version` 计算

### 需求: SKU Snapshot 可审计
List Building SKU 的选择必须以 snapshot 形式锁定在订单上（可审计）。

#### 场景: 复核订单价格
- Given: Client 对价格提出疑问
- When: Admin 查看订单
- Then: 能看到当时 SKU snapshot 与单价来源

### 需求: 支持 MQL 行业定价
若启用 MQL，系统必须支持按行业/规则版本的定价计算。

#### 场景: 不同行业同一 SKU 价格不同
- Given: 两个行业的 MQL 定价不同
- When: 创建订单
- Then: 订单锁定并使用正确行业定价
