import {describe, afterEach, it, expect} from "vitest";
import {cleanup, render} from '@testing-library/react'
import Game from '../../components/Game'
import userEvent from "@testing-library/user-event";

describe('Game', () => {

    afterEach(() => {
        cleanup()
        localStorage.clear()
    })

    it('renders without crashing', () => {
        const { getByText } = render(<Game />)
        const gameComponent = getByText('Wordle')
        expect(gameComponent).toBeInTheDocument()
    })

    it('uses the correct colours', async () => {
        const { baseElement, container } = render(<Game answers={["SOUND"]} />)

        await userEvent.type(baseElement, "SNOUT")
        await userEvent.type(baseElement, "{enter}")

        const yellowCells = container.querySelectorAll(".yellow")
        expect(yellowCells).toHaveLength(3)

        const greenCells = container.querySelectorAll(".green")
        expect(greenCells).toHaveLength(1)
    })

    it('deals with double letters correctly', async () => {
        const { baseElement, container } = render(<Game answers={["MOOSE"]} />)

        await userEvent.type(baseElement, "CROWN")
        await userEvent.type(baseElement, "{enter}")

        const greenCells = container.querySelectorAll(".green")
        expect(greenCells).toHaveLength(1)
    })
})
