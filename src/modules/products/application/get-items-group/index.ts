import { Product } from '../../domain/product'
import { ProductRepository } from '../../domain/product-repository'

export async function GetItemsGroup(repository: ProductRepository, ids: number[]): Promise<Product[]> {
  return repository.getList(ids)
}
