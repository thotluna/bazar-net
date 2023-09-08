export interface LikedRepository {
  getAll: () => number[]
  save: (listId: number[]) => void
}
