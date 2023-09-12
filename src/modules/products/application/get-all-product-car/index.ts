import { ProductRepository } from '../../domain'
import { ProductToCar, ProductsCar } from '../../domain/product-cost'

export function GetAllProductsCar(repository: ProductRepository, car: Record<number, number>): Promise<ProductsCar> {
  const ids = Object.keys(car).map((id) => Number(id))
  const quantity = Object.values(car).reduce((acc, value) => acc + value)

  return repository.getListByIds(ids).then((products) => {
    const productsToCar = products
      .filter((product) => car[product.id] > 0)
      .map((product) => {
        return {
          id: product.id,
          title: product.title,
          thumbnail: product.thumbnail,
          rating: product.rating,
          quantity: car[product.id],
          stock: product.stock,
          unit: {
            price: product.price,
            discountPercentage: product.discountPercentage,
            saved: (product.price * product.discountPercentage) / 100,
            total: product.price - (product.price * product.discountPercentage) / 100
          },
          total: {
            price: car[product.id] * product.price,
            saved: (car[product.id] * product.price * product.discountPercentage) / 100,
            total: car[product.id] * (product.price - (product.price * product.discountPercentage) / 100)
          }
        } satisfies ProductToCar
      })

    return {
      products: productsToCar,
      count: quantity,
      price: productsToCar.map((product) => product.total.price).reduce((acc, value) => acc + value),
      saved: productsToCar.map((product) => product.total.saved).reduce((acc, value) => acc + value),
      total: productsToCar.map((product) => product.total.total).reduce((acc, value) => acc + value)
    } satisfies ProductsCar
  })
}
