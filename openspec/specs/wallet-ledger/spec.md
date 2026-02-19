# wallet-ledger

## 目的

定义 Credits 钱包与账本（ledger）的可审计闭环，用于支持订单冻结/扣减/释放与退款，并与 QA 流程与版本锁定一致。

## 需求

### 需求: Credits 模型
系统必须实现 Credits 模型：
- 1 USD = 10 credits
- 最低充值 200 USD
- 必须支持档位赠送（gift credits）

#### 场景: Client 最低充值限制
- **当** Client 尝试充值 < 200 USD
- **那么** 系统拒绝并提示最低充值规则

### 需求: 账本（Ledger）可审计
系统必须记录可审计账本事件：top-up / gift / freeze / deduct / release / refund。

#### 场景: 对账审计
- **当** Admin 查看某个钱包的账本
- **那么** 能看到完整链路与每笔事件的关联信息（如订单/支付/争议）

### 需求: 冻结/扣减与 QA 对齐（Must）
系统必须在下单时冻结：`list_building_credits` +（如选 MQL）`mql_credits`，并锁定 `pricing_version` + `rules_version`。
- QA#1 失败/取消：按规则释放冻结
- QA#2（MQL QA）Qualified MQL 通过：冻结转扣减；不合格：释放

#### 场景: QA#1 失败释放
- **当** QA#1 判定失败
- **那么** 系统释放冻结并记录 RELEASE 事件

#### 场景: QA#2 通过扣减
- **当** QA#2 判定 Qualified MQL 通过
- **那么** 系统将冻结转为扣减并记录 DEDUCT 事件
