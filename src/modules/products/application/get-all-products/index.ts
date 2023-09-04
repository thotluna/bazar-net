import { ProductRepository } from '../../domain'

export function GetAllProducts(repository: ProductRepository, query?: string) {
  return repository.getAllProducts(query)
}
