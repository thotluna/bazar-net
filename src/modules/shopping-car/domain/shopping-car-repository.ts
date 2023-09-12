import { ShoppingCar } from './shopping-car'

export interface ShoppingCarRepository {
  getShoppingCar: () => ShoppingCar
  saveShoppingCar: (car: Record<number, number>) => void
}
