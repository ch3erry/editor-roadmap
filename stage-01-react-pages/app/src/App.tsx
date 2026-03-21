import './App.css'
import { useState } from 'react'
import type { FilterValue } from './types/filter'
import { initialTasks } from './data/tasks'
import { Header } from './components/Header'
import { SummaryCards } from './components/SummaryCards'
import { FilterBar } from './components/FilterBar'
import { TaskList } from './components/TaskList'

function App() {
  const [filter, setFilter] = useState<FilterValue>('all')
  const [tasks, setTasks] = useState(initialTasks)

  const totalCount = tasks.length
  const completedCount = tasks.filter(
    (task) => task.status === '已完成'
  ).length
  const pendingCount = tasks.filter(
    (task) => task.status === '进行中'
  ).length
  const filteredTasks = 
    filter === 'all'
      ? tasks
      : filter === 'completed'
        ? tasks.filter(task => task.status === '已完成')
        : tasks.filter(task => task.status === '进行中')
  
  return (
    <main className="app-container">
      <Header />
      <SummaryCards 
        total={totalCount}
        completed={completedCount}
        pending={pendingCount}
      />
      <FilterBar activeFilter={filter} onFilterChange={setFilter}/>
      <TaskList tasks={filteredTasks} />
    </main>
  )
}

export default App
