import { useEffect, useState } from "react"
import useAnswers from "./useAnswers"
import useKeyColours from "./useKeyColours"

const useKeyHandler = () => {

    useEffect(() => {
        document.addEventListener("keydown", keyDownEventHandler)
        return () => document.removeEventListener("keydown", keyDownEventHandler)
    })

    useEffect(() => {
        document.addEventListener("keyup", keyUpEventHandler)
        return () => document.removeEventListener("keyup", keyUpEventHandler)
    })

    const [guesses, setGuesses] = useState<string[]>(Array(6).fill(""))
    const [colours, setColours] = useState<string[][]>(Array(6).fill(Array(5).fill("")))
    const [jiggle, setJiggle] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const [currentRow, setCurrentRow] = useState(0)
    const {getColoursForGuess, isGuessValid, nextAnswer} = useAnswers()
    const {setKeyColour, getKeyClasses, setActiveKey, resetKeyColours} = useKeyColours()

    useEffect(() => {
        if (jiggle) {
            setTimeout(() => setJiggle(false), 500)
        }
    }, [jiggle])

    const enterKeyHandler = () => {
        if (currentRow > 5 || guesses[currentRow].length < 5 || !isGuessValid(guesses[currentRow])) {
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

        if (coloursForGuess.every(colour => colour === "green")) {
            setTimeout(() => setShowModal(true), 1500)
        }

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

    const keyUpEventHandler = () => setActiveKey('')

    const shouldJiggle = (row: number) => jiggle && row === currentRow

    const startNewGame = () => {
        setGuesses(Array(6).fill(""))
        setColours(Array(6).fill(Array(5).fill("")))
        setCurrentRow(0)
        nextAnswer()
        resetKeyColours()
        setShowModal(false)
    }

    return {guesses, colours, showModal, shouldJiggle, keyHandler, getKeyClasses, startNewGame}
}

export default useKeyHandler