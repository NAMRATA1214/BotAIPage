import { useEffect, useState } from 'react'

export default function useLocalStorage(key, value) {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key)
    if (storedValue !== 'undefined' && storedValue !== null) {
      return JSON.parse(storedValue)
    } else {
      return value
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}
