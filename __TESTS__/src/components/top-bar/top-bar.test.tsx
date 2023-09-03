import { render, screen } from '@testing-library/react'
import { usePathname, useRouter } from 'next/navigation'
import { TopBar } from '../../../../src/components/top-bar'

jest.mock('next/navigation')
const mockRouterReplace = jest.fn()

describe('TopBar Components', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should be render title', async () => {
    ;(useRouter as jest.Mock).mockReturnValue({
      back: mockRouterReplace
    })
    render(<TopBar />)
    expect(await screen.findByText(/BAZAR-NET/i)).toBeInTheDocument()
  })
  it('should render when is in base route', async () => {
    ;(usePathname as jest.Mock).mockReturnValue('/')
    render(<TopBar />)
    const button = screen.queryByRole('button', { name: /return/i })
    expect(button).not.toBeInTheDocument()

    const component = screen.queryByTestId('header')
    expect(component).toBeInTheDocument()
    expect(component).toHaveClass('text-3xl')
    expect(component).toHaveClass('justify-center')
  })
  it('should render when is not in base route', async () => {
    ;(usePathname as jest.Mock).mockReturnValue('/api')
    render(<TopBar />)
    const button = screen.queryByRole('button', { name: /return/i })
    expect(button).toBeInTheDocument()

    const component = screen.queryByTestId('header')
    expect(component).toBeInTheDocument()
    expect(component).toHaveClass('text-base')
    expect(component).toHaveClass('justify-start')
  })
})
