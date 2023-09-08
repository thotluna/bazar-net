'use client'
import { LikedRepository } from '../domain/liked-repository'

const KEY_LIKED_PRODUCTS = 'liked-products'

export function LocalStorageLikedRepository(): LikedRepository {
  return {
    getAll: () => getAll(),
    save: (listId: number[]) => save(listId)
  }
}

const getAll = (): number[] => {
  const listRaw = window.localStorage.getItem(KEY_LIKED_PRODUCTS) ?? '[]'
  const list = JSON.parse(listRaw)
  return list
}

const save = (listId: number[]): void => {
  const listRaw = JSON.stringify(listId)
  window.localStorage.setItem(KEY_LIKED_PRODUCTS, listRaw)
}
