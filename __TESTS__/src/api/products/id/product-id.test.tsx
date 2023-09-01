/**
 * @jest-environment node
 */
import { Product } from '@/modules/products/domain/product'

describe('items/id', () => {
  const baseUrl = 'http://localhost:3000/api/items'

  it('should return one item', async () => {
    const id = 1
    const expected = {
      id: 1,
      title: 'iPhone 9',
      description: 'An apple mobile which is nothing like apple',
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: 'Apple',
      category: 'smartphones',
      liked: false,
      thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
      images: [
        'https://i.dummyjson.com/data/products/1/1.jpg',
        'https://i.dummyjson.com/data/products/1/2.jpg',
        'https://i.dummyjson.com/data/products/1/3.jpg',
        'https://i.dummyjson.com/data/products/1/4.jpg',
        'https://i.dummyjson.com/data/products/1/thumbnail.jpg'
      ]
    } satisfies Product

    const res = await fetch(`${baseUrl}/${id}`)
    const product = await res.json()

    expect(res.status).toBe(200)
    expect(product).toEqual(expected)
  })

  it('should return status 404', async () => {
    const id = 'asdasd'
    const res = await fetch(`${baseUrl}/${id}`)

    expect(res.status).toBe(404)
  })

  it('should return status 404', async () => {
    const id = 124578
    const res = await fetch(`${baseUrl}/${id}`)

    expect(res.status).toBe(404)
  })
})
