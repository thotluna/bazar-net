interface Props {
  amount: number
}

export function Badge({ amount }: Props) {
  if (!amount || amount <= 0) return
  const num = amount >= 10 ? '+9' : amount

  return (
    <div className="absolute top-[-12px] right-[-12px] w-6 h-6 bg-[var(--color-badge-bg)] flex items-center justify-center p-2 text-[var(--color-badge-text) ] rounded-full text-xs">
      {num}
    </div>
  )
}
