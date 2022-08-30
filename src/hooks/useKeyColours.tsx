import { useState } from "react"

const useKeyColours = () => {

    const [correctKeys, setCorrectKeys] = useState<Set<string>>(new Set())
    const [partialKeys, setPartialKeys] = useState<Set<string>>(new Set())
    const [incorrectKeys, setIncorrectKeys] = useState<Set<string>>(new Set())

    const [activeKey, setActiveKey] = useState('')

    const setKeyColour = (key: string, colour: string) => {
        switch (colour) {
            case "green": setCorrectKeys(prev => new Set(prev.add(key))); return
            case "yellow": setPartialKeys(prev => new Set(prev.add(key))); return
            case "": setIncorrectKeys(prev => new Set(prev.add(key)))
        }
    }

    const getKeyColour = (key: string) => {
        if (correctKeys.has(key)) {
            return "green"
        }

        if (partialKeys.has(key)) {
            return "yellow"
        }

        if (incorrectKeys.has(key)) {
            return "transparent"
        }

        return "grey"
    }

    const getKeyClasses = (key: string) => {
        const result = key === activeKey ? ["active"] : []
        result.push(getKeyColour(key))
        return result
    }

    return {setKeyColour, getKeyClasses, setActiveKey}
}

export default useKeyColours