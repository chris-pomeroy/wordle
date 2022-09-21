import React, { useState } from "react"

const useLocalStorage = <T,>(key: string, defaultValue: T) : [T, React.Dispatch<React.SetStateAction<T>>] => {

    const [value, setValue] = useState<T>(() => {
        const result = localStorage.getItem(key)
        if (defaultValue instanceof Object) {
            if (result) {
                return JSON.parse(result)
            }
            localStorage.setItem(key, JSON.stringify(defaultValue))
            return defaultValue
        }

        if (result) {
            return result
        }
        localStorage.setItem(key, String(defaultValue))
        return defaultValue
    })

    return [value, setValue]
}

export default useLocalStorage