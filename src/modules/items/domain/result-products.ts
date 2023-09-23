import { Product } from './product'

export type ResultItems = {
  products: Product[]
  total: number
  skip: number
  limit: number
}
