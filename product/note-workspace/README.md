# Note Workspace 产品总览

## 产品定位
`Note Workspace` 是一款面向个人与组织知识协作场景的轻量知识工作台。

它在当前学习计划中的职责不是马上成为完整的云文档产品，而是作为一个可以持续演进的产品壳：
- 第二阶段承载 `React` 工程化、`SPA` 路由、共享布局与 `Tailwind CSS`
- 第三阶段在 `Document Detail` 中接入 `Tiptap`
- 后续阶段继续向块编辑器与知识协作系统演进

## 当前产品目标
当前产品要解决的问题是：
- 为用户提供统一的知识工作台入口
- 支持 `个人 / 组织` 两类同层级工作范围切换
- 在工作范围下组织多个 `Wiki`
- 在 `Wiki` 下组织文档与子文档
- 提供稳定的文档浏览、预览与详情承载页

## 核心信息架构
产品当前确认的核心层级为：

```text
Scope（个人 / 组织）
  -> Wiki（知识库）
    -> Document（文档）
      -> Child Document（子文档）
```

其中：
- `个人` 与 `组织` 属于同一层级，它们是工作上下文，不是普通页面
- `Wiki` 是知识容器
- `Document` 是内容实体
- `Child Document` 用树形结构表达内容层级

## 当前页面体系
产品当前确认的 4 个核心页面：
- `Dashboard`
- `Wiki Browser`
- `Document Detail`
- `Settings`

统一设计原则：
- 4 个页面共用同一套设计系统
- 共用 `Sidebar + Topbar + Main Content` 的应用壳
- 页面区别只发生在主内容区，不做视觉系统分裂

## 设计资产
当前阶段 2 的设计资产位于：
- 设计源文件：`stage-02-react-engineering/design_docs/note-workspace-ui.pen`
- Dashboard PNG：`stage-02-react-engineering/design_docs/IMmFC.png`
- Wiki Browser PNG：`stage-02-react-engineering/design_docs/pFJDa.png`
- Document Detail PNG：`stage-02-react-engineering/design_docs/ZMngp.png`
- Settings PNG：`stage-02-react-engineering/design_docs/lhmIC.png`

## 与教学阶段的关系
### Stage 1
完成 React 基础页面、状态、派生数据与本地持久化训练。

### Stage 2
把产品建立成可维护的 `SPA` 壳：
- 工程基座
- Tailwind CSS
- 路由
- 共享布局
- Mock 异步状态

### Stage 3
将 `Document Detail` 升级为 `Tiptap` 编辑器承载页。

### 后续阶段
继续围绕同一产品演进块编辑器、知识结构与协作能力，而不是切换产品主题。

## 当前范围边界
当前产品仍然明确不做：
- 真实后端
- 多人协作
- 权限系统
- 数据库
- SSR
- 复杂工作流自动化

这些能力不是被否定，而是会在产品壳与编辑器基础稳定后再决定是否进入。
