import type { Task } from '../src/types'
import { fireEvent, render, screen, act } from '@testing-library/react'

// Using a dynamic import to work around hoisting issues with vi.mock
let App: typeof import('../src/App').default

const mockedTasks: Task[] = [
  {
    id: 1,
    title: 'Task one',
    description: 'Do the thing',
    createdAt: new Date(),
  },
  {
    id: 2,
    title: 'Task two',
    description: '',
    createdAt: new Date(),
    completedAt: new Date(),
  },
]
const apiMock = {
  getTasks: vi.fn(() => mockedTasks),
  createTask: vi.fn(() => mockedTasks),
  updateTask: vi.fn(() => mockedTasks),
  deleteTask: vi.fn(() => mockedTasks),
}

vi.mock('../src/utils/createTaskApi.ts', () => ({
  createTaskApi: vi.fn().mockImplementation(() => apiMock),
}))

describe('App', () => {
  beforeEach(async () => {
    App = (await import('../src/App')).default
    render(<App />)
    await screen.findByText(mockedTasks[0].title)
  })

  it('renders a "Tasks" H1 tag', () => {
    const tasksHeader = screen.getByText('Tasks')

    expect(tasksHeader.tagName).toEqual('H1')
  })

  it('renders each task', async () => {
    const taskOne = screen.getByText(mockedTasks[0].title)
    const taskTwo = screen.getByText(mockedTasks[1].title)

    expect(taskOne).toBeDefined()
    expect(taskTwo).toBeDefined()
  })

  it('calls `createTask` when the "Add Task" button is clicked', async () => {
    const addButton = screen.getByRole('button', { name: 'Add Task' })

    await act(async () => fireEvent.click(addButton))

    expect(apiMock.createTask).toHaveBeenCalledOnce()
  })

  it('calls `deleteTask` when the "Delete" button is clicked', async () => {
    const deleteButtons = screen.getAllByRole('button', { name: 'Delete' })

    await act(async () => fireEvent.click(deleteButtons[0]))

    expect(apiMock.deleteTask).toHaveBeenCalledExactlyOnceWith(mockedTasks[0])
  })

  it('calls `updateTask` when the "Save" button is clicked', async () => {
    const editButtons = screen.getAllByRole('button', { name: 'Edit' })

    await act(async () => {
      fireEvent.click(editButtons[0])

      const saveButton = await screen.findByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)
    })

    expect(apiMock.updateTask).toHaveBeenCalledExactlyOnceWith(mockedTasks[0])
  })
})
