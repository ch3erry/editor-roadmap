# Loop2：REQ-02 数据驱动视图与筛选交互

## 本轮目标
这一轮的核心不是继续堆页面，而是把 `REQ-01` 的静态任务板推进成一个真正由 React 状态驱动的交互视图。

本轮固定好的关键边界是：
- 只做视图层交互
- 不修改任务数据源
- 不做新增、删除、完成状态切换
- 不做 `localStorage`

也就是说，本轮只回答一个问题：
如何在不改变原始 `tasks` 的前提下，让筛选按钮、摘要区域和任务列表通过同一套数据流协同工作。

## 本轮最终采用的数据流

```text
App
  持有:
  - filter

  派生:
  - totalCount
  - completedCount
  - pendingCount
  - filteredTasks

  传给:
  - SummaryCards(total, completed, pending)
  - FilterBar(activeFilter, onFilterChange)
  - TaskList(tasks)
```

这里最重要的结论是：
- `tasks` 是唯一数据源
- `filter` 是唯一新增状态
- 摘要统计值和筛选后列表都是派生值

## 本轮学到的核心概念

### 1. 什么是状态，什么是派生值
- `state`：会随用户交互变化，而且组件需要“记住它”
- `derived value`：不需要额外保存，只要根据已有数据计算即可

放到当前任务板中，对应关系是：

```text
状态:
- filter

派生值:
- totalCount
- completedCount
- pendingCount
- filteredTasks
```

这里最容易犯的错误是把所有东西都塞进 `useState`。这轮反复强调的一点是：

> 能根据现有数据算出来的值，就不应该再额外存成状态。

例如：

```ts
const completedCount = tasks.filter((task) => task.status === '已完成').length
```

这不是状态，而是每次组件重新执行时顺手算出来的结果。

### 2. React 组件为什么会“重新算一遍”
React 组件本质上是函数。像下面这样：

```ts
function App() {
  const [filter, setFilter] = useState('all')
  const filteredTasks = ...
  const completedCount = ...
  return (...)
}
```

当执行：

```ts
setFilter('completed')
```

React 会重新执行 `App`。在这次执行里：
- `filter` 是 React 记住的状态
- `filteredTasks`、`completedCount` 这些值会重新计算

这就是“状态触发重渲染，派生值跟着更新”的基本机制。

## 为什么 `filter` 必须放在 `App`
本轮最重要的设计决策是：`filter` 不放在 `FilterBar`，而是放在 `App`。

原因是：
- `FilterBar` 需要知道当前哪个按钮激活
- `TaskList` 需要知道当前该显示哪类任务
- 这个值会同时影响多个子组件

React 中，当一个值会影响多个子组件时，就应该把它放在它们的共同父组件里。这就是“状态上提”。

如果把 `filter` 放在 `FilterBar` 里，会出现：
- `FilterBar` 自己知道点了哪个按钮
- `TaskList` 却不知道
- 你还得额外想办法同步出去
- 数据流立刻开始变乱

所以正确的数据流是：

```text
App
  持有 filter
  ├── FilterBar <- 读取 filter，触发修改
  ├── SummaryCards <- 读取全局统计
  └── TaskList <- 读取 filteredTasks
```

## 本轮确定的组件契约

### SummaryCards
`SummaryCards` 是全局摘要，不接整包 `tasks`，也不自己计算，只接展示真正需要的 3 个数字：

```ts
type SummaryCardsProps = {
  total: number
  completed: number
  pending: number
}
```

这里选择“全局摘要”，意味着：
- 点击筛选按钮时，摘要不跟着缩小成局部统计
- 它始终反映整份任务数据

### FilterBar
`FilterBar` 从静态按钮组，演进成“受控展示组件”。

它的最小契约是：

```ts
type FilterBarProps = {
  activeFilter: FilterValue
  onFilterChange: (value: FilterValue) => void
}
```

它们分别表示：
- `activeFilter`：当前激活的是哪个筛选值
- `onFilterChange`：用户点击按钮时，通知父组件更新状态的回调

这就是受控组件的典型模式：
- 子组件不自己保存共享状态
- 子组件接收当前值
- 子组件通过回调告诉父组件“我想改成什么”

## 本轮确定的类型和值域
为了让内部状态比中文文案更稳定，本轮明确了筛选值的内部表示：

```ts
export type FilterValue = 'all' | 'in-progress' | 'completed'
```

以及页面级状态定义：

```ts
const [filter, setFilter] = useState<FilterValue>('all')
```

这里的选择有两个教学意义：
- 内部状态值和显示文案不强绑定
- 类型约束能防止把 `'pending'`、`'done'` 之类未定义值随手写进去

## 本轮的实现顺序为什么这样安排
这轮没有一开始就接 `FilterBar`，而是先接 `SummaryCards`，原因很清楚：

- `SummaryCards` 只依赖已经算好的数字
- 不涉及点击事件
- 不涉及状态修改
- 不涉及筛选逻辑分支

所以它是风险最低的第一接入点。

这也对应了一个真实开发顺序：

> 先接只读展示组件，再接可交互组件。

## 本轮最终形成的交互信号
当 `FilterBar` 接入后，三个按钮本质上是在向父组件发出 3 个不同的状态切换请求：

- 全部 -> `onFilterChange('all')`
- 进行中 -> `onFilterChange('in-progress')`
- 已完成 -> `onFilterChange('completed')`

父组件收到后：
- 更新 `filter`
- 重新计算 `filteredTasks`
- 让 `TaskList` 展示新结果

## 本轮最重要的调试收获
这轮出现过一个典型问题：
- `FilterBar` 激活态正常
- `SummaryCards` 正常
- 但 `TaskList` 一直不变

最后定位到的根因不是 `filter` 没变，也不是过滤逻辑错了，而是：

```tsx
<TaskList tasks={tasks} />
```

还在传原始数组，而不是：

```tsx
<TaskList tasks={filteredTasks} />
```

这个问题非常有代表性，因为它说明：

> 状态更新成功，不等于显示链路最后一段已经接通。

本轮最重要的一次调试结论就是：要沿着“状态 -> 派生值 -> props -> 渲染”的整条链路排查，不能只看中间某一步。

## 本轮结束后的页面能力
完成 `REQ-02` 后，任务板已经具备了这些真实交互特征：
- 筛选按钮可点击
- 当前激活按钮会高亮
- 列表内容会根据筛选条件变化
- 摘要区域来自真实数据派生，而不是静态副本
- 整个页面的数据流保持清晰，没有引入重复状态

## 本轮最值得记住的 4 句话
1. 会随交互变化并需要被 React 记住的，才是状态。
2. 能算出来的值，不要再额外存成 state。
3. 一个值会影响多个组件时，把它放在共同父组件里。
4. 调试 React 页面时，要检查整条“状态 -> 派生值 -> props -> 渲染”的链路。
