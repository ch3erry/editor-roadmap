# Stage 01 REQ-03 设计文档

## 目标
让任务板从“可筛选的静态交互页面”演进成一个真正可用的小型本地应用。

这一轮只解决三个核心能力：
- 新增任务
- 切换完成状态
- 本地持久化

## 已批准的范围
允许：
- `tasks` 变成 React 状态
- 新增 `TaskForm`
- 在 `TaskCard` 中加入复选框
- 持久化 `tasks`

不允许：
- 删除任务
- 编辑任务
- 拖拽
- 路由
- 远程数据

## 架构选择
本轮采用：
- `App` 统一持有 `tasks + filter`
- `TaskForm` 只负责收集输入
- `TaskCard` 只负责发出状态切换事件
- `localStorage` 只围绕 `tasks` 接入

不采用：
- `TaskList` 自己持有任务状态
- 一开始就抽 `useTasks` 自定义 Hook
- 把持久化逻辑分散进多个组件

原因：
- 当前教学重点是理解状态流，而不是抽象层设计
- 统一状态源最容易解释摘要、筛选、新增和切换之间的关系

## 数据模型演进
### 旧模型
- `tasks` 是静态导入数据
- `filter` 是唯一状态

### 新模型
- `initialTasks` 是静态种子数据
- `tasks` 是 React 状态
- `filter` 继续保留为状态

## 组件契约
### TaskForm

```ts
type NewTaskInput = {
  title: string
  description: string
}

type TaskFormProps = {
  onSubmit: (input: NewTaskInput) => void
}
```

### TaskCard

```ts
type TaskCardProps = {
  task: Task
  onToggleTask: (taskId: string) => void
}
```

## localStorage 边界
本轮只持久化 `tasks`。

读取流程：
- 优先读 `localStorage`
- 没有则回退到 `initialTasks`

写回流程：
- 每次 `tasks` 变化时写回

## 关键教学点
- 静态导入数据什么时候需要演进成状态
- 为什么 `initialTasks` 和 `tasks` 需要不同名字
- 为什么表单输入模型不等于完整业务对象
- 为什么“状态切换按钮”不应自己修改全局数组
- 为什么 `localStorage` 应围绕唯一状态源接入

## 教学推进顺序
1. 明确边界
2. 回顾 REQ-02 数据流
3. 引入 `tasks` 状态
4. 接入 `initialTasks`
5. 接入 localStorage 读取
6. 接入 localStorage 写回
7. 新建 TaskForm
8. 实现新增任务
9. 接入 TaskCard 复选框
10. 实现状态切换
11. 联调与收口
