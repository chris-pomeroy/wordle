import { render, fireEvent, screen } from '@testing-library/react'
import Keyboard from '../../../components/keyboard/Keyboard'

describe('Keyboard', () => {

  it('should render keys with correct letters', () => {
    render(<Keyboard keyHandler={() => {}} getKeyClasses={() => []} />)

    const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ⌫'.split('')
    keys.push("Enter")

    keys.forEach(key => expect((screen.getByText(key))).toBeInTheDocument())
  })

  it('should invoke keyHandler with correct letter when key is clicked', () => {
    const keyHandlerMock = jest.fn()
    render(<Keyboard keyHandler={keyHandlerMock} getKeyClasses={() => []} />)

    const keyButton = screen.getByText('Q')
    fireEvent.click(keyButton)

    expect(keyHandlerMock).toHaveBeenCalledWith('Q')
  })
})
