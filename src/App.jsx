import TaskList from './components/TaskList'

const tasks = [
  {
    id: 0,
    title: 'Task 1',
    description: 'Do the thing',
    completedAt: null,
  },
  {
    id: 1,
    title: 'Task 2',
    description: 'Do the other thing',
    completedAt: new Date(),
  },
]

function App() {
  return (
    <>
      <h1>Task List</h1>
      <hr />
      <TaskList tasks={tasks} />
    </>
  )
}

export default App
