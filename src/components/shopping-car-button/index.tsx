import { useShoppingCarStore } from '@/store/shopping-car'
import dynamic from 'next/dynamic'
import { useCallback, useMemo } from 'react'
import { ShoppingCardIcon } from '..'
import { LinkButton } from '../link-button'
const Badge = dynamic(() => import('../badge').then((mod) => mod.Badge), { ssr: false })

export function ShoppingCarButton() {
  const counts = useShoppingCarStore((state) => state.ids)
  const total = useMemo(() => {
    const totalArr = Object.values(counts)
    return totalArr.length === 0 ? 0 : totalArr.reduce((acc, value) => acc + value)
  }, [counts])

  const urlHandler = useCallback(() => {
    let href = '/shopping-car?'
    const keys = Object.keys(counts)
    keys.forEach((id, index) => {
      href += `id=${id}`
      if (index < keys.length - 1) href += '&'
    })
    return href
  }, [counts])

  return (
    <LinkButton href={`/shopping-car?car=${objBase64(counts ?? {})}`}>
      <ShoppingCardIcon />
      <Badge amount={total} />
    </LinkButton>
  )
}

const objBase64 = (obj: Record<number, number>) => {
  const objectJS = JSON.stringify(obj)
  return window.btoa(objectJS)
}
