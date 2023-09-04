import { ResultProduct } from '@/modules/items/domain/result-products'
import { ProductRepository } from '../domain'

const API_URL_BASE = process.env.API_URL

export const ApiProductRepository: ProductRepository = {
  getAllProducts: (query?: string) => getAllProducts(query)
}

const getAllProducts = (query?: string) => {
  const q = query ? `?q=${query}` : ''
  const resultProduct = fetch(`${API_URL_BASE}/items${q}`).then((data) => data.json())
  // const request = new Request(`${API_URL_BASE}/items${q}`)
  // const resultProduct = GET(request).then((res) => res.json())
  return resultProduct satisfies Promise<ResultProduct>
}
