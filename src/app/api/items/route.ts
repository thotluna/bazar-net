import { GetAllProduct } from '@/modules/products/application/get-all-product'
import { ProductRepository } from '@/modules/products/domain/product-repository'
import { ResultProduct } from '@/modules/products/domain/result-products'
import { DummyJsonProductRepository } from '@/modules/products/infrastructure/dummy-json-product-repository'
import { NextResponse } from 'next/server'

export async function GET(request: Request): Promise<NextResponse<ResultProduct>> {
  const { searchParams } = new URL(request.url)

  const query: string | null = searchParams.get('q')

  const repository: ProductRepository = DummyJsonProductRepository()

  const list = await GetAllProduct(repository, query)

  return NextResponse.json(list)
}
