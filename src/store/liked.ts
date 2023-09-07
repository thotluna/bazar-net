import { create } from 'zustand'

interface StateLiked {
  likes: number[]
  toggle: (id: number) => void
  exist: (id: number) => boolean
}

export const useLikeStore = create<StateLiked>((set, get) => ({
  likes: [],
  toggle: (id: number) =>
    set((state) => ({
      likes: state.likes.includes(id) ? state.likes.filter((pId) => pId !== id) : state.likes.concat(id)
    })),
  exist: (id: number) => get().likes.includes(id)
}))
