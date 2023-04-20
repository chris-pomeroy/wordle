import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Game from '../../components/Game'

describe('Game', () => {
    test('renders without crashing', () => {
        const { getByText } = render(<Game />)
        const gameComponent = getByText('Wordle')
        expect(gameComponent).toBeInTheDocument()
    })
})
