'use client'
import { GetAllProductsCar } from '@/modules/products/application/get-all-product-car'
import { ProductRepository } from '@/modules/products/domain'
import { ProductsCar } from '@/modules/products/domain/product-cost'
import { ApiProductRepository } from '@/modules/products/infrastructure/api-repository'
import { EmptyProducts } from '../empty-products'
import { ProductCardCar } from '../product-card-car'
import { TotalCar } from '../total-car'

async function getAllProduct(car: Record<number, number>) {
  const repository: ProductRepository = ApiProductRepository
  return GetAllProductsCar(repository, car)
}

export function ShowShoppingCar({ productsCarOriginal }: { productsCarOriginal: ProductsCar }) {
  const { products } = productsCarOriginal

  if (products.length === 0) return <EmptyProducts message="Dont have any products in car" />

  return (
    <section className="flex-1 p-2 flex flex-col gap-2 relative mb-80">
      {products && products.map((product) => <ProductCardCar key={product.id} product={product} />)}
      <TotalCar products={productsCarOriginal} />
    </section>
  )
}
