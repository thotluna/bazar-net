import { LikeIcon } from '..'
import { Badge } from '../badge'
import { LinkButton } from '../link-button'

interface Props {
  href: string
  productCount?: number
}

export function LikedButton({ href, productCount = 0 }: Props) {
  return (
    <LinkButton href={href}>
      <Badge amount={productCount} />
      <LikeIcon />
    </LinkButton>
  )
}
