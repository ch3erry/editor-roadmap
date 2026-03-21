REQ-01 的前半段是“脚手架 + 静态 UI 落地”， 先读需求 -> 先确认环
境 -> 先跑通基线 -> 再改代码。真正严格走 red -> green -> refactor，会从后面的交互逻辑开始更有价值。
这次我们按这个顺序推进：

1. 读需求和设计源
2. 检查本地环境
3. 创建脚手架
4. 先把默认项目跑起来
5. 识别入口文件和渲染链路
6. 画组件树
7. 定义 REQ-01 范围内的最小组件职责
8. 搭页面骨架
9. 再拆组件
10. 接静态数据和样式
11. 做一次自检和 review

# 本地环境检查
是否正确安装 node npm 环境；
确定 app 目录没有站位文件阻塞脚手架的初始化；
```
find app -maxdepth 2 -type f | sort
# 输出 app/README.md
```
所以我们需要删除 README 文件，确保目录为空即可进入脚手架初始化；

# 脚手架初始化
```
npm create vite@latest . -- --template react-ts
```
安装完成后，请你检查脚手架都声称了什么文件；需要先确认默认的项目结构，再进行以来安装和启动。

## 知识点1
- React 应用从哪个文件开始挂载？
- App.tsx 在整个渲染链路里是什么角色？在我们的项目里应该承担什么指责？又不应该承担什么指责？
- 
- 默认模版里哪些内容是我们等会要删掉的“演示代码”？APP.tsx 里又有哪些内容属于模版演示代码，应该在后续被清理掉呢？ --src/assets/* 里的 react.svg、vite.svg、hero.png 目前也只是模板资产。从需求角度看，它们都应该被移除。
- 如果按我们的任务面板设计来拆组件，你现在脑中想到的第一版组件树是什么？

### React 应用从哪个文件开始挂载？

我们知道“入口文件”是指代码执行的起点。但 React 是一个 UI 库，它最终必须出现在浏览器里。首先我们搞清楚什么叫挂载？

---

当你运行 `npm run dev` 时，

对于打包工具 Vite 来说，他会首先找到项目根目录下的 index.html ，它在 index.html 中发现了这样一行代码：
```
<script type="module src="/src/main.tsx"></script>
```
这个时候 Vite 顺藤摸瓜，找到了 src/main.tsx，所以我们称 src/main.tsx 是 React 应用的入口挂载文件，主要做三件事情：
1. 引入全局样式 index.css
2. 引入顶层组件 APP
3. 把 <App /> 挂到 HTML 里的 #root 节点上


> 这里不得不提一下，Vite 默认只懂标准的浏览器脚本，它能理解 React 比如 jsx 语法，是根据项目中的 vite.config.ts 文件，快去看看他是什么内容吧！

### main.tsx 在整个 React 应用里扮演什么角色？

```JavaScript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

main.tsx 代码非常简洁，这里的 StrictMode 是开发者模式^(文末有详细介绍)^

刚才我们解释过，React 应用的挂载文件是 main.tsx,也就是说 main.tsx 主要做环境初始化和物理挂载：

1. 通过 document.getElementById('root') 来连接 html 的 dom
2. 使用 createRoot 启动 React 的渲染引擎
3. 引入 index.css （全局样式）和包裹 StrictMode 开启严格模式下的代码检查
通常不在 main.tsx 写人物业务逻辑，只负责启动

### App.tsx 在整个渲染链路里是什么角色？

App.tsx 在整个渲染链路里是什么角色？在我们的项目里应该承担什么指责？又不应该承担什么指责？

src/App.tsx 是当前页面的顶层 UI 组件，现在里面的内容基本都是 Vite 模板的演示代码，不属于我们的任务面板需求。
在我们的任务面板项目中，App.tsx 是整棵组件树的根（Root）。

| **它应该承担的职责（Should）** | **它不该承担的职责（Shouldn't）** |
| :--- | :--- |
| **页面布局（Layout）：** 定义 `Header`、`TaskList` 各自待在哪里。 | **具体逻辑细节：** 比如“如何校验任务标题”，这该去具体组件里写。 |
| **高层状态管理：** 在 `REQ-03` 中，它将负责保存任务列表的总数据。 | **底层样式细节：** 不要在这里写某个按钮的 hover 颜色。 |
| **组件协作：** 负责把数据从 A 组件传给 B 组件。 | **直接操作 DOM：** 永远不要在 `App.tsx` 里用 `document.querySelector`。 |

### APP.tsx 里又有哪些内容属于模版演示代码，应该在后续被清理掉？

> 我觉得整个HTML标签都是模版演示代码，可以保留一下<>

回答错误！<>...</> 这个写法本身可以保留，它叫 Fragment但里面放什么内容，要完全换成我们的任务面板结构，也就是说：Fragment 不是模板代码，模板里那堆展示内容才是。

### 如果按我们的任务面板设计来拆组件，你现在脑中想到的第一版组件树是什么？

```Plaintext
App (根组件：负责居中的单列布局容器)
├── Header (页眉：显示标题、日期徽章)
├── SummaryCards (摘要卡片：水平排列的三个统计块)
├── FilterBar (过滤栏：三个状态切换按钮)
└── TaskList (列表容器：负责标题和任务项的包裹)
    ├── TaskCard (单个任务：显示标题、描述、标签)
    ├── TaskCard
    ├── TaskCard
    └── TaskCard
```

> 我们再回过头来看 index.html , 由此来确认渲染链路：
> 1. 浏览器加载 index.html
> 2. 看到 <script type="module" src="/src/main.tsx"></script>，于是加载 main.tsx
> 3. main.tsx 里用的 createRoot(document.getElementById('root')!)
> 4. React 把 <App /> 渲染进 #root
> **这就是最基础的前端启动链路。你后面做任何 React 页面，本质上都是在替换 App 以及它下面那棵组件树。**

## 知识点2：改造前设计和数据归属

在写代码前，先决定数据放哪，谁负责渲染谁，如果回答不上这个问题，就不要着急写代码；

首先思考一个问题，对于 REQ-01 这个静态页面，任务数组放在哪里最合适？

```
1. App.tsx
2. TaskList.tsx
3. src/data/tasks.ts
```

如果这样最好，那么为什么呢？

### 任务数组放在 data/tasks.ts

原因是这能把 3 类东西分开：

- App.tsx：负责页面装配，不负责塞静态业务数据
- TaskList.tsx：负责“如何展示任务列表”，不负责定义任务数据来源
- tasks.ts：专门负责存放当前这轮的静态示例数据

这就是最基础的“关注点分离”。现在我们来到了项目中的第一个 trade-off:

望 TaskList 自己去 import tasks.ts，还是希望 App.tsx 先拿到 tasks，再通过 props 传给 TaskList？

App.tsx 持有 tasks，通过 props 传给 TaskList 更符合 React 的单向数据流，也更利于后面进入 REQ-02 和 REQ-03

## 知识点3:定义 REQ-01 范围内的最小组件职责

在 REQ-01 里，这 5 个组件各自最小职责是什么？

- App
- Header
- SummaryCards
- FilterBar
- TaskList

在REQ-01我们主要是实现整个静态页面，所以准确来说是：

- App：负责页面级布局和组件装配。在 REQ-01 里，它的重点是组织页面结构，不是承载复杂逻辑。
- Header：负责展示页眉信息。REQ-01 里建议保持展示性，不要为了“今天时间”额外引入日期格式逻辑。
- SummaryCards：负责展示 3 个统计卡片。REQ-01 里可以先用静态数值，不做计算。
- FilterBar：这里你刚才说“需要提供用户交互”，这对 REQ-01 来说太早了。当前它只负责展示筛选按钮和激活态视觉，不接点击逻辑。
- TaskList：不只是“展示任务状态”，而是负责展示列表标题、元信息，并把任务数组渲染成多个 TaskCard。
- TaskCard：负责展示单个任务的标题、描述、状态标签。

## 知识点4: 定义页面骨架--使用语义化页面容器而不是 <> ... </> Fragment

更推荐 \<main\> 而不是 Fragment：

- 它能表达“这里是页面主要内容区域”，语义比单纯包一层更清楚
- 对后续样式组织更友好，你通常会给这个主容器设置背景、宽度、内边距、布局
- 对可访问性更好，辅助技术能更容易理解页面主区域
- 我们这个页面本来就是单页主内容，不是多个平级碎片块

```TypeScript
  function App() {
    return (
      <main className="app-container">
        <Header />
        <SummaryCards />
        <FilterBar />
        <TaskList tasks={tasks} />
      </main>
    )
  }
```

为什么这里没有了 TaskCard 呢？我们需要区分好组件树和页面骨架，因为这里我们在写的是 App 的直接子组件结构，不是整棵树的完整 JSX 展开。
组件树是：

```Plaintext
  App
    Header
    SummaryCards
    FilterBar
    TaskList
      TaskCard
```

这表示：

- TaskCard 确实存在
- 但它不是 App 的直接孩子
- 它是 TaskList 的内部孩子

## 知识点5: 代码的最小可运行路径是什么？

1. 先改 src/App.tsx
2. 把默认模板清掉
3. 先搭一个最小可渲染骨架
4. 页面能正常显示后，再拆组件
5. 最后再系统补样式

先只改 src/App.tsx，但暂时不要引入 Header、SummaryCards 这些新组件文件。我们先把模板代码删掉，换成一个最小的静态骨架，确保页面依然能跑。

目前已经完成，可以看到 git show 5891270

完成初步的css代码后，不要继续打磨 APP.css 了，而是应该检查 index.css：
Vite 默认模板通常会在 index.css 里塞很多全局样式，比如：

- body 的默认布局
- button 的默认样式
- 全局背景色
- 颜色方案

## 知识点6: index.css 中哪些是不需要保留的的全局样式？

为了确保**任务面板 (Task Panel)** 的布局纯净，我们必须识别并重构以下六类不适配的内容：

### ① 带有模板语义的主题变量 (`:root`)
模板预设的变量（如 `--accent`, `--social-bg`, `--shadow`）通常带有强烈的 Vite 品牌视觉色彩。
* **问题：** 这些变量的名字本身就绑定了模板的业务逻辑，不属于我们的项目。
* **风险：** 强行使用会导致项目视觉风格支离破碎。

### ② 冲突的 UX 逻辑 (Color Scheme)
`color-scheme: light dark` 以及配套的暗色模式媒体查询（`@media`）会强制浏览器在不同环境下切换控件表现。
* **冲突点：** 当前 UI 设计稿明确为 **固定浅色模式**。
* **结果：** 保留此段代码会导致在开启系统暗色模式时，表单控件和文字出现不可控的反色。

### ③ 容器劫持 (#root)
这是最隐蔽、危险的一类污染。模板通常将 `#root` 作为一个具体的排版容器：
* **干扰项：** `width: 1126px`, `text-align: center`, 以及固定的边框与弹性布局。
* **工程原则：** `#root` 应仅承担“最小宿主容器”职责。如果它背负了太重的排版属性，会直接干扰 `App.css` 中 `.app-container` 的布局逻辑。

### ④ 非中立的字体排印 (Typography)
模板对 `h1`, `h2`, `p`, `code` 的定义通常是非常激进的“设计稿”样式，而非“基准线”样式。
* **典型污染：** `h1` 的 `56px` 字号、负值的 `letter-spacing`、具体的 `margin` 间距。
* **影响：** 这会让你的标题组件在默认情况下显得过大或间距诡异。

### ⑤ 业务遗留代码 (Dead Code)
诸如 `.counter` 这样的类名是纯模板示例代码。
* **处理方案：** 直接删除。保持样式表的**单一事实来源 (Single Source of Truth)**。

### ⑥ 全局对齐倾向 (Center Bias)
模板中普遍存在的 `text-align: center` 是一种“全局倾向”。
* **风险：** 任务面板属于**信息层级类页面**，采用左对齐以符合阅读逻辑。全局居中会导致布局不断发生难以调试的偏移。

> 我们要学会一个开发原则 index.css 应该放的是：reset、baseline、全局排版基线、宿主容器最小约束；App.css 才应该放当前页面的业务样式、布局细节、卡片、按钮、任务列表这些具体的表现；
> 也就是说：index.css 负责“地基”;App.css 负责“这栋楼长什么样”
> 所以我们应该把 index.css 重制成一份干净的基线

## 知识点7: 把UX翻译成CSS
要把设计稿完美还原成代码，最难的往往不是背诵 CSS 属性，而是建立正确的“结构化读图心智”。

**不要直接盯颜色和阴影**。请严格按照以下从宏观到微观的顺序“读图”：

**1. 读页面主轴 (决定外层排版)**
* **看什么：** 页面整体是单列还是多列？大区块从上到下的顺序是什么？（例如：Header -> SummaryCards -> FilterBar -> TaskList）
* **写什么：** 决定最外层容器（如 `.app-container`）使用 `display: flex; flex-direction: column;`，并通过 `gap` 控制间距。

**2. 读区块内部排版 (决定对齐与分配)**
* **看什么：** 每个大区块内部的元素是如何排列的？
* **写什么：**
    * **左右分布**（如 Header 文字与日期）：使用 `flex` + `justify-content: space-between;`
    * **等宽横排**（如 3 张数据卡片）：使用 `flex` 且子项 `flex: 1;`

**3. 读容器与内容块 (决定复用类名)**
* **看什么：** 剥离层级，分清“大容器”（外层白卡片）、“内容块”（内层小卡片/按钮外壳）、“基础元素”（纯文字）。
* **写什么：** 提取 CSS 复用类名，如 `.panel`, `.summary-card`, `.task-item`, `.filter-tabs`。

**4. 读视觉细节 (决定装饰属性)**
* **看什么：** 这一步才开始关注颜色、边框、圆角、阴影等。
* **写什么：** 填充具体的视觉 CSS。例如稿件是“教学型极简”风，对应的就是浅灰背景、白底、细边框、大圆角、**极轻微的阴影**、克制的激活色。具体可以看 ![具体实现](./Loop2-REQ-01-静态任务面板样式实现说明.md)

## 组件化拆分
在拆分组件前，我们不直接写逻辑，而是先定义组件对外暴露的**最小接口**。评估标准只有两条：
1.  **它现在到底需不需要 props？**
2.  **它现在的职责边界在哪里（负责什么，不负责什么）？**

---

这份文档已经为你整理完毕。我将你补充的深层逻辑（如拆分顺序的考量、REQ-01 的严格约束）与其原本的结构进行了深度整合，使其更像一份**实战级别的开发规约**。

---

## 📜 知识点八：组件契约清单与拆分实操 (REQ-01 版)

在 React 项目从“单文件”走向“组件化”的过程中，最核心的工具不是代码，而是**契约（Contract）**。

### 1. 已确认的最小契约 (Minimal Contract)
按照 REQ-01 阶段目标，我们严格遵守“**不为未来预支接口**”的原则，将页面拆分为以下 6 个部分：

| 组件名称 | Props (接口) | 核心职责 | 说明 |
| :--- | :--- | :--- | :--- |
| **App** | 无 | **页面装配**：导入静态任务数据，组织整体页面结构。 | 整个应用的“总调度中心”。 |
| **Header** | 无 | **展示**：展示固定页眉文案和日期徽标。 | 纯静态，不处理业务逻辑。 |
| **SummaryCards** | 无 | **展示**：展示 3 张静态摘要卡片。 | **约束**：暂不接收数据，不做实时计算。 |
| **FilterBar** | 无 | **展示**：展示静态提示文案和 3 个筛选按钮。 | **约束**：暂不处理过滤逻辑，无回调函数。 |
| **TaskList** | `tasks: Task[]` | **容器**：展示列表标题、元信息，并渲染多个 `TaskCard`。 | 负责列表级的数据循环与下发。 |
| **TaskCard** | `task: Task` | **展示**：展示单条任务的标题、描述、状态标签。 | 最小原子，只负责“把一条数据显示好”。 |

---

### 2. 核心逻辑：为什么只让 TaskList/TaskCard 接 Props？
这是整份方案的精髓。区分“该不该给 props”的标准不是“它以后变不变”，而是**它现在有没有真实的数据边界**：

* **TaskList / TaskCard 天然拥有边界**：列表天然就是“一个数组 -> 多个子项”的关系。即使用户还没开始操作，数据本身就已经存在这种结构了。给它们 props 是为了**描述当前的客观事实**。
* **Header / SummaryCards / FilterBar 目前是静态区块**：在 REQ-01 中，它们只是把 HTML 搬了个家。现在给它们设计接口（比如 `total={10}`）只会增加不必要的抽象复杂度，属于**预支未来**。

---

### 3. 配套数据架构设计
为了支撑上述契约，我们需要建立清晰的数据归属关系：

1.  **`src/types/task.ts`**：定义 `Task` 接口（类型基准）。
2.  **`src/data/tasks.ts`**：存放静态 Mock 任务数组。
3.  **数据流向**：
    `App.tsx` (Import tasks) -> `<TaskList tasks={tasks} />` -> `tasks.map(...)` -> `<TaskCard task={task} />`

---

### 4. 推荐拆分顺序 (风险最小化)
建议按照以下 8 个步骤进行，遵循**先基础、后原子、再组装**的逻辑：

1.  **新建 `src/types/task.ts`** (定义协议)
2.  **新建 `src/data/tasks.ts`** (准备弹药)
3.  **新建 `src/components/TaskCard.tsx`** (拆分最小原子)
4.  **新建 `src/components/TaskList.tsx`** (建立容器逻辑)
5.  **新建 `src/components/Header.tsx`** (静态提取)
6.  **新建 `src/components/SummaryCards.tsx`** (静态提取)
7.  **新建 `src/components/FilterBar.tsx`** (静态提取)
8.  **最后收口 `src/App.tsx`** (清理旧代码，完成总装)

> **💡 为什么先拆 TaskCard -> TaskList？**
> 因为这两个组件的逻辑最清晰，数据边界最明确。把最“硬”的部分先搞定，剩下的静态组件只是简单的搬运，能极大降低收口时的心理压力。

---

## 🚀 下一步：定义 Task 类型

在真正创建文件之前，我们先来解决你留下的设计问题。

对于 **REQ-01**（仅仅是展示列表），我认为 `Task` 类型的最小字段应该只包含能支撑页面显示的“视觉必需项”。

### 我推荐的 `Task` 定义：
```typescript
export type Task = {
  id: string;          // 每一个 React 列表项都需要一个唯一 Key
  title: string;       // 任务标题
  description: string; // 任务简述
  status: 'completed' | 'in-progress'; // 状态标签，用于显示不同的样式
};
```

**为什么只留这些？**
* **不要 `createdAt`**：REQ-01 界面上还没要求显示日期。
* **不要 `priority`**：界面上还没画星星或者颜色等级。
* **不要 `assignee`**：目前是单机版任务，没有“负责人”概念。

**下面进入拆分前的最后一个设计动作：给TaskList和 TaskCard 写最小props类型**

# main.tsx 的 StrictMode 和 App.tsx 的 useState

它不会渲染任何可见的 UI，也不会影响生产环境（Production）的运行。它的目的主要有以下方式：

- 双重渲染（Double-Invoke）： 这是最让新手困惑的地方。在开发环境下，React 会故意调用两次你的组件函数、生命周期方法和 useState 的初始化逻辑。

- 为什么？ 为了检查你的组件是否是“纯函数”。如果你在渲染过程中写了有副作用的代码（比如直接修改了全局变量），双重渲染会让问题立刻暴露出来。

- 警告过时 API： 如果你使用了 React 已经废弃或者不推荐的旧方法，它会在控制台疯狂报错，逼你写出更现代的代码。

- 检测意外的副作用： 它能帮助你发现内存泄漏（比如忘了清除定时器）。
