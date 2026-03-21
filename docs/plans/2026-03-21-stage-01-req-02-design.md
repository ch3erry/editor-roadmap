# Stage 01 REQ-02 设计文档

## 目标
把 `REQ-01` 的静态任务板推进成一个小型数据驱动页面，但严格限制在“视图层交互”范围内。

这轮只回答一个问题：
如何在不修改任务数据本身的前提下，让任务板开始体现 React 的状态驱动特性。

## 已批准的范围
允许：
- `FilterBar` 点击切换
- `SummaryCards` 由数据派生
- `TaskList` 根据筛选条件变化
- 通过 props 传递状态和值

不允许：
- 切换任务完成状态
- 新增、删除、编辑任务
- `localStorage`
- 新增状态管理库

## 架构选择
本轮采用：
- `App` 统一持有筛选状态
- `App` 基于静态 `tasks` 派生统计值与过滤后列表
- 子组件保持展示导向，不持有共享状态

不采用以下方案：
- `FilterBar` 自己持有筛选状态
- `TaskList` 自己做过滤

原因：
- 这两种方案都会削弱“单一事实来源”
- 会让 `SummaryCards` 与 `TaskList` 的逻辑分散
- 不利于学习 React 单向数据流

## 数据模型
### 原始数据
- `tasks` 仍来自 `data/tasks.ts`
- 本轮不改成 `useState`

### 本地状态
- `filter`

### 派生值
- `totalCount`
- `completedCount`
- `pendingCount`
- `filteredTasks`

## 组件契约
### App
- 持有 `filter`
- 计算所有派生值
- 将状态和回调分发给子组件

### FilterBar
- `activeFilter`
- `onFilterChange`

### SummaryCards
- `total`
- `completed`
- `pending`

### TaskList
- `tasks`

### TaskCard
- `task`

## 教学重点
这轮不是学“更多 JSX”，而是学：
- 状态上提
- 单一事实来源
- 派生数据
- 受控展示组件

## 教学推进顺序
1. 明确范围
2. 回顾现有组件树
3. 设计状态与派生值
4. 设计 props 契约
5. 在 `App` 中引入状态
6. 在 `App` 中派生统计和筛选结果
7. 更新 `SummaryCards`
8. 更新 `FilterBar`
9. 更新 `TaskList`
10. 做自检和 review

## 风险与控制
### 风险 1
把统计值也做成 `useState`

控制：
- 在需求文档中明确统计值必须是派生值

### 风险 2
把筛选状态写进 `FilterBar`

控制：
- 明确 `FilterBar` 是受控组件

### 风险 3
为了未来需求提前引入任务编辑和持久化

控制：
- 将交互范围严格限定在视图层
