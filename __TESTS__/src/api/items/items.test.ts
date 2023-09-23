/**
 * @jest-environment node
 *
 */

import { expect } from '@jest/globals'
import { GET } from '../../../../src/app/api/items/route'
import { ResultItems } from '../../../../src/modules/items/domain/result-products'
import { DummyJsonProductRepository } from '../../../../src/modules/items/infrastructure/dummy-json-product-repository'
import { ResultProductMother } from '../../modules/products/infrastructure/result-products-mother'

const baseUrl = process.env.NEXT_PUBLIC_API_URL
jest.mock('../../../../src/modules/items/infrastructure/dummy-json-product-repository.ts')

describe('Items', () => {
  describe('no search or pagination ', () => {
    it('return all products', async () => {
      const getAll = jest.fn().mockResolvedValue(ResultProductMother.create(5))
      ;(DummyJsonProductRepository as jest.Mock).mockReturnValue({
        getAll: getAll
      })
      let url = new URL('/api/items', baseUrl)
      // const res = await fetch(`${url}`)
      const require = new Request(url)
      const res = await GET(require)
      const status = res.status
      const resultProduct: ResultItems = await res.json()

      expect(status).toBe(200)
      expect(resultProduct.products.length).toBe(5)
      expect(resultProduct.skip).toBe(0)
      expect(resultProduct.limit).toBe(5)
      expect(getAll).toHaveBeenCalled()
    })
  })
  describe('with search', () => {
    it('should return only laptop', async () => {
      const getAll = jest.fn().mockResolvedValue(ResultProductMother.create(5))
      ;(DummyJsonProductRepository as jest.Mock).mockReturnValue({
        getAll: getAll
      })
      let url = new URL('/api/items', baseUrl)
      const query = 'laptop'
      url.searchParams.append('q', query)
      // const res = await fetch(`${url}`)
      const require = new Request(url)
      const res = await GET(require)
      const status = res.status
      const resultProduct: ResultItems = await res.json()

      expect(status).toBe(200)
      expect(resultProduct.total).toBe(100)
      expect(resultProduct.skip).toBe(0)
      expect(resultProduct.limit).toBe(5)
      expect(getAll).toHaveBeenCalledWith(query, undefined, undefined)
    })
    it('should return all with search empty', async () => {
      const getAll = jest.fn().mockResolvedValue(ResultProductMother.create(5))
      ;(DummyJsonProductRepository as jest.Mock).mockReturnValue({
        getAll: getAll
      })
      let url = new URL('/api/items', baseUrl)
      url.searchParams.append('q', '')
      // const res = await fetch(`${url}`)
      const require = new Request(url)
      const res = await GET(require)
      const status = res.status
      const resultProduct: ResultItems = await res.json()

      expect(status).toBe(200)
      expect(resultProduct.total).toBe(100)
      expect(resultProduct.skip).toBe(0)
      expect(resultProduct.limit).toBe(5)
      expect(getAll).toHaveBeenCalledWith('', undefined, undefined)
    })
  })

  describe('with pagination', () => {
    it('should return 10  first', async () => {
      const getAll = jest.fn().mockResolvedValue(ResultProductMother.create(5))
      ;(DummyJsonProductRepository as jest.Mock).mockReturnValue({
        getAll: getAll
      })
      let url = new URL('/api/items', baseUrl)
      url.searchParams.append('skip', '0')
      url.searchParams.append('limit', '10')
      // const res = await fetch(`${url}`)
      const require = new Request(url)
      const res = await GET(require)
      const status = res.status
      const resultProduct: ResultItems = await res.json()

      expect(status).toBe(200)
      expect(resultProduct.total).toBe(100)
      expect(resultProduct.skip).toBe(0)
      expect(resultProduct.limit).toBe(5)
      expect(getAll).toHaveBeenCalledWith(undefined, 0, 10)
    })
    it('should return all with search empty', async () => {
      const getAll = jest.fn().mockResolvedValue(ResultProductMother.create(5))
      ;(DummyJsonProductRepository as jest.Mock).mockReturnValue({
        getAll: getAll
      })
      let url = new URL('/api/items', baseUrl)
      url.searchParams.append('skip', '10')
      url.searchParams.append('limit', '10')
      // const res = await fetch(`${url}`)
      const require = new Request(url)
      const res = await GET(require)
      const status = res.status
      const resultProduct: ResultItems = await res.json()

      expect(status).toBe(200)
      expect(resultProduct.total).toBe(100)
      expect(resultProduct.skip).toBe(0)
      expect(resultProduct.limit).toBe(5)
      expect(getAll).toHaveBeenCalledWith(undefined, 10, 10)
    })
  })
})
