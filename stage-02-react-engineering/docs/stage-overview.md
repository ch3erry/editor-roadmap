# 第二阶段概览：React 工程化笔记工作台

## 教学目标
从“会搭页面”正式进入“会维护项目”的阶段，围绕一个 `SPA` 形态的轻量笔记工作台学习：
- 工程基座搭建
- 多页面路由
- 共享布局
- 异步 UI 状态
- Tailwind CSS 在真实项目中的接入方式
- 自定义 Hook 与目录边界整理

## 阶段产品
第二阶段的产品被正式定义为：

> 一个基于 `React + TypeScript + Tailwind CSS` 的轻量笔记工作台。

它包含 4 个页面：
- `Dashboard`
- `Notes`
- `Note Detail`
- `Settings`

其中：
- `Note Detail` 在本阶段保持只读
- 第三阶段将在这一页中接入 `Tiptap`

## 涵盖范围
- **工程基座**：脚手架、目录结构、脚本、代码规范
- **Tailwind CSS**：接入、基础 theme、布局与状态 UI
- **路由管理**：`React Router` 驱动的 SPA 路由
- **共享布局**：`AppShell / Sidebar / Topbar`
- **异步数据模式**：结合本地 Mock 数据模拟真实请求
- **交互状态处理**：加载中、空状态、错误态
- **逻辑抽离**：自定义 Hook 与页面职责收口

## 明确不做
- 真实后端
- 编辑器
- 状态管理库
- SSR
- 数据库
- 拖拽
- 权限系统

## 需求开发序列

### REQ-01：工程基座与 Tailwind 接入
建立阶段 2 的新项目基线，完成：
- `Vite + React + TypeScript`
- `ESLint / Prettier`
- 项目脚本
- `Tailwind CSS`
- 静态 `AppShell`

### REQ-02：多页面笔记工作台
引入：
- 路由系统
- 共享布局
- Mock 数据服务
- `Dashboard / Notes / Note Detail / Settings`
- `loading / empty / error` 三类异步状态

### REQ-03：逻辑抽离与工程整理
在业务跑通后，重构出更清晰的：
- `components`
- `pages`
- `hooks`
- `services`
- `types`

## 阶段意义
第二阶段的目标不是直接做编辑器，而是先把承载编辑器的应用壳搭起来。

这样到了第三阶段：
- 不需要换产品
- 不需要重做路由
- 只需要把 `Note Detail` 的只读内容升级成 `Tiptap Editor`

这也是为什么阶段 2 选“轻量笔记工作台”，而不是继续扩展阶段 1 的任务面板。
