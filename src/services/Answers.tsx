import answers from '../resources/answers.json'

const getNextAnswer = () => {
    return answers[Math.floor(Math.random() * answers.length)]
}

export default getNextAnswer