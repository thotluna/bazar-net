/* eslint-disable no-console */
'use client'
import { useLikeStore } from '@/store/liked'
import { memo } from 'react'
import { LikeIcon } from '..'
import { ButtonCircle } from '../button-circle'

interface Props {
  active?: boolean
  idProduct: number
  label?: string
}

export const LikeButton = memo(function LikeButton({ idProduct, label = 'Go to like product' }: Props) {
  const _ = useLikeStore((state) => state.likes)
  const toggleLike = useLikeStore((state) => state.toggle)
  const hasLiked = useLikeStore((state) => state.exist)

  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    toggleLike(idProduct)
  }

  return (
    <ButtonCircle onClick={onClickHandler} active={hasLiked(idProduct) ?? false}>
      <LikeIcon label={label} />
    </ButtonCircle>
  )
})
