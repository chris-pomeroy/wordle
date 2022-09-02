import { useState } from 'react'
import answers from '../resources/answers.json'

const useAnswers = () => {

    const [answer, setAnswer] = useState(localStorage.getItem("answer") || answers[Math.floor(Math.random() * answers.length)])
    const [answerList] = useState(new Set(answers))

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

    const isGuessValid = (guess: string) => answerList.has(guess)

    const nextAnswer = () => {
        // setAnswer("TOAST")

        const nextAnswer = answers[Math.floor(Math.random() * answers.length)]
        setAnswer(nextAnswer)
        localStorage.setItem("answer", nextAnswer)
    }

    return {getColoursForGuess, isGuessValid, nextAnswer}
}

export default useAnswers