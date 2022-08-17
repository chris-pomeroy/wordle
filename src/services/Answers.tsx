import { useState } from 'react'
import answers from '../resources/answers.json'

const useAnswers = () => {

    const [answer] = useState(answers[Math.floor(Math.random() * answers.length)])
    const [answerList] = useState(new Set(answers))

    const getColoursForGuess = (guess: string) => {
        const answerLetters = answer.split('')
        const result = guess.split('')
        result.forEach((letter, index) => {
            if (letter === answerLetters[index]) {
                answerLetters[index] = ''
                result[index] = 'green'
            }
        })
        result.forEach((letter, index) => {
            const answerIndex = answerLetters.indexOf(letter)
            if (answerIndex !== -1) {
                answerLetters[answerIndex] = ''
                result[index] = 'yellow'
            } else if (result[index] !== 'green') {
                result[index] = ''
            }
        })
        return result
    }

    const isGuessValid = (guess: string) => answerList.has(guess)

    return {getColoursForGuess, isGuessValid}
}

export default useAnswers