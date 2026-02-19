# wallet-ledger (delta)

## 修改需求

### 需求: 账本闭环 v1（实现落地）
系统必须实现并对外提供（API 或内部服务接口）以下账本能力：充值入账、赠送、冻结、扣减、释放、退款、手工调账；所有事件必须 append-only 可审计，并且关键写入必须幂等。

#### 场景: 重复扣减不发生重复扣费
- Given: 同一订单的 QA#2 结果重复上报两次
- When: 系统执行 DEDUCT
- Then: 只产生一条扣减账本事件，余额只减少一次

#### 场景: QA#1 失败释放冻结
- Given: 下单已冻结 credits
- When: QA#1 判定失败
- Then: 系统释放冻结并记录 RELEASE 事件，余额恢复

### 需求: 冻结事件必须锁定版本
FREEZE/DEDUCT/RELEASE 相关事件必须引用订单锁定的 `pricing_version` 与 `rules_version`。

#### 场景: 后续改价不影响冻结版本
- Given: 系统更新了 pricing_version
- When: 查看历史订单的冻结/扣减记录
- Then: 记录仍引用订单创建时锁定的版本
