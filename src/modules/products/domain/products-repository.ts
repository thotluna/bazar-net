import { Product } from '@/modules/items/domain/product'
import { ResultProduct } from '@/modules/items/domain/result-products'

export interface ProductRepository {
  getAllProducts: (page: number, query?: string) => Promise<ResultProduct>
  getListByIds: (ids: number[]) => Promise<Product[]>
  get: (id: number) => Promise<Product>
}
