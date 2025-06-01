import TextField from '../../src/components/TextField'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('TextField', () => {
  const value = 'task value'

  describe('when editable', () => {
    const isEditable = true

    it('renders a text input for the value', () => {
      render(
        <TextField
          label="Test"
          value={value}
          inputName="test"
          isEditable={isEditable}
        />,
      )

      const input = screen.getByRole('textbox')

      expect(input).toHaveValue(value)
    })

    it('renders the input as the active element when `autoFocus=true`', () => {
      render(
        <TextField
          label="Test"
          value={value}
          inputName="test"
          autoFocus={true}
          isEditable={isEditable}
        />,
      )

      const input = screen.getByRole('textbox')

      expect(document.activeElement).toBe(input)
    })

    it('calls the onUpdate callback when a user types in the textbox', async () => {
      const user = userEvent.setup()
      const onUpdate = vi.fn()

      render(
        <TextField
          label="Test"
          value={value}
          inputName="test"
          isEditable={isEditable}
          onUpdate={onUpdate}
        />,
      )

      const input = screen.getByRole('textbox')
      const typedText = 'test'
      await user.type(input, typedText)

      expect(onUpdate).toHaveBeenCalledTimes(typedText.length)
    })
  })

  describe('when not editable', () => {
    const isEditable = false

    it('renders the value text', () => {
      render(
        <TextField
          label="Test"
          value={value}
          inputName="test"
          isEditable={isEditable}
        />,
      )
      const text = screen.getByText(value)

      expect(text).toBeDefined()
    })
  })
})
