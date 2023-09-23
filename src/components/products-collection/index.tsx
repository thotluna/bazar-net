'use client'
import { getProductAction } from '@/actions/get-products'
import { Product } from '@/modules/items/domain/product'
import { LIMIT_DEFAULT } from '@/modules/products/infrastructure/api-repository'
import { useEffect, useState } from 'react'
import { CardProduct } from '../card-product'

interface Props {
  products: Product[]
  pageOrigin: number
  total: number
}

export function ProductCollection({ products, total, pageOrigin }: Props) {
  const [list, setList] = useState(products)
  const [page, setPage] = useState(pageOrigin)

  const nextPageHandler = () => {
    if ((page - 1) * LIMIT_DEFAULT >= total) return
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    if (page <= pageOrigin) return
    getProductAction({ page }).then((result) => {
      setList((prevList) => prevList.concat(result.products))
    })
  }, [page, pageOrigin])

  if (total === 0) return
  return (
    <>
      <section className="flex items-center justify-center gap-5">
        <button onClick={nextPageHandler}>next</button>
      </section>
      <section
        className="w-full mt-2 grid gap-4 justify-items-center place-content-start "
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(8rem, 1fr))' }}
      >
        {list.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </section>
    </>
  )
}
