import { ValidationError } from '@/modules/core/error-validation'
import { ProductRepository } from '@/modules/products/domain/product-repository'
import { Product } from '../../domain/product'

export async function GetItem(repository: ProductRepository, id: number): Promise<Product> {
  if (isNaN(Number(id))) throw new ValidationError(`id: ${id}should be number`)

  return repository.get(id)
}
