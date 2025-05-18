import { fireEvent, render, screen } from '@testing-library/react'
import TaskCompletionStatus from '../../src/components/TaskCompletionStatus'

describe('TaskCompletionStatus', () => {
  describe('when editable', () => {
    const isEditable = true

    it('renders an unchecked checkbox when there is no completedAt date', () => {
      render(<TaskCompletionStatus isEditable={isEditable} />)

      const inputLabel = screen.getByLabelText('Completed')
      const input = screen.getByRole('checkbox', { checked: false })

      expect(inputLabel).toBeDefined()
      expect(input).toBeDefined()
    })

    it('renders a checked checkbox when there is a completedAt date', () => {
      const completedAt = new Date()
      render(<TaskCompletionStatus completedAt={completedAt} isEditable={isEditable} />)

      const inputLabel = screen.getByLabelText('Completed')
      const input = screen.getByRole('checkbox', { checked: true })

      expect(inputLabel).toBeDefined()
      expect(input).toBeDefined()
    })

    it('calls the onChange callback when the checkbox is clicked', () => {
      const onChange = vi.fn()
      render(<TaskCompletionStatus isEditable={isEditable} onChange={onChange} />)

      const input = screen.getByRole('checkbox')
      fireEvent.click(input)

      expect(onChange).toHaveBeenCalledOnce()
    })
  })

  describe('when not editable', () => {
    const isEditable = false

    it('renders a checkbox when there is no completedAt date', () => {
      render(<TaskCompletionStatus isEditable={isEditable} />)

      const inputLabel = screen.getByLabelText('Completed')
      const input = screen.getByRole('checkbox', { checked: false })

      expect(inputLabel).toBeDefined()
      expect(input).toBeDefined()
    })

    it('renders the completedAt date when it exists', () => {
      const completedAt = new Date()
      render(<TaskCompletionStatus completedAt={completedAt} isEditable={isEditable} />)

      const completedAtText = screen.getByText(`Completed at ${completedAt.toLocaleString()}`)

      expect(completedAtText).toBeDefined()
    })

    it('renders the completedAt date when it is passed as JSON', () => {
      const completedAt = new Date().toJSON()
      render(<TaskCompletionStatus completedAt={completedAt} isEditable={isEditable} />)

      const completedAtText = screen.getByText(`Completed at ${new Date(completedAt).toLocaleString()}`)

      expect(completedAtText).toBeDefined()
    })

    it('calls the onChange callback when the checkbox is clicked', () => {
      const onChange = vi.fn()
      render(<TaskCompletionStatus isEditable={isEditable} onChange={onChange} />)

      const input = screen.getByRole('checkbox')
      fireEvent.click(input)

      expect(onChange).toHaveBeenCalledOnce()
    })
  })
})
