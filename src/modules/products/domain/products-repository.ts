import { ResultProduct } from '@/modules/items/domain/result-products'

export interface ProductRepository {
  getAllProducts: (query?: string) => Promise<ResultProduct>
}
