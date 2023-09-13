import { ProductCollection } from '@/components/products-collection'
import { SearchBar } from '@/components/search-bar'
import { GetAllProducts } from '@/modules/products/application/get-all-products'
import { ProductRepository } from '@/modules/products/domain'
import { ApiProductRepository } from '@/modules/products/infrastructure/api-repository'

async function getAllProduct(query?: string) {
  const repository: ProductRepository = ApiProductRepository
  return GetAllProducts(repository, query)
}

export default async function Home() {
  const product = await getAllProduct()

  return (
    <section className="flex-1 p-2 w-full">
      <SearchBar />
      <section
        className="w-full mt-2 grid gap-4 justify-items-center place-content-start "
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(8rem, 1fr))' }}
      >
        <ProductCollection products={product.products} />
      </section>
    </section>
  )
}
