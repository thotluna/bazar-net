import { Product } from '@/modules/items/domain/product'
import { ResultProduct } from '@/modules/items/domain/result-products'
import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'

const productFactory = Factory.define<Product>(() => ({
  id: faker.number.int({ min: 1, max: 100 }),
  title: faker.word.words({ count: { min: 1, max: 4 } }),
  description: faker.lorem.paragraphs(2),
  price: faker.number.float({ min: 1, max: 1000, precision: 2 }),
  discountPercentage: faker.number.float({ min: 1, max: 30, precision: 2 }),
  rating: faker.number.float({ min: 1, max: 5, precision: 2 }),
  stock: faker.number.int({ min: 1, max: 100 }),
  brand: faker.word.words({ count: { min: 1, max: 4 } }),
  category: faker.word.words({ count: { min: 1, max: 2 } }),
  thumbnail: faker.image.urlLoremFlickr(),
  images: [faker.image.urlLoremFlickr(), faker.image.urlLoremFlickr()],
  liked: Math.random() === 1
}))

export const productMother = {
  create: (partial: Partial<Product>) => ({
    ...productFactory.build(),
    ...partial
  }),
  createList: (length = 5): Product[] => {
    return productFactory.buildList(length)
  }
}

export const ResultProductMother = {
  create: (countProduct: number, partial?: Partial<ResultProduct>) => {
    const resutl = {
      products: productMother.createList(countProduct),
      limit: countProduct,
      skip: 0,
      total: 100
    } satisfies ResultProduct

    if (!partial) return resutl

    return {
      ...resutl,
      ...partial
    } satisfies ResultProduct
  }
}