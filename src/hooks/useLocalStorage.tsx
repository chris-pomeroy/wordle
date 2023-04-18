import React, { useEffect, useState } from "react"

function useLocalStorage<T,>(key: string, defaultValue: T) : [T, React.Dispatch<React.SetStateAction<T>>] {

    const [storedValue, setStoredValue] = useState(() => {
        try {
          const item = window.localStorage.getItem(key)
          return item ? JSON.parse(item) : defaultValue
        } catch (error) {
          console.error(`Error retrieving value from local storage: ${error}`)
          return defaultValue;
        }
      });
    
      useEffect(() => {
        try {
          window.localStorage.setItem(key, JSON.stringify(storedValue))
        } catch (error) {
          console.error(`Error storing value in local storage: ${error}`)
        }
      }, [key, storedValue])
    
      return [storedValue, setStoredValue]
}

export default useLocalStorage