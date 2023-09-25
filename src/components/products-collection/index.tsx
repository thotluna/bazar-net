'use client'
import { getProductAction } from '@/actions/get-products'
import { useInterceptionObserver } from '@/hooks/use-interception-observer'
import { usePagination } from '@/hooks/use-pagination'
import { Product } from '@/modules/items/domain/product'
import { useEffect, useState } from 'react'
import { CardProduct } from '../card-product'

interface Props {
  products: Product[]
  pageOrigin: number
  total: number
}

export function ProductCollection({ products, total, pageOrigin }: Props) {
  const [list, setList] = useState(products)
  const { isObserver, fromRef } = useInterceptionObserver()
  const { page } = usePagination(pageOrigin, total, isObserver)

  useEffect(() => {
    if (page <= pageOrigin) return
    getProductAction({ page }).then((result) => {
      setList((prevList) => prevList.concat(result.products))
    })
  }, [page, pageOrigin])

  if (total === 0) return
  return (
    <>
      <section
        className="w-full mt-2 grid gap-4 justify-items-center place-content-start "
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(8rem, 1fr))' }}
      >
        {list.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </section>
      <span ref={fromRef}>.</span>
    </>
  )
}
