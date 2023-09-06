import { Error } from '@/modules/core/error'
import { GetItem } from '@/modules/items/application/get-item'
import { GetItemsGroup } from '@/modules/items/application/get-items-group'
import { ProductRepository } from '@/modules/items/domain/product-repository'
import { DummyJsonProductRepository } from '@/modules/items/infrastructure/dummy-json-product-repository'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  const allIds = params.getAll('ids')
  const idOrIDs = new URL(request.url).pathname.split('/').at(-1)

  const ids = idOrIDs === 'group-id' ? allIds : undefined

  const id = idOrIDs === 'group-id' ? undefined : Number(idOrIDs)

  const repository: ProductRepository = DummyJsonProductRepository()
  try {
    const products = ids ? await GetItemsGroup(repository, ids) : await GetItem(repository, id!)
    return NextResponse.json(products)
  } catch (error) {
    const messageError = { error: (error as Error).message }

    const res = JSON.stringify(messageError)

    return new Response(res, {
      status: 404,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
