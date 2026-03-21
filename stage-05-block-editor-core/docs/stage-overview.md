# 阶段 5 概览：块编辑器核心 (Block Editor Core)

## 目标 (Objective)
构建一个类似 Notion 的**块编辑器 (Block Editor)** 核心逻辑，但不涉及 Notion 复杂的完整产品功能范围。

## 范围 (Scope)
* **基于“块”的文档模型**：理解文档不再是长文本，而是块的数组。
* **基础块类型**：支持段落、标题、待办事项（Todo）和代码块。
* **核心块操作**：实现块的创建、删除、拆分（Split）、合并（Merge）以及移动操作。
* **斜杠菜单 (Slash Menu)**：实现输入 `/` 弹出组件选择器的交互行为。
* **持久化与回放**：数据的保存及其重新加载逻辑。

## 非本阶段目标 (Out of Scope)
* 实时协作（Real-time collaboration）
* 页面树与工作区管理
* 数据库（Databases）与视图（Views）
* 权限管理

## 需求序列 (Requirement Sequence)

### REQ-01
定义块模型（Block Model）并渲染一个最简化的块文档。

### REQ-02
实现核心块操作（如 Enter 键拆分块、Backspace 键合并块）及焦点转换逻辑。

### REQ-03
添加简易的斜杠菜单与数据持久化流程。