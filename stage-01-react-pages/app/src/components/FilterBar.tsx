export const FilterBar = () => {
  return (
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
  )
}