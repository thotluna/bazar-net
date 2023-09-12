import { useShoppingCarStore } from '@/store/shopping-car'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { ShoppingCardIcon } from '..'
import { LinkButton } from '../link-button'
const Badge = dynamic(() => import('../badge').then((mod) => mod.Badge), { ssr: false })

interface Props {
  href: string
}

export function ShoppingCarButton({ href }: Props) {
  const counts = useShoppingCarStore((state) => state.ids)
  const total = useMemo(() => {
    const totalArr = Object.values(counts)
    return totalArr.length === 0 ? 0 : totalArr.reduce((acc, value) => acc + value)
  }, [counts])

  return (
    <LinkButton href={href}>
      <Badge amount={total} />
      <ShoppingCardIcon />
    </LinkButton>
  )
}
