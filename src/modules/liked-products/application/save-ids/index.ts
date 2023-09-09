import { ValidationError } from '@/modules/core/error-validation'
import { LikedRepository } from '../../domain/liked-repository'

export function SaveIds(repository: LikedRepository, ids: number[]): void {
  if (ids.some((id) => isNaN(Number(id))))
    throw new ValidationError('one or more ids are not valid. must be existing numbers')

  return repository.save(ids)
}
