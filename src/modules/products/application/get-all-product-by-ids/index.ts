import { ProductRepository } from '../../domain/products-repository'

export function GetAllProductByIds(repository: ProductRepository, ids: number[]) {
  return repository.getListByIds(ids)
}
