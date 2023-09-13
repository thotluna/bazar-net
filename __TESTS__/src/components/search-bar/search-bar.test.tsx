import { SearchBar } from '@/components/search-bar'
import { fireEvent, render, screen } from '@testing-library/react'
import { useRouter } from 'next/navigation'

jest.mock('next/navigation')
const mockRouterPush = jest.fn()

describe.only('SearchBar component', () => {
  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush
    })
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render bar', async () => {
    render(<SearchBar />)
    expect(screen.queryByPlaceholderText(/search/i)).toBeInTheDocument()
  })

  it('should return search', async () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search')
    const button = screen.getByRole('button', { name: /submit/i })
    const form = screen.getByRole('form')
    expect(input).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(form).toBeInTheDocument()
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.submit(form)

    expect(mockRouterPush).toHaveBeenCalled()
    expect(mockRouterPush).toHaveBeenCalledWith(`/products?q=test`)
  })
})
