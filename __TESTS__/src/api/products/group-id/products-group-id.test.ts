/**
 * @jest-environment node
 */
describe('Api Group Id', () => {
  const baseUrl = 'http://localhost:3000/api/items/group-id'
  it('should return status 200', async () => {
    const res = await fetch(`${baseUrl}?ids=5&ids=10`)
    expect(res.status).toBe(200)
  })

  it('should return status 200', async () => {
    const products = await fetch(`${baseUrl}?ids=1&ids=3`).then((res) => res.json())
    const expected = [
      {
        id: 1,
        title: 'iPhone 9',
        description: 'An apple mobile which is nothing like apple',
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: 'Apple',
        category: 'smartphones',
        thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        images: [
          'https://i.dummyjson.com/data/products/1/1.jpg',
          'https://i.dummyjson.com/data/products/1/2.jpg',
          'https://i.dummyjson.com/data/products/1/3.jpg',
          'https://i.dummyjson.com/data/products/1/4.jpg',
          'https://i.dummyjson.com/data/products/1/thumbnail.jpg'
        ],
        liked: false
      },
      {
        id: 3,
        title: 'Samsung Universe 9',
        description: "Samsung's new variant which goes beyond Galaxy to the Universe",
        price: 1249,
        discountPercentage: 15.46,
        rating: 4.09,
        stock: 36,
        brand: 'Samsung',
        category: 'smartphones',
        thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
        images: ['https://i.dummyjson.com/data/products/3/1.jpg'],
        liked: false
      }
    ]
    expect(products).toEqual(expected)
  }, 10000)

  it('should return null for each id fail ', async () => {
    const products = await fetch(`${baseUrl}?ids=asdasd&ids=1232132&ids=`).then((res) => res.json())
    const expected = [
      {
        error: {
          message: 'id should be number',
          name: 'ValidationError'
        }
      },
      {
        error: {
          message: 'id = 1232132 does not exist',
          name: 'ValidationError'
        }
      },
      {
        error: {
          message: 'id = 0 does not exist',
          name: 'ValidationError'
        }
      }
    ]
    expect(products).toEqual(expected)
  }, 10000)
})
