import styles from './Game.module.css';
import Keyboard from './keyboard/Keyboard';
import { useEffect, useState } from 'react';
import Board from './board/Board';
import useLocalStorage from '../hooks/useLocalStorage';
import _answers from '../resources/answers.json';
import dictionary from '../resources/dictionary.json';
import Modal from './modal/Modal';

function Game({answers = _answers}) {

    const [guesses, setGuesses] = useLocalStorage<string[]>("guesses", Array(6).fill(""))
    const [answer, setAnswer] = useLocalStorage<string>("answer", answers[Math.floor(Math.random() * answers.length)])
    const [currentRow, setCurrentRow] = useLocalStorage("currentRow", 0)

    const [statistics, setStatistics] = useLocalStorage<number[]>("statistics", Array(7).fill(0))
    const [currentStreak, setCurrentStreak] = useLocalStorage("currentStreak", 0)
    const [bestStreak, setBestStreak] = useLocalStorage("bestStreak", 0)

    const [activeKey, setActiveKey] = useState('')
    const [jiggle, setJiggle] = useState(false)

    const [cellColours, setCellColours] = useState<string[][]>(Array(6).fill(null).map((_,index) => getColoursForGuess(guesses[index])))
    const [keyboardColours, setKeyboardColours] = useState<Map<string, string>>(() => getKeyboardColours(guesses.slice(0, currentRow), cellColours))

    const gameWon = (currentRow > 0) && cellColours[currentRow - 1].every(colour => colour === "green")
    const gameOver = currentRow > 5 || gameWon

    useEffect(() => {
        const keyDownEventHandler = (event: KeyboardEvent) => {
            let key = event.key
            if (!key.match("^([A-Za-z]|Backspace|Enter)$") || event.metaKey || event.ctrlKey) {
                return
            }

            if (key === "Backspace") {
                key = "⌫"
            }

            if (key !== "Enter") {
                key = key.toUpperCase()
            }

            setActiveKey(key)
            keyHandler(key)
        }
        document.addEventListener("keydown", keyDownEventHandler)
        return () => document.removeEventListener("keydown", keyDownEventHandler)
    })

    useEffect(() => {
        const keyUpEventHandler = () => setActiveKey('')
        document.addEventListener("keyup", keyUpEventHandler)
        return () => document.removeEventListener("keyup", keyUpEventHandler)
    })

    function getKeyboardColours(guesses: string[], colours: string[][]) {
        const result = new Map<string, string>()
        guesses.forEach((guess, rowIndex) => {
            guess.split("").forEach((letter, columnIndex) => {
                let colour = colours[rowIndex][columnIndex]
                if (colour === "") {
                    colour = "incorrect"
                }

                if (colour === "green"
                    || (colour === "yellow" && result.get(letter) !== "green")
                    || (colour === "incorrect" && !result.has(letter))) {
                    result.set(letter, colour)
                }
            })
        })
        return result
    }

    function getColoursForGuess(guess: string) {
        const guessLetters = guess.split('')
        const answerLetters = answer.split('')
        const result = Array<string>(5).fill("")
        guessLetters.forEach((letter, index) => {
            if (letter === answerLetters[index]) {
                answerLetters[index] = ''
                result[index] = 'green'
            }
        })
        guessLetters.forEach((letter, index) => {
            const answerIndex = answerLetters.indexOf(letter)
            if (result[index] !== 'green' && answerIndex !== -1) {
                answerLetters[answerIndex] = ''
                result[index] = 'yellow'
            }
        })
        return result
    }

    function keyHandler(key: string) {
        if (gameOver) {
            return
        }

        switch(key) {
            case "Enter": enterKeyHandler(); return
            case "⌫": backspaceKeyHandler(); return
            default: letterKeyHandler(key)
        }
    }

    function enterKeyHandler() {
        if (currentRow > 5 || guesses[currentRow].length < 5 || !dictionary.includes(guesses[currentRow])) {
            if (!jiggle) {
                setTimeout(() => setJiggle(false), 500)
            }
            setJiggle(true)
            return
        }

        const coloursForGuess = getColoursForGuess(guesses[currentRow])

        setCellColours(prev => {
            const result = prev.map(row => row.slice())
            result[currentRow] = coloursForGuess
            setTimeout(() => setKeyboardColours(getKeyboardColours(guesses, result)), 1500)
            return result
        })

        if (coloursForGuess.every(colour => colour === "green")) {
            if (currentStreak >= bestStreak) {
                setBestStreak(currentStreak + 1)
            }
            setCurrentStreak(prev => prev + 1)
            setStatistics(prev => {
                const result = [...prev]
                result[currentRow]++
                return result
            })
        }

        if (currentRow > 4 && coloursForGuess.some(colour => colour !== "green")) {
            setStatistics(prev => {
                const result = [...prev]
                result[6]++
                return result
            })
            setCurrentStreak(0)
        }

        setCurrentRow(prev => prev + 1)
    }

    function backspaceKeyHandler() {
        if (guesses[currentRow].length !== 0) {
            setGuesses(prev => {
                const result = [...prev]
                result[currentRow] = result[currentRow].slice(0, -1)
                return result
            })
        }
    }

    function letterKeyHandler(key: string) {
        if (guesses[currentRow].length < 5) {
            setGuesses(prev => {
                const result = [...prev]
                result[currentRow] += key
                return result
            })
        }
    }

    function startNewGame() {
        setGuesses(Array(6).fill(""))
        setCellColours(Array(6).fill(null).map(() => Array(5).fill("")))
        setCurrentRow(0)
        setKeyboardColours(new Map())
        setAnswer(answers[Math.floor(Math.random() * answers.length)])
    }

    function getKeyClasses(key: string) {
        const result = key === activeKey ? ["active"] : []
        result.push(keyboardColours.get(key) || "grey")
        return result
    }

    return (
        <>
            <header className={styles.header}>
                <span className={styles.headerLogo}>Wordle</span>
            </header>
            { gameOver && !gameWon &&
                <div className={styles.answerPopup}>{answer}</div>
            }
            <Board 
                guesses={guesses} 
                colours={cellColours} 
                shouldJiggle={(row: number) => jiggle && row === currentRow} 
                shouldReveal={(row: number) => row < currentRow} 
            />
            <Modal 
                active={gameOver} 
                startNewGame={startNewGame} 
                currentStreak={currentStreak} 
                bestStreak={bestStreak} 
                statistics={statistics} 
            />
            <Keyboard 
                keyHandler={keyHandler} 
                getKeyClasses={getKeyClasses} 
            />
        </>
    )
}

export default Game