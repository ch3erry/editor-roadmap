import type { NewTaskInput, Task } from '../types/task';
import { TaskCard } from './TaskCard';
import { TaskForm } from './TaskForm';

type TaskListProps = {
  tasks: Task[];
  onSubmit: (data: NewTaskInput) => void
  onToggleTask: (taskId: string) => void
}

export const TaskList = ({ tasks, onSubmit, onToggleTask }: TaskListProps) => {
  return (
    <section className="panel task-section">
      {/* 1. 列表头部与元信息 */}
      <div className="task-list-header">
        <h2 className="task-list-title">任务列表</h2>
        <p className="task-meta">当前视图共 {tasks.length} 个任务</p>
      </div>

      {/* 1. 将表单挂载在列表内部顶部 */}
      <TaskForm onSubmit={onSubmit} />

      {/* 2. 任务列表容器 */}
      <ul className="task-list">
        {tasks.map((task) => (
          /* 3. key 必须是列表生成时的最外层节点 */
          <li key={task.id} className="task-item-wrapper">
            {/* 4. 将单个任务数据下发给 TaskCard */}
            <TaskCard 
              task={task}
              onToggleTask={onToggleTask} 
            />
          </li>
        ))}
      </ul>
    </section>
  );
};