import { getProductAction } from '@/actions/get-products'
import { ProductCollection } from '@/components/products-collection'
import { SearchBar } from '@/components/search-bar'

export default async function Home() {
  const product = await getProductAction({})

  return (
    <section className="w-full flex-1 p-2 mb-16">
      <SearchBar />
      <ProductCollection products={product.products} total={product.total} pageOrigin={product.page} />
    </section>
  )
}
