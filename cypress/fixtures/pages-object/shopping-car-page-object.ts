import { format } from '../../../src/utils/format'

class ShoppingCarPageObject {
  elements = {
    imagePrincipal: () => cy.get('article header img'),
    totalUnit: () => cy.get('article header div h2'),
    title: () => cy.get('h1'),
    totalQuantity: () => cy.get('ul > :nth-child(1) > :nth-child(2)'),
    totalPrice: () => cy.get('ul > :nth-child(2) > :nth-child(2)  span '),
    totalSaved: () => cy.get('ul > :nth-child(3) > :nth-child(2) '),
    total: () => cy.get('ul > :nth-child(4) > :nth-child(2) '),
    buttonBay: () => cy.get('ul ~ button ')
  }

  expectThatTitle(title: string) {
    this.elements.title().should('have.html', title)
  }

  expectThatImagePrincipalHave(src: string) {
    this.elements.imagePrincipal().should('have.attr', 'src', src)
  }

  expectThatUnitTotalIs(total: number) {
    this.elements.totalUnit().should('have.text', format.format(total))
  }

  expectThatTotalQuantity(quantity: number) {
    this.elements.totalQuantity().should('have.html', `${quantity}`)
  }

  expectThatTotalPriceIs(price: number) {
    this.elements.totalPrice().should('have.text', format.format(price))
  }

  expectThatTotalSavesIs(saved: number) {
    this.elements.totalSaved().should('have.text', format.format(saved))
  }
  expectThatTotalIs(total: number) {
    this.elements.total().should('have.text', format.format(total))
  }

  expectThatButtonBay() {
    this.elements.buttonBay().should('have.text', 'Buy')
  }

  isInShoppingCar() {
    cy.location({ timeout: 10000 }).should((location) => {
      expect(location.pathname).to.eq(`/shopping-car`)
    })
  }
}

export const shoppingCarPageObject = new ShoppingCarPageObject()
