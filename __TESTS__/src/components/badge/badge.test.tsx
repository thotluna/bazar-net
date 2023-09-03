import { Badge } from '@/components/badge'
import { render, screen } from '@testing-library/react'

describe('Badge component', () => {
  it('should render component with number 5', () => {
    render(<Badge amount={5} />)
    expect(screen.queryByText('5')).toBeInTheDocument()
  })
  it('should render component with +9', () => {
    render(<Badge amount={10} />)
    expect(screen.queryByText('+9')).toBeInTheDocument()
  })
  it('should not render component', () => {
    render(<Badge amount={0} />)
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })
})
