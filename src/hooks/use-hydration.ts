import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

export const useHydration = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
