import { useEffect, useState } from 'react';
import Row from './Row';
import styles from './Board.module.css';
import useAnswers from '../services/Answers';

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
    const {answer, isValidAnswer} = useAnswers()

    useEffect(() => {
        document.addEventListener("keydown", keyboardEventHandler)
        return () => document.removeEventListener("keydown", keyboardEventHandler)
    }, [rows, row])

    const clone = (nodes: node[][]) : node[][] => nodes.map(word => word.map(cell => {return {...cell}}))

    const enterKeyHandler = () => {
        if (row > 5 || rows[row].some(cell => cell.letter === '') || !isValidAnswer(rows[row])) {
            return
        }

        setRows(prev => {
            const answerLetters = answer.split('')
            const result = clone(prev)
            result[row].forEach((node, index) => {
                if (node.letter === answerLetters[index]) {
                    answerLetters[index] = ''
                    node.colour = 'green'
                } 
            })
            result[row].forEach((node) => {
                const answerIndex = answerLetters.indexOf(node.letter)
                if (answerIndex !== -1) {
                    answerLetters[answerIndex] = ''
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
    
    const keyboardEventHandler = (event: KeyboardEvent) => {
        if (event.metaKey || event.ctrlKey) {
            return
        }
        
        switch(event.key) {
            case "Enter": enterKeyHandler(); return
            case "Backspace": backspaceKeyHandler(); return
            default: keyHandler(event.key)
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