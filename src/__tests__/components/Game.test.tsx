import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Game from '../../components/Game'

describe('Game', () => {
    test('renders without crashing', () => {
        const { getByText } = render(<Game />)
        const gameComponent = getByText('Wordle')
        expect(gameComponent).toBeInTheDocument()
    })

    test('handles key press correctly', () => {
        const { container, getByText, getByTitle } = render(<Game />)
        const board = container.querySelector(".board")

        fireEvent.keyDown(board, {key: 'a', code: 'KeyA'})

        // const gameComponent = getByTestId('game-component')
        // fireEvent.keyDown(gameComponent, { key: 'a', code: 'KeyA' })
        // fireEvent.keyUp(gameComponent, { key: 'a', code: 'KeyA' })
        // const letterA = getByText('A')
        // expect(letterA).toBeInTheDocument()
        // fireEvent.keyDown(gameComponent, { key: 'Enter', code: 'Enter' })
        // const cell = getByTestId('cell-0-0')
        // expect(cell).toHaveClass('incorrect')
    })

    test('handles game over correctly', () => {
        const { getByTestId, getByText } = render(<Game />)
        const gameComponent = getByTestId('game-component')
        fireEvent.keyDown(gameComponent, { key: 'a', code: 'KeyA' })
        fireEvent.keyUp(gameComponent, { key: 'a', code: 'KeyA' })
        fireEvent.keyDown(gameComponent, { key: 'Enter', code: 'Enter' })
        fireEvent.keyDown(gameComponent, { key: 'Enter', code: 'Enter' })
        fireEvent.keyDown(gameComponent, { key: 'Enter', code: 'Enter' })
        fireEvent.keyDown(gameComponent, { key: 'Enter', code: 'Enter' })
        fireEvent.keyDown(gameComponent, { key: 'Enter', code: 'Enter' })
        fireEvent.keyDown(gameComponent, { key: 'Enter', code: 'Enter' })
        const modal = getByTestId('modal-component')
        expect(modal).toBeInTheDocument()
    })
})
