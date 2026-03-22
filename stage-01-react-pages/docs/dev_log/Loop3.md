# Loop3：REQ-03 让任务板真正可用

## 本轮目标
这一轮的目标，是把 `REQ-02` 的“数据驱动视图”继续推进成一个真正可使用的小应用。

到上一轮为止，任务板已经具备：
- 组件拆分
- 全局摘要
- 筛选视图切换
- 基于同一份数据源派生列表和统计

但它还不是真正可用的工具，因为：
- 任务不能新增
- 任务状态不能切换
- 刷新后数据不会保留

所以 `REQ-03` 的核心不是继续堆 UI，而是让这块页面第一次具备“真实任务流转”的能力。

## 本轮最终数据流

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
  - TaskList(tasks, onSubmit, onToggleTask)

TaskList
  传给:
  - TaskForm(onSubmit)
  - TaskCard(task, onToggleTask)
```

这一轮最重要的结论是：
- `tasks` 是唯一可变的数据源
- `filter` 是唯一筛选状态
- 摘要和过滤结果依旧都来自 `App` 的派生计算

## 知识点 1：为什么 `tasks` 必须从静态常量变成 React 状态
在 `REQ-02` 里，任务数据仍然只是静态导入：

```ts
import { tasks } from './data/tasks'
```

这种做法在只读页面里没问题，但到了 `REQ-03` 就不够了，因为：

1. 任务会变化  
   这一轮不仅要新增任务，还要切换完成状态。只要数据会变，它就不再适合只是一个静态导入常量。

2. 依赖它的 UI 要自动更新  
   `SummaryCards`、`TaskList`、筛选结果都依赖 `tasks`。如果 `tasks` 是状态，React 才能在它变化后自动重新渲染相关组件。

3. 它会成为持久化的真实来源  
   `localStorage` 保存的不应该是一份写死的演示数据，而应该是“当前真实任务列表”。

所以这一轮最关键的语义区分是：

> `initialTasks` 是初始化用的种子数据，`tasks` 才是运行中的真实状态。

## 知识点 2：为什么要把静态数据改名为 `initialTasks`
这一步不是为了“看起来规范”，而是为了避免语义冲突。

如果还保留：

```ts
export const tasks = [...]
```

那进入 `REQ-03` 后就会同时出现两份 `tasks`：
- 一份来自数据文件
- 一份来自 `useState`

这会让“谁是初始值，谁是当前状态”变得很模糊。

所以更清楚的做法是：

```ts
export const initialTasks = [...]
const [tasks, setTasks] = useState(initialTasks)
```

这样语义就稳定了：
- `initialTasks`：初始化用的种子数据
- `tasks`：当前运行中的真实任务状态
- `setTasks`：唯一合法更新入口

## 知识点 3：为什么 `localStorage` 读取要放在初始化阶段，写回要放在 `useEffect`
这一轮第一次接触了状态持久化，所以必须明确“读”和“写”的位置。

### 初始化读取
页面第一次渲染前，就应该决定好 `tasks` 的初始值：
- 如果本地已经有保存数据，就优先使用本地数据
- 如果没有，就回退到 `initialTasks`

所以初始化链路是：

```text
localStorage -> tasks
若没有 localStorage -> initialTasks
```

### 变化后写回
当 `tasks` 变化时，需要把最新任务数组同步回 `localStorage`。

这里要理解一个 React 中的重要概念：副作用。

- `useState`：保存当前状态
- `useEffect`：当状态变化后，执行副作用

这一轮的副作用就是：

```ts
useEffect(() => {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
}, [tasks])
```

也就是说：
- 新增任务后写回
- 切换状态后写回
- 只要 `tasks` 变化，就同步写回本地存储

这一点要特别纠正一个常见误解：

> 这里的 `useEffect` 不是为了“组件销毁时写回”，而是为了“每次 `tasks` 变化后立即写回”。

## 知识点 4：惰性初始化 和 懒加载不是一回事
这一轮引入了一个新写法：

```ts
const [tasks, setTasks] = useState(() => {
  ...
})
```

这叫惰性初始化。

### 为什么这里需要惰性初始化
因为读取 `localStorage` 和 `JSON.parse` 都属于初始化工作，它们不应该在每次重新渲染时都重复执行。

错误思路是：

```ts
const savedTasks = JSON.parse(localStorage.getItem('my_tasks'))
const [tasks, setTasks] = useState(savedTasks || initialTasks)
```

更好的做法是：

```ts
const [tasks, setTasks] = useState(() => {
  const saved = localStorage.getItem('my_tasks')
  return saved ? JSON.parse(saved) : initialTasks
})
```

React 会保证这个初始化函数只在状态初始化时执行一次，而不是每次渲染都执行。

### 懒加载是什么
懒加载通常指代码拆分，例如：

```ts
const Settings = React.lazy(() => import('./Settings'))
```

它解决的是“什么时候下载代码”的问题。

所以两者的区别是：
- 惰性初始化：优化初始化计算
- 懒加载：优化资源传输

## 知识点 5：为什么 `TaskForm` 只提交 `title` 和 `description`
这一轮新增了 `TaskForm`，但它没有直接构造完整的 `Task`。

原因是：
- `id` 不属于表单输入，应该由 `App` 生成
- `status` 也不属于表单输入，因为业务规则已经确定：新任务默认是 `进行中`

所以先设计了一个最小输入模型：

```ts
export type NewTaskInput = {
  title: string
  description: string
}
```

然后让 `TaskForm` 只负责：
- 收集输入
- 调用 `onSubmit`
- 提交成功后清空输入框

这就是“输入模型”和“业务对象”的区别。

## 知识点 6：为什么表单要优先用 `<form onSubmit={...}>`
这一轮明确了一条非常基础但很重要的习惯：

> 真的是表单，就优先使用 `<form onSubmit={...}>`，不要用 `<div>` 加按钮模拟。

原因是：
- 语义更正确
- 用户按回车时也能提交
- 更接近真实开发中的表单行为

同时也要记住一个必要细节：

```ts
event.preventDefault()
```

否则浏览器会按原生表单逻辑刷新页面。

## 知识点 7：`TaskForm` 为什么属于局部状态，而 `tasks` 属于全局状态
这一轮同时出现了两类状态：

### 局部状态：`TaskForm`

```ts
const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
```

它们只服务于表单输入本身，所以留在 `TaskForm` 内部最合适。

### 全局状态：`App`

```ts
const [tasks, setTasks] = useState<Task[]>(...)
const [filter, setFilter] = useState<FilterValue>('all')
```

它们会同时影响：
- 摘要区域
- 筛选按钮
- 任务列表
- 本地存储

所以必须留在 `App`。

这也是 React 中很重要的判断标准：

> 一个值只影响当前组件时，可以留在局部；会影响多个子组件时，就应该上提到共同父组件。

## 知识点 8：为什么新增任务逻辑必须写在 `App`
`TaskForm` 提交上来的只是：

```ts
{
  title,
  description,
}
```

但真正写进 `tasks` 状态里的，必须是一条完整任务：

```ts
{
  id,
  title,
  description,
  status,
}
```

所以新增逻辑必须在 `App` 里完成：

```ts
const handleAddTask = (input: NewTaskInput) => {
  const newTask: Task = {
    id: String(Date.now()),
    title: input.title,
    description: input.description,
    status: '进行中',
  }

  setTasks((prevTasks) => [newTask, ...prevTasks])
}
```

这里有两个关键点：
- `id` 由上层生成
- 新任务默认状态是 `进行中`

## 知识点 9：为什么这里推荐函数式更新
新增任务时，采用的是：

```ts
setTasks((prevTasks) => [newTask, ...prevTasks])
```

而不是：

```ts
setTasks([newTask, ...tasks])
```

原因是函数式更新更稳，因为它依赖的是 React 保证提供的“最新上一个状态”，而不是当前渲染闭包里的旧快照。

这一步背后的核心理解是：

> 状态更新依赖前一个状态时，优先使用函数式更新。

## 知识点 10：为什么任务状态切换逻辑必须写在 `App`
这一轮最容易犯的错误，是把“切换任务完成状态”的逻辑写进 `TaskCard`。

但这是不对的。

`TaskCard` 只知道：
- 用户点了这张卡片的复选框

真正知道整份任务数组的人，是 `App`。

所以正确职责应该是：

```text
TaskCard
  点击复选框
  -> 调用 onToggleTask(task.id)

