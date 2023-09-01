import { Product } from './product'
import { ResultProduct } from './result-products'

export interface ProductRepository {
  getAll: (query?: string | null) => Promise<ResultProduct>
  get: (id: number) => Promise<Product>
}
