import { ProductCard } from './product-card'

export interface Product extends ProductCard {
  images: string[]
  description: string
  stock: number
  brand: string
  category: string
}
