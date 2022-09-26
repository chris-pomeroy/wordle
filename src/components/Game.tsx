import styles from './Game.module.css';
import Keyboard from './Keyboard';
import Modal from './Modal';
import { useEffect, useState } from 'react';
import Board from './Board';
import useLocalStorage from '../hooks/useLocalStorage';
import answers from '../resources/answers.json'

const Game = () => {

    const [guesses, setGuesses] = useLocalStorage<string[]>("guesses", Array(6).fill(""))
    const [jiggle, setJiggle] = useState(false)
    const [answer, setAnswer] = useLocalStorage<string>("answer", answers[Math.floor(Math.random() * answers.length)])

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

    const [currentRow, setCurrentRow] = useState(() => {
        const row = guesses.findIndex(guess => guess === "")
        return row === -1 ? 6 : row
    })

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
        if (currentRow > 5 || guesses[currentRow].length < 5 || !answers.includes(guesses[currentRow])) {
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

        guesses[currentRow].split("").forEach((letter, index) => setKeyColour(letter, coloursForGuess[index]))

        setCurrentRow(prev => prev + 1)
        localStorage.setItem("guesses", JSON.stringify(guesses))
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
        if (!key.match(`^[A-Z]$`) || guesses[currentRow].length > 4 || (currentRow > 1 && colours[currentRow - 1].every(colour => colour === 'green'))) {
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
        localStorage.setItem("guesses", JSON.stringify(Array(6).fill("")))

        setColours(Array(6).fill(Array(5).fill("")))
        setCurrentRow(0)
        setKeyboardColours(new Map())

        const nextAnswer = answers[Math.floor(Math.random() * answers.length)]
        setAnswer(nextAnswer)
        localStorage.setItem("answer", nextAnswer)
    }

    const shouldShowModal = ((currentRow > 0) && colours[currentRow - 1].every(colour => colour === "green")) || currentRow > 5

    const setKeyColour = (key: string, colour: string) => {
        if (colour === "") {
            colour = "transparent"
        }

        if (colour === "green"
            || (colour === "yellow" && keyboardColours.get(key) !== "green")
            || (colour === "transparent" && !keyboardColours.has(key))) {
            setKeyboardColours(keyColours => new Map(keyColours.set(key, colour)))
        }
    }

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
            <Board guesses={guesses} colours={colours} shouldJiggle={shouldJiggle} />
            {<Modal startNewGame={startNewGame} active={shouldShowModal} />}
            <Keyboard keyHandler={keyHandler} getKeyClasses={getKeyClasses} />
        </>
    )
}

export default Game