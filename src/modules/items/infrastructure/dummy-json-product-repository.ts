import { ErrorMessage } from '@/modules/core/error-message'
import { ValidationError } from '@/modules/core/error-validation'
import { Product } from '../domain/product'
import { ProductRepository } from '../domain/product-repository'
import { ResultProduct } from '../domain/result-products'
import { ResultExternalProduct } from './result-product'

const URL_BASE_API = 'https://dummyjson.com'

export function DummyJsonProductRepository(): ProductRepository {
  return {
    getAll: (query?: string, skip?: number, limit?: number) => getAll(query, skip, limit),
    get: (id: number) => get(id),
    getList: (ids: number[]) => getList(ids)
  }
}

const generateUrl = ({ query, skip = 0, limit = 5 }: { query?: string; skip?: number; limit?: number }) => {
  const url = new URL('/products', URL_BASE_API)
  if (query) {
    url.pathname.concat('/search')
    url.searchParams.append('q', query)
  }

  url.searchParams.append('skip', skip.toString())
  url.searchParams.append('limit', limit.toString())
  return url
}

const getAll = async (query?: string, skip: number = 0, limit: number = 5): Promise<ResultProduct> => {
  const url = generateUrl({ query, skip, limit })

  return fetch(url)
    .then((resultRaw) => resultRaw.json())
    .then((result) => {
      const resultProduct: ResultExternalProduct = result
      return {
        ...resultProduct,
        products: resultProduct.products.map((prod) => {
          return {
            ...prod,
            liked: false
          } satisfies Product
        }),
        skip,
        limit
      } satisfies ResultProduct
    })
}

const get = async (id: number): Promise<Product | ErrorMessage> => {
  if (isNaN(Number(id))) throw new ValidationError(`id should be number`)

  return fetch(`${URL_BASE_API}/${id}`)
    .then((resultRaw) => resultRaw.json())
    .then((result) => {
      if (result.message) throw new ValidationError(`id = ${id} does not exist`)
      const product: Product = { ...result, liked: false }

      return product
    })
}

const getList = async (ids: number[]): Promise<(Product | ErrorMessage)[]> => {
  const promises = ids.map((id) => get(id))

  return Promise.allSettled([...promises]).then((result) =>
    result.map((res) => (res.status === 'fulfilled' ? res.value : { error: res.reason as string }))
  )
}
