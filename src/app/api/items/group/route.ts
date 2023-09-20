import { GetItemsGroup } from '@/modules/items/application/get-items-group'
import { ProductRepository } from '@/modules/items/domain/product-repository'
import { DummyJsonProductRepository } from '@/modules/items/infrastructure/dummy-json-product-repository'
import { NextRequest, NextResponse } from 'next/server'
import { TestRepository } from '../../../../../__TESTS__/src/modules/items/infrastructure/test-repository'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const ids = searchParams.getAll('id')

  const repository: ProductRepository =
    process.env.NODE_ENV === 'development' ? TestRepository() : DummyJsonProductRepository()

  try {
    const product = await GetItemsGroup(repository, ids)
    return NextResponse.json(product, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      {
        status: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Content-Type': 'application/json'
        }
      }
    )
  }
}
