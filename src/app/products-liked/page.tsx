import { EmptyProducts } from '@/components/empty-products'
import { ProductLikedCollection } from '@/components/product-liked-collection'
import { GetAllProductByIds } from '@/modules/products/application/get-all-product-by-ids'

async function getAllProduct(ids?: string | string[] | undefined) {
  if (!ids) return undefined
  const query = Array.isArray(ids) ? ids.map((id) => Number(id)) : [Number(ids)]

  return GetAllProductByIds(query)
}

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function Products({ searchParams }: Props) {
  const products = await getAllProduct(searchParams?.id)

  return (
    <section className="flex-1 p-2 w-full mb-16">
      {!products && <EmptyProducts message="Do not have product" />}
      {products && (
        <section
          className="w-full mt-2 grid gap-4 justify-items-center place-content-start "
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(8rem, 1fr))' }}
        >
          <ProductLikedCollection products={products} />
        </section>
      )}
    </section>
  )
}
