# 第一阶段概述：React 页面

## 目标
在引入 Tiptap 或编辑器特定的抽象概念之前，通过一个规模虽小但功能真实的 React 应用程序，建立对基于组件的 UI 开发的熟练度。

第一阶段产品是一个单页轻量级任务板。它的设计初衷是足够简单，以便进行 React 原理性学习；同时又具备足够的结构，以支持组件拆解、Props 传递、静态数据渲染以及后续的状态更新。

## 选定产品形态
第一阶段页面是一个居中的单列任务板，包含四个固定部分：
- `Header` (页眉)
- `SummaryCards` (摘要卡片)
- `FilterBar` (过滤栏)
- `TaskList` (任务列表)

选择这种形态是因为它能为前三个需求提供清晰的实践路径：
- `REQ-01`：静态渲染和表现层组件边界划分
- `REQ-02`：过滤、派生变量和本地 UI 状态
- `REQ-03`：任务创建、任务更新和本地持久化

## 设计输入
遵循以下设计资产：
- Pencil 文件：`stage-01-react-pages/design_docs/task-board-ui.pen`
- 设计说明：`stage-01-react-pages/design_docs/2026-03-21-task-board-ui-design.md`

经批准的屏幕是一个浅色模式、低噪点的教学 UI。它采用居中的内容列、卡片式分组、柔和的边框、圆角以及稳定的视觉层级。设计资产中的布局和文案应被视为 `REQ-01` 的唯一事实来源。

## 范围
- React 组件基础
- JSX 布局组合
- Props 与本地状态 (local state)
- 事件处理
- 条件渲染
- 列表渲染
- 表单简单处理
- 使用浏览器存储进行本地持久化

## 超出范围 (不包含)
- 富文本编辑
- 自定义编辑器抽象
- 服务端 API
- 高级状态管理库 (如 Redux/Zustand)
- 拖拽功能
- 路由 (Routing)
- 远程数据获取
- UI 组件库 (如 Ant Design/MUI)

## 推荐项目形态
构建一个单页的产品 UI，而不是孤立的玩具级小部件。该应用应该感觉像是一个真实产品的外壳，但刻意保持小巧且仅限本地运行。

第一阶段推荐的技术基准为：
- `Vite`
- `React`
- `TypeScript`
- 原生 `CSS`
- 使用 `useState` 处理本地状态

## 推荐文件结构
第一阶段的应用应演进为如下结构：

```text
stage-01-react-pages/
  app/
    public/
    src/
      assets/
      components/
        Header.tsx
        SummaryCards.tsx
        FilterBar.tsx
        TaskList.tsx
        TaskCard.tsx
      data/
        tasks.ts
      types/
        task.ts
      App.tsx
      main.tsx
      index.css
      App.css
    package.json
    tsconfig.json
    vite.config.ts
```

这是第一阶段的目标结构，并不要求在第一次渲染前就建立所有内容。`REQ-01` 应建立基准目录和核心组件文件。更多的清理工作可以在 `REQ-02` 和 `REQ-03` 中进行。

## 验收标准
- 学习者可以在 VSCode 中本地运行项目。
- 学习者能够解释 `main.tsx`、`App.tsx` 与功能组件之间的关系。
- 学习者可以添加新的 UI 区域而无需重写整个页面。
- 学习者可以通过浏览器开发者工具检查状态更新和 UI 变化。
- 学习者能够将高保真设计稿映射为一个小型的 React 组件树。

## 需求序列
### REQ-01
从零开始创建第一个 `Vite + React + TypeScript` 应用，并实现一个符合既定 UX 设计的静态任务板。主要教学目标是理解项目启动、入口文件、JSX 结构和表现层组件拆分。

### REQ-02
将静态页面转变为小型交互式视图。学习者应将 `FilterBar` 连接到本地状态，从任务数据中派生摘要数值，并有条件地渲染任务列表。

### REQ-03
引入任务创建、完成状态切换和 `localStorage` 持久化。以一个整洁的小型应用程序而非演示页面结束本阶段。

## 推荐教学风格
- `REQ-01`：手把手引导安装与解释
- `REQ-02`：在明确的验收标准下进行引导式实现
- `REQ-03`：更独立的实现，随后提供评审反馈

## 第一阶段限制条件
- 保持 UI 为单页结构。
- 不要添加侧边栏、图表或仪表盘部件。
- 在第一阶段不要添加拖拽功能或原地 (in-place) 任务编辑。
- 保持样式足够简单，确保学习 React 仍是核心焦点。
- 将设计资产作为参考，但在 `REQ-01` 中，结构保真度优先于像素级还原。

## 当前状态
产品形态、UX 参考和第一阶段文件布局已获批。下一个活动文档为 `docs/requirements/REQ-01.md`。