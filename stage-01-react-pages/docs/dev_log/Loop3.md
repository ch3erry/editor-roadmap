# REQ-03的数据流

```Plaintext
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

# 知识点1: 为什么要把tasks从“静态导入常量”变成 React 状态？

1. 任务会变化
  不只是新增任务，后面还要切换完成状态。只要数据会变，它就不再适合只是一个静态导入常量。
2. 依赖它的 UI 要自动更新,SummaryCards、TaskList、FilterBar 对应的筛选结果,如果 tasks 是状态，React 才能在它变化后自动重新渲染这些组件。

3. 它会成为持久化的真实来源
  localStorage 要保存的不是一份写死的种子数据，而是“当前真实任务列表”。这份真实列表就应该是 tasks 状态。

所以更准确地说：

**initialTasks 是初始化用的种子数据，tasks 才是运行中的真实任务状态。**


