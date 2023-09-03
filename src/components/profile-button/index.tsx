import { Badge } from '../badge'
import { UserIcon } from '../icons/user-icon'
import { LinkButton } from '../link-button'

interface Props {
  href: string
  productCount?: number
}

export function ProfileButton({ href, productCount = 0 }: Props) {
  return (
    <LinkButton href={href}>
      <Badge amount={productCount} color="var(--color-badge-text)" />
      <UserIcon />
    </LinkButton>
  )
}
