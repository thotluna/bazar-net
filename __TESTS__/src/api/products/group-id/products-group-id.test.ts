/**
 * @jest-environment node
 */

import { GET } from '@/app/api/items/[id]/route'
import { ValidationError } from '@/modules/core/error-validation'
import { DummyJsonProductRepository } from '@/modules/items/infrastructure/dummy-json-product-repository'
import { productMother } from '../../../modules/products/infrastructure/result-products-mother'

jest.mock('../../../../../src/modules/items/infrastructure/dummy-json-product-repository.ts')

describe('Api Group Id', () => {
  const baseUrl = process.env.API_URL ?? 'http://localhost:3000/api'
  it('should return status 200 and list of items', async () => {
    const ids = [1, 3]
    const productsFaker = productMother.createList(2)
    const getList = jest.fn().mockResolvedValue(productsFaker)
    ;(DummyJsonProductRepository as jest.Mock).mockReturnValue({
      getList: (ids: number[]) => getList(ids)
    })

    let url = `${baseUrl}/items/group-id?`
    ids.forEach((id, index) => {
      url += `ids=${id}`
      if (index < ids.length - 1) url += '&'
    })

    const require = new Request(url)
    const res = await GET(require)
    const product = await res.json()

    expect(res.status).toBe(200)
    expect(getList).toHaveBeenCalledWith(ids)
    expect(product).toEqual(productsFaker)
  })

  it('should return error for each id fail when id is not number ', async () => {
    const ids = ['otherNumber']
    const getList = jest.fn()
    ;(DummyJsonProductRepository as jest.Mock).mockReturnValue({
      getList: (ids: number[]) => getList(ids)
    })

    let url = `${baseUrl}/items/group-id?`
    ids.forEach((id, index) => {
      url += `ids=${id}`
      if (index < ids.length - 1) url += '&'
    })

    const require = new Request(url)
    const res = await GET(require)
    const message = await res.json()

    expect(res.status).toBe(404)
    expect(getList).toHaveBeenCalledTimes(0)
    expect(message).toEqual({ error: `id: ${ids[0]} should be number` })
    // const expected = [
    //   {
    //     error: {
    //       message: 'id = 0 does not exist',
    //       name: 'ValidationError'
    //     }
    //   }
    // ]
  })

  it('should return error for each id fail when id do not exist ', async () => {
    const ids = [121212112]
    const getList = jest.fn().mockRejectedValue(new ValidationError(`id = ${ids[0]} does not exist`))
    ;(DummyJsonProductRepository as jest.Mock).mockReturnValue({
      getList: (ids: number[]) => getList(ids)
    })

    let url = `${baseUrl}/items/group-id?`
    ids.forEach((id, index) => {
      url += `ids=${id}`
      if (index < ids.length - 1) url += '&'
    })

    const require = new Request(url)
    const res = await GET(require)
    const message = await res.json()

    expect(res.status).toBe(404)
    expect(getList).toHaveBeenCalledTimes(1)
    expect(getList).toHaveBeenCalledWith(ids)
    expect(message).toEqual({ error: `id = ${ids[0]} does not exist` })
  })

  it('should return valid and error for each id fail when id do not exist ', async () => {
    const ids = [1, 21212112]
    const productFaker = productMother.create({ id: 1 })
    const getList = jest.fn().mockResolvedValue([productFaker, new ValidationError(`id = ${ids[0]} does not exist`)])
    ;(DummyJsonProductRepository as jest.Mock).mockReturnValue({
      getList: (ids: number[]) => getList(ids)
    })

    let url = `${baseUrl}/items/group-id?`
    ids.forEach((id, index) => {
      url += `ids=${id}`
      if (index < ids.length - 1) url += '&'
    })

    const require = new Request(url)
    const res = await GET(require)
    const result = await res.json()

    expect(res.status).toBe(200)
    expect(getList).toHaveBeenCalledTimes(1)
    expect(getList).toHaveBeenCalledWith(ids)
    expect(result).toEqual([productFaker, { message: `id = ${ids[0]} does not exist`, name: 'ValidationError' }])
  })
})
