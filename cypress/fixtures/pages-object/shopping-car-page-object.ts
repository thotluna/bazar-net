class ShoppingCarPageObject {
  isInShoppingCar() {
    cy.location().should((location) => {
      expect(location.pathname).to.eq(`/shopping-car`)
    })
  }
}

export const shoppingCarPageObject = new ShoppingCarPageObject()
