/**
 * @jest-environment node
 */
import { GET } from '@/app/api/items/group/route'
import { describe, expect } from '@jest/globals'
import { DummyJsonProductRepository } from '../../../../../src/modules/items/infrastructure/dummy-json-product-repository'
import { productMother } from '../../../modules/products/infrastructure/result-products-mother'

const baseUrl = process.env.NEXT_PUBLIC_API_URL
jest.mock('../../../../../src/modules/items/infrastructure/dummy-json-product-repository.ts')

describe('group ids', () => {
  describe('with all id valid', () => {
    it('should return all products by ids ', async () => {
      const ids = [1, 2]
      const getList = jest.fn().mockResolvedValue([productMother.create({ id: 1 }), productMother.create({ id: 2 })])
      ;(DummyJsonProductRepository as jest.Mock).mockReturnValue({
        getList: getList
      })
      let url = new URL(`/api/items/group`, baseUrl)
      ids.forEach((id) => {
        url.searchParams.append('id', id.toString())
      })

      // const res = await fetch(`${url}`)
      const require = new Request(url)
      const res = await GET(require)
      const status = res.status

      const products = await res.json()

      expect(status).toBe(200)
      expect(products[0].id).toBe(ids[0])
      expect(products[1].id).toBe(ids[1])
      expect(getList).toHaveBeenCalledWith(ids)
    })
  })
  describe('with id invalid', () => {
    it('should return error for id non number ', async () => {
      const ids = [1, 'anything']
      const getList = jest
        .fn()
        .mockResolvedValue([productMother.create({ id: 1 }), { message: `id: anything should be a number` }])
      ;(DummyJsonProductRepository as jest.Mock).mockReturnValue({
        getList: getList
      })
      let url = new URL(`/api/items/group`, baseUrl)
      ids.forEach((id) => {
        url.searchParams.append('id', id.toString())
      })

      // const res = await fetch(`${url}`)
      const require = new Request(url)
      const res = await GET(require)
      const status = res.status

      const body = await res.json()

      expect(status).toBe(404)
      expect(body.message).toBe(`id: anything should be a number`)
    })
    it('should return error for id non number ', async () => {
      const ids = [1, 99999]
      let url = new URL(`/api/items/group`, baseUrl)
      ids.forEach((id) => {
        url.searchParams.append('id', id.toString())
      })
      const getList = jest
        .fn()
        .mockResolvedValue([productMother.create({ id: 1 }), { message: `Product with id '${ids[1]}' not found` }])
      ;(DummyJsonProductRepository as jest.Mock).mockReturnValue({
        getList: getList
      })

      // const res = await fetch(`${url}`)
      const require = new Request(url)
      const res = await GET(require)
      const status = res.status

      const products = await res.json()

      expect(status).toBe(200)
      expect(products[0].id).toBe(ids[0])
      expect(products[1].message).toBe(`Product with id '${ids[1]}' not found`)
    })
  })
})
