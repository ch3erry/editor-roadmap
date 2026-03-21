export type Task = {
  id: string;
  title: string;
  description: string;
  status: '已完成' | '进行中'
}

export const initialTasks: Task[] = [
  {
    id: '1',
    title: '学习 React 状态管理',
    description: '理解 initialTasks 与 tasks 的区别',
    status: '进行中',
  },
  {
    id: '2',
    title: '重构代码命名',
    description: '将静态数据重命名为种子数据',
    status: '已完成',
  }
];