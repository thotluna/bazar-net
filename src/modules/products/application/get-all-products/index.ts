import { ProductRepository } from '../../domain'

export function GetAllProducts(repository: ProductRepository, { page = 1, query }: { page?: number; query?: string }) {
  return repository.getAllProducts(page, query)
}
