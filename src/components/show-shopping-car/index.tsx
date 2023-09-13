'use client'
import { GetAllProductsCar } from '@/modules/products/application/get-all-product-car'
import { ProductRepository } from '@/modules/products/domain'
import { ProductsCar, TotalsCar } from '@/modules/products/domain/product-cost'
import { ApiProductRepository } from '@/modules/products/infrastructure/api-repository'
import { useShoppingCarStore } from '@/store/shopping-car'
import { useEffect, useState } from 'react'
import { EmptyProducts } from '../empty-products'
import { ProductCardCar } from '../product-card-car'
import { TotalCar } from '../total-car'

async function getAllProduct(car: Record<number, number>) {
  const repository: ProductRepository = ApiProductRepository
  return GetAllProductsCar(repository, car)
}

export function ShowShoppingCar({ productsCarOriginal }: { productsCarOriginal: ProductsCar }) {
  const car = useShoppingCarStore((state) => state.ids)
  const [productsCar, setProductCar] = useState(productsCarOriginal)

  useEffect(() => {
    if (Object.values(car).filter((p) => p > 0).length === 0) {
      setProductCar({ count: 0, price: 0, products: [], saved: 0, total: 0 })
      return
    }

    setProductCar((prev) => {
      const clone = structuredClone(prev)
      prev.products.forEach((product) => {
        if (product.quantity !== car[product.id]) {
          clone.products = clone.products.map((nProduct) => {
            if (nProduct.id === product.id) {
              return {
                ...nProduct,
                quantity: car[nProduct.id],
                total: {
                  ...nProduct.total,
                  price: nProduct.unit.price * car[nProduct.id],
                  saved: (car[nProduct.id] * nProduct.unit.price * nProduct.unit.discountPercentage) / 100,
                  total:
                    car[nProduct.id] *
                    (nProduct.unit.price - (nProduct.unit.price * nProduct.unit.discountPercentage) / 100)
                }
              }
            } else {
              return nProduct
            }
          })

          clone.count = Object.values(car).reduce((acc, value) => acc + value)
          clone.price = clone.products.map((p) => p.total.price).reduce((acc, value) => acc + value)
          clone.saved = clone.products.map((p) => p.total.saved).reduce((acc, value) => acc + value)
          clone.total = clone.products.map((p) => p.total.total).reduce((acc, value) => acc + value)
        }
      })
      return clone
    })
  }, [car])

  useEffect(() => {
    const interval = setInterval(() => {
      getAllProduct(car).then(setProductCar)
    }, 500)
    return () => clearInterval(interval)
  }, [car])

  const { products } = productsCar

  if (products.length === 0) return <EmptyProducts message="Dont have any products in car" />

  return (
    <section className="flex-1 p-2 flex flex-col gap-2 relative ">
      {products && products.map((product) => <ProductCardCar key={product.id} product={product} />)}
      <TotalCar totals={productsCar as TotalsCar} />
    </section>
  )
}
