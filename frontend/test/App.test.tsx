import App from '../src/App'
import type { Task } from '../src/types'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

const mockedTasks: Task[] = [
  {
    id: 1,
    description: 'Task one',
  },
  {
    id: 2,
    description: 'Task two',
    completedAt: new Date(),
  },
]
const apiMock = {
  getTasks: vi.fn().mockImplementation(() => mockedTasks),
  createTask: vi.fn(),
  updateTask: vi.fn(),
  deleteTask: vi.fn(),
}

vi.mock('../src/utils/createTaskApi.ts', () => ({
  createTaskApi: vi.fn().mockImplementation(() => apiMock),
}))

describe('App', () => {
  beforeEach(() => render(<App />))

  it('renders a "Tasks" H1 tag', () => {
    const tasksHeader = screen.getByText('Tasks')

    expect(tasksHeader.tagName).toEqual('H1')
  })

  it('renders each task', async () => {
    await waitFor(() => {
      const taskOne = screen.getByText(mockedTasks[0].description)
      const taskTwo = screen.getByText(mockedTasks[1].description)

      expect(taskOne).toBeDefined()
      expect(taskTwo).toBeDefined()
    })
  })

  it('calls `createTask` when the "Add Task" button is clicked', () => {
    const addButton = screen.getByRole('button', { name: 'Add Task' })

    fireEvent.click(addButton)

    expect(apiMock.createTask).toHaveBeenCalledOnce()
  })

  it('calls `deleteTask` when the "Delete" button is clicked', async () => {
    await waitFor(() => {
      const deleteButtons = screen.getAllByRole('button', { name: 'Delete' })

      fireEvent.click(deleteButtons[0])

      expect(apiMock.deleteTask).toHaveBeenCalledExactlyOnceWith(mockedTasks[0])
    })
  })

  it('calls `updateTask` when the "Save" button is clicked', async () => {
    await waitFor(() => {
      const editButtons = screen.getAllByRole('button', { name: 'Edit' })
      fireEvent.click(editButtons[0])

      const saveButton = screen.getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      expect(apiMock.updateTask).toHaveBeenCalledExactlyOnceWith(mockedTasks[0])
    })
  })
})
