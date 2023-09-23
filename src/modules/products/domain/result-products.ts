import { Product } from '@/modules/items/domain/product'

export interface ResultProducts {
  products: Product[]
  page: number
  total: number
}
