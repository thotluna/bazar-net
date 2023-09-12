import { ShoppingCarRepository } from '../../domain'

export function SaveShoppingCar(repository: ShoppingCarRepository, car: Record<number, number>): void {
  return repository.saveShoppingCar(car)
}
