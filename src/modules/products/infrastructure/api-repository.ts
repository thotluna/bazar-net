import { Product } from '@/modules/items/domain/product'
import { ResultProduct } from '@/modules/items/domain/result-products'
import { ProductRepository } from '../domain'

const API_URL_BASE = process.env.NEXT_PUBLIC_API_URL

export const ApiProductRepository: ProductRepository = {
  getAllProducts: (query?: string) => getAllProducts(query),
  getListByIds: (ids: number[]) => getListByIds(ids),
  get: (id: number) => get(id)
}

const getAllProducts = (query?: string) => {
  const q = query ? `?q=${query}` : ''
  const resultProduct = fetch(`${API_URL_BASE}/items${q}`).then((data) => data.json())

  return resultProduct satisfies Promise<ResultProduct>
}

const getListByIds = (ids: number[]): Promise<Product[]> => {
  let url = `${API_URL_BASE}/items/group-id?`
  ids.forEach((id, index) => {
    url += `ids=${id}`
    if (index < ids.length - 1) {
      url += '&'
    }
  })
  return fetch(url).then((data) => data.json())
}

const get = (id: number): Promise<Product> => {
  return fetch(`${API_URL_BASE}/items/${id}`).then((res) => res.json())
}
