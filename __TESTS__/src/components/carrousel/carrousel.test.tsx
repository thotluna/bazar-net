import { Carrousel } from '@/components/carrousel'
import { fireEvent, render, screen } from '@testing-library/react'
import { productMother } from '../../modules/products/infrastructure/result-products-mother'

describe('Carrousel component', () => {
  it('should render component', async () => {
    const product = productMother.create()
    render(
      <Carrousel images={product.images} thumbnail={product.thumbnail} title={product.title} rating={product.rating} />
    )

    const image = await screen.findByAltText(product.title)
    expect(image).toBeInTheDocument()
  })
  it('should render carrousel', async () => {
    const product = productMother.create()
    render(
      <Carrousel images={product.images} thumbnail={product.thumbnail} title={product.title} rating={product.rating} />
    )

    const images: HTMLImageElement[] = await screen.findAllByAltText(/image/i)
    expect(images).toHaveLength(product.images.length)

    images.forEach(async (img, index) => {
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('alt', `Image #${index} of ${product.title}`)
    })
  })
  it('should render component', async () => {
    const product = productMother.create()
    render(
      <Carrousel images={product.images} thumbnail={product.thumbnail} title={product.title} rating={product.rating} />
    )

    const image: HTMLImageElement = await screen.findByTestId('preview-image')
    const images: HTMLImageElement[] = await screen.findAllByTestId('carrousel-image')
    expect(image.src).toEqual(images.at(0)?.src)
  })
  it('should render second image of carrousel', async () => {
    const product = productMother.create()
    render(
      <Carrousel images={product.images} thumbnail={product.thumbnail} title={product.title} rating={product.rating} />
    )

    const images: HTMLImageElement[] = await screen.findAllByTestId('carrousel-image')
    let image: HTMLImageElement = await screen.findByTestId('preview-image')
    expect(image.src).toEqual(images.at(0)?.src)
    const nextButton = await screen.findByRole('button', { name: 'next image' })
    fireEvent.click(nextButton)
    expect(image.src).toEqual(images.at(1)?.src)
  })
  it('should render first image and last after click back button', async () => {
    const product = productMother.create()
    render(
      <Carrousel images={product.images} thumbnail={product.thumbnail} title={product.title} rating={product.rating} />
    )

    const images: HTMLImageElement[] = await screen.findAllByTestId('carrousel-image')
    let image: HTMLImageElement = await screen.findByTestId('preview-image')
    expect(image.src).toEqual(images.at(0)?.src)
    const backButton = await screen.findByRole('button', { name: 'back image' })
    fireEvent.click(backButton)
    expect(image.src).toEqual(images.at(-1)?.src)
  })
  it('should render last image and after the first image', async () => {
    const product = productMother.create()
    render(
      <Carrousel images={product.images} thumbnail={product.thumbnail} title={product.title} rating={product.rating} />
    )

    const images: HTMLImageElement[] = await screen.findAllByTestId('carrousel-image')
    let image: HTMLImageElement = await screen.findByTestId('preview-image')
    fireEvent.click(images.at(-1)!)
    expect(image.src).toEqual(images.at(-1)?.src)
    const nextButton = await screen.findByRole('button', { name: 'next image' })
    fireEvent.click(nextButton)
    expect(image.src).toEqual(images.at(0)?.src)
  })
})
