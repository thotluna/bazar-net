import { LikedRepository } from '../../domain/liked-repository'

export function GetIds(repository: LikedRepository): number[] {
  return repository.getAll()
}
