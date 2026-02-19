# wallet-ledger

## 新增需求

### 需求: Credits 模型
系统必须实现 Credits 模型：
- 1 USD = 10 credits
- 最低充值 200 USD
- 必须支持档位赠送（gift credits）

#### 场景: Client 最低充值限制
- Given: Client 尝试充值 < 200 USD
- When: 发起支付
- Then: 系统拒绝并提示最低充值规则

### 需求: 账本（Ledger）可审计
系统必须记录可审计账本事件：top-up / gift / freeze / deduct / release / refund。

#### 场景: 对账审计
- Given: 一笔订单完成
- When: Admin 查看账本
- Then: 能看到完整链路：充值/冻结/扣减/释放/退款（如有）

### 需求: 冻结/扣减与 QA 对齐（Must）
系统必须在下单时冻结：`list_building_credits` +（如选 MQL）`mql_credits`，并锁定 `pricing_version` + `rules_version`。
- QA#1 通过：继续；失败/取消：按规则释放冻结
- QA#2（MQL QA）Qualified MQL 通过：冻结转扣减；不合格：释放

#### 场景: QA#1 失败释放
- Given: 下单已冻结 credits
- When: QA#1 判定失败
- Then: 对应冻结金额被释放，账本记录 release

#### 场景: QA#2 通过扣减
- Given: MQL 订单已冻结 list+mql credits
- When: QA#2 判定 Qualified MQL 通过
- Then: 冻结转为扣减，账本记录 deduct
