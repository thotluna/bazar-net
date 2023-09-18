import { ValidationError } from '@/modules/core/error-validation'
import { Product } from '@/modules/items/domain/product'
import { ProductRepository } from '@/modules/items/domain/product-repository'
import { ResultProduct } from '@/modules/items/domain/result-products'
import data from './products.json'

export function TestRepository(): ProductRepository {
  return {
    getAll: (query?: string, skip?: number, limit?: number) => getAll(query, skip, limit),
    get: (id: number) => get(id),
    getList: (ids: number[]) => getList(ids)
  }
}

function getAll(query?: string, skip: number = 0, limit: number = 5) {
  const products = query
    ? data.products
        .filter(
          (product) =>
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.title.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase())
        )
        .map((product) => {
          return {
            ...product,
            liked: false
          }
        })
    : data.products.map((product) => {
        return {
          ...product,
          liked: false
        }
      })

  return Promise.resolve({
    products: products.slice(skip, skip + limit),
    total: products.length,
    skip: skip,
    limit: limit
  }) satisfies Promise<ResultProduct>
}

function get(id: number) {
  const filtered = data.products.find((product) => product.id === id)

  if (!filtered) throw new ValidationError(`id = ${id} does not exist`)
  const product: Product = { ...filtered, liked: false }

  return Promise.resolve(product)
}

function getList(ids: number[]) {
  const promises = ids.map((id) => get(id))

  return Promise.allSettled([...promises]).then((result) =>
    result.map((res) => (res.status === 'fulfilled' ? res.value : { error: res.reason as string }))
  )
}
