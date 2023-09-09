'use client'
import { useLikeStore } from '@/store/liked'
import dynamic from 'next/dynamic'
import { LikeIcon } from '..'
import { LinkButton } from '../link-button'

const Badge = dynamic(() => import('../badge').then((mod) => mod.Badge), { ssr: false })

interface Props {
  href: string
}

export function LikedButton({ href }: Props) {
  const likes = useLikeStore((state) => state.likes)

  return (
    <LinkButton href={href}>
      <Badge amount={likes.length ?? 0} />
      <LikeIcon label="Go to Likes products list" />
    </LinkButton>
  )
}
