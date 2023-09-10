import { ProductRepository } from '../../domain/products-repository'
import { ApiProductRepository } from '../../intraestructure/api-repository'

export function GetAllProductByIds(ids: number[]) {
  const repository: ProductRepository = ApiProductRepository
  return repository.getListByIds(ids)
}
