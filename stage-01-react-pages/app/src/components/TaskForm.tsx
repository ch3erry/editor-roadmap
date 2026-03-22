import { useState, type ChangeEventHandler, type SubmitEventHandler } from "react";
import type { NewTaskInput } from "../types/task";


type TaskFormProps = {
  /** * 当用户完成输入并确认提交时触发
   * 将收集到的 title 和 description 传递给父组件
   */
  onSubmit: (data: NewTaskInput) => void;
}

export const TaskForm = ({ onSubmit }: TaskFormProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTitle(event.target.value)
  }

    const handleDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setDescription(event.target.value)
  }

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    
    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()

    if (!trimmedDescription || !trimmedTitle) {
      return 
    }

    onSubmit({
      title: trimmedTitle,
      description: trimmedDescription,
    })

    setTitle('')
    setDescription('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form-header">
        <h3 className="task-form-title">新增任务</h3>
        <p className="task-form-description">
          在这里录入新任务，REQ-03 将接入表单状态与本地持久化。
        </p>
      </div>

      <div className="task-form-fields">
        <div className="task-form-field">
          <label className="task-form-label" htmlFor="task-title">
            任务标题
          </label>
          <input
            id="task-title"
            className="task-form-input"
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="输入任务标题"
          />
        </div>

        <div className="task-form-field">
          <label className="task-form-label" htmlFor="task-description">
            任务描述
          </label>
          <textarea
            id="task-description"
            className="task-form-textarea"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="补充任务描述"
            rows={4}
          />
        </div>
      </div>

      <div className="task-form-actions">
        <button className="task-form-submit" type="submit">
          新增任务
        </button>
      </div>
    </form>
  )
  
}