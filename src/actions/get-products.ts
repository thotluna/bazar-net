'use server'

import { GetAllProducts } from '@/modules/products/application/get-all-products'
import { ProductRepository } from '@/modules/products/domain'
import { ApiProductRepository } from '@/modules/products/infrastructure/api-repository'

interface Pagination {
  query?: string
  page?: number
}

export async function getProductAction({ query, page = 1 }: Pagination) {
  const repository: ProductRepository = ApiProductRepository

  return GetAllProducts(repository, { page, query })
}
