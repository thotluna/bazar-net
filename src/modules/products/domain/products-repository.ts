import { Product } from '@/modules/items/domain/product'
import { ResultProduct } from '@/modules/items/domain/result-products'

export interface ProductRepository {
  getAllProducts: (query?: string) => Promise<ResultProduct>
  getListByIds: (ids: number[]) => Promise<Product>
}
