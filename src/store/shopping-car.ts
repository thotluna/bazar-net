import {
  GetShoppingCar,
  LocalStorageShoppingCarRepository,
  SaveShoppingCar,
  ShoppingCarRepository
} from '@/modules/shopping-car'
import { create } from 'zustand'

interface StateShoppingCar {
  ids: Record<number, number>
  add: (id: number) => void
  sub: (id: number) => void
  deleteAll: () => void
}

const carRepository: ShoppingCarRepository = LocalStorageShoppingCarRepository()

export const useShoppingCarStore = create<StateShoppingCar>((set, get) => ({
  ids: global.window !== undefined ? GetShoppingCar(carRepository) : {},
  add: (id: number) => {
    set((state) => {
      const nState = {
        ...state,
        ids: {
          ...state.ids,
          [id]: state.ids[id] ? state.ids[id] + 1 : 1
        }
      }
      SaveShoppingCar(carRepository, nState.ids)
      return nState
    })
  },
  sub: (id: number) => {
    set((state) => {
      const nState = {
        ...state,
        ids: {
          ...state.ids,
          [id]: state.ids[id] && state.ids[id] > 1 ? state.ids[id] - 1 : 0
        }
      }
      SaveShoppingCar(carRepository, nState.ids)
      return nState
    })
  },
  deleteAll: () =>
    set((state) => {
      state.ids = {}
      SaveShoppingCar(carRepository, {})
      return state
    })
}))
