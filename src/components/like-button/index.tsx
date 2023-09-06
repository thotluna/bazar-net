/* eslint-disable no-console */
'use client'
import { LikeIcon } from '..'
import { ButtonCircle } from '../button-circle'

interface Props {
  active?: boolean
  idProduct: number
}

export function LikeButton({ idProduct, active = false }: Props) {
  //TODO: add useLikedProduct, productBase prop and onClickHandler

  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <ButtonCircle onClick={onClickHandler} active={active}>
      <LikeIcon />
    </ButtonCircle>
  )
}
