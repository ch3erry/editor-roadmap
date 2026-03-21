import type { Task } from '../types/task'

export const tasks: Task[] = [
  {
    id: '1',
    title: '完成 Stage 1 项目初始化',
    description: '确认入口文件、能启动本地开发环境，并理解页面最基础的结构划分。',
    status: '已完成',
  },
  {
    id: '2',
    title: '拆分 Header 与 SummaryCards 组件',
    description: '先把静态页面切成清晰结构，为 props 传值与组合组件做准备。',
    status: '进行中',
  },
  {
    id: '3',
    title: '准备静态任务数据结构',
    description: '先约定 title、description 与 status 三类字段，方便后续用 map 渲染列表。',
    status: '已完成',
  },
  {
    id: '4',
    title: '为 REQ-03 预留新增任务入口',
    description: '当前不接表单与完成状态切换，只保留可扩展的任务列表结构。',
    status: '进行中',
  },
]