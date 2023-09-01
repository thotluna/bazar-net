import { ValidationError } from '@/modules/core/error-validation'
import { Product } from '../domain/product'
import { ProductRepository } from '../domain/product-repository'
import { ResultProduct } from '../domain/result-products'
import { ResultexternalProduct } from './result-product'

export function DummyJsonProductRepository(): ProductRepository {
  return {
    getAll: (query?: string | null) => getAll(query),
    get: (id: number) => get(id)
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

      return { ...result, liked: false }
    })
}
