'use client'
import { useLikeStore } from '@/store/liked'
import dynamic from 'next/dynamic'
import { LikeIcon } from '..'

const ButtonCircle = dynamic(() => import('../button-circle').then((mod) => mod.ButtonCircle), { ssr: false })

interface Props {
  active?: boolean
  idProduct: number
  label?: string
}

export function LikeButton({ idProduct, label = 'Go to like product' }: Props) {
  const _ = useLikeStore((state) => state.likes)
  const toggleLike = useLikeStore((state) => state.toggle)
  const hasLiked = useLikeStore((state) => state.exist)

  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    toggleLike(idProduct)
  }

  return (
    <ButtonCircle onClick={onClickHandler} active={hasLiked(idProduct)}>
      <LikeIcon label={label} />
    </ButtonCircle>
  )
}
