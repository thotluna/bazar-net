'use client'
import { useShoppingCarStore } from '@/store/shopping-car'
import { useRouter } from 'next/navigation'
import { TrashIcon } from '../icons/trash-icon'

export function DeleteAllCar() {
  const removeAll = useShoppingCarStore((state) => state.deleteAll)
  const router = useRouter()

  const onCLickHandler = () => {
    removeAll()
    router.back()
  }

  return (
    <button
      onClick={onCLickHandler}
      className="inline-block text-[var(--color-bar-text)] p-3 relative hover:text-[var(--color-badge-bg)] hover:scale-105 "
    >
      <TrashIcon />
    </button>
  )
}
