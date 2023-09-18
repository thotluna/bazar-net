/**
 * @jest-environment node
 */

import { GET } from '@/app/api/items/route'
import { DummyJsonProductRepository } from '@/modules/items/infrastructure/dummy-json-product-repository'
import { ResultProductMother } from '../../modules/products/infrastructure/result-products-mother'

jest.mock('../../../../src/modules/items/infrastructure/dummy-json-product-repository.ts')

describe('Api', () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL!
  describe('GetAllProducts', () => {
    it('Should return status 200 ', async () => {
      const getAll = jest.fn().mockResolvedValue(ResultProductMother.create(5))
      ;(DummyJsonProductRepository as jest.Mock).mockReturnValue({
        getAll: getAll
      })

      const require = new Request(baseUrl)
      const res = await GET(require)

      expect(res.status).toBe(200)
      expect(getAll).toHaveBeenCalled()
    })
    it('Should return result products ', async () => {
      const resultFaker = ResultProductMother.create(5)
      const getAll = jest.fn().mockResolvedValue(resultFaker)
      ;(DummyJsonProductRepository as jest.Mock).mockReturnValue({
        getAll: getAll
      })

      const require = new Request(baseUrl)
      const res = await GET(require).then((body) => body.json())
      const resultProduct = res

      expect(resultProduct).toEqual(resultFaker)
    })
  })
  describe('GetAllProduct with query', () => {
    it('should have been called with query distinct null', async () => {
      const resultFaker = ResultProductMother.create(5)
      const getAll = jest.fn().mockResolvedValue(resultFaker)
      ;(DummyJsonProductRepository as jest.Mock).mockReturnValue({
        getAll: (query?: string | null) => getAll(query)
      })
      const query = 'anything'
      const require = new Request(`${baseUrl}/items?q=${query}`)
      const res = await GET(require)

      expect(res.status).toBe(200)
      expect(getAll).toHaveBeenCalledWith(query)
    })
    it('should have been called with query equal null', async () => {
      const resultFaker = ResultProductMother.create(0)
      const getAll = jest.fn().mockResolvedValue(resultFaker)
      ;(DummyJsonProductRepository as jest.Mock).mockReturnValue({
        getAll: (query?: string) => getAll(query)
      })
      const query = 'anything'
      const require = new Request(`${baseUrl}`)
      const res = await GET(require)

      expect(res.status).toBe(200)
      expect(getAll).toHaveBeenCalledWith(undefined)
    })
  })
  describe('pagination', () => {
    it('should return product called with skip 0 and limit 5', async () => {
      const resultFaker = ResultProductMother.create(5)
      const skip = 0
      const limit = 5
      const getAll = jest.fn().mockResolvedValue(resultFaker)
      ;(DummyJsonProductRepository as jest.Mock).mockReturnValue({
        getAll: (query?: string | null, skip?: number, limit?: number) => getAll(query, skip, limit)
      })
      const query = 'anything'
      const require = new Request(`${baseUrl}/items?q=${query}&skip=${skip}&limit=${limit}`)
      const res = await GET(require)

      expect(res.status).toBe(200)
      expect(getAll).toHaveBeenCalledWith(query, skip, limit)
    })
    it('should return product called with skip 20 and limit 10', async () => {
      const resultFaker = ResultProductMother.create(10)
      const skip = 20
      const limit = 10
      const getAll = jest.fn().mockResolvedValue(resultFaker)
      ;(DummyJsonProductRepository as jest.Mock).mockReturnValue({
        getAll: (query?: string | null, skip?: number, limit?: number) => getAll(query, skip, limit)
      })
      const query = 'anything'
      const require = new Request(`${baseUrl}/items?q=${query}&skip=${skip}&limit=${limit}`)
      const res = await GET(require)

      expect(res.status).toBe(200)
      expect(getAll).toHaveBeenCalledWith(query, skip, limit)
    })
    it('should return product without calling skip and limit and query', async () => {
      const resultFaker = ResultProductMother.create(10)
      const getAll = jest.fn().mockResolvedValue(resultFaker)
      ;(DummyJsonProductRepository as jest.Mock).mockReturnValue({
        getAll: (query?: string, skip?: number, limit?: number) => getAll(query, skip, limit)
      })
      const require = new Request(`${baseUrl}`)
      const res = await GET(require)

      expect(res.status).toBe(200)
      expect(getAll).toHaveBeenCalledWith(undefined, undefined, undefined)
    })
  })
})
