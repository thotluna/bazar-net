import { Product } from '@/modules/items/domain/product'
import { ResultProducts } from './result-products'

export interface ProductRepository {
  getAllProducts: (page: number, query?: string) => Promise<ResultProducts>
  getListByIds: (ids: number[]) => Promise<Product[]>
  get: (id: number) => Promise<Product>
}
