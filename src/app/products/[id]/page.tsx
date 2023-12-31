/* eslint-disable @next/next/no-img-element */
import { BottomProductDetail } from '@/components/bottom-product-detail'
import { Carrousel } from '@/components/carrousel'
import { GetProduct } from '@/modules/products/application/get-product'
import { ProductRepository } from '@/modules/products/domain'
import { ApiProductRepository } from '@/modules/products/infrastructure/api-repository'
import type { Metadata, ResolvingMetadata } from 'next'

async function getProduct(id: number) {
  const repository: ProductRepository = ApiProductRepository
  return GetProduct(repository, id)
}

type Props = {
  params: { id: number }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const id = params.id

  const product = await getProduct(id)

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: product.title,
    description: product.description,
    alternates: {
      canonical: `/products/${id}`
    },
    openGraph: {
      title: product.title,
      url: `https://bazar-net.vercel.app/products/${id}`,
      images: [product.thumbnail, ...previousImages]
    }
  }
}

export default async function details({ params }: { params: { id: number } }) {
  const { id } = params
  const product = await getProduct(id)

  return (
    <section className="flex-1 flex flex-col gap-4 px-2 py-16 w-full text-center mb-16">
      <Carrousel thumbnail={product.thumbnail} images={product.images} rating={product.rating} title={product.title} />
      <section>
        <h1 className="text-4xl font-semibold p-2 py-8 text-[var(--color-card-text)]">{product.title}</h1>
        <div className="w-full flex justify-center">
          <p className="block text-[var(--color-card-text-paragraph)] max-w-[535px]">{product.description}</p>
        </div>
      </section>
      <BottomProductDetail product={product} />
    </section>
  )
}
