import { ErrorMessage } from '@/modules/core/error-message'
import { ValidationError } from '@/modules/core/error-validation'
import { Product } from '../../domain/product'
import { ProductRepository } from '../../domain/product-repository'

export async function GetItemsGroup(repository: ProductRepository, ids: string[]): Promise<(Product | ErrorMessage)[]> {
  const idsNumber = ids.map((id) => {
    const idConverter = Number(id)

    if (isNaN(idConverter)) throw new ValidationError(`id: ${id} should be a number`)

    return idConverter
  })

  return repository.getList(idsNumber)
}
