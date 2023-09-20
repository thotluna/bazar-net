/**
 * @jest-environment node
 */
import { describe, expect } from '@jest/globals'

const baseUrl = process.env.NEXT_PUBLIC_API_URL

describe('group ids', () => {
  describe('with all id valid', () => {
    it('should return all products by ids ', async () => {
      const ids = [1, 2]
      let url = new URL(`/api/items/group`, baseUrl)
      ids.forEach((id) => {
        url.searchParams.append('id', id.toString())
      })

      const res = await fetch(`${url}`)
      const status = res.status
      const products = await res.json()

      expect(status).toBe(200)
      expect(products[0].id).toBe(ids[0])
      expect(products[1].id).toBe(ids[1])
    })
  })
  describe('with id invalid', () => {
    it('should return error for id non number ', async () => {
      const ids = [1, 'anything']
      let url = new URL(`/api/items/group`, baseUrl)
      ids.forEach((id) => {
        url.searchParams.append('id', id.toString())
      })

      const res = await fetch(`${url}`)
      const status = res.status
      expect(status).toBe(404)

      const body = await res.json()

      expect(body.message).toBe(`id: anything should be a number`)
    })
    it('should return error for id non number ', async () => {
      const ids = [1, 99999]
      let url = new URL(`/api/items/group`, baseUrl)
      ids.forEach((id) => {
        url.searchParams.append('id', id.toString())
      })

      const res = await fetch(`${url}`)
      const status = res.status
      expect(status).toBe(200)

      const products = await res.json()

      expect(products[0].id).toBe(ids[0])
      expect(products[1].message.message).toBe(`Product with id '${ids[1]}' not found`)
    })
  })
})
