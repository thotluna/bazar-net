/**
 * @jest-environment node
 *
 */

import { ResultProduct } from '@/modules/items/domain/result-products'
import { expect } from '@jest/globals'

describe('Items', () => {
  describe('no search or pagination ', () => {
    it('return all products', async () => {
      let url = new URL('/api/items', 'http://localhost:3000')
      const res = await fetch(`${url}`)
      const status = res.status
      const resultProduct: ResultProduct = await res.json()

      expect(status).toBe(200)
      expect(resultProduct.products.length).toBe(5)
      expect(resultProduct.skip).toBe(0)
      expect(resultProduct.limit).toBe(5)
    })
  })
  describe('with search', () => {
    it('should return only laptop', async () => {
      let url = new URL('/api/items', 'http://localhost:3000')
      url.searchParams.append('q', 'laptop')
      const res = await fetch(`${url}`)
      const status = res.status
      const resultProduct: ResultProduct = await res.json()

      expect(status).toBe(200)
      expect(resultProduct.total).toBe(3)
      expect(resultProduct.skip).toBe(0)
      expect(resultProduct.limit).toBe(5)
    })
    it('should return all with search empty', async () => {
      let url = new URL('/api/items', 'http://localhost:3000')
      url.searchParams.append('q', '')
      const res = await fetch(`${url}`)
      const status = res.status
      const resultProduct: ResultProduct = await res.json()

      expect(status).toBe(200)
      expect(resultProduct.total).toBe(30)
      expect(resultProduct.skip).toBe(0)
      expect(resultProduct.limit).toBe(5)
    })
  })

  describe('with pagination', () => {
    it('should return 10  first', async () => {
      let url = new URL('/api/items', 'http://localhost:3000')
      url.searchParams.append('skip', '0')
      url.searchParams.append('limit', '10')
      const res = await fetch(`${url}`)
      const status = res.status
      const resultProduct: ResultProduct = await res.json()

      expect(status).toBe(200)
      expect(resultProduct.total).toBe(30)
      expect(resultProduct.skip).toBe(0)
      expect(resultProduct.limit).toBe(10)
    })
    it('should return all with search empty', async () => {
      let url = new URL('/api/items', 'http://localhost:3000')
      url.searchParams.append('skip', '10')
      url.searchParams.append('limit', '10')
      const res = await fetch(`${url}`)
      const status = res.status
      const resultProduct: ResultProduct = await res.json()

      expect(status).toBe(200)
      expect(resultProduct.total).toBe(30)
      expect(resultProduct.skip).toBe(10)
      expect(resultProduct.limit).toBe(10)
    })
  })
})
