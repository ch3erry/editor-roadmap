# 第一阶段 REQ-02

## 名称
让静态任务板变成数据驱动的交互视图

## 状态
已完成

## 背景
`REQ-01` 的目标是完成静态页面、组件拆分和基础样式落地。到这一轮，应用已经有了清晰的组件树和静态任务数据，但页面还没有真正进入 React 最有价值的部分：状态驱动 UI。

`REQ-02` 的重点不是继续堆功能，而是通过一个足够小的交互闭环，系统练习以下能力：
- `useState`
- 状态上提
- 派生数据
- props 驱动子组件
- 条件渲染
- 事件从子组件向父组件回传

本需求将严格保持在“视图层交互”范围内，不修改任务数据本身，也不引入新增、删除或持久化。

## 目标
在不改变任务数据源的前提下，让任务板支持筛选视图切换，并让摘要卡片和任务列表由同一份任务数据派生而来。

学习者完成本需求后，应能清楚解释：
- 为什么 `filter` 状态应放在 `App`
- 什么是“单一事实来源”
- 哪些值是“状态”，哪些值是“派生值”
- 为什么 `FilterBar` 不应该自己保存筛选结果

## 核心学习目标
- 学会使用 `useState` 管理页面级本地状态
- 理解“共享状态放到共同父组件”的设计原则
- 学会从原始数据派生 UI 所需统计值，而不是重复维护多份状态
- 学会通过 props 将状态和回调传给子组件
- 学会使用条件渲染让列表随筛选条件变化
- 学会在一个真实但规模很小的页面中维护数据流清晰度

## 非目标
本需求明确不做以下内容：
- 点击任务卡切换完成状态
- 新增任务
- 删除任务
- 编辑任务
- `localStorage`
- 自定义 Hook
- 状态管理库
- 路由
- 远程数据获取
- 视觉重做或新一轮高保真精修

## 功能需求
### 1. 统一状态位置
- `App.tsx` 必须成为本轮唯一的筛选状态持有者。
- 本轮推荐的筛选值为：
  - `all`
  - `in-progress`
  - `completed`
- `tasks` 仍然保持为导入的静态数据，不改为 `useState`。

### 2. 派生摘要数据
- `SummaryCards` 不再渲染硬编码的 `4 / 2 / 2`。
- `App` 必须基于 `tasks` 计算并传入：
  - `total`
  - `completed`
  - `pending`
- 这三个值必须是派生值，而不是第二份独立状态。

### 3. 派生筛选后列表
- `App` 必须基于当前 `filter` 和静态 `tasks` 计算 `filteredTasks`。
- `TaskList` 接收的应是筛选后的任务数组，而不是始终接收原始 `tasks`。

### 4. 激活 FilterBar 交互
- `FilterBar` 的三个按钮必须可点击。
- 点击不同按钮时，应触发父组件更新 `filter`。
- 当前激活按钮必须有明显视觉状态。

### 5. 条件渲染任务列表
- 当 `filter = all` 时，显示全部任务。
- 当 `filter = in-progress` 时，只显示状态为 `进行中` 的任务。
- 当 `filter = completed` 时，只显示状态为 `已完成` 的任务。

### 6. 可选空态
- 如果筛选结果为空，可以显示一条简单空态文案。
- 空态不要求额外设计稿支持，但文案必须克制，不喧宾夺主。
- 如果当前静态数据无法自然触发空态，可将其作为可选延伸，不作为阻塞验收项。

## 组件职责变化
### App
- 新增 `filter` 状态
- 负责计算：
  - `filteredTasks`
  - `totalCount`
  - `completedCount`
  - `pendingCount`
- 负责把状态和派生值通过 props 传给子组件

### FilterBar
- 从静态组件变为受控展示组件
- 接收：
  - `activeFilter`
  - `onFilterChange`
- 自身不持有筛选状态

### SummaryCards
- 从静态文案组件变为展示型动态组件
- 接收：
  - `total`
  - `completed`
  - `pending`
- 只负责展示，不负责计算

### TaskList
- 继续保持展示型列表组件
- 接收已经过滤后的任务数组
- 不负责定义筛选规则

### TaskCard
- 继续负责单项展示
- 本轮不新增点击行为

## 推荐数据流
本轮应明确采用如下数据流：

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

原则：
- `tasks` 是唯一数据源
- `filter` 是唯一交互状态
- 统计值和筛选结果全部由上层派生

## 验收标准
- 页面能正常运行，点击筛选按钮不会报错
- `FilterBar` 的激活态随点击变化
- `TaskList` 内容会随筛选条件变化
- `SummaryCards` 的数据不再是硬编码静态副本
- `App` 中不存在多余的重复状态，例如：
  - `totalCount` 用 `useState` 保存
  - `completedCount` 用 `useState` 保存
- `TaskList` 仍然只负责展示，不额外承担筛选逻辑
- TypeScript 无阻塞性错误
- `npm run build` 通过

## 启动指令
从仓库根目录运行：

```bash
cd stage-01-react-pages/app
npm run dev
```

本轮开发前建议先确认：
- `REQ-01` 页面可正常启动
- `index.html` 的挂载节点仍是 `root`
- 构建命令可正常通过

## 建议文件边界
本轮优先修改以下文件：

```text
stage-01-react-pages/app/src/
  App.tsx
  components/
    FilterBar.tsx
    SummaryCards.tsx
    TaskList.tsx
```

可选：
- 如果你希望把筛选值类型单独抽出，可以新增 `types/filter.ts`
- 但推荐先把联合类型定义留在 `App.tsx` 附近，避免过早抽象

## 常见坑点
- 把 `filter` 状态写进 `FilterBar`，导致数据流分裂
- 把统计值也写成 `useState`，造成重复状态
- 在 `TaskList` 内部重新实现筛选逻辑，导致职责混杂
- 让 `TaskCard` 提前承担点击切换状态的职责
- 为未来需求提前加入 `localStorage` 或任务编辑逻辑
- 只改按钮样式，不真正让列表渲染依赖状态

## 审查重点
- 学习者是否理解为什么状态放在 `App`
- 组件 props 是否最小且清晰
- 统计值是否由数据派生，而不是硬编码或冗余状态
- 列表过滤是否通过 React 数据流实现，而不是手工隐藏 DOM
- 代码是否保持 `REQ-01` 已建立的组件边界

## 手把手教学演进顺序
我们按下面这个顺序推进：

1. 明确 `REQ-02` 的边界，只做视图层交互
2. 回顾 `REQ-01` 当前组件树与数据流
3. 定义本轮最小状态模型，区分“状态”和“派生值”
4. 先设计组件契约，再开始改代码
5. 在 `App` 中引入第一个本地状态 `filter`
6. 在 `App` 中实现第一批派生值：
   - `totalCount`
   - `completedCount`
   - `pendingCount`
   - `filteredTasks`
7. 先接通 `SummaryCards`，让摘要不再写死
8. 再接通 `FilterBar`，让按钮真正驱动状态变化
9. 最后接通 `TaskList`，让列表根据筛选结果渲染
10. 补充必要的空态或无结果提示
11. 做一次完整自检和 review

## 本轮完成后的预期结果
在 `REQ-02` 结束时，任务板应表现为一个小型数据驱动页面，而不是纯静态页面：
- 顶部摘要与列表来自同一份数据源
- 筛选按钮可以改变页面展示
- 状态与派生值的边界清晰
- 页面仍然保持组件职责明确、结构干净
