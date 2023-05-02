import {cleanup, render, screen} from '@testing-library/react'
import Game from '../../components/Game'
import userEvent from "@testing-library/user-event";

describe('Game', () => {

    afterEach(() => {
        cleanup()
        localStorage.clear()
    })

    test('renders without crashing', () => {
        const { getByText } = render(<Game />)
        const gameComponent = getByText('Wordle')
        expect(gameComponent).toBeInTheDocument()
    })

    test('uses the correct colours', () => {
        const { baseElement, container } = render(<Game answers={["SOUND"]} />)

        userEvent.type(baseElement, "SNOUT")
        userEvent.type(baseElement, "{enter}")

        const yellowCells = container.querySelectorAll(".yellow")
        expect(yellowCells).toHaveLength(3)

        const greenCells = container.querySelectorAll(".green")
        expect(greenCells).toHaveLength(1)
    })

    test('deals with double letters correctly', () => {
        const { baseElement, container } = render(<Game answers={["MOOSE"]} />)

        userEvent.type(baseElement, "CROWN")
        userEvent.type(baseElement, "{enter}")

        const greenCells = container.querySelectorAll(".green")
        expect(greenCells).toHaveLength(1)
    })
})
