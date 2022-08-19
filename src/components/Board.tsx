import { useEffect, useState } from 'react';
import Row from './Row';
import styles from './Board.module.css';
import useAnswers from '../services/Answers';
import Keyboard from './Keyboard';

const Board = () => {

    const [guesses, setGuesses] = useState<string[]>(Array(6).fill(""))
    const [colours, setColours] = useState<string[][]>(Array(6).fill(Array(5).fill("")))

    const [currentRow, setCurrentRow] = useState(0)
    const {getColoursForGuess, isGuessValid} = useAnswers()

    const [activeKey, setActiveKey] = useState('')

    useEffect(() => {
        document.addEventListener("keydown", keyboardEventHandler)
        return () => document.removeEventListener("keydown", keyboardEventHandler)
    }, [currentRow, guesses])

    useEffect(() => {
        document.addEventListener("keyup", keyUpEventHandler)
        return () => document.removeEventListener("keyup", keyUpEventHandler)
    }, [activeKey])

    const keyUpEventHandler = () => setActiveKey('')

    const enterKeyHandler = () => {
        if (currentRow > 5 || guesses[currentRow].length < 5 || !isGuessValid(guesses[currentRow])) {
            return
        }

        setColours(prev => {
            const result = prev.map(row => row.slice())
            result[currentRow] = getColoursForGuess(guesses[currentRow])
            return result
        })
        setCurrentRow(prev => prev + 1)
    }

    const backspaceKeyHandler = () => {
        if (guesses[currentRow].length === 0) {
            return
        }

        setGuesses(prev => {
            const result = [...prev]
            result[currentRow] = result[currentRow].slice(0, -1)
            return result
        })
    }

    const letterKeyHandler = (key: string) => {
        key = key.toUpperCase()
        if (!key.match(`^[A-Z]$`) || guesses[currentRow].length > 4) {
            return
        }

        setGuesses(prev => {
            const result = [...prev]
            result[currentRow] += key
            return result
        })
    }
    
    const keyHandler = (key: string) => {
        switch(key) {
            case "↵": enterKeyHandler(); return
            case "⌫": backspaceKeyHandler(); return
            default: letterKeyHandler(key)
        }
    }

    const keyboardEventHandler = (event: KeyboardEvent) => {
        if (event.metaKey || event.ctrlKey) {
            return
        }

        let {key} = event
        switch (key) {
            case "Enter": key = "↵"; break
            case "Backspace": key = "⌫"
        }

        setActiveKey(key.toUpperCase())
        keyHandler(key)
    }

    const isActiveKey = (key: string) => key === activeKey

    return (
        <>
            <div className={styles.board}>
                {
                    guesses.map((guess, index) => <Row key={index} guess={guess} colours={colours[index]} />)
                }
            </div>
            <Keyboard keyHandler={keyHandler} isActive={isActiveKey}/>
        </>
    )
}

export default Board