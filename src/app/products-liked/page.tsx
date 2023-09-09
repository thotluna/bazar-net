import { ProductCollection } from '@/components/products-collection'
import { GetAllProductByIds } from '@/modules/products/application/get-all-product-by-ids'
import { ProductRepository } from '@/modules/products/domain'
import { ApiProductRepository } from '@/modules/products/intraestructure/api-repository'

async function getAllProduct(ids?: string | string[] | undefined) {
  if (!ids) return undefined
  const query = Array.isArray(ids) ? ids.map((id) => Number(id)) : [Number(ids)]

  const productsRepository: ProductRepository = ApiProductRepository
  return GetAllProductByIds(productsRepository, query)
}

export default async function Products({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const products = await getAllProduct(searchParams?.id)

  return (
    <section className="flex-1 p-2 w-full">
      {!products && <h2 className="text-4xl">No Hay Productos</h2>}
      {products && (
        <section
          className="w-full mt-2 grid gap-4 justify-items-center place-content-start "
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(8rem, 1fr))' }}
        >
          <ProductCollection products={products} />
        </section>
      )}
    </section>
  )
}
