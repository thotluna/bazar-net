class HomePageObject {
  elements = {
    search: () => cy.get('input[aria-label="Search input"]'),

    submitSearch: () => cy.get('button[type="submit"]'),

    card: (position: number) => cy.get(`[href^="/products/"]`).eq(position),

    likeCard: (position: number) => cy.get(`svg[aria-label^="Like to"]`).eq(position)
  }

  go() {
    cy.intercept('/').as('goHome')
    cy.visit('/')
    cy.wait('@goHome')
  }
  typeSearch(worlds: string) {
    this.elements.search().type(worlds)
  }
  searchProducts() {
    this.elements.submitSearch().wait(500).click()
  }
  searchProductsWith(query: string) {
    cy.intercept('/products?q=*').as('search')
    this.typeSearch(query)
    this.searchProducts()
    cy.wait('@search')
  }
  goToDetailProduct(position: number) {
    cy.intercept('/products/*').as('productId')
    this.elements.card(position).click()
    cy.wait('@productId')
  }
  clickLikeProduct(position: number) {
    // cy.intercept('/api/items/group?id=?').as('groupId')
    this.elements.likeCard(position).click()
    // cy.wait('@groupId')
  }

  isInHome() {
    cy.location().should((location) => {
      expect(location.pathname).to.eq(`/`)
    })
  }
}

export const homePageObject = new HomePageObject()
