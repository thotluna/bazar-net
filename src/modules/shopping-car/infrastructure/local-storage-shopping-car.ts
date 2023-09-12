import { ShoppingCarRepository } from '../domain'

export function LocalStorageShoppingCarRepository(): ShoppingCarRepository {
  return {
    getShoppingCar: () => get(),
    saveShoppingCar: (car: Record<number, number>) => save(car)
  }
}

export const KEY_SHOPPING_CAR = 'shopping-car'

const get = () => {
  const carRaw = window.localStorage.getItem(KEY_SHOPPING_CAR) ?? '{}'
  const car = JSON.parse(carRaw)
  return car
}

const save = (car: Record<number, number>) => {
  const carRaw = JSON.stringify(car)
  localStorage.setItem(KEY_SHOPPING_CAR, carRaw)
}
