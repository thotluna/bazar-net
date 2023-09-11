import { create } from 'zustand'

interface StateShoppingCar {
  ids: Record<number, number>
  add: (id: number) => void
  sub: (id: number) => void
  deleteAll: () => void
}

export const useShoppingCarStore = create<StateShoppingCar>((set, get) => ({
  ids: {},
  add: (id: number) => {
    set((state) => ({
      ...state,
      ids: {
        [id]: state.ids[id] ? state.ids[id] + 1 : 1
      }
    }))
  },
  sub: (id: number) => {
    set((state) => ({
      ...state,
      ids: {
        [id]: state.ids[id] && state.ids[id] > 1 ? state.ids[id] - 1 : 0
      }
    }))
  },
  deleteAll: () =>
    set((state) => {
      state.ids = {}
      return state
    })
}))
