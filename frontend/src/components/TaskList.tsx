import type { Task } from '../types'
import TaskListItem from './TaskListItem'
import StandardButton from './StandardButton'
import { useState } from 'react'

interface TaskListProps {
  tasks: Task[],
  onTaskAdd: () => void,
  onTaskDelete: (task: Task) => void,
  onTaskSave: (task: Task) => void,
  onTaskUpdate: (task: Task) => void,
}

const TaskList = ({
  tasks,
  onTaskAdd,
  onTaskDelete,
  onTaskSave,
  onTaskUpdate,
}: TaskListProps) => {
  const [editableTasks, setEditableTasks] = useState<Record<number, boolean>>({})

  const onTaskEdit = (task: Task, isEditable: boolean) => {
    setEditableTasks({
      ...editableTasks,
      [task.id]: isEditable,
    })
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="flex-col w-2/3 min-w-[250px]">
          <div className="flex justify-end mb-2">
            <StandardButton
              color="blue"
              text="Add Task"
              onClick={onTaskAdd}
            />
          </div>
          <ul>
            {
              tasks.map(task =>
                <TaskListItem
                  key={task.id}
                  task={task}
                  isEditable={!!editableTasks[task.id]}
                  onTaskDelete={onTaskDelete}
                  onTaskEdit={onTaskEdit}
                  onTaskSave={onTaskSave}
                  onTaskUpdate={onTaskUpdate}
                />,
              )
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default TaskList
