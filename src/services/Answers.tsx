import { useState } from 'react'
import answers from '../resources/answers.json'

const useAnswers = () => {

    const [answer] = useState(answers[Math.floor(Math.random() * answers.length)])
    const [answerList] = useState(new Set(answers))

    const isGuessCorrect = (guess: string) => answer === guess
    const isGuessValid = (guess: string) => answerList.has(guess)

    return {isGuessCorrect, isGuessValid}
}

export default useAnswers