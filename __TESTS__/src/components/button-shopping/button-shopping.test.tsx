import { ButtonShopping } from '@/components/button-shopping'
import { render, screen } from '@testing-library/react'

describe('ButtonShopping component', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null)
      },
      writable: true
    })
  })
  it('should render component', async () => {
    render(<ButtonShopping id={1} available={5} />)

    expect(await screen.findByText('0 und')).toBeInTheDocument()
    expect(await screen.findByText('Product in shopping card:')).toBeInTheDocument()
    // expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  })
  it('should render add button', async () => {
    render(<ButtonShopping id={1} available={5} />)

    const button = await screen.findByRole('button', { name: 'add product' })
    const message = await screen.findByText('0 und')
    expect(message).toBeInTheDocument()
  })
  it('should render subtract button', async () => {
    render(<ButtonShopping id={1} available={5} />)

    const button = await screen.findByRole('button', { name: 'subtract product' })
    const message = await screen.findByText('0 und')
    expect(message).toBeInTheDocument()
  })
})
