/**
 * @jest-environment node
 */

import { Product } from '@/products/domain/product'

async function readableStreamToString(readableStream: ReadableStream) {
  const reader = readableStream.getReader()
  let result = ''
  let done = false

  while (!done) {
    const { value, done: readDone } = await reader.read()
    if (readDone) {
      done = true
    } else {
      result += new TextDecoder().decode(value)
    }
  }

  return result
}

describe('Api', () => {
  describe('GetAllProducts', () => {
    it('Should return status 200 ', async () => {
      const res = await fetch('http://localhost:3000/api/products')

      expect(res.status).toBe(200)
    })
    it('Should return ProductsDto[] ', async () => {
      const list: Product[] = await fetch('http://localhost:3000/api/products').then((res) => res.json())

      expect(list.length).toBeGreaterThan(0)
      expect(list[0].title).toBeTruthy()
      expect(list[0].linked).toBe(false)
    })
  })
})
