import {
  GetShoppingCar,
  LocalStorageShoppingCarRepository,
  SaveShoppingCar,
  ShoppingCarRepository
} from '@/modules/shopping-car'
import { create } from 'zustand'
import { persistState } from './persist-custom-middleware'

interface StateShoppingCar {
  ids: Record<number, number>
  add: (id: number) => void
  sub: (id: number) => void
  save: (id: number, count: number) => void
  deleteAll: () => void
}

const carRepository: ShoppingCarRepository = LocalStorageShoppingCarRepository()

const saveShoppingCar = (state: StateShoppingCar) => {
  SaveShoppingCar(carRepository, state.ids)
}

export const useShoppingCarStore = create<StateShoppingCar>()(
  persistState(
    (set, get: () => StateShoppingCar) => ({
      ids: global.window !== undefined ? GetShoppingCar(carRepository) : {},
      add: (id: number) =>
        set((state) => ({
          ...state,
          ids: {
            ...state.ids,
            [id]: state.ids[id] ? state.ids[id] + 1 : 1
          }
        })),
      sub: (id: number) =>
        set((state) => ({
          ...state,
          ids: {
            ...state.ids,
            [id]: state.ids[id] - 1
          }
        })),
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
    }),
    saveShoppingCar
  )
)
