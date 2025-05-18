import ErrorDisplay from '../../src/components/ErrorDisplay'
import { render } from '@testing-library/react'

describe('ErrorDisplay', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(<ErrorDisplay errorMessage='Something went wrong' />)

    expect(asFragment()).toMatchSnapshot()
  })
})
