import type { Task } from '../types'

interface TaskListProps {
  tasks: Task[]
}

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <>
      <ul>
        {
          tasks.map((task: Task) => {
            return (
              <li key={task.id}>
                <span>{task.description}</span><br />
                {task.completedAt && <span>Completed {task.completedAt.toLocaleString()}</span>}
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

export default TaskList
