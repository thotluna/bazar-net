import { ShoppingCardIcon } from '..'
import { Badge } from '../badge'
import { LinkButton } from '../link-button'

interface Props {
  href: string
  productCount?: number
}

export function ShoppingCarButton({ href, productCount = 0 }: Props) {
  return (
    <LinkButton href={href}>
      <Badge amount={productCount} />
      <ShoppingCardIcon />
    </LinkButton>
  )
}
