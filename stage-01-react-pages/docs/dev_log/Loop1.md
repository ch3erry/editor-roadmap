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

目前已经完成，可以看到





# main.tsx 的 StrictMode 和 App.tsx 的 useState

它不会渲染任何可见的 UI，也不会影响生产环境（Production）的运行。它的目的主要有以下方式：

- 双重渲染（Double-Invoke）： 这是最让新手困惑的地方。在开发环境下，React 会故意调用两次你的组件函数、生命周期方法和 useState 的初始化逻辑。

- 为什么？ 为了检查你的组件是否是“纯函数”。如果你在渲染过程中写了有副作用的代码（比如直接修改了全局变量），双重渲染会让问题立刻暴露出来。

- 警告过时 API： 如果你使用了 React 已经废弃或者不推荐的旧方法，它会在控制台疯狂报错，逼你写出更现代的代码。

- 检测意外的副作用： 它能帮助你发现内存泄漏（比如忘了清除定时器）。
