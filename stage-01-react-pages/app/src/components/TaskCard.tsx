import type { Task } from '../types/task';

// 仅在组件内部使用的 Props 类型定义
type TaskCardProps = {
  task: Task;
};

export const TaskCard = ({ task }: TaskCardProps) => {
  const { title, description, status } = task;

  // 1. 根据中文状态值决定 CSS 修饰符类名 (BEM风)
  // 严格匹配 App.tsx 中的: status-badge--done 或 status-badge--progress
  const statusModifier =
    status === '已完成' ? 'status-badge--done' : 'status-badge--progress';

  return (
    // 2. 根节点使用 article，类名为 task-item
    // 注意：App.tsx 中的 li.task-item-wrapper 属于列表容器职责，不应放进卡片组件内部
    <article className="task-item">
      {/* 3. 这里的结构和类名与原 App.tsx 保持绝对一致 */}
      <div className="task-info">
        <h3 className="task-title">{title}</h3>
        <p className="task-description">
          {description}
        </p>
      </div>
      
      {/* 4. 状态标签：组合基础类名和动态修饰符类名 */}
      <span className={`status-badge ${statusModifier}`}>
        {status}
      </span>
    </article>
  );
};