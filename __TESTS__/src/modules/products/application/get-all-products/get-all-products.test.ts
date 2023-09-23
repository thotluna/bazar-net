/**
 * @jest-environment node
 *
 */
import { GetAllProducts } from '@/modules/products/application/get-all-products'
import { ProductRepository } from '@/modules/products/domain'
import { ApiProductRepository, LIMIT_DEFAULT } from '@/modules/products/infrastructure/api-repository'
import { expect } from '@jest/globals'
import { ResultProductMother } from '../../infrastructure/result-products-mother'

describe('Get all products', () => {
  describe('without query', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(ResultProductMother.create(LIMIT_DEFAULT))
      })
    ) as jest.Mock
    it('should return 15 products without filters', async () => {
      const repository: ProductRepository = ApiProductRepository
      const res = await GetAllProducts(repository, {})

      expect(res.page).toBe(1)
      expect(res.products.length).toBe(LIMIT_DEFAULT)
    })
    it('should return 5 products ', async () => {
      const repository: ProductRepository = ApiProductRepository

      const res = await GetAllProducts(repository, {})
      expect(res.products.length).toBe(LIMIT_DEFAULT)

      const page = 2
      const res2 = await GetAllProducts(repository, { page })
      expect(res2.products.length).toBe(LIMIT_DEFAULT)
      expect(res2.page).toBe(page)

      expect(res.products).not.toBe(res2.products)
    })
  })
  describe('with query', () => {
    it('should return all laptop products', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(ResultProductMother.create(3, { limit: LIMIT_DEFAULT, skip: 0, total: 3 }))
        })
      ) as jest.Mock
      const repository: ProductRepository = ApiProductRepository
      const query = 'laptop'
      const res = await GetAllProducts(repository, { query })

      expect(res.page).toBe(1)
      expect(res.products.length).toBe(3)
    })
    it('should return all laptop products', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(ResultProductMother.create(0, { limit: LIMIT_DEFAULT, skip: LIMIT_DEFAULT }))
        })
      ) as jest.Mock
      const repository: ProductRepository = ApiProductRepository
      const query = 'laptop'
      const page = 2
      const res = await GetAllProducts(repository, { page, query })

      expect(res.page).toBe(page)
      expect(res.products.length).toBe(0)
    })
  })
})
