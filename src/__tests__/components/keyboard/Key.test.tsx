import { render, fireEvent, screen } from '@testing-library/react'
import Key from '../../../components/keyboard/Key'

describe('Key component', () => {
  const mockOnClick = jest.fn()

  const defaultProps = {
    letter: 'A',
    onClick: mockOnClick,
    classes: ['class1', 'class2'],
  }

  beforeEach(() => {
    mockOnClick.mockClear()
  })

  test('renders the Key component with correct props', () => {
    render(<Key {...defaultProps} />)

    const key = screen.getByText(defaultProps.letter)
    expect(key).toBeInTheDocument()
    expect(key).toHaveClass('class1 class2 key', {exact: true})
  })

  test('calls the onClick function when clicked', () => {
    render(<Key {...defaultProps} />)

    fireEvent.click(screen.getByText(defaultProps.letter))

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  test('adds additional classes for the Enter key', () => {
    render(<Key {...defaultProps} letter="Enter" />)

    const key = screen.getByText("Enter")
    expect(key).toHaveClass('large')
    expect(key).toHaveClass('smallText')
  })

  test('adds an additional class for the Backspace key', () => {
    render(<Key {...defaultProps} letter="⌫" />)

    expect(screen.getByText("⌫")).toHaveClass('large')
  })
})
