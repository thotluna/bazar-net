import { ProductRepository } from '@/products/domain/product-repository'

export async function GetAllProduct(repository: ProductRepository) {
  return repository.get()
}
