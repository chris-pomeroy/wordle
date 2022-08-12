import { useEffect, useState } from 'react';
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
        document.addEventListener("keydown", keyboardEventHandler)
        return () => document.removeEventListener("keydown", keyboardEventHandler)
    }, [rows, row])

    const ANSWER = "ALLOW"

    const clone = (nodes: node[][]) : node[][] => nodes.map(word => word.map(cell => {return {...cell}}))

    const enterKeyHandler = () => {
        if (row > 5 || rows[row].some(cell => cell.letter === '')) {
            return
        }

        setRows(prev => {
            const answer = ANSWER.split('')
            const result = clone(prev)
            result[row].forEach((node, index) => {
                const answerIndex = answer.indexOf(node.letter)
                if (node.letter === answer[index]) {
                    answer[index] = ''
                    node.colour = 'green'
                } else if (answerIndex !== -1) {
                    answer[answerIndex] = ''
                    node.colour = 'yellow'
                }
            })
            return result
        })
        setRow(prev => prev + 1)
    }

    const backspaceKeyHandler = () => {
        if (rows[row][0].letter === '') {
            return
        }

        setRows(prev => {
            const result = clone(prev)
            let lastIndex = result[row].findIndex(cell => cell.letter === '')
            lastIndex = lastIndex === -1 ? result[row].length : lastIndex
            result[row][lastIndex - 1].letter = ''
            return result
        })
    }

    const keyHandler = (key: string) => {
        key = key.toUpperCase()
        if (!key.match(`^[A-Z]$`) || rows[row].every(cell => cell.letter !== '')) {
            return
        }

        setRows(prev => {
            const result = clone(prev)
            const currentRow = result[row]
            currentRow[currentRow.findIndex(cell => cell.letter === '')].letter = key
            return result
        })
    }
    
    const keyboardEventHandler = ({key}: KeyboardEvent) => {
        switch(key) {
            case "Enter": enterKeyHandler(); break;
            case "Backspace": backspaceKeyHandler(); break;
            default: keyHandler(key)
        }
    }

    return (
        <div className={styles.board}>
            {
                rows.map((row, index) => <Row key={index} nodes={row} />)
            }
        </div>
    )
}

export default Board;