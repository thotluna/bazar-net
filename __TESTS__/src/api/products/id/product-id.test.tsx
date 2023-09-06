/**
 * @jest-environment node
 */
import { GET } from '@/app/api/items/[id]/route'
import { ValidationError } from '@/modules/core/error-validation'
import { DummyJsonProductRepository } from '@/modules/items/infrastructure/dummy-json-product-repository'
import { productMother } from '../../../modules/products/infrastructure/result-products-mother'

jest.mock('../../../../../src/modules/items/infrastructure/dummy-json-product-repository.ts')

describe('items/id', () => {
  const baseUrl = 'http://localhost:3000/api/items'

  it('should return one item', async () => {
    const id = 1
    const productFaker = productMother.create({ id })
    const get = jest.fn().mockResolvedValue(productFaker)
    ;(DummyJsonProductRepository as jest.Mock).mockReturnValue({
      get: (id: number) => get(id)
    })

    const require = new Request(`${baseUrl}/${id}`)
    const res = await GET(require)
    const product = await res.json()

    expect(res.status).toBe(200)
    expect(product).toEqual(productFaker)
    expect(get).toHaveBeenCalledWith(id)
  })

  it('should return status 404', async () => {
    const id = 'asdasd'

    const get = jest.fn()
    ;(DummyJsonProductRepository as jest.Mock).mockReturnValue({
      get: (id: number) => get(id)
    })

    const require = new Request(`${baseUrl}/${id}`)
    const res = await GET(require)
    const errorMessage = await res.json()

    expect(res.status).toBe(404)
    expect(errorMessage.error).toEqual('id should be number')
  })

  it('should return status 404', async () => {
    const id = 124578

    const get = jest.fn().mockRejectedValue(new ValidationError(`id = ${id} does not exist`))
    ;(DummyJsonProductRepository as jest.Mock).mockReturnValue({
      get: (id: number) => get(id)
    })

    const require = new Request(`${baseUrl}/${id}`)
    const res = await GET(require)
    const errorMesage = await res.json()

    expect(res.status).toBe(404)
    expect(errorMesage.error).toEqual(`id = ${id} does not exist`)
    expect(get).toHaveBeenCalledTimes(1)
  })
})
