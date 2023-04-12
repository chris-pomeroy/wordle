import styles from './Game.module.css';
import Keyboard from './keyboard/Keyboard';
import { useEffect, useState } from 'react';
import Board from './board/Board';
import useLocalStorage from '../hooks/useLocalStorage';
import answers from '../resources/answers.json';
import dictionary from '../resources/dictionary.json';
import Modal from './modal/Modal';

const Game = () => {

    const [guesses, setGuesses] = useLocalStorage<string[]>("guesses", Array(6).fill(""))
    const [jiggle, setJiggle] = useState(false)
    const [answer, setAnswer] = useLocalStorage<string>("answer", answers[Math.floor(Math.random() * answers.length)])

    const [currentStreak, setCurrentStreak] = useLocalStorage("currentStreak", 0)
    const [bestStreak, setBestStreak] = useLocalStorage("bestStreak", 0)
    const [statistics, setStatistics] = useLocalStorage("statistics", Array(7).fill(0))

    const getColoursForGuess = (guess: string) => {
        const guessLetters = guess.split('')
        const answerLetters = answer.split('')
        const result : string[] = Array(5).fill("")
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

    const [colours, setColours] = useState<string[][]>(Array(6).fill(null).map((_,index) => getColoursForGuess(guesses[index])))
    const [keyboardColours, setKeyboardColours] = useState<Map<string, string>>(new Map())
    const [activeKey, setActiveKey] = useState('')

    const [currentRow, setCurrentRow] = useLocalStorage("currentRow", 0)

    const gameWon = (currentRow > 0) && colours[currentRow - 1].every(colour => colour === "green")
    const gameOver = currentRow > 5 || gameWon

    useEffect(() => {
        const keyDownEventHandler = (event: KeyboardEvent) => {
            if (event.metaKey || event.ctrlKey) {
                return
            }
    
            let {key} = event
            switch (key) {
                case "Enter": key = "↵"; break
                case "Backspace": key = "⌫"
            }
    
            key = key.toUpperCase()
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

    useEffect(() => {
        guesses.forEach((guess, guessIndex) => {
            guess.split("").forEach((letter, letterIndex) => setKeyColour(letter, colours[guessIndex][letterIndex]))
        })
    }, [])

    const enterKeyHandler = () => {
        if (currentRow > 5 || guesses[currentRow].length < 5 || !dictionary.includes(guesses[currentRow])) {
            if (!jiggle) {
                setTimeout(() => setJiggle(false), 500)
            }
            setJiggle(true)
            return
        }

        const coloursForGuess = getColoursForGuess(guesses[currentRow])

        setColours(prev => {
            const result = prev.map(row => row.slice())
            result[currentRow] = coloursForGuess
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

        setTimeout(() => guesses[currentRow].split("").forEach((letter, index) => setKeyColour(letter, coloursForGuess[index])), 1500)

        setCurrentRow(prev => prev + 1)
    }

    const backspaceKeyHandler = () => {
        if (guesses[currentRow].length !== 0) {
            setGuesses(prev => {
                const result = [...prev]
                result[currentRow] = result[currentRow].slice(0, -1)
                return result
            })
        }
    }

    const letterKeyHandler = (key: string) => {
        key = key.toUpperCase()
        if (gameOver || !key.match(`^[A-Z]$`) || guesses[currentRow].length > 4) {
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

    const shouldJiggle = (row: number) => jiggle && row === currentRow

    const startNewGame = () => {
        setGuesses(Array(6).fill(""))

        setColours(Array(6).fill(null).map(() => Array(5).fill("")))
        setCurrentRow(0)
        setKeyboardColours(new Map())

        const nextAnswer = answers[Math.floor(Math.random() * answers.length)]
        setAnswer(nextAnswer)
    }

    const setKeyColour = (key: string, colour: string) => {
        if (colour === "") {
            colour = "incorrect"
        }

        if (colour === "green"
            || (colour === "yellow" && keyboardColours.get(key) !== "green")
            || (colour === "incorrect" && !keyboardColours.has(key))) {
            setKeyboardColours(keyColours => new Map(keyColours.set(key, colour)))
        }
    }

    const shouldReveal = (row: number) => row < currentRow

    const getKeyClasses = (key: string) => {
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
                colours={colours} 
                shouldJiggle={shouldJiggle} 
                shouldReveal={shouldReveal} 
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