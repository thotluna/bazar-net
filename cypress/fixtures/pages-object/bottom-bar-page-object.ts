class BottomBarPageObject {
  elements = {
    buttonHome: () => cy.get('footer:nth-child(1) a'),
    buttonShoppingCar: () => cy.get('a[href^="/shopping-car"]'),
    badgeShoppingCar: () => cy.get('[aria-label="Go shopping car"] ~ span '),
    buttonLikedProducts: () => cy.get('[aria-label="Go to Likes products list"]').parent(),
    badgeLikedProduct: () => cy.get('[aria-label="Go to Likes products list"] ~ span ')
  }

  goToHome() {
    this.elements.buttonHome().click()
  }

  goToShoppingCar() {
    cy.intercept('/shopping-car?car=*').as('shopping-car')
    this.elements.buttonShoppingCar().click()
    cy.wait('@shopping-car')
  }

  goToLikedProducts() {
    cy.intercept('/products-liked?*').as('products-liked')
    this.elements.buttonLikedProducts().click()
    cy.wait('@products-liked')
  }

  expectThatShoppingCarHave(quantity: number) {
    this.elements.badgeShoppingCar().should('have.html', `${quantity}`)
  }

  expectThatLikedProductsHave(quantity: number) {
    this.elements.badgeLikedProduct().should('have.html', `${quantity}`)
  }
}

export const bottomBarPageObject = new BottomBarPageObject()
