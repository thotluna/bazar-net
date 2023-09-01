import { Product } from '../domain/product'
import { ProductRepository } from '../domain/product-repository'
import { ResultProduct } from './result-product'

export function DummyJsonProductRepository(): ProductRepository {
  return {
    get: () => get()
  }
}

const get = async () => {
  const headers = {
    'Content-Type': 'application/json',
    'Breaking-Bad': '<3'
  }
  return fetch('https://dummyjson.com/products', { headers })
    .then((resultRaw) => resultRaw.json())
    .then((result) => {
      const resutlProduct: ResultProduct = result
      return resutlProduct.products.map((prod) => {
        return {
          ...prod,
          linked: false
        } satisfies Product
      })
    })
}
