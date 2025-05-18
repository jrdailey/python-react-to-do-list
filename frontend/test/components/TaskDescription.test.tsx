import TaskDescription from '../../src/components/TaskDescription'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('TaskDescription', () => {
  const description = 'task description'

  describe('when editable', () => {
    const isEditable = true

    it('renders an auto-focused text input for the description', () => {
      render(<TaskDescription description={description} isEditable={isEditable} />)

      const input = screen.getByRole('textbox')

      expect(input).toHaveValue(description)
      expect(document.activeElement).toBe(input)
    })

    it('calls the onUpdate callback when a user types in the textbox', async () => {
      const user = userEvent.setup()
      const onUpdate = vi.fn()
      render(<TaskDescription description={description} isEditable={isEditable} onUpdate={onUpdate} />)

      const input = screen.getByRole('textbox')
      const typedText = 'test'
      await user.type(input, typedText)

      expect(onUpdate).toHaveBeenCalledTimes(typedText.length)
    })
  })

  describe('when not editable', () => {
    const isEditable = false

    it('renders the description text', () => {
      render(<TaskDescription description={description} isEditable={isEditable} />)

      const text = screen.getByText(description)

      expect(text).toBeDefined()
    })
  })
})
