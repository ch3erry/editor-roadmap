import './App.css'

function App() {
  return (
    <main className='app-container'>
      {/* 1. 顶部页眉区域 */}
      <header className="panel header-section">
        {/* 左侧容器：内部文字依然是从上到下排列 */}
        <div className="header-text-group">
          <p className="stage-tag">Stage 01 · React Pages</p>
          <h1 className="title">今日任务面板</h1>
          <p className="description">用清晰的页面结构练习组件拆分、Props 传值和后续状态管理</p>
        </div>

        {/* 右侧：日期 */}
        <time dateTime="2026-03-21">2026-03-21</time>
      </header>

      {/* 2. 统计卡片区域 */}
      <section className="summary-section">
        <article className="summary-card">
          <span className="label">总任务数</span>
          <strong className="value">4</strong>
        </article>
        <article className="summary-card">
          <span className="label">已完成</span>
          <strong className="value">2</strong>
        </article>
        <article className="summary-card">
          <span className="label">未完成</span>
          <strong className="value">2</strong>
        </article>
      </section>

      {/* 3. 筛选过滤区域 */}
      <section className="panel filter-section">
        <div className="filter-group">
          <p className="prompt-text">静态展示筛选按钮，REQ-02在接入state和条件渲染</p>
          <button type="button" className="filter-btn active">全部</button>
          <button type="button" className="filter-btn">进行中</button>
          <button type="button" className="filter-btn">已完成</button>
        </div>
      </section>

      {/* 4. 任务列表区域 */}
      <section className="panel task-section">
        <div className="task-list-header">
          <h2>任务列表</h2>
          <p className="task-meta">当前共有 4 条静态示例任务</p>
        </div>

        <ul className="task-list">
          {/* 任务项 1 */}
          <li className="task-item-wrapper">
            <article className="task-item">
              <div className="task-info">
                <h3>学习 React 基础</h3>
                <p>掌握 JSX 语法和组件基本定义</p>
              </div>
              <span className="status-badge done">已完成</span>
            </article>
          </li>

          {/* 任务项 2 */}
          <li className="task-item-wrapper">
            <article className="task-item">
              <div className="task-info">
                <h3>拆分表现层组件</h3>
                <p>将 App.tsx 重构为多个独立子组件</p>
              </div>
              <span className="status-badge todo">进行中</span>
            </article>
          </li>

          {/* 任务项 3 */}
          <li className="task-item-wrapper">
            <article className="task-item">
              <div className="task-info">
                <h3>定义任务数据类型</h3>
                <p>使用 TypeScript 为 Task 编写 Interface</p>
              </div>
              <span className="status-badge todo">进行中</span>
            </article>
          </li>

          {/* 任务项 4 */}
          <li className="task-item-wrapper">
            <article className="task-item">
              <div className="task-info">
                <h3>实现静态 Props 传值</h3>
                <p>将静态数据从 App 传递到 TaskList</p>
              </div>
              <span className="status-badge done">已完成</span>
            </article>
          </li>
        </ul>
      </section>
    </main>
  )
}

export default App