import { GetAllProduct } from '@/products/application/get-all-product'
import { ProductRepository } from '@/products/domain/product-repository'
import { DummyJsonProductRepository } from '@/products/infrastructure/dummy-json-product-repository'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const query = searchParams.get('query')

  const repository: ProductRepository = DummyJsonProductRepository()

  const list = await GetAllProduct(repository)

  return NextResponse.json(list)
}
