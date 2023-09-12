/* eslint-disable @next/next/no-img-element */
import { EmptyProducts } from '@/components/empty-products'
import { ShowShoppingCar } from '@/components/show-shopping-car'
import { GetAllProductsCar } from '@/modules/products/application/get-all-product-car'
import { ProductRepository } from '@/modules/products/domain'
import { ApiProductRepository } from '@/modules/products/infrastructure/api-repository'
import { decode64 } from '@/utils/deco'

async function getAllProduct(car: Record<number, number>) {
  const repository: ProductRepository = ApiProductRepository
  return GetAllProductsCar(repository, car)
}

export default async function Products({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) {
  const obj = searchParams?.car
  if (!obj) return <EmptyProducts message="Dont have any products in car" />
  const car: Record<number, number> = decode64(obj)
  if (Object.values(car).filter((p) => p > 0).length === 0)
    return <EmptyProducts message="Dont have any products in car" />
  const productsCar = await getAllProduct(car)

  return <ShowShoppingCar productsCarOriginal={productsCar} />
}
