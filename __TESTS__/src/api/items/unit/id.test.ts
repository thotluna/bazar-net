/**
 * @jest-environment node
 */
import { Product } from '@/modules/items/domain/product'
import { expect } from '@jest/globals'

const baseUrl = process.env.NEXT_PUBLIC_API_URL

describe('Unit id', () => {
  describe('with id valid', () => {
    it('should return one product ', async () => {
      const id = 1
      let url = new URL(`/api/items/unit/${id}`, baseUrl)
      const res = await fetch(`${url}`)
      const status = res.status
      const product: Product = await res.json()

      expect(status).toBe(200)
      expect(product.id).toBe(id)
    })
  })
  describe('with id valid', () => {
    it('should return message error required id should be number', async () => {
      const id = 'anything work'
      let url = new URL(`/api/items/unit/${id}`, baseUrl)
      const res = await fetch(`${url}`)
      const status = res.status
      const body = await res.json()

      expect(status).toBe(400)
      expect(body.message).toBe('Id should be a number')
    })
    it('should return message error id dont not found', async () => {
      const id = '99999'
      let url = new URL(`/api/items/unit/${id}`, baseUrl)
      const res = await fetch(`${url}`)
      const status = res.status
      const body = await res.json()

      expect(status).toBe(404)
      expect(body.message).toBe('id = 99999 does not exist')
    })
  })
})
