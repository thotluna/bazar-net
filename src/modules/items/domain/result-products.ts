import { Product } from './product'

export type ResultProduct = {
  products: Product[]
  total: number
  skip: number
  limit: number
}
