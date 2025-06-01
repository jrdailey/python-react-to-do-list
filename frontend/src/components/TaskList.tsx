import type { Task } from '../types'
import TaskListItem from './TaskListItem'
import StandardButton from './StandardButton'

interface TaskListProps {
  tasks: Task[],
  isTaskEditable: (task: Task) => boolean,
  onTaskAdd: () => void,
  onTaskDelete: (task: Task) => void,
  onTaskEdit: (task: Task) => void,
  onTaskSave: (task: Task) => void,
}

const TaskList = ({
  tasks,
  isTaskEditable,
  onTaskAdd,
  onTaskDelete,
  onTaskEdit,
  onTaskSave,
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
              onTaskDelete={onTaskDelete}
              onTaskEdit={onTaskEdit}
              onTaskSave={onTaskSave}
            />,
          )
        }
      </ul>
    </>
  )
}

export default TaskList
