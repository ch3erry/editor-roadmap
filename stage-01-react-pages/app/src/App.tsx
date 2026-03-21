import './App.css'
import { tasks } from './data/tasks'
import { Header } from './components/Header'
import { SummaryCards } from './components/SummaryCards'
import { FilterBar } from './components/FilterBar'
import { TaskList } from './components/TaskList'

function App() {
  return (
    <main className="app-container">
      <Header />
      <SummaryCards />
      <FilterBar />
      <TaskList tasks={tasks} />
    </main>
  )
}

export default App
