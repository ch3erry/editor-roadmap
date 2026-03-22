# 第一阶段 REQ-03

## 名称
让任务板真正可用：新增任务、状态切换与本地持久化

## 状态
已完成

## 背景
到 `REQ-02` 为止，任务板已经具备：
- 静态页面结构
- 组件拆分
- 筛选视图交互
- 基于同一份数据源派生摘要和列表

但它还不是一个真正可用的小应用，因为：
- 任务不能新增
- 任务状态不能切换
- 刷新页面后数据不会保留

`REQ-03` 的目标，就是让第一阶段以一个“小而完整”的本地任务应用收口，而不是停留在演示级页面。

## 目标
在保持当前单页结构不变的前提下，为任务板加入：
- 新增任务
- 完成状态切换
- `localStorage` 本地持久化
- 必要的轻量目录整理

学习者完成本需求后，应能清楚解释：
- 为什么 `tasks` 在这一轮必须变成真正的 React 状态
- 为什么 `localStorage` 应在 `App` 层接入
- 为什么 `TaskForm` 不应直接构造完整 `Task`
- 为什么 `TaskCard` 只负责发出切换事件，而不是自己修改全局数据

## 核心学习目标
- 学会让静态数据演进成真正可变状态
- 学会设计最小表单输入模型
- 学会通过回调让子组件驱动父组件更新状态
- 学会使用 `useEffect` 把状态变化写回浏览器本地存储
- 学会从本地存储恢复状态，并为缺省场景设置回退值
- 学会做“只为当前需求服务”的轻量目录整理，而不是过度抽象

## 非目标
本需求明确不做以下内容：
- 删除任务
- 编辑任务标题或描述
- 任务拖拽排序
- 路由
- 远程 API
- 状态管理库
- 自定义 Hook
- UI 组件库
- 新一轮高保真重画

## 功能需求
### 1. 让 tasks 成为真实状态
- `App.tsx` 中的任务列表必须从静态导入演进为 React 状态。
- `data/tasks.ts` 中原有静态数据应改名为 `initialTasks`，用于初始化状态。
- 页面运行中的真实任务列表应统一命名为 `tasks`。

### 2. 新增任务表单
- 页面中必须存在 `TaskForm` 区块。
- `TaskForm` 位置为任务列表标题下方、任务列表项上方，作为 `TaskList` 区块的附属区域。
- 表单最少包含：
  - 任务标题输入
  - 任务描述输入
  - 新增任务按钮
- 新建任务默认状态必须为 `进行中`。
- 新增成功后，任务应立即出现在列表中，并驱动摘要更新。

### 3. 完成状态切换
- 每个任务卡片中必须增加独立复选框。
- 点击复选框后，应切换该任务的 `status`：
  - `进行中` -> `已完成`
  - `已完成` -> `进行中`
- 切换状态后：
  - 摘要统计必须同步更新
  - 当前筛选视图必须同步更新

### 4. localStorage 持久化
- 本轮只持久化 `tasks`。
- 页面初始化时：
  - 应优先从 `localStorage` 读取任务列表
  - 若本地无数据，则回退到 `initialTasks`
- 当 `tasks` 变化时，应将最新任务数组写入 `localStorage`
- 刷新页面后，新增任务和状态切换结果必须保留

### 5. 保持现有筛选能力可用
- `REQ-02` 已完成的筛选逻辑不能被破坏。
- 新增任务后：
  - 若当前筛选是 `all`，应立刻可见
  - 若当前筛选是 `in-progress`，由于新任务默认进行中，也应可见
- 切换任务状态后，列表应遵守当前筛选条件

### 6. 轻量目录整理
- 允许新增真正必要的组件与文件，例如：
  - `components/TaskForm.tsx`
  - `types/filter.ts`
- 若 `tasks.ts` 改名语义更清楚，应同步更新引用
- 允许增加一个极小的本地存储辅助文件，但不是强制项
- 不允许为了“看起来企业化”而引入多余抽象层

## 组件职责变化
### App
- 持有 `tasks`
- 持有 `filter`
- 负责初始化本地数据
- 负责写回 `localStorage`
- 负责新增任务
- 负责切换任务状态
- 继续负责派生：
  - `totalCount`
  - `completedCount`
  - `pendingCount`
  - `filteredTasks`

