import type { Task } from '../types/task';
import { TaskCard } from './TaskCard';

type TaskListProps = {
  tasks: Task[];
}

export const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <section className="panel task-section">
      {/* 1. 列表头部与元信息 */}
      <div className="task-list-header">
        <h2 className="task-list-title">任务列表</h2>
        <p className="task-meta">当前视图共 {tasks.length} 个任务</p>
      </div>

      {/* 2. 任务列表容器 */}
      <ul className="task-list">
        {tasks.map((task) => (
          /* 3. key 必须是列表生成时的最外层节点 */
          <li key={task.id} className="task-item-wrapper">
            {/* 4. 将单个任务数据下发给 TaskCard */}
            <TaskCard task={task} />
          </li>
        ))}
      </ul>
    </section>
  );
};