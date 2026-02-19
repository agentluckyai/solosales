# external-data-providers

## 新增需求

### 需求: M0 必须真实打通 RocketReach
M0 外部数据源必须以 RocketReach 为主并真实打通（可观测、可审计）。

#### 场景: 真实调用并拿到结果
- Given: 系统配置好 RocketReach 凭证
- When: 对一个 lead/company 执行抓取
- Then: 得到结构化结果并通过校验

### 需求: 通过队列执行（重试/限流/暂停）
所有 provider 调用必须通过队列执行，并具备：重试、限流、暂停/恢复。

#### 场景: 队列重试
- Given: provider 暂时失败
- When: 任务重试
- Then: 不产生重复扣费/重复副作用（幂等），最终成功或进入可解释失败态

### 需求: Provider 审计落库
每次调用必须记录审计字段：provider、参数 hash、耗时、HTTP 状态码、消耗、错误码。

#### 场景: 排查某次 provider 报错
- Given: 客户反馈某订单数据异常
- When: 工程师查看 provider audit
- Then: 能定位到具体调用与错误码/耗时/参数 hash

### 需求: 校验 + RocketReach 配额守门/熔断/降级
响应必须校验（例如 Zod）；RocketReach 必须具备配额守门、熔断与降级行为。

#### 场景: 配额耗尽触发降级
- Given: RocketReach quota 接近耗尽
- When: 继续发起调用
- Then: 系统触发守门/熔断并采取降级策略；订单流程可暂停/可恢复
