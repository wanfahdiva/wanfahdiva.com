/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

type TypeOptions = 'print' | 'clear'

export const useTimestamp = (name: string, type?: TypeOptions) => {
  let result = false
  const storage = window.localStorage
  const currTimestamp = Date.now()
  const checkStorage = storage.getItem(name)
  const timestamp = JSON.parse(checkStorage || '1000')
  const timeLimit = 3 * 60 * 60 * 1000 // 3 hours
  const hasTimePassed = currTimestamp - timestamp > timeLimit
  if (type != 'clear') {
    result = hasTimePassed
  }

  useEffect(() => {
    if (type === 'clear') {
      storage.removeItem(name)
      result = true
    }
  }, [name, storage, type])

  useEffect(() => {
    hasTimePassed
      ? storage.setItem(name, currTimestamp.toString())
      : storage.setItem(name, timestamp.toString())
    return
  }, [currTimestamp, hasTimePassed, name, storage, timestamp, type])

  return result
}
