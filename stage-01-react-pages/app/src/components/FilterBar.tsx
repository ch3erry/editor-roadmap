import type { FilterValue } from "../types/filter"

type FilterBarProp = {
  activeFilter: FilterValue;
  onFilterChange: (val: FilterValue) => void
}

export const FilterBar = ({ activeFilter, onFilterChange}: FilterBarProp) => {
  return (
      <section className="panel filter-section">
        <p className="prompt-text">
          点击切换筛选视图，观察激活态与列表内容如何响应状态变化。
        </p>
        <div className="filter-tabs" role="group" aria-label="任务筛选">
          <button 
            type="button" 
            className={`filter-btn ${activeFilter === 'all' ? `active` : ''}`}
            onClick={() => onFilterChange('all')}
          >
            全部
          </button>
          <button 
            type="button" 
            className={`filter-btn ${activeFilter === 'in-progress' ? `active` : ''}`}
            onClick={() => onFilterChange('in-progress')}
          >
            进行中
          </button>
          <button 
            type="button" 
            className={`filter-btn ${activeFilter === 'completed' ? `active` : ''}`}
            onClick={() => onFilterChange('completed')}
          >
            已完成
          </button>
        </div>
      </section>
  )
}