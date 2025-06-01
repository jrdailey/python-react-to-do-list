import TaskListItem from '../../src/components/TaskListItem'
import type { Task } from '../../src/types'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const setup = (props: { isEditable: boolean }) => {
  const { isEditable } = props
  const task: Task = {
    id: 1,
    completedAt: new Date(),
    createdAt: new Date(),
    title: 'task',
    description: 'hey',
  }
  const onTaskDelete = vi.fn()
  const onTaskEdit = vi.fn()
  const onTaskSave = vi.fn()

  render(
    <TaskListItem
      task={task}
      isEditable={isEditable}
      onTaskDelete={onTaskDelete}
      onTaskEdit={onTaskEdit}
      onTaskSave={onTaskSave}
    />,
  )

  return {
    task,
    onTaskDelete,
    onTaskEdit,
    onTaskSave,
  }
}

describe('TaskListItem', () => {
  it('calls onTaskDelete when the Delete button is clicked', () => {
    const { onTaskDelete } = setup({ isEditable: false })

    const deleteButton = screen.getByRole('button', { name: 'Delete' })

    fireEvent.click(deleteButton)

    expect(onTaskDelete).toHaveBeenCalledOnce()
  })

  describe('when the task is editable', () => {
    const isEditable = true

    it('renders a description textbox', () => {
      const { task } = setup({ isEditable })
      const descriptionInput = screen.getByTestId('task-description-input')

      expect(descriptionInput).toHaveValue(task.description)
    })

    it('renders a `completed` checkbox', () => {
      setup({ isEditable })

      const completionCheckbox = screen.getByTestId('task-completion-checkbox')

      expect(completionCheckbox).toBeDefined()
    })

    it('renders a Save button', () => {
      setup({ isEditable })

      const saveButton = screen.getByRole('button', { name: 'Save' })

      expect(saveButton).toBeDefined()
    })

    it('calls onTaskSave when the Save button is clicked', () => {
      const { onTaskSave } = setup({ isEditable })

      const saveButton = screen.getByRole('button', { name: 'Save' })

      fireEvent.click(saveButton)

      expect(onTaskSave).toHaveBeenCalledOnce()
    })

    it('calls onTaskSave when the user hits Enter', async () => {
      const { onTaskSave } = setup({ isEditable })

      await userEvent.keyboard('{enter}')

      expect(onTaskSave).toHaveBeenCalledOnce()
    })
  })

  describe('when the task is not editable', () => {
    const isEditable = false

    it('renders the description text', () => {
      setup({ isEditable })
      const descriptionText = screen.getByTestId('task-description-text')

      expect(descriptionText).toBeDefined()
    })

    it('renders the `completedAt` text', () => {
      setup({ isEditable })

      const completionText = screen.getByTestId('task-completion-text')

      expect(completionText).toBeDefined()
    })

    it('renders an Edit button', () => {
      setup({ isEditable })

      const editButton = screen.getByRole('button', { name: 'Edit' })

      expect(editButton).toBeDefined()
    })

    it('calls onTaskEdit when the Edit button is clicked', () => {
      const { onTaskEdit } = setup({ isEditable })

      const editButton = screen.getByRole('button', { name: 'Edit' })

      fireEvent.click(editButton)

      expect(onTaskEdit).toHaveBeenCalledOnce()
    })
  })
})
