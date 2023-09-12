import { ProductCard } from '@/modules/items/domain/product-card'

export interface ProductDetail extends ProductCard {
  description: string
  saved: number
  total: number
  stock: number
  brand: string
  category: string
  images: string[]
}
