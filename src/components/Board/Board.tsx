import { useEffect, useRef, useState } from 'react';
import Row from '../Row/Row';
import styles from './Board.module.css';

const Board = () => {

    const [rows, setRows] = useState(Array(6).fill([]).map(() => Array<string>(5).fill('')))
    const row = useRef(0)

    useEffect(() => {
        document.addEventListener("keydown", keyHandler)
        return () => document.removeEventListener("keydown", keyHandler)
    }, [])

    const keyHandler = ({key}: KeyboardEvent) => {

        if (key === "Enter" && row.current < 5) {
            row.current = row.current + 1
        }

        if (key === "Backspace") {
            setRows(prev => {
                const result = prev.map(word => word.slice())
                let lastIndex = result[row.current].indexOf('')
                lastIndex = lastIndex === -1 ? result[row.current].length : lastIndex
                result[row.current][lastIndex - 1] = ''
                return result
            })
        }

        key = key.toUpperCase()
        if (key.match(`^[A-Z]$`)) {
            setRows(prev => {
                const result = prev.map(word => word.slice())
                result[row.current][result[row.current].indexOf('')] = key
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