import { ErrorMessage } from '@/modules/core/error-message'
import { Product } from './product'
import { ResultItems } from './result-products'

export interface ProductRepository {
  getAll: (query?: string, skip?: number, limit?: number) => Promise<ResultItems>
  get: (id: number) => Promise<Product | ErrorMessage>
  getList: (ids: number[]) => Promise<(Product | ErrorMessage)[]>
}
