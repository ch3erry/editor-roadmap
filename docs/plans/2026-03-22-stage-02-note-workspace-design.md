# Stage 02 Note Workspace Design

## 背景
第一阶段已经完成了从静态 React 页面，到可筛选、可新增、可本地持久化的任务面板。学习重点主要是：
- 组件拆分
- `props`
- `state`
- 派生数据
- 本地持久化

第二阶段不再继续强化单页组件，而是正式进入“工程化 React 应用”语境。

## 目标
第二阶段要构建的是：

> 一个基于 `React + TypeScript + Tailwind CSS` 的轻量笔记工作台 SPA。

它的目标不是做复杂业务，而是为学习者建立：
- 工程基线
- 页面级结构意识
- 路由与共享布局意识
- 异步 UI 状态意识
- 逻辑抽离与目录边界意识

## 为什么选择笔记工作台
相比继续扩展任务系统，轻量笔记工作台更适合作为第二阶段产品，原因是：
- 它天然适合多页面应用结构
- 它能自然承接第三阶段的 `Tiptap`
- 它能让“列表页 -> 详情页 -> 编辑页”的产品形态连续演进

这意味着：
- 第二阶段搭好应用壳
- 第三阶段只替换 `Document Detail` 的内容承载方式

## 产品范围
阶段 2 的页面范围固定为：
- `Dashboard`
- `Wiki Browser`
- `Document Detail`
- `Settings`

### Dashboard
展示：
- 笔记总数
- 最近更新
- 基础摘要卡片

### Wiki Browser
展示：
- `个人 / 组织` 切换器
- Wiki 列表
- 文档树
- 文档预览

这一页是阶段 2 最重要的信息架构承载页。

### Document Detail
展示：
- 当前选中笔记的只读详情
- 标题、摘要、正文占位

这一页在阶段 2 不接编辑器，只承担未来编辑器容器的角色。

### Settings
展示：
- 一个轻量设置页
- 用来练习共享布局和基础表单型页面结构

## 技术边界
### 明确采用
- `React`
- `TypeScript`
- `Vite`
- `React Router`
- `Tailwind CSS`
- 本地 Mock 数据

### 明确不采用
- 真实后端
- 富文本编辑器
- 状态管理库
- SSR
- 数据库
- 复杂权限
- 拖拽

## 为什么 Tailwind 放在阶段 2
学习者明确希望学习 `Tailwind CSS`，而第二阶段正是最合适的切入点。

不放在第一阶段，是为了避免在最基础的 React 学习阶段同时引入太多概念。

不放到第三阶段，是为了避免在接入 `Tiptap` 时同时切换样式体系。

所以最终决定是：
- 在阶段 2 的 `REQ-01` 中接入 Tailwind
- 在阶段 2 的 `REQ-02/03` 中真正使用 Tailwind 组织布局和状态 UI

## 路由与共享布局设计
本阶段产品为 `SPA`，使用客户端路由。

建议路由结构：

```text
/
  -> Dashboard
/wiki
  -> Wiki Browser
/docs/:docId
  -> Document Detail
/settings
  -> Settings
```

共享布局为一个 `AppShell`：
- 左侧 `Sidebar`
- 顶部 `Topbar`
- 右侧 `Main Content`

这样设计的原因是：
- 易于学习共享布局
- 易于学习页面切换
- 后续替换详情页内容最自然

## 目录结构设计
推荐目录结构：

```text
stage-02-react-engineering/
  app/
    src/
      app/
        router.tsx
        providers.tsx
      components/
        layout/
          AppShell.tsx
          Sidebar.tsx
          Topbar.tsx
        ui/
          StatCard.tsx
          EmptyState.tsx
          LoadingState.tsx
          ErrorState.tsx
      pages/
        DashboardPage.tsx
        WikiBrowserPage.tsx
        DocumentDetailPage.tsx
        SettingsPage.tsx
      services/
        wiki.ts
      hooks/
        useWikiBrowser.ts
        useDocumentDetail.ts
      data/
        mockWiki.ts
      types/
        wiki.ts
        document.ts
      lib/
        utils.ts
      styles/
        globals.css
      App.tsx
      main.tsx
```

设计原则：
- `Tailwind` 只负责视图层表达，不负责项目分层
- `services / hooks / types` 不因样式体系变化而变化
- 保持轻量工程化，不提前造太多抽象

## 三个需求的最终划分
### REQ-01：工程基座与 Tailwind 接入
完成：
- 阶段 2 项目初始化
- 脚本与代码规范
- Tailwind 接入
- 静态 `AppShell`

### REQ-02：多页面笔记工作台
完成：
- 路由
- 共享布局
- Mock 数据服务
- `Dashboard / Wiki Browser / Document Detail / Settings`
- `loading / empty / error`

### REQ-03：逻辑抽离与工程整理
完成：
- 自定义 Hook
- 目录边界清理
- 页面逻辑降噪

## 成功标准
第二阶段结束时，学习者应能清楚解释：
- 为什么工程基线应该先搭好，再接业务
- 为什么 Tailwind 适合在这一阶段引入
- 为什么 `Document Detail` 在阶段 2 先只读
- 为什么共享布局和路由应该先于编辑器本体建立
- 什么情况下应该抽 `hook`

## 页面深度分层策略
第二阶段会把 4 个页面全部做出来，但不会要求它们同等复杂。

推荐深度分层：
- `Dashboard`：中等深度，作为真实工作台首页
- `Wiki Browser`：最高优先级，承载核心信息架构
- `Document Detail`：中等偏浅，只读承载即可
- `Settings`：浅实现，用来补齐应用完整性与表单型页面模式

## 结论
第二阶段的正确目标不是“做一个复杂系统”，而是：

> 搭建一个足够真实、足够可维护、又能自然衔接阶段 3 的 React 应用壳。

轻量笔记工作台正好满足这一点。
