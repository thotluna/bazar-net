import { ShoppingCar, ShoppingCarRepository } from '../../domain'

export function GetShoppingCar(repository: ShoppingCarRepository): ShoppingCar {
  return repository.getShoppingCar()
}
