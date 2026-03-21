export const Header = () => {
  return (
    <header className="panel header-section">
      {/* 1. 左侧文案组 */}
      <div className="header-text-group">
        <p className="stage-tag">Stage 01 · React Pages</p>
        <h1 className="title">今日任务面板</h1>
        <p className="description">
          用清晰的页面结构练习组件拆分、Props 传值与后续状态管理。
        </p>
      </div>

      {/* 2. 右侧日期徽标 */}
      <time className="date-badge" dateTime="2026-03-21">
        2026-03-21
      </time>
    </header>
  );
};