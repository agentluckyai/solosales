# pricing-versioning (delta)

## 修改需求

### 需求: 定价/规则版本可配置与发布
系统必须支持 Admin 创建/发布定价与规则版本，并允许查询历史版本。

#### 场景: 发布新版本不影响历史订单
- Given: 已有订单锁定了旧版本
- When: Admin 发布新 pricing_version
- Then: 历史订单仍使用旧版本计算费用

### 需求: 订单创建锁定版本 + SKU snapshot（实现约束）
订单创建时系统必须锁定 `pricing_version` + `rules_version`，并保存 SKU snapshot 以支持审计。

#### 场景: 复核订单费用
- Given: Client 对价格提出疑问
- When: Admin 查看订单
- Then: 能看到 SKU snapshot 与对应版本
