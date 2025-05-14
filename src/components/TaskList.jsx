const TaskList = ({ tasks }) => {
  return (
    <>
      <ul>
        {
          tasks.map((task) => {
            return (
              <li key={task.id}>
                <span>{task.title}</span><br />
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
