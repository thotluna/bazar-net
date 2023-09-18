import { ErrorMessage } from '@/modules/core/error-message'
import { ValidationError } from '@/modules/core/error-validation'
import { Product } from '../domain/product'
import { ProductRepository } from '../domain/product-repository'
import { ResultProduct } from '../domain/result-products'
import { ResultExternalProduct } from './result-product'

const URL_BASE_API = 'https://dummyjson.com/products'

export function DummyJsonProductRepository(): ProductRepository {
  return {
    getAll: (query?: string | null) => getAll(query),
    get: (id: number) => get(id),
    getList: (ids: number[]) => getList(ids)
  }
}

const getAll = async (query?: string | null): Promise<ResultProduct> => {
  const url = query ? `${URL_BASE_API}/search?q=${query}` : URL_BASE_API

  return fetch(url)
    .then((resultRaw) => resultRaw.json())
    .then((result) => {
      const resutlProduct: ResultExternalProduct = result
      return {
        ...resutlProduct,
        products: resutlProduct.products.map((prod) => {
          return {
            ...prod,
            liked: false
          } satisfies Product
        })
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
