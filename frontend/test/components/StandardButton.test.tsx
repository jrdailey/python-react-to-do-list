import { fireEvent, render, screen } from '@testing-library/react'
import StandardButton from '../../src/components/StandardButton'

describe('StandardButton', () => {
  describe('Default options', () => {
    beforeEach(() => {
      render(<StandardButton text='Button text' />)
    })

    it('matches snapshot', () => {
      const button = screen.getByRole('button')

      expect(button).toMatchSnapshot()
    })

    it('renders the text', () => {
      const button = screen.getByRole('button')

      expect(button).toHaveTextContent('Button text')
    })

    it('renders the button as a `button` type', () => {
      const button = screen.getByRole('button')

      expect(button).toHaveAttribute('type', 'button')
    })

    it('renders the button with a gray color', () => {
      const button = screen.getByRole('button')

      expect(button).toHaveClass('bg-slate-400')
    })
  })

  it('makes use of the given onClick callback', () => {
    const onClick = vi.fn()
    render(<StandardButton text='text' onClick={onClick} />)

    fireEvent.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('can render a `submit` button', () => {
    render(<StandardButton type='submit' text='text' />)

    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('type', 'submit')
  })

  it('can render a blue button', () => {
    render(<StandardButton color='blue' text='text' />)

    const button = screen.getByRole('button')

    expect(button).toHaveClass('bg-blue-500')
  })

  it('can render a green button', () => {
    render(<StandardButton color='green' text='text' />)

    const button = screen.getByRole('button')

    expect(button).toHaveClass('bg-green-500')
  })

  it('can render a red button', () => {
    render(<StandardButton color='red' text='text' />)

    const button = screen.getByRole('button')

    expect(button).toHaveClass('bg-red-500')
  })
})
