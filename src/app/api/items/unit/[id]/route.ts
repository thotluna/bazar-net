import { Error } from '@/modules/core/error'
import { GetItem } from '@/modules/items/application/get-item'
import { ProductRepository } from '@/modules/items/domain/product-repository'
import { DummyJsonProductRepository } from '@/modules/items/infrastructure/dummy-json-product-repository'
import { NextResponse } from 'next/server'
import { TestRepository } from '../../../../../../__TESTS__/src/modules/items/infrastructure/test-repository'

export async function GET(request: Request) {
  const idString = new URL(request.url).pathname.split('/').at(-1)
  const id = Number(idString)

  if (isNaN(id)) return NextResponse.json({ message: 'Id should be a number' }, { status: 400 })

  const repository: ProductRepository =
    process.env.NODE_ENV === 'development' ? TestRepository() : DummyJsonProductRepository()
  try {
    const products = await GetItem(repository, id)
    return new Response(JSON.stringify(products), {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    const messageError = { message: (error as Error).message }

    const res = JSON.stringify(messageError)

    return new Response(res, {
      status: 404,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
