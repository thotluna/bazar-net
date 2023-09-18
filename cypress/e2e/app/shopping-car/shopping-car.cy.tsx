import { Product } from '@/modules/items/domain/product'
import { bottomBarPageObject } from '../../../fixtures/pages-object/bottom-bar-page-object'
import { buttonShoppingPageObject } from '../../../fixtures/pages-object/button-shopping-page-object'
import { detailsPageObject } from '../../../fixtures/pages-object/detail-page-object'
import { shoppingCarPageObject } from '../../../fixtures/pages-object/shopping-car-page-object'

const idProduct = 1

const product: Promise<Product> = fetch(`http://localhost:3000/api/items/${idProduct}`).then((res) =>
  res.json()
) satisfies Promise<Product>

const totals = async (quantity: number) => {
  const pro = await product
  const price = pro.price * quantity
  const saved = ((pro.price * pro.discountPercentage) / 100) * quantity
  const total = (pro.price - (pro.price * pro.discountPercentage) / 100) * quantity
  return {
    price,
    saved,
    total
  }
}

describe('Shopping car page', () => {
  beforeEach(() => {
    cy.intercept('/products/*').as('getDetails')
    detailsPageObject.goToDetailProduct(idProduct)
    cy.wait('@getDetails')
    buttonShoppingPageObject.addProducts()
    buttonShoppingPageObject.addProducts()
    bottomBarPageObject.goToShoppingCar()
    shoppingCarPageObject.isInShoppingCar()
  })

  describe('should have', () => {
    it('image principal', async () => {
      const thumbnail = (await product).thumbnail
      shoppingCarPageObject.expectThatImagePrincipalHave(thumbnail)
    })
    it('unit total', async () => {
      const total = (await totals(1)).total
      shoppingCarPageObject.expectThatUnitTotalIs(total)
    })
    it('total quantity products', () => {
      shoppingCarPageObject.expectThatTotalQuantity(2)
    })
    it('units', async () => {
      buttonShoppingPageObject.expectHaveProducts(2)
    })
    it('title product', async () => {
      const title = (await product).title
      shoppingCarPageObject.expectThatTitle(title)
    })

    it('subtotal price', async () => {
      shoppingCarPageObject.expectThatTotalPriceIs((await totals(2)).price)
    })
    it('subtotal saved', async () => {
      shoppingCarPageObject.expectThatTotalSavesIs((await totals(2)).saved)
    })
    it('total', async () => {
      shoppingCarPageObject.expectThatTotalIs((await totals(2)).total)
    })
    it('button buy', () => {
      shoppingCarPageObject.expectThatButtonBay()
    })
  })

  describe('actions', () => {
    it('should add products', async () => {
      buttonShoppingPageObject.addProducts()
      buttonShoppingPageObject.expectHaveProducts(3)
      shoppingCarPageObject.expectThatTotalIs((await totals(3)).total)
    })
    it('should sub products', async () => {
      shoppingCarPageObject.isInShoppingCar()
      buttonShoppingPageObject.subProducts()
      buttonShoppingPageObject.expectHaveProducts(2)

      shoppingCarPageObject.expectThatTotalIs((await totals(2)).total)
    })
  })
})