TaskList
  继续往下传 onToggleTask

App
  真正根据 taskId 更新 tasks
```

这和 `REQ-02` 中 `filter` 状态的设计原则是一致的：

> 子组件负责发出事件，父组件负责修改共享状态。

## 知识点 11：为什么要用不可变更新切换状态
切换任务状态时，最终采用的是：

```ts
setTasks((prevTasks) =>
  prevTasks.map((task) =>
    task.id === taskId
      ? {
          ...task,
          status: task.status === '已完成' ? '进行中' : '已完成',
        }
      : task,
  ),
)
```

这里不能直接改原对象的 `task.status`，原因是：
- React 更依赖引用变化来判断状态是否更新
- 直接修改原数组或原对象，会让更新不可预测
- 不可变更新更利于调试和理解数据流

你可以把它理解成：
- 不是“在旧盒子里改东西”
- 而是“基于旧盒子，复制出一个新盒子”

## 知识点 12：为什么要对 `localStorage` 读取结果做兜底
这一轮还遇到了一个实际工程问题：

即使 `JSON.parse` 成功，也不代表读出来的一定是合法任务数组。

例如本地可能存的是：
- 一个对象
- 一个字符串
- 一个格式不对的数组

所以最后至少做了一层最小兜底：

```ts
if (Array.isArray(parsed)) {
  return parsed
}

