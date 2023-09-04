export type ProductExternalDto = {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export type ResultexternalProduct = {
  products: ProductExternalDto[]
  total: number
  skip: number
  limit: number
}