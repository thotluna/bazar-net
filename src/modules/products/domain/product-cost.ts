import { ProductBase } from '@/modules/items/domain/product-base'

export interface ProductCost extends ProductBase {
  thumbnail: string
  rating: number
  price: number
  discountPercentage: number
}

export interface ProductToCar extends ProductBase {
  thumbnail: string
  rating: number
  quantity: number
  stock: number
  unit: {
    price: number
    discountPercentage: number
    saved: number
    total: number
  }
  total: {
    price: number
    saved: number
    total: number
  }
}

export interface TotalsCar {
  count: number
  price: number
  saved: number
  total: number
}

export interface ProductsCar extends TotalsCar {
  products: ProductToCar[]
}
