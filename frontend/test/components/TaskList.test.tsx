import TaskList from '../../src/components/TaskList'
import type { Task } from '../../src/types'
import { fireEvent, render, screen } from '@testing-library/react'

describe('TaskList', () => {
  const tasks: Task[] = [
    {
      id: 1,
      description: 'Task one',
    },
    {
      id: 2,
      description: 'Task two',
    },
  ]
  const isTaskEditable = vi.fn()
  const onTaskAdd = vi.fn()
  const onTaskCompletion = vi.fn()
  const onTaskDelete = vi.fn()
  const onTaskEdit = vi.fn()
  const onTaskSave = vi.fn()
  const onTaskUpdate = vi.fn()

  beforeEach(() => {
    render(
      <TaskList
        tasks={tasks}
        isTaskEditable={isTaskEditable}
        onTaskAdd={onTaskAdd}
        onTaskCompletion={onTaskCompletion}
        onTaskDelete={onTaskDelete}
        onTaskEdit={onTaskEdit}
        onTaskSave={onTaskSave}
        onTaskUpdate={onTaskUpdate}
      />,
    )
  })

  it('renders each task', () => {
    const taskOne = screen.getByText(tasks[0].description)
    const taskTwo = screen.getByText(tasks[1].description)

    expect(taskOne).toBeDefined()
    expect(taskTwo).toBeDefined()
  })

  it('calls the `onTaskAdd` callback when the "Add Task" button is clicked', () => {
    const addTaskButton = screen.getByRole('button', { name: 'Add Task' })
    fireEvent.click(addTaskButton)

    expect(onTaskAdd).toHaveBeenCalledOnce()
  })
})
