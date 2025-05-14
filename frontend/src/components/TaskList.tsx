import type { Task } from '../types'
import TaskListItem from './TaskListItem'

interface TaskListProps {
  tasks: Task[],
  onTaskUpdate: (task: Task) => void,
  onTaskSave: (task: Task) => void,
}

const TaskList = ({
  tasks,
  onTaskUpdate,
  onTaskSave,
}: TaskListProps) => {
  return (
    <>
      <ul className="flex flex-col w-2/3">
        {
          tasks.map(task =>
            <TaskListItem
              key={task.id}
              task={task}
              onTaskUpdate={onTaskUpdate}
              onTaskSave={onTaskSave}
            />,
          )
        }
      </ul>
    </>
  )
}

export default TaskList
