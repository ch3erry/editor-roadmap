# Note Workspace 信息架构

## 设计原则
当前产品的信息架构遵循 3 个原则：

1. 工作上下文与内容层分离  
`个人 / 组织` 是工作上下文，不直接等于文档容器。

2. 知识容器与内容实体分离  
`Wiki` 负责承载知识主题，`Document` 负责承载具体内容。

3. 内容层级显式可见  
文档下可以继续有子文档，因此必须通过树形结构表达，而不是普通平铺列表。

## 当前层级模型

```text
Scope（个人 / 组织）
  -> Wiki（知识库）
    -> Document（文档）
      -> Child Document（子文档）
```

## 各层级的职责
### 1. Scope
`Scope` 表示用户当前所处的工作范围。

当前确认两类：
- `个人`
- `组织`

设计要求：
- 它们属于同一层级
- 它们应以 `Scope Switcher` 呈现
- 它们不应被设计成普通侧边栏导航项

### 2. Wiki
`Wiki` 是知识容器，用于组织某个主题下的一组文档。

一个 `Scope` 下可以有多个 `Wiki`，例如：
- Frontend Handbook
- Brand System
- Team Rituals

设计要求：
- `Wiki` 应先于文档树出现
- 用户先确认“我在哪个范围”
- 再确认“我正在查看哪个 Wiki”

### 3. Document
`Document` 是内容实体，是未来编辑器真正承载的对象。

当前阶段它承担：
- 列表项
- 预览对象
- 详情页对象

后续阶段它还会承担：
- 富文本编辑对象
- 块编辑对象

### 4. Child Document
`Child Document` 是文档树中的下级节点。

设计要求：
- 必须以树形缩进表达
- 不应仅靠字号变化暗示层级
- 当前节点需高亮
- 父子关系需一眼可见

## 页面到信息架构的映射
### Dashboard
主要承载：
- 当前工作台入口
- 最近访问
- 常用 Wiki
- 最近更新

它不是完整层级浏览页。

### Wiki Browser
这是信息架构的核心承载页。

建议结构：
- 左栏：`Scope Switcher + Wiki 列表`
- 中栏：当前 `Wiki` 的文档树
- 右栏：当前文档预览

### Document Detail
承载单篇文档的完整阅读视图，并为后续编辑器预留位置。

### Settings
不参与主知识层级，但必须保持在同一应用壳内。

## 路由层建议
当前建议的路由表达：

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

说明：
- `Dashboard` 是入口页
- `Wiki Browser` 才是完整层级浏览页
- `Document Detail` 才是内容详情承载页

## 当前明确不采用的结构
### 不采用方案 A
```text
个人 / 组织 -> 文档 -> 子文档
```

原因：
- 缺少 `Wiki` 这一层知识容器
- 难以支撑中大型知识库组织

### 不采用方案 B
把 `个人 / 组织 / Wiki / 文档树` 全部平铺进一个侧边栏

原因：
- 层级会塌陷
- 视觉密度过高
- 用户难以分辨“上下文切换”和“内容导航”

## 当前结论
产品当前的最佳信息架构是：

> `Scope Switcher + Wiki Container + Document Tree + Detail Surface`

这套架构既满足当前阶段的教学目标，也能自然承接后续编辑器演进。
