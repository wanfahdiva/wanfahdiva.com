import { hookstate, useHookstate } from '@hookstate/core'

const initialState = hookstate({
  status: false,
})

export const useLoadSplash = () => {
  const state = useHookstate(initialState)

  return {
    getstatus: () => state.status.value,
    setstatus: (value: boolean) => state.status.set(value),
  }
}
