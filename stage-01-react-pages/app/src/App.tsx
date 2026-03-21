import './App.css'

function App() {
  return (
    <main className="app-container">
      <header className="panel header-section">
        <div className="header-text-group">
          <p className="stage-tag">Stage 01 · React Pages</p>
          <h1 className="title">今日任务面板</h1>
          <p className="description">
            用清晰的页面结构练习组件拆分、Props 传值与后续状态管理。
          </p>
        </div>
        <time className="date-badge" dateTime="2026-03-21">
          2026-03-21
        </time>
      </header>

      <section className="summary-section" aria-label="任务摘要">
        <article className="summary-card">
          <p className="summary-label">总任务数</p>
          <strong className="summary-value">4</strong>
          <p className="summary-note">当前列表中的全部任务。</p>
        </article>
        <article className="summary-card">
          <p className="summary-label">已完成</p>
          <strong className="summary-value summary-value--success">2</strong>
          <p className="summary-note">后续可由 props 或简单计算得出。</p>
        </article>
        <article className="summary-card">
          <p className="summary-label">未完成</p>
          <strong className="summary-value summary-value--warning">2</strong>
          <p className="summary-note">为 REQ-02 与 REQ-03 预留状态流转。</p>
        </article>
      </section>

      <section className="panel filter-section">
        <p className="prompt-text">
          静态展示筛选按钮，REQ-02 再接入 state 与条件渲染。
        </p>
        <div className="filter-tabs" role="group" aria-label="任务筛选">
          <button type="button" className="filter-btn active">
            全部
          </button>
          <button type="button" className="filter-btn">
            进行中
          </button>
          <button type="button" className="filter-btn">
            已完成
          </button>
        </div>
      </section>

      <section className="panel task-section">
        <div className="task-list-header">
          <h2 className="task-list-title">任务列表</h2>
          <p className="task-meta">4 个静态示例任务</p>
        </div>

        <ul className="task-list">
          <li className="task-item-wrapper">
            <article className="task-item">
              <div className="task-info">
                <h3 className="task-title">完成 Stage 1 项目初始化</h3>
                <p className="task-description">
                  确认入口文件、能启动本地开发环境，并理解页面最基础的结构划分。
                </p>
              </div>
              <span className="status-badge status-badge--done">已完成</span>
            </article>
          </li>

          <li className="task-item-wrapper">
            <article className="task-item">
              <div className="task-info">
                <h3 className="task-title">拆分 Header 与 SummaryCards 组件</h3>
                <p className="task-description">
                  先把静态页面切成清晰结构，为 props 传值与组合组件做准备。
                </p>
              </div>
              <span className="status-badge status-badge--progress">进行中</span>
            </article>
          </li>

          <li className="task-item-wrapper">
            <article className="task-item">
              <div className="task-info">
                <h3 className="task-title">准备静态任务数据结构</h3>
                <p className="task-description">
                  先约定 title、description 与 status 三类字段，方便后续用 map
                  渲染列表。
                </p>
              </div>
              <span className="status-badge status-badge--done">已完成</span>
            </article>
          </li>

          <li className="task-item-wrapper">
            <article className="task-item">
              <div className="task-info">
                <h3 className="task-title">为 REQ-03 预留新增任务入口</h3>
                <p className="task-description">
                  当前不接表单与完成状态切换，只保留可扩展的任务列表结构。
                </p>
              </div>
              <span className="status-badge status-badge--progress">进行中</span>
            </article>
          </li>
        </ul>
      </section>
    </main>
  )
}

export default App
