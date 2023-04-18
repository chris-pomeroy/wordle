import { renderHook, act } from "@testing-library/react"
import useLocalStorage from "../../hooks/useLocalStorage"

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("should return default value when there's no value in localStorage", () => {
    const key = "test_key"
    const defaultValue = "test_value"
    const { result } = renderHook(() => useLocalStorage(key, defaultValue))

    expect(result.current[0]).toBe(defaultValue)
    expect(typeof result.current[0]).toBe("string")
    expect(localStorage.getItem(key)).toBe(JSON.stringify(defaultValue))
  })

  it("should return the value from localStorage when there is one", () => {
    const key = "test_key"
    const defaultValue = "test_value"
    localStorage.setItem(key, JSON.stringify(defaultValue))
    const { result } = renderHook(() => useLocalStorage(key, "different_default_value"))

    expect(result.current[0]).toBe(defaultValue)
    expect(typeof result.current[0]).toBe("string")
  })

  it("should update the value in localStorage when the value changes", () => {
    const key = "test_key"
    const defaultValue = "test_value"
    const { result } = renderHook(() => useLocalStorage(key, defaultValue))

    const newValue = "new_value"
    const setNewValue = result.current[1]
    act(() => {
      setNewValue(newValue)
    })

    expect(result.current[0]).toBe(newValue)
    expect(localStorage.getItem(key)).toBe(JSON.stringify(newValue))
    expect(typeof result.current[0]).toBe("string")
  })

  it("should return a value of the correct type from localStorage", () => {
    const key = "test_key_number"
    const defaultValue = 10
    localStorage.setItem(key, JSON.stringify(defaultValue))
    const { result } = renderHook(() => useLocalStorage(key, "different-default-value"))

    const [value] = result.current

    expect(value).toBe(defaultValue)
    expect(typeof value).toBe("number")
    expect(localStorage.getItem(key)).toBe(JSON.stringify(defaultValue))
  })
})
