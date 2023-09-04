import { ResultProduct } from '@/modules/items/domain/result-products'
import { ProductRepository } from '../domain'

const URL_BASE = 'http://localhost:3000/api/items'

export const ApiProductRepository: ProductRepository = {
  getAllProducts: (query?: string) => getAllProducts(query)
}

const getAllProducts = (query?: string) => {
  const q = query ? `?q=${query}` : ''
  const resultProduct = fetch(`${URL_BASE}${q}`).then((data) => data.json())
  return resultProduct satisfies Promise<ResultProduct>
}
