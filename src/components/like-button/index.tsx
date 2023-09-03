'use client'
import { LikeIcon } from '..';
import { ButtonCircle } from '../button-circle';

interface Props{
  active?: boolean
}

export function LikeButton({active= false}: Props) {
  //TODO: add useLikedProduct, productBase prop and onClickHandler

  return (
    <ButtonCircle onClick={()=>{}} active={active}>
      <LikeIcon />
    </ButtonCircle>
  )
}