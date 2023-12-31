interface Props {
  amount: number
  dataCy?: string
}

export function Badge({ amount, dataCy }: Props) {
  if (!amount || amount <= 0) return
  const num = amount >= 10 ? '+9' : amount

  return (
    <span
      data-cy={dataCy}
      className="absolute top-[-3px] right-[-3px] w-5 h-5 bg-[var(--color-badge-bg)] flex items-center justify-center text-slate-950 rounded-full text-xs"
    >
      {num}
    </span>
  )
}
