import { ProductRepository } from '@/modules/products/domain/product-repository'
import { ResultProduct } from '../../domain/result-products'

export async function GetAllProduct(repository: ProductRepository, query?: string | null): Promise<ResultProduct> {
  return repository.get(query)
}
