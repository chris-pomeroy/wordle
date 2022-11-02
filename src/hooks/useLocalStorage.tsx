import React, { useEffect, useState } from "react"

const useLocalStorage = <T,>(key: string, defaultValue: T) : [T, React.Dispatch<React.SetStateAction<T>>] => {

    const [value, setValue] = useState<T>(() => {
        const result = localStorage.getItem(key)
        if (result) {
            return JSON.parse(result) as T
        }
        localStorage.setItem(key, JSON.stringify(defaultValue))
        return defaultValue
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}

export default useLocalStorage