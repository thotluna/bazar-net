import { Error } from '@/modules/core/error'
import { GetItem } from '@/modules/products/application/get-item'
import { ProductRepository } from '@/modules/products/domain/product-repository'
import { DummyJsonProductRepository } from '@/modules/products/infrastructure/dummy-json-product-repository'
import { NextResponse } from 'next/server'

export async function GET(request: Request, context: { params }) {
  const id = context.params.id

  const repository: ProductRepository = DummyJsonProductRepository()
  try {
    const product = await GetItem(repository, id)
    return NextResponse.json(product)
  } catch (error) {
    return new Response(`message: ${(error as Error).message}`, { status: 404 })
  }
}
