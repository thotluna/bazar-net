import { ProductRepository } from '../../domain'

export function GetProduct(repository: ProductRepository, id: number) {
  return repository.get(id)
}
