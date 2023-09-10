'use client'
import { Product } from '@/modules/items/domain/product'
import { CardProduct } from '../card-product'

interface Props {
  products: Product[]
}

export function ProductCollection({ products }: Props) {
  if (!products || products.length === 0) return
  return (
    <>
      {products.map((product) => (
        <CardProduct key={product.id} product={product} />
      ))}
    </>
  )
}
