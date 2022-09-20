import React, { useState } from "react"

const useLocalStorage = <T,>(key: string, defaultValue: T) : [T, React.Dispatch<React.SetStateAction<T>>] => {

    const [value, setValue] = useState<T>(() => {
        var result = localStorage.getItem(key)
        return result ? JSON.parse(result) : defaultValue
    })

    return [value, setValue]
}

export default useLocalStorage