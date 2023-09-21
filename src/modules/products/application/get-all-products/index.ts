import { ProductRepository } from '../../domain'

export function GetAllProducts(repository: ProductRepository, query?: string, skip?: number, limit?: number) {
  return repository.getAllProducts(query, skip, limit)
}
