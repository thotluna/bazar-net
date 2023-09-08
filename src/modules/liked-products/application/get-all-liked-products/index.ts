import { Product } from '@/modules/items/domain/product'
import { ProductRepository } from '@/modules/products/domain'
import { LikedRepository } from '../../domain/liked-repository'

export async function GetAllLikedProducts(
  likedRepository: LikedRepository,
  productRepository: ProductRepository
): Promise<Product[]> {
  const ids = likedRepository.getAll()
  return productRepository.getListByIds(ids)
}
