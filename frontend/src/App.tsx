import { Task } from './types'
import TaskList from './components/TaskList'

const tasks: Task[] = [
  {
    id: 0,
    description: 'Do the thing',
  },
  {
    id: 1,
    description: 'Do the other thing',
    completedAt: new Date(),
  },
]

function App() {
  return (
    <>
      <div className="bg-neutral-100">
        <h1 className="text-2xl text-center">Task List</h1>
        <hr />
        <TaskList tasks={tasks} />
      </div>
    </>
  )
}

export default App
