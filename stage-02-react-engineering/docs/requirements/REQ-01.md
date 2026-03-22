# 第二阶段 REQ-01

## 名称
工程基座与 Tailwind 接入

## 状态
已批准

## 背景
第一阶段已经完成了 React 页面开发、组件拆分、状态管理和本地持久化的基础训练。

第二阶段的目标不再是继续强化单页页面，而是正式建立一个更接近真实项目的 React 应用基线。

这一轮会重新开始一个新项目，但学习重点不是“再练一次脚手架”，而是：
- 用工程化的方式初始化项目
- 建立更清晰的目录结构
- 把 `Tailwind CSS` 规范地接入项目
- 搭出轻量笔记工作台的静态应用壳

## 目标
在 `stage-02-react-engineering/app` 中完成：
- `Vite + React + TypeScript` 项目基座
- `ESLint / Prettier`
- 基础 `npm scripts`
- `Tailwind CSS`
- 静态 `AppShell`
- 阶段 2 的基础目录结构

完成本需求后，学习者应能清楚解释：
- 为什么 Tailwind 更适合在这一阶段引入
- 为什么布局壳应先于业务页面细节建立
- 为什么阶段 2 要用共享布局，而不是继续做单页应用

## 非目标
本需求明确不做：
- 真实后端
- 异步数据请求
- 编辑器
- 自定义 Hook
- 状态管理库
- 页面业务联调
- 笔记编辑功能

## 功能需求
### 1. 初始化新项目
- 使用 `Vite + React + TypeScript`
- 项目目录为 `stage-02-react-engineering/app`
- 能正常安装依赖并启动开发环境

### 2. 建立工程基线
- 配置 `ESLint`
- 配置 `Prettier`
- 统一基础脚本，如：
  - `dev`
  - `build`
  - `lint`
  - `format`

### 3. 接入 Tailwind CSS
- 项目必须接入 `Tailwind CSS`
- 必须具备全局样式入口
- 必须建立基础设计 token / theme 思路
- 首轮样式应优先服务布局、卡片、导航和页面壳

### 4. 建立静态应用壳
- 必须存在一个静态 `AppShell`
- `AppShell` 至少包含：
  - `Sidebar`
  - `Topbar`
  - `Main Content`
- 页面先不接真实路由逻辑，也不接真实数据逻辑

### 5. 建立阶段 2 的基础目录结构
- 应至少建立：
  - `app/`
  - `components/layout/`
  - `components/ui/`
  - `pages/`
  - `types/`
  - `styles/`

## 验收标准
- 项目能正常启动
- `npm run build` 通过
- `npm run lint` 通过
- `Tailwind CSS` 已正常接入
- 页面中能看到静态应用壳
- 布局结构清晰，已体现：
  - 左侧导航
  - 顶部栏
  - 主内容区
- 目录结构不再停留在阶段 1 的单页模式

## 启动说明
从仓库根目录进入：

```bash
cd stage-02-react-engineering/app
npm install
npm run dev
```

## 建议文件
建议优先涉及：

```text
stage-02-react-engineering/app/
  package.json
  vite.config.ts
  eslint.config.js
  .prettierrc
  src/
    main.tsx
    App.tsx
    app/
    components/layout/
    components/ui/
    pages/
    styles/
```

## 常见坑点
- 一上来就把路由、异步数据、业务页面和样式体系一起接入
- 引入 Tailwind 但没有建立稳定的布局骨架
- 继续沿用阶段 1 的单页组件组织方式
- 在 `REQ-01` 里过早引入自定义 Hook
- 只搭样式，不搭工程规范

## 评审重点
- 工程基座是否清晰
- Tailwind 接入是否合理
- 静态布局壳是否已经具备真实应用感
- 目录结构是否开始体现页面级应用的边界

## 手把手教学演进顺序
本需求按下面的顺序推进：

1. 阅读 `REQ-01` 文档并确认阶段 2 的产品边界  
2. 检查 `stage-02-react-engineering/app` 当前目录是否适合重新初始化脚手架  
3. 从零创建 `Vite + React + TypeScript` 项目  
4. 先运行默认模板，确认开发环境和渲染链路  
5. 清理模板代码，理解阶段 2 的入口文件与应用壳职责  
6. 建立基础工程约束：脚本、Lint、Prettier  
7. 接入 `Tailwind CSS`，确认全局样式入口  
8. 先搭静态 `AppShell` 骨架，不急着接业务  
9. 再补 `Sidebar / Topbar / Main Content` 的结构层次  
10. 用 Tailwind 完成第一轮布局和基础视觉  
11. 做一次自检：启动、构建、Lint、热更新  
12. 完成 `REQ-01` 收口 review，再进入 `REQ-02`
