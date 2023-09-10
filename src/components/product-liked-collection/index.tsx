'use client'
import { Product } from '@/modules/items/domain/product'
import { GetAllProductByIds } from '@/modules/products/application/get-all-product-by-ids'
import { useLikeStore } from '@/store/liked'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CardProduct } from '../card-product'

interface Props {
  products: Product[]
}

export function ProductLikedCollection({ products }: Props) {
  const [prod, setProduct] = useState(products)
  const newList = useLikeStore((state) => state.likes)
  const route = useRouter()

  useEffect(() => {
    GetAllProductByIds(newList).then((prod) => setProduct(prod!))

    if (newList.length === 0) route.back()
  }, [newList, route])

  return (
    <>
      {prod.map((product) => (
        <div key={product.id} className="">
          <CardProduct product={product} />
        </div>
      ))}
    </>
  )
}
