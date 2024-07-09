import { useState } from "react"
import { Buffer } from "buffer";

export const useLocalStorage = <T extends unknown>(key: string) => {

  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      const storedItem = window.localStorage.getItem(key)
      if (!storedItem) return;
      
      const decodedItem = Buffer.from(storedItem, 'base64').toString('utf-8')
      return JSON.parse(decodedItem)
    } catch (error) {
      return null
    }
  });

  const setValue = (value: T) => {
    try {
      if (!value) {
        window.localStorage.removeItem(key)
        setStoredValue(null)
        return
      }

      const formattedItem = Buffer.from(JSON.stringify(value)).toString('base64')
      window.localStorage.setItem(key, formattedItem)
    } catch (error) {
      console.log(error)
    }
    setStoredValue(value)
  }

  return {
    value: storedValue,
    setValue,
  }
}