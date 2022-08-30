import { useState } from 'react'
import answers from '../resources/answers.json'

const useAnswers = () => {

    const [answer] = useState("TOAST") //useState(answers[Math.floor(Math.random() * answers.length)])
    const [answerList] = useState(new Set(answers))

    const getColoursForGuess = (guess: string) => {
        const guessLetters = guess.split('')
        const answerLetters = answer.split('')
        const result = Array(5).fill('')
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

    const isGuessValid = (guess: string) => answerList.has(guess)

    return {getColoursForGuess, isGuessValid}
}

export default useAnswers