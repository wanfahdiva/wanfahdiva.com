import { hookstate, useHookstate } from '@hookstate/core'

interface IMainAnimatedState {
  splash: boolean
  route: boolean
  cursor: boolean
  blur: boolean
  endedRoute: boolean
  endedSplash: boolean
}

const initialState = hookstate<IMainAnimatedState>({
  splash: false,
  endedSplash: false,
  route: false,
  endedRoute: false,
  cursor: false,
  blur: false,
})

export const useMainAnimatedState = () => {
  const state = useHookstate(initialState)

  return {
    get splash() {
      return state.splash.get()
    },

    set splash(value) {
      state.splash.set(value)
    },

    get route() {
      return state.route.get()
    },

    set route(value) {
      state.route.set(value)
    },

    get cursor() {
      return state.cursor.get()
    },

    set cursor(value) {
      state.cursor.set(value)
    },

    get blur() {
      return state.blur.get()
    },

    set blur(value) {
      state.blur.set(value)
    },

    get endedRoute() {
      return state.endedRoute.get()
    },

    set endedRoute(value) {
      state.endedRoute.set(value)
    },

    get endedSplash() {
      return state.endedSplash.get()
    },

    set endedSplash(value) {
      state.endedSplash.set(value)
    },
  }
}
