import { Product } from './product'

export interface ProductRepository {
  get: () => Promise<Product[]>
}
