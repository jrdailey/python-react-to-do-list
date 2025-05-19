import type { Task } from '../types'
import TaskListItem from './TaskListItem'
import StandardButton from './StandardButton'

interface TaskListProps {
  tasks: Task[],
  isTaskEditable: (task: Task) => boolean,
  onTaskAdd: () => void,
  onTaskCompletion: (task: Task) => void,
  onTaskDelete: (task: Task) => void,
  onTaskEdit: (task: Task) => void,
  onTaskSave: (task: Task) => void,
  onTaskUpdate: (task: Task) => void,
}

const TaskList = ({
  tasks,
  isTaskEditable,
  onTaskAdd,
  onTaskCompletion,
  onTaskDelete,
  onTaskEdit,
  onTaskSave,
  onTaskUpdate,
}: TaskListProps) => {
  return (
    <>
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
              isEditable={isTaskEditable(task)}
              onTaskCompletion={onTaskCompletion}
              onTaskDelete={onTaskDelete}
              onTaskEdit={onTaskEdit}
              onTaskSave={onTaskSave}
              onTaskUpdate={onTaskUpdate}
            />,
          )
        }
      </ul>
    </>
  )
}

export default TaskList
