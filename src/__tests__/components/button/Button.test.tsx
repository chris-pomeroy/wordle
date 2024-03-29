import {describe, it, expect, vitest} from "vitest";
import { render, fireEvent, screen } from '@testing-library/react'
import Button from '../../../components/button/Button'

describe('Button component', () => {
    it('renders correctly with provided props', () => {
        const onClickMock = vitest.fn()
        const buttonText = 'Click me'
        render(<Button onClick={onClickMock} text={buttonText} />)

        expect(screen.getByText(buttonText)).toBeInTheDocument()
        expect(screen.getByText(buttonText)).toHaveClass('button')
    })

    it('calls onClick prop when clicked', () => {
        const onClickMock = vitest.fn()
        const buttonText = 'Click me'
        render(<Button onClick={onClickMock} text={buttonText} />)

        fireEvent.click(screen.getByText(buttonText))

        expect(onClickMock).toHaveBeenCalled()
    })
})
