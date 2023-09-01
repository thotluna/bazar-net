/**
 * @jest-environment node
 */

import { ResultProduct } from '@/modules/products/domain/result-products'

describe('Api', () => {
  describe('GetAllProducts', () => {
    it('Should return status 200 ', async () => {
      const res = await fetch('http://localhost:3000/api/products')

      expect(res.status).toBe(200)
    })
    it('Should return ProductsDto[] ', async () => {
      const result: ResultProduct = await fetch('http://localhost:3000/api/products').then((res) => res.json())

      const { products } = result

      expect(result.total).toBeGreaterThan(0)
      expect(products[0].title).toEqual('iPhone 9')
      expect(products[0].liked).toBe(false)
    })
  })
  describe('GetAllProduct with query', () => {
    it('should return list filtered where query', async () => {
      const query = 'Samsung'
      const result: ResultProduct = await fetch(`http://localhost:3000/api/products?q=${query}`).then((res) =>
        res.json()
      )

      const { products } = result

      expect(result.total).toBeGreaterThan(0)
      expect(products[0].title).toEqual('Samsung Universe 9')
      expect(products[0].liked).toBe(false)
    })
    it('should return empty list', async () => {
      const query = 'aadsdas adsdasdas dfsdasdad '
      const result: ResultProduct = await fetch(`http://localhost:3000/api/products?q=${query}`).then((res) =>
        res.json()
      )

      expect(result.total).toEqual(0)
    })
  })
})
