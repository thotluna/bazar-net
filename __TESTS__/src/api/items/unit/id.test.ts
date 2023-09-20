/**
 * @jest-environment node
 */
import { GET } from '@/app/api/items/unit/[id]/route'
import { Product } from '@/modules/items/domain/product'
import { expect } from '@jest/globals'
import { DummyJsonProductRepository } from '../../../../../src/modules/items/infrastructure/dummy-json-product-repository'
import { productMother } from '../../../modules/products/infrastructure/result-products-mother'

const baseUrl = process.env.NEXT_PUBLIC_API_URL
jest.mock('../../../../../src/modules/items/infrastructure/dummy-json-product-repository.ts')

describe('Unit id', () => {
  describe('with id valid', () => {
    it('should return one product ', async () => {
      const id = 1
      const get = jest.fn().mockResolvedValue(productMother.create({ id: id }))
      ;(DummyJsonProductRepository as jest.Mock).mockReturnValue({
        get: get
      })
      let url = new URL(`/api/items/unit/${id}`, baseUrl)
      // const res = await fetch(`${url}`)
      const require = new Request(url)
      const res = await GET(require)
      const status = res.status
      const product: Product = await res.json()

      expect(status).toBe(200)
      expect(product.id).toBe(id)
      expect(get).toHaveBeenCalledWith(id)
    })
  })
  describe('with id valid', () => {
    it('should return message error required id should be number', async () => {
      const id = 'anything work'
      const get = jest.fn().mockRejectedValue({ message: 'Id should be a number' })
      ;(DummyJsonProductRepository as jest.Mock).mockReturnValue({
        get: get
      })
      let url = new URL(`/api/items/unit/${id}`, baseUrl)
      // const res = await fetch(`${url}`)
      const require = new Request(url)
      const res = await GET(require)
      const status = res.status
      const body = await res.json()

      expect(status).toBe(400)
      expect(body.message).toBe('Id should be a number')
    })
    it('should return message error id dont not found', async () => {
      const id = '99999'
      const get = jest.fn().mockRejectedValue({ message: `id = ${id} does not exist` })
      ;(DummyJsonProductRepository as jest.Mock).mockReturnValue({
        get: get
      })
      let url = new URL(`/api/items/unit/${id}`, baseUrl)
      // const res = await fetch(`${url}`)
      const require = new Request(url)
      const res = await GET(require)
      const status = res.status
      const body = await res.json()

      expect(status).toBe(404)
      expect(body.message).toBe('id = 99999 does not exist')
    })
  })
})
