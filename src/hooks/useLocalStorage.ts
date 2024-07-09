import { useState } from "react"
import { Buffer } from "buffer";

const getDefaultValue = () => {
  const formattedItem = Buffer.from(JSON.stringify({ data: false })).toString('base64')
  return formattedItem
}

export const useLocalStorage = <T extends unknown>(key: string) => {

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const storedItem = window.localStorage.getItem(key)
      if (storedItem) {
        const decodedItem = Buffer.from(storedItem, 'base64').toString('utf-8')
        return JSON.parse(decodedItem)
      }
      const defaultValue = getDefaultValue()
      window.localStorage.setItem(key, defaultValue)
      return defaultValue
    } catch (error) {
      return getDefaultValue()
    }
  });

  const setValue = (value: any) => {
    try {
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