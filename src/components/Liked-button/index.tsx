'use client'
import { useLikeStore } from '@/store/liked'
import dynamic from 'next/dynamic'
import { LikeIcon } from '..'
import { LinkButton } from '../link-button'

const Badge = dynamic(() => import('../badge').then((mod) => mod.Badge), { ssr: false })

export function LikedButton() {
  const likes = useLikeStore((state) => state.likes)
  let url = '/products-liked?'
  likes.forEach((id, index) => {
    url += `id=${id}`
    if (index < likes.length - 1) {
      url += '&'
    }
  })

  return (
    <LinkButton href={url}>
      <Badge amount={likes.length ?? 0} dataCy="Liked-Badge" />
      <LikeIcon label="Go to Likes products list" />
    </LinkButton>
  )
}
