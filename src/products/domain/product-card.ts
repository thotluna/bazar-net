import { ProductBase } from './product-base'

export interface ProductCard extends ProductBase {
  thumbnail: string
  rating: number
  price: number
  discountPercentage: number
  linked: boolean
}
