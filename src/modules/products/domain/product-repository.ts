import { ResultProduct } from './result-products'

export interface ProductRepository {
  get: (query?: string | null) => Promise<ResultProduct>
}
