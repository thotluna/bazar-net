import { ProductRepository } from '../../domain'
import { ProductDetail } from '../../domain/product-detail'

export function GetProduct(repository: ProductRepository, id: number): Promise<ProductDetail> {
  return repository.get(id).then((product) => {
    const {
      id,
      title,
      brand,
      category,
      description,
      thumbnail,
      price,
      discountPercentage,
      rating,
      stock,
      images,
      liked
    } = product
    return {
      id,
      title,
      brand,
      category,
      description,
      thumbnail,
      price,
      discountPercentage,
      rating,
      stock,
      images,
      liked,
      saved: (price * discountPercentage) / 100,
      total: price - (price * discountPercentage) / 100
    } satisfies ProductDetail
  })
}
