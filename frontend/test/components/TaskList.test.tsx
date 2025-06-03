import TaskList from '../../src/components/TaskList'
import type { Task } from '../../src/types'
import { fireEvent, render, screen } from '@testing-library/react'

describe('TaskList', () => {
  const tasks: Task[] = [
    {
      id: 1,
      title: 'Task one',
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'Task two',
      createdAt: new Date(),
    },
  ]
  const isTaskEditable = vi.fn()
  const onTaskAdd = vi.fn()
  const onTaskDelete = vi.fn()
  const onTaskEdit = vi.fn()
  const onTaskSave = vi.fn()

  beforeEach(() => {
    render(
      <TaskList
        tasks={tasks}
        isTaskEditable={isTaskEditable}
        onTaskAdd={onTaskAdd}
        onTaskDelete={onTaskDelete}
        onTaskEdit={onTaskEdit}
        onTaskSave={onTaskSave}
      />,
    )
  })

  it('renders each task', () => {
    const taskOne = screen.getByText(tasks[0].title)
    const taskTwo = screen.getByText(tasks[1].title)

    expect(taskOne).toBeDefined()
    expect(taskTwo).toBeDefined()
  })

  it('calls the `onTaskAdd` callback when the "Add Task" button is clicked', () => {
    const addTaskButton = screen.getByRole('button', { name: 'Add Task' })
    fireEvent.click(addTaskButton)

    expect(onTaskAdd).toHaveBeenCalledOnce()
  })
})
