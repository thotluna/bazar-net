import {
  GetShoppingCar,
  LocalStorageShoppingCarRepository,
  SaveShoppingCar,
  ShoppingCarRepository
} from '@/modules/shopping-car'
import { create } from 'zustand'

interface StateShoppingCar {
  ids: Record<number, number>
  save: (id: number, count: number) => void
  deleteAll: () => void
}

const carRepository: ShoppingCarRepository = LocalStorageShoppingCarRepository()

export const useShoppingCarStore = create<StateShoppingCar>((set, get) => ({
  ids: global.window !== undefined ? GetShoppingCar(carRepository) : {},
  save: (id: number, count: number) => {
    set((state) => {
      const nState = {
        ...state,
        ids: {
          ...state.ids,
          [id]: count
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
