class ButtonShoppingPageObject {
  elements = {
    quantityProducts: () => cy.get('[data-cy="quantity-products"] div span:nth-child(2)'),
    buttonAddProduct: () => cy.get('[data-cy="quantity-products"] div button:nth-child(3)'),
    buttonSubProducts: () => cy.get('[data-cy="quantity-products"] div button:nth-child(1)')
  }

  expectHaveProducts(quantity: number) {
    this.elements.quantityProducts().should('have.text', `${quantity} und`)
  }

  addProducts() {
    this.elements.buttonAddProduct().click().wait(500)
  }

  subProducts() {
    this.elements.buttonSubProducts().click().wait(500)
  }
}

export const buttonShoppingPageObject = new ButtonShoppingPageObject()
