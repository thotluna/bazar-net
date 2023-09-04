import { SearchBar } from '@/components/search-bar'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'

jest.mock('next/navigation')
const mockRouterPush = jest.fn()
// const spy = jest.spyOn(useRouter, 'push')

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
    await userEvent.type(input, 'test')
    fireEvent.submit(form)

    expect(mockRouterPush).toHaveBeenCalled()
    expect(mockRouterPush).toHaveBeenCalledWith(`/products?q=test`)
  })
})
