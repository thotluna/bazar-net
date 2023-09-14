class HomePageObject {
  elements = {
    search: () => cy.get('input[aria-label="Search input"]'),
    submitSearch: () => cy.get('button[type="submit"]'),
    card: (id: number) => cy.get(`[href$="/products/${id}"]`),
    likeCard: (id: number) => cy.get(`a[href$="/products/${id}"] svg[aria-label^="Like to"]`).parent(),
    buttonLikedProducts: () => cy.get('a[href^="/products-liked"]'),
    badgeLikedProducts: () => this.elements.buttonLikedProducts().get('span'),
    buttonShoppingCar: () => cy.get('a[href^="/shopping-car"]'),
    badgeShoppingCar: () => this.elements.buttonShoppingCar().get('span')
  }

  go() {
    cy.visit('/')
  }
  typeSearch(worlds: string) {
    this.elements.search().type(worlds)
  }
  searchProducts() {
    this.elements.submitSearch().wait(500).click()
  }
  searchProductsWith(query: string) {
    this.typeSearch(query)
    this.searchProducts()
  }
  goToDetailProduct(id: number) {
    this.elements.card(id).click()
  }
  clickLikeProduct(id: number) {
    this.elements.likeCard(id).click()
  }
  goToLikedProducts() {
    this.elements.buttonLikedProducts().wait(500).click()
  }
  goToShoppingCar() {
    this.elements.buttonShoppingCar().click()
  }
  isInHome() {
    cy.location().should((location) => {
      expect(location.pathname).to.eq(`/`)
    })
  }
}

export const homePageObject = new HomePageObject()
