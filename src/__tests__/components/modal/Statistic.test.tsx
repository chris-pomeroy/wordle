import {describe, it, expect} from "vitest";
import { render, screen } from '@testing-library/react'
import Statistic from '../../../components/modal/Statistic'

describe('Statistic component', () => {
    it('renders correctly with provided props', () => {
        const value = 42
        const message = 'Lorem ipsum dolor'
        render(<Statistic value={value} message={message} />)

        expect(screen.getByText(value.toString())).toBeInTheDocument()
        const messageLines = screen.queryAllByText(/Lorem|ipsum|dolor/)
        expect(messageLines).toHaveLength(3)
        expect(messageLines[0]).toHaveTextContent('Lorem')
        expect(messageLines[1]).toHaveTextContent('ipsum')
        expect(messageLines[2]).toHaveTextContent('dolor')
    })
})
