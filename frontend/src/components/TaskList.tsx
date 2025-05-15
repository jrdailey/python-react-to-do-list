import type { Task } from '../types'
import TaskListItem from './TaskListItem'
import StandardButton from './StandardButton'

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
  return (
    <>
      <div className="flex justify-center">
        <div className="flex-col w-2/3">
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
                  onTaskDelete={onTaskDelete}
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
