# Loop 2: REQ-01 静态任务面板样式实现说明

## 这次实现做了什么
这一步只解决 `REQ-01` 的静态呈现问题，不引入状态、不拆真实组件、不接本地数据流。目标是把单文件静态页面的视觉和布局先收敛到 UX 稿附近，为下一轮组件拆分打基础。

本次改动集中在三个文件：
- `app/src/App.tsx`
- `app/src/App.css`
- `app/src/index.css`

## 为什么先分成 `index.css` 和 `App.css`
这是前端项目里很常见的分层方式。

### `index.css`
负责全局基线，只放这些内容：
- 浏览器默认样式的最小 reset
- 字体和文字渲染基线
- 页面背景色
- `#root` 这个 React 挂载宿主的最小约束

它不应该负责：
- 当前页面的最大宽度
- 页面卡片布局
- 标题区、任务区、筛选区的具体排版

原因很简单：`index.css` 是整个应用共享的地基，不应该偷偷替一页业务界面做决定。

### `App.css`
负责当前任务面板页面的具体视觉实现，包括：
- 页面主容器排版
- 卡片面板
- Header 左右布局
- Summary 三列卡片
- FilterBar 的胶囊壳
- TaskList 的卡片和状态标签

## 这张 UX 稿是怎么翻译成 CSS 的
读这张稿时，不要先盯颜色和阴影，先读布局关系。

### 第 1 层：页面主轴
页面是单列结构，从上到下依次是：
- Header
- SummaryCards
- FilterBar
- TaskList

这直接决定了 `.app-container` 应该使用：

```css
display: flex;
flex-direction: column;
gap: 20px;
```

这里用 `gap`，而不是给每个卡片写 `margin-bottom`，是因为区块间距应该由父容器统一管理。这样以后增删区块更稳定，不容易出现最后一个区块仍然带底部间距的问题。

### 第 2 层：区块内部的方向
#### Header
左边是一组文字，右边是日期徽标，所以 `header-section` 用横向 `flex`，并且左右分离：

```css
display: flex;
justify-content: space-between;
align-items: flex-start;
```

#### SummaryCards
三张卡片横向等宽排列，所以 `summary-section` 用 `flex`，每张卡片 `flex: 1`。

#### FilterBar
左边是提示文案，右边是按钮组，不是“文案后面直接跟按钮”。因此结构是：

```text
filter-section
  prompt-text
  filter-tabs
    filter-btn
    filter-btn
    filter-btn
```

`filter-tabs` 是一个胶囊壳，内部按钮再呈现选中态。

#### TaskList
外层是一个白色 panel，内部再分为：
- `task-list-header`
- `task-list`

`task-list-header` 需要左右对齐，所以继续使用 `flex`。

## 这次样式里最关键的 6 个决定
### 1. 页面容器自己管理节奏
`.app-container` 负责：
- 宽度限制
- 居中
- 页面内边距
- 主轴方向
- 区块间距

这比把间距散落到每个子元素里更稳。

### 2. `panel` 走轻卡片，而不是重阴影
UX 稿不是电商卡片风格，而是教学型极简界面。因此实现选择了：
- 白底
- 细边框
- 较大的圆角
- 很轻的阴影

重点是边框感，不是漂浮感。

### 3. Summary 卡片左对齐
之前尝试过居中布局，但这会让它更像统计大屏组件，不像信息卡。设计稿里 Summary 信息的阅读顺序是：
- 标签
- 数字
- 说明

因此最终改成左对齐。

### 4. Filter 激活态改成中性风格
之前的蓝色激活态太强，会把整个页面重心拉偏。设计稿里激活态非常克制，所以最终选的是：
- 浅灰色按钮壳
- 激活按钮白底
- 细边框
- 轻微阴影

### 5. Task item 使用“外层白 panel + 内层浅灰条目”
这和 UX 稿的视觉层级一致：
- `task-section` 是白色外层容器
- 每个 `task-item` 是更浅的内部行卡片

这样能把“模块”与“列表项”两个层级分开。

### 6. 提前补移动端退化规则
虽然这张稿是桌面稿，但页面不能在窄屏直接坏掉。因此加入了两个媒体查询，让：
- Summary 三列在小屏下改成竖排
- FilterBar、TaskList Header、Task item 在中小屏时自动换成纵向堆叠

这不是在做完整响应式设计，只是在防止布局崩坏。

## 为什么改了 `App.tsx`
这次不只是写 CSS，也对静态 HTML 结构做了轻量修正，因为有些视觉层级仅靠 CSS 不够干净。

主要调整有：
- 给日期加上 `date-badge` 类，方便单独实现徽标样式
- 把 FilterBar 拆成提示文案和 `filter-tabs` 胶囊壳
- 给 Summary 卡片增加说明文字
- 把任务列表文案改成更贴近 UX 稿
- 给状态标签拆成 `status-badge--done` 和 `status-badge--progress`

这些改动仍然属于 `REQ-01` 的范围，因为它们只是改善静态呈现，不涉及交互逻辑。

## 这次没有做什么
为了保持 `REQ-01` 边界清晰，这一步明确没有做：
- `useState`
- `props` 传值
- `tasks.map`
- 组件拆分
- 本地存储
- 点击筛选
- 点击切换任务状态

这些会在后续循环里逐步引入。

## 你现在应该从这次实现中记住什么
如果只记住 4 句话，记这 4 句：

1. 先用 UX 稿确定布局主轴，再写具体颜色和阴影。
2. 全局基线放 `index.css`，业务页面样式放 `App.css`。
3. 父容器负责整体布局节奏，子元素负责局部视觉。
4. 静态 UI 先收敛结构和层级，再进入组件拆分和数据流。

## 下一步最自然的演进
样式收敛后，下一步不是继续抠视觉，而是回到 `REQ-01` 的主线：
- 把 `Header`
- `SummaryCards`
- `FilterBar`
- `TaskList`
- `TaskCard`

从 `App.tsx` 里拆出去，让页面结构和组件结构真正对齐。
