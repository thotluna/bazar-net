import { Product } from '@/modules/items/domain/product'
import { ProductRepository } from '../domain'
import { ResultProducts } from '../domain/result-products'

const API_URL_BASE = process.env.NEXT_PUBLIC_API_URL
const SKIP_INITIAL = 0
export const LIMIT_DEFAULT = 5

export const ApiProductRepository: ProductRepository = {
  getAllProducts: (page: number, query?: string) => getAllProducts(page, query),
  getListByIds: (ids: number[]) => getListByIds(ids),
  get: (id: number) => get(id)
}

const getAllProducts = (page: number, query?: string) => {
  const url = new URL('/api/items', API_URL_BASE)
  if (query) {
    url.searchParams.append('q', query)
  }

  const skip = (page - 1) * LIMIT_DEFAULT

  url.searchParams.append('skip', `${skip ?? SKIP_INITIAL}`)
  url.searchParams.append('limit', `${LIMIT_DEFAULT}`)

  const resultProduct = fetch(url)
    .then((data) => data.json())
    .then((resultItems) => {
      return {
        products: resultItems.products,
        page,
        total: resultItems.total
      } satisfies ResultProducts
    })

  return resultProduct satisfies Promise<ResultProducts>
}

const getListByIds = (ids: number[]): Promise<Product[]> => {
  let url = new URL('/api/items/group', API_URL_BASE)

  ids.forEach((id) => {
    url.searchParams.append('id', id.toString())
  })

  return fetch(url).then((data) => data.json())
}

const get = (id: number): Promise<Product> => {
  let url = new URL(`/api/items/unit/${id}`, API_URL_BASE)

  return fetch(url).then((res) => res.json())
}
