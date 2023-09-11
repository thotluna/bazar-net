/* eslint-disable @next/next/no-img-element */
import { BottomProductDetail } from '@/components/bottom-product-detail'
import { Carrousel } from '@/components/carrousel'
import { GetProduct } from '@/modules/products/application/get-product'
import { ProductRepository } from '@/modules/products/domain'
import { ApiProductRepository } from '@/modules/products/infrastructure/api-repository'

async function getProduct(id: number) {
  const repository: ProductRepository = ApiProductRepository
  return GetProduct(repository, id)
}

export default async function details({ params }: { params: { id: number } }) {
  const { id } = params
  const product = await getProduct(id)

  return (
    <section className="flex-1 flex flex-col gap-4 px-2 py-16 w-full text-center">
      <Carrousel thumbnail={product.thumbnail} images={product.images} rating={product.rating} title={product.title} />
      <section>
        <h1 className="text-4xl font-semibold p-2 py-8">{product.title}</h1>
        <div className="w-full flex justify-center">
          <p className="block text-[var(--color-price-rebate)] max-w-[535px]">{product.description}</p>
        </div>
      </section>
      <BottomProductDetail product={product} />
    </section>
  )
}
