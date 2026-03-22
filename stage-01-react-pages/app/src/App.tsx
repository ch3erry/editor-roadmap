import './App.css'
import { useEffect, useState } from 'react'
import type { NewTaskInput, Task } from './types/task'
import type { FilterValue } from './types/filter'
import { initialTasks } from './data/initialTasks'
import { Header } from './components/Header'
import { SummaryCards } from './components/SummaryCards'
import { FilterBar } from './components/FilterBar'
import { TaskList } from './components/TaskList'

const TASKS_STORAGE_KEY = 'stage-01-task-board-tasks'

function App() {
  const [filter, setFilter] = useState<FilterValue>('all')

  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY)
      if (!savedTasks) return initialTasks

      const parsed = JSON.parse(savedTasks)

      if (Array.isArray(parsed)) {
        return parsed
      } else {
        console.warn("Storage data format is invalid")
        return initialTasks
      }
      
    } catch (error) {
      console.error('Failed to load tasks from localStorage:', error)
      return initialTasks
    }
  });

  // 【写】逻辑：监听 tasks 变化
  useEffect(() => {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
    } catch (error) {
      console.error('Failed to save tasks to localStorage:', error)
    }
  }, [tasks]) // 依赖数组中只有 tasks，因此 effect 只会在 tasks 变化时重新执行。

  const handleAddTask = (input: NewTaskInput) => {
    const newTask: Task = {
      id: String(Date.now()),
      title: input.title,
      description: input.description,
      status: '进行中'
    }

    setTasks((preTasks) => [newTask, ...preTasks])
  }

  const handleToggleTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { 
              ...task, 
              status: task.status === '已完成' ? '进行中' : '已完成' 
            }
          : task
      )
    )
  }

  const totalCount = tasks.length
  const completedCount = tasks.filter((task) => task.status === '已完成').length
  const pendingCount = tasks.filter((task) => task.status === '进行中').length
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
      <TaskList 
        tasks={filteredTasks} 
        onSubmit={handleAddTask} // 向下传递新增回调
        onToggleTask={handleToggleTask}
      />
    </main>
  )
}

export default App
