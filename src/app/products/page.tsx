import { getProductAction } from '@/actions/get-products'
import { EmptyProducts } from '@/components/empty-products'
import { ProductCollection } from '@/components/products-collection'

export default async function Products({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) {
  const query = searchParams?.q
  const resultProduct = await getProductAction({ query })

  if (resultProduct.products.length === 0) return <EmptyProducts message="Do not have product" />

  return (
    <section className="flex-1 p-2 w-full min-h-full mb-16">
      <ProductCollection
        products={resultProduct.products}
        pageOrigin={resultProduct.page}
        total={resultProduct.total}
        query={query}
      />
    </section>
  )
}
