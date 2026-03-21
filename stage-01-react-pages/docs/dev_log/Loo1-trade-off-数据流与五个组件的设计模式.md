## 核心背景
在开发任务面板（Task Board）时，我们面临一个基础架构选择：**数据应该由子组件 `TaskList` 直接引入，还是由父组件 `App` 持有并通过 `props` 下传？** 虽然直接在子组件引入数据短期内更快，但为了支持后续的筛选（REQ-02）和持久化（REQ-03），我们选择了基于 **Props** 的**单向数据流**方案。

---

## 1. 深度理解 Props：组件的“函数参数”
要把 React 组件看透，最简单的方法是把它看作一个**函数**。

* **普通函数**接收参数并返回计算结果。
* **React 组件**接收 **Props** 并返回 UI 界面。

```tsx
// 普通函数：输入 a 和 b
function add(a: number, b: number) {
  return a + b;
}

// React 组件：输入 tasks
function TaskList(props: { tasks: Task[] }) {
  return <div>当前任务数：{props.tasks.length}</div>;
}
```

**Props 的本质：**
* 它是父组件传给子组件的**输入参数**。
* 子组件是**只读**的，不能直接修改收到的 props。
* 它决定了组件“显示什么”。

---

## 2. 什么是单向数据流（One-way Data Flow）？
React 的核心统治思想是：**数据从顶部向下流动，事件从底部向上冒泡。**



### 数据流向图：
1.  **持有数据**：`App` 组件作为“权力中心”持有 `tasks` 数据。
2.  **向下传递**：`App` -> `TaskList` -> `TaskCard`（通过 Props）。
3.  **向上反馈**：如果 `TaskCard` 发生点击，它不直接改数据，而是调用父组件传下来的**回调函数**（如 `onToggle`），最终由 `App` 修改数据。

> **结论：** 真正修改数据的地方，永远在持有该数据的源头。

---

## 3. 方案对比：为什么不建议子组件直接 Import 数据？

在项目演进过程中，直接引入数据（Local Import）会带来明显的**技术债**：

| 维度 | 子组件直接 Import | 父组件持有并通过 Props 下传 (推荐) |
| :--- | :--- | :--- |
| **上手速度** | 极快，代码量少 | 略慢，需要定义接口和传递参数 |
| **数据共享** | **难**。其他组件（如摘要卡片）无法访问 | **易**。父组件可以同时发给多个子组件 |
| **单一事实来源** | 差。数据散落在各处，容易不一致 | **优**（Single Source of Truth）。数据只有一份 |
| **演进成本** | 高。切换到动态数据（API/State）时需重构 | 低。只需在父组件修改数据源即可 |

### 为什么 Local Import 会锁死演进？
1.  **REQ-02 (筛选功能)**：`FilterBar` 改变了筛选条件，`TaskList` 需要响应。如果数据在 `TaskList` 内部，`FilterBar` 根本够不着。
2.  **REQ-03 (新增/持久化)**：当你在一个表单里新增任务，不仅 `TaskList` 要变，`SummaryCards` 里的统计数字也要变。**如果数据不放在共同的父组件 `App` 里，组件间就无法达成同步。**

---

## 4. 演进路线图：从静态到动态

### 第一阶段 (REQ-01)：静态 Props
```text
App (持有导入的静态 tasks)
  └── TaskList (通过 props 接收 tasks)
      └── TaskCard (通过 props 接收单条 task)
```

### 第二、三阶段 (REQ-02/03)：动态 State
当引入 `useState` 后，结构无需大改，只需将静态变量替换为状态：
```tsx
// App.tsx 内部的演进
const [tasks, setTasks] = useState(initialTasks);
const [filter, setFilter] = useState('all');

// 派生 UI
const filteredTasks = tasks.filter(...) 

return (
  <>
    <SummaryCards tasks={tasks} />     {/* 自动获得统计 */}
    <FilterBar onFilter={setFilter} />  {/* 改变筛选条件 */}
    <TaskList tasks={filteredTasks} />  {/* 自动显示过滤后的结果 */}
  </>
)
```



---

## 5. 开发者总结（极简版）
如果你只需要记住三句话，请记住：
1.  **Props** 是组件的输入参数，就像函数的形参。
2.  **数据**像瀑布一样从父流向子，不要逆流。
3.  **共享数据**要提升到共同的父组件中，确保“单一事实来源”。

## 6.思考题
如果到了 REQ-02，FilterBar 点击“已完成”后要让 TaskList 只显示已完成任务，那么 filter 这个状态更适合放在 FilterBar 里，还是 App 里？为什么？

```Plaintext
在 APP 里面，FilterBar 应该从APP拿到源tasks，然后传递到 Filterbar
```

错误！

这是一份关于 React 组件职责划分与数据流设计的技术文档：

---

# 组件职责划分：为什么 FilterBar 不应持有任务数据？

## 1. 核心定位：控制器 vs 数据处理
在 React 开发中，明确组件的“身份”至关重要。对于 `FilterBar`（过滤栏），它的定位是**控制器组件**，而非数据处理组件。

* **错误做法：** 将 `tasks` 传给 `FilterBar`，让它内部计算过滤逻辑。这会导致逻辑耦合，难以维护。
* **正确做法：** `FilterBar` 只负责传递“用户的意图”（例如：用户点击了“已完成”按钮）。

---

## 2. 合理的数据流架构 (REQ-02)

在单向数据流中，**App 组件**承担“大脑”的角色，负责所有的逻辑计算。

### App 的职责：
* **持有真实状态（State）：** `tasks`（原始数据）和 `filter`（当前筛选值）。
* **逻辑派生：** * 根据 `tasks` 计算 `SummaryCards` 所需的统计值。
    * 根据 `tasks` + `filter` 计算出 `filteredTasks`（过滤后的列表）。

### 组件间的 Props 传递：
| 组件 | 接收的 Props | 职责 |
| :--- | :--- | :--- |
| **SummaryCards** | 统计数据 (summary) | 纯展示统计结果 |
| **FilterBar** | `filter` + `onFilterChange` | **发出指令**：告诉 App 用户选了什么 |
| **TaskList** | `filteredTasks` | **渲染结果**：只负责把传进来的数组画出来 |



---

## 3. 生活化类比：空调遥控器
理解这种设计的最好方式是**“遥控器模型”**：

* **FilterBar = 遥控器**：它本身不具备制冷功能，甚至不知道空调是怎么工作的。它只负责提供按钮，并向主机发送“设为 24 度”的信号。
* **App = 空调主机**：接收遥控器的信号，根据内部逻辑调整压缩机工作，计算出冷风。
* **TaskList = 房间温度/显示屏**：反映出主机处理后的最终结果。

> **结论：** 遥控器不需要知道房间里有多少热量（`tasks`），它只需要知道用户按了哪个键（`filter`）。

---

## 4. 这种设计的优势
1.  **高复用性**：`FilterBar` 变得极其纯粹，它可以在任何需要“切换状态”的地方复用，因为它不依赖具体的任务数据。
2.  **单一事实来源 (SSOT)**：所有的计算逻辑都集中在 `App` 中。如果你发现过滤结果不对，你只需要去 `App` 里找 bug，而不需要翻遍每个子组件。
3.  **自动同步**：由于 `TaskList` 接收的是 `App` 计算后的结果，一旦 `filter` 改变，`App` 重新渲染，`TaskList` 会自动更新，不存在数据不同步的问题。
