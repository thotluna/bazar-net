import { GetIds, SaveIds } from '@/modules/liked-products/application'
import { LikedRepository } from '@/modules/liked-products/domain/liked-repository'
import { LocalStorageLikedRepository } from '@/modules/liked-products/infrastructure/local-storage-liked-repository'
import { create } from 'zustand'

interface StateLiked {
  likes: number[]
  toggle: (id: number) => void
  exist: (id: number) => boolean
  deleteAll: () => void
}

const likedRepository: LikedRepository = LocalStorageLikedRepository()

export const useLikeStore = create<StateLiked>((set, get) => ({
  likes: global.window !== undefined ? GetIds(likedRepository) : [],
  toggle: (id: number) =>
    set((state) => {
      const likes = state.likes.includes(id) ? state.likes.filter((pId) => pId !== id) : state.likes.concat(id)
      SaveIds(likedRepository, likes)
      return { likes }
    }),
  exist: (id: number) => get().likes.includes(id),
  deleteAll: () =>
    set((state) => {
      state.likes = []
      SaveIds(likedRepository, [])
      return state
    })
}))
