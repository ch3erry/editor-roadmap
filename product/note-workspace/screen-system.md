# Note Workspace 页面系统

## 统一页面壳
4 个核心页面共用同一套应用壳：

```text
Sidebar
Topbar
Main Content
```

统一规则：
- `Sidebar` 保持全局导航一致
- `Topbar` 保持全局搜索、标题与主操作一致
- 只有 `Main Content` 随页面角色变化

## 统一视觉系统
当前页面系统统一采用：
- 浅灰背景
- 白色内容面板
- 细边框
- 克制的蓝色激活态
- 中等圆角
- 极轻阴影
- 中等偏松的信息密度

参考目标是“飞书云文档气质的知识工作台”，但不是机械复刻具体截图。

## 页面 1：Dashboard
### 角色
工作台入口页。

### 主要问题
用户进入系统后，应该从哪里开始工作。

### 内容结构
- 欢迎区
- 摘要卡片
- 最近访问
- 常用 Wiki
- 最近更新

### 页面重点
- 入口感
- 概览感
- 最近活动回流

### 对应设计稿
- `stage-02-react-engineering/design_docs/IMmFC.png`

## 页面 2：Wiki Browser
### 角色
产品信息架构的核心浏览页。

### 主要问题
用户如何浏览 `个人 / 组织 -> Wiki -> 文档 -> 子文档` 这一整套结构。

### 内容结构
- 左栏：`Scope Switcher + Wiki 列表`
- 中栏：当前 Wiki 的文档树
- 右栏：当前选中文档预览

### 页面重点
- 层级清晰
- 树形导航清晰
- 预览视图稳定

### 对应设计稿
- `stage-02-react-engineering/design_docs/pFJDa.png`

## 页面 3：Document Detail
### 角色
单文档详情承载页。

### 主要问题
用户正在阅读哪篇文档，以及这篇文档未来如何承载编辑器。

### 内容结构
- 面包屑
- 文档元信息
- 标题
- 正文区域
- 右侧文档信息区

### 页面重点
- 阅读体验
- 文档结构稳定
- 为阶段 3 编辑器预留内容容器

### 对应设计稿
- `stage-02-react-engineering/design_docs/ZMngp.png`

## 页面 4：Settings
### 角色
应用完整性页面。

### 主要问题
如何在同一套壳下容纳设置型页面。

### 内容结构
- 设置分组导航
- 右侧表单与说明区
- 主按钮操作区

### 页面重点
- 与主应用视觉统一
- 为表单型页面提供样式基线

### 对应设计稿
- `stage-02-react-engineering/design_docs/lhmIC.png`

## 共享组件建议
这套页面系统天然适合后续拆成这些共享组件：
- `AppShell`
- `Sidebar`
- `Topbar`
- `StatCard`
- `Panel`
- `SectionHeader`
- `SearchInput`
- `PrimaryButton`
- `EmptyState`
- `LoadingState`
- `ErrorState`

## 当前页面系统结论
页面系统应维持：

> 统一壳、统一视觉、页面职责分明、为编辑器演进预留主内容区。

这比单纯画 4 张页面更重要，因为后续 React 工程实现依赖的正是这套一致性。
