import { ValidationError } from '@/modules/core/error-validation'
import { Product } from '../domain/product'
import { ProductRepository } from '../domain/product-repository'
import { ResultProduct } from '../domain/result-products'
import { ResultexternalProduct } from './result-product'

export function DummyJsonProductRepository(): ProductRepository {
  return {
    getAll: (query?: string | null) => getAll(query),
    get: (id: number) => get(id),
    getList: (ids: number[]) => getList(ids)
  }
}

const getAll = async (query?: string | null): Promise<ResultProduct> => {
  const url = query ? `https://dummyjson.com/products/search?q=${query}` : 'https://dummyjson.com/products'

  return fetch(url)
    .then((resultRaw) => resultRaw.json())
    .then((result) => {
      const resutlProduct: ResultexternalProduct = result
      return {
        ...resutlProduct,
        products: resutlProduct.products.map((prod) => {
          return {
            ...prod,
            liked: false
          } satisfies Product
        })
      }
    })
}

const get = async (id: number): Promise<Product> => {
  return fetch(`https://dummyjson.com/products/${id}`)
    .then((resultRaw) => resultRaw.json())
    .then((result) => {
      if (result.message) throw new ValidationError(`id = ${id} does not exist`)
      const product: Product = { ...result, liked: false }

      return product
    })
}

const getList = async (ids: number[]): Promise<Product[]> => {
  const promises = ids.map((id) => get(id))

  return await Promise.allSettled([...promises]).then((result) => result.map((res) => res.value))
}