return initialTasks
```

这不是完整的数据校验，但已经比“只要能 parse 就直接用”稳得多。

## 本轮最重要的调试与联调结果
这一轮的最终联调覆盖了 5 条主链路：

1. 默认加载  
   页面初始渲染正常，摘要、筛选、列表都能显示。

2. 新增任务  
   新任务会出现在列表顶部，摘要会同步更新。

3. 切换任务状态  
   点击复选框后，任务状态会在 `进行中 / 已完成` 之间切换，摘要同步更新。

4. 筛选视图  
   在 `全部 / 进行中 / 已完成` 之间切换后，列表仍然正确过滤。

5. 刷新保留  
   刷新页面后，新增任务和状态切换结果仍然存在，说明 `localStorage` 链路已接通。

## 本轮视觉收口
这一轮除了业务逻辑，还补了两块最小必要样式：
- `TaskForm` 的浅灰附属卡片样式
- `TaskCard` 左侧复选框和正文的对齐样式

这样 `TaskForm` 才真正回到 `.pen` 稿中批准的结构：
- 属于 `TaskList` 工作区内部
- 位于标题下方、任务项上方
- 不是页面第 5 个独立大区块

## 本轮最终能力
完成 `REQ-03` 后，这个任务板已经不再是一个演示页面，而是一个真正可用的小型本地应用。

它现在已经支持：
- 新增任务
- 切换完成状态
- 保持全局摘要
- 按条件筛选任务
- 刷新后保留数据

而且最重要的是，它仍然保持了清晰的数据流：
- `App` 负责共享状态和业务更新
- `TaskForm` 负责收集输入
- `TaskCard` 负责发出切换事件
- `SummaryCards`、`FilterBar`、`TaskList` 都是围绕同一份状态协同工作的

## 本轮最值得记住的 6 句话
1. `initialTasks` 是初始化种子数据，`tasks` 才是真实运行状态。
2. 能在初始化阶段确定的状态，优先用惰性初始化处理。
3. `useEffect` 在这一轮的职责，是在 `tasks` 变化后同步写回 `localStorage`。
4. `TaskForm` 只收集输入，不直接构造完整任务对象。
5. `TaskCard` 只负责发出切换事件，不直接修改全局任务数组。
6. React 中共享状态的真正修改逻辑，应该放在共同父组件里。
