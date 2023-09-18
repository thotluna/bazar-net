import { GetAllItems } from '@/modules/items/application/get-all-items'
import { ProductRepository } from '@/modules/items/domain/product-repository'
import { ResultProduct } from '@/modules/items/domain/result-products'
import { DummyJsonProductRepository } from '@/modules/items/infrastructure/dummy-json-product-repository'
import { NextResponse } from 'next/server'
import { TestRepository } from '../../../../__TESTS__/src/modules/items/infrastructure/test-repository'

export async function GET(request: Request): Promise<NextResponse<ResultProduct>> {
  const { searchParams } = new URL(request.url)

  const query: string | null = searchParams.get('q')

  const repository: ProductRepository =
    process.env.NODE_ENV === 'development' ? TestRepository() : DummyJsonProductRepository()

  const list = await GetAllItems(repository, query)

  return NextResponse.json(list)
}
