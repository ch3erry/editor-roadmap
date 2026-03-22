export type Task = {
  id: string;
  title: string;
  description: string;
  status: '已完成' | '进行中'
}

export type NewTaskInput = {
  title: string
  description: string
}