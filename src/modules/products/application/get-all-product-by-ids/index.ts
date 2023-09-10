import { ProductRepository } from '../../domain/products-repository'
import { ApiProductRepository } from '../../infrastructure/api-repository'

export function GetAllProductByIds(ids: number[]) {
  const repository: ProductRepository = ApiProductRepository
  return repository.getListByIds(ids)
}
