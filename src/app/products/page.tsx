import { EmptyProducts } from '@/components/empty-products'
import { ProductCollection } from '@/components/products-collection'
import { GetAllProducts } from '@/modules/products/application/get-all-products'
import { ProductRepository } from '@/modules/products/domain'
import { ApiProductRepository } from '@/modules/products/infrastructure/api-repository'

async function getAllProductWithQuery(query: string) {
  const repository: ProductRepository = ApiProductRepository
  return GetAllProducts(repository, query)
}

export default async function Products({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) {
  const query = searchParams?.q
  const resultProduct = await getAllProductWithQuery(query!)

  if (resultProduct.products.length === 0) return <EmptyProducts message="Do not have product" />

  return (
    <section className="flex-1 p-2 w-full min-h-full mb-16">
      <section
        className="w-full mt-2 grid gap-4 justify-items-center place-content-start "
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(8rem, 1fr))' }}
      >
        <ProductCollection products={resultProduct.products} />
      </section>
    </section>
  )
}
