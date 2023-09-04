import { Error } from '@/modules/core/error'
import { GetItem } from '@/modules/items/application/get-item'
import { GetItemsGroup } from '@/modules/items/application/get-items-group'
import { ProductRepository } from '@/modules/items/domain/product-repository'
import { DummyJsonProductRepository } from '@/modules/items/infrastructure/dummy-json-product-repository'
import { NextResponse } from 'next/server'

export async function GET(request: Request, context: { params: { id: number | string } }) {
  const params = new URL(request.url).searchParams
  const allIds = params.getAll('ids')
  const idOrIDs = context.params.id
  const ids = idOrIDs === 'group-id' ? allIds.map((id) => Number(id)) : undefined
  const id = idOrIDs === 'group-id' ? undefined : Number(idOrIDs)

  const repository: ProductRepository = DummyJsonProductRepository()
  try {
    const products = ids ? await GetItemsGroup(repository, ids) : await GetItem(repository, id!)
    return NextResponse.json(products)
  } catch (error) {
    return new Response(`error: ${(error as Error).message}`, { status: 404 })
  }
}
