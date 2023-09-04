import { ErrorMessage } from '@/modules/core/error-message'
import { ValidationError } from '@/modules/core/error-validation'
import { ProductRepository } from '@/modules/items/domain/product-repository'
import { Product } from '../../domain/product'

export async function GetItem(repository: ProductRepository, id: number): Promise<Product | ErrorMessage> {
  if (isNaN(Number(id))) throw new ValidationError(`id should be number`)

  return repository.get(id)
}
