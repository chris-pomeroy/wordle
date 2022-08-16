import { useState } from 'react'
import { node } from '../components/Board'
import answers from '../resources/answers.json'

const useAnswers = () => {

    const [answer] = useState(answers[Math.floor(Math.random() * answers.length)])
    const [answerList] = useState(new Set(answers))

    const isValidAnswer = (answer: node[]) => answerList.has(answer.map(node => node.letter).join(''))

    return {answer, isValidAnswer}
}

export default useAnswers