class SearchProductsPageObject {
  elements = {
    cards: () => cy.get(`[href^="/products/"]`),
    dontHaveProductMessage: () => cy.contains('Do not have product'),
    buttonReturn: () => cy.get('button[name="Return"]')
  }

  isInSearchProducts(query?: string) {
    cy.location().should((location) => {
      expect(location.pathname).to.eq(`/products`)
      if (query) {
        expect(location.search).to.eq(`?q=${query}`)
      }
    })
  }
}

export const searchProductsPageObject = new SearchProductsPageObject()
