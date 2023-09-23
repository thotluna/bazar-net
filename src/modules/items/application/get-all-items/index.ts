import { ProductRepository } from '@/modules/items/domain/product-repository'
import { ResultItems } from '../../domain/result-products'

export async function GetAllItems(
  repository: ProductRepository,
  query?: string,
  skip?: number,
  limit?: number
): Promise<ResultItems> {
  return repository.getAll(query, skip, limit)
}