### TaskForm
- 新增组件
- 管理标题与描述的输入状态
- 通过 `onSubmit` 将输入数据交给 `App`
- 不直接生成完整 `Task`

### TaskList
- 继续接收过滤后的任务数组
- 继续负责列表渲染
- 可选择接收 `onToggleTask`

### TaskCard
- 接收：
  - `task`
  - `onToggleTask`
- 内部新增复选框
- 通过回调通知父组件切换状态

### SummaryCards
- 保持全局摘要，不切换为局部摘要
- 继续只接数字 props

### FilterBar
- 继续作为受控展示组件
- 不承担持久化和任务修改职责

## 推荐数据流

```text
App
  持有:
  - tasks
  - filter

  派生:
  - totalCount
  - completedCount
  - pendingCount
  - filteredTasks

  传给:
  - SummaryCards(total, completed, pending)
  - FilterBar(activeFilter, onFilterChange)
  - TaskForm(onSubmit)
  - TaskList(tasks, onToggleTask)
```

原则：
- `tasks` 是唯一可变数据源
- `filter` 是唯一筛选状态
- 统计值和过滤结果依旧全部由上层派生

## 验收标准
- 页面能正常运行，无阻塞性 TypeScript 错误
- 可以成功新增任务
- 新增任务后，列表和摘要立刻更新
- 可以切换任务完成状态
- 切换状态后，列表和摘要立刻更新
- 刷新页面后，新增和状态切换结果仍然存在
- `REQ-02` 的筛选能力保持可用
- `tasks` 的真实状态只存在于 `App`
- `TaskForm` 和 `TaskCard` 不直接修改全局任务数组
- `npm run build` 通过

## 启动指令
从仓库根目录运行：

```bash
cd stage-01-react-pages/app
npm run dev
```

本轮开发前建议先确认：
- `REQ-02` 已完成
- 当前筛选交互仍可正常工作
- `npm run build` 可正常通过

## 建议文件边界
本轮优先修改或新增以下文件：

```text
stage-01-react-pages/app/src/
  App.tsx
  components/
    TaskForm.tsx
    TaskList.tsx
    TaskCard.tsx
  data/
    tasks.ts
  types/
    task.ts
    filter.ts
```

可选：
- 新增极小的 `lib/storage.ts` 或 `utils/storage.ts`

## 常见坑点
- 继续把 `tasks` 当静态导入常量使用，而不是状态
- 让 `TaskForm` 自己生成完整任务对象和业务状态
- 在 `TaskCard` 内部直接修改任务数组
- 把 `filteredTasks` 再做成状态，造成重复状态
- 把 `localStorage` 逻辑塞进多个子组件，导致存储边界混乱
- 新增任务后忘记考虑当前筛选条件的影响
- 为这轮过度抽象目录结构

## 审查重点
- 学习者是否理解为什么 `tasks` 这一轮必须变成状态
- `localStorage` 是否只围绕 `tasks` 接入
- 新增任务逻辑是否在 `App`
- 切换状态逻辑是否在 `App`
- 表单输入模型是否足够小
- 筛选、摘要、新增、状态切换是否协同工作

## 手把手教学演进顺序
我们按下面这个顺序推进：

1. 明确 `REQ-03` 的边界
2. 回顾 `REQ-02` 当前数据流
3. 让 `tasks` 从静态导入演进成状态
4. 将 `data/tasks.ts` 的静态数据改名为 `initialTasks`
5. 在 `App` 中接入 `localStorage` 初始化读取
6. 在 `App` 中接入 `localStorage` 写回逻辑
7. 设计并实现 `TaskForm`
8. 在 `App` 中实现新增任务逻辑
9. 在 `TaskCard` 中加入复选框和回调出口
10. 在 `App` 中实现状态切换逻辑
11. 进行新增、切换、筛选、刷新四条主链路联调
12. 做完整自检和 review

## 本轮完成后的预期结果
在 `REQ-03` 结束时，任务板应成为一个真正可用的小型本地应用：
- 可以新增任务
- 可以切换完成状态
- 可以刷新后保留数据
- 可以继续按条件筛选任务
- 保持清晰的数据流和组件边界
