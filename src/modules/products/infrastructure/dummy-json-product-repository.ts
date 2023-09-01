import { Product } from '../domain/product'
import { ProductRepository } from '../domain/product-repository'
import { ResultProduct } from '../domain/result-products'
import { ResultexternalProduct } from './result-product'

export function DummyJsonProductRepository(): ProductRepository {
  return {
    get: (query?: string | null) => get(query)
  }
}

const get = async (query?: string | null): Promise<ResultProduct> => {
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
