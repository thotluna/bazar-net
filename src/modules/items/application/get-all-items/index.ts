import { ProductRepository } from '@/modules/items/domain/product-repository'
import { ResultProduct } from '../../domain/result-products'

export async function GetAllItems(repository: ProductRepository, query?: string | null): Promise<ResultProduct> {
  return repository.getAll(query)
}
