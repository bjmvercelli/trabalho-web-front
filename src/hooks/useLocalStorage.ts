import { useState } from "react"
import { Buffer } from "buffer";

export const useLocalStorage = <T extends unknown>(key: string) => {
  const [storedValue, setStoredValue] = useState<any>(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        const parsedItem = Buffer.from(item, 'base64').toString('utf-8')
        return JSON.parse(parsedItem)
      }
      const defaultValue = getDefaultValue()
      window.localStorage.setItem(key, defaultValue)
      return defaultValue
    } catch (error) {
      return getDefaultValue()
    }
  });

  const getDefaultValue = () => {
    const formattedItem = Buffer.from(JSON.stringify({ data: false })).toString('base64')
    return formattedItem
  }

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