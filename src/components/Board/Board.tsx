import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';
import { useEffect, useRef, useState } from 'react';
import Cell from '../Cell/Cell';
import Row from '../Row/Row';
import styles from './Board.module.css';

export type node = {
    colour: string,
    letter: string
}

const Board = () => {

    const [rows, setRows] = useState<node[][]>(Array(6).fill([]).map(() => Array(5).fill({}).map(() => {
        return {
            colour: "", 
            letter: ""
        }
    })))

    const [row, setRow] = useState(0)

    useEffect(() => {
        document.addEventListener("keydown", keyHandler)
        return () => document.removeEventListener("keydown", keyHandler)
    }, [rows, row])

    const keyHandler = ({key}: KeyboardEvent) => {
        console.log(key)

        if (key === "Enter" && row < 5) {
            setRow(prev => prev + 1)
        }

        if (key === "Backspace") {
            setRows(prev => {
                const result: node[][] = prev.map(word => word.map(cell => {return {...cell}}))
                let lastIndex = result[row].findIndex(cell => cell.letter === '')
                lastIndex = lastIndex === -1 ? result[row].length : lastIndex
                result[row][lastIndex - 1].letter = ''
                return result
            })
        }

        key = key.toUpperCase()
        if (key.match(`^[A-Z]$`) && rows[row].some(cell => cell.letter === '')) {
            setRows(prev => {
                const result: node[][] = prev.map(word => word.map(cell => {return {...cell}}))
                const currentRow = result[row]
                currentRow[currentRow.findIndex(cell => cell.letter === '')].letter = key
                return result
            })
        }
    }


    return (
        <div className={styles.board}>
            {
                rows.map((row, index) => <Row key={index} word={row} />)
            }
        </div>
    )
}

export default Board;