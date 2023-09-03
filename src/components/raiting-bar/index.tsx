interface Props {
  value: number
}
export function RaitingBar({ value }: Props) {
  const string = '★'.repeat(Math.trunc(value)).padEnd(5, '☆')

  return <span className="text-2xl text-[var(--color-rating-text)]">{string}</span>
}
