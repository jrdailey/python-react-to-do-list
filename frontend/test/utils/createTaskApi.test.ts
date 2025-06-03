import { createTaskApi } from '../../src/utils'
import { mockFetch } from '../setupTests'
import type { Task, UnpersistedTask } from '../../src/types'

const apiHost = 'http://localhost'
const apiPort = '4000'
const apiUrl = `${apiHost}:${apiPort}/api`

describe('createTaskApi', () => {
  const taskApi = createTaskApi(apiHost, apiPort)
  const tasks: Task[] = [{
    id: 1,
    title: 'task one',
    createdAt: new Date(),
    completedAt: new Date(),
  }]

  mockFetch.mockResolvedValue({
    json: async () => ({ tasks }),
  })

  describe('getTasks', () => {
    it('calls the expected endpoint and returns the mocked tasks', async () => {
      const returnedTasks = await taskApi.getTasks()

      expect(returnedTasks).toEqual(tasks)
      expect(mockFetch).toHaveBeenCalledWith(`${apiUrl}/tasks`)
    })
  })

  describe('createTask', () => {
    it('calls the expected endpoint and returns the mocked tasks', async () => {
      const newTask: UnpersistedTask = {
        title: 'new task',
      }
      const returnedTasks = await taskApi.createTask(newTask)

      expect(returnedTasks).toEqual(tasks)
      expect(mockFetch).toHaveBeenCalledWith(`${apiUrl}/tasks`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      })
    })
  })

  describe('updateTask', () => {
    it('calls the expected endpoint and returns the mocked tasks', async () => {
      const taskToUpdate: Task = {
        id: 1,
        title: 'task to update',
        createdAt: new Date(),
      }
      const returnedTasks = await taskApi.updateTask(taskToUpdate)

      expect(returnedTasks).toEqual(tasks)
      expect(mockFetch).toHaveBeenCalledWith(`${apiUrl}/tasks/${taskToUpdate.id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskToUpdate),
      })
    })
  })

  describe('deleteTask', () => {
    it('calls the expected endpoint and returns the mocked tasks', async () => {
      const taskToDelete: Task = {
        id: 1,
        title: 'delete me',
        createdAt: new Date(),
      }
      const returnedTasks = await taskApi.deleteTask(taskToDelete)

      expect(returnedTasks).toEqual(tasks)
      expect(mockFetch).toHaveBeenCalledWith(`${apiUrl}/tasks/${taskToDelete.id}`, { method: 'DELETE' })
    })
  })
})
