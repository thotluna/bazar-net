import { Product } from '@/modules/items/domain/product'
import { ResultProduct } from '@/modules/items/domain/result-products'
import { ProductRepository } from '../domain'

const API_URL_BASE = process.env.NEXT_PUBLIC_API_URL
const SKIP_INITIAL = 0
const LIMIT_DEFAULT = 15

export const ApiProductRepository: ProductRepository = {
  getAllProducts: (query?: string, skip?: number, limit?: number) => getAllProducts(query, skip, limit),
  getListByIds: (ids: number[]) => getListByIds(ids),
  get: (id: number) => get(id)
}

const getAllProducts = (query?: string, skip?: number, limit?: number) => {
  const url = new URL('/api/items', API_URL_BASE)
  if (query) {
    url.searchParams.append('q', query)
  }

  url.searchParams.append('skip', `${skip ?? SKIP_INITIAL}`)
  url.searchParams.append('limit', `${limit ?? LIMIT_DEFAULT}`)

  const resultProduct = fetch(url).then((data) => data.json())

  return resultProduct satisfies Promise<ResultProduct>
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
