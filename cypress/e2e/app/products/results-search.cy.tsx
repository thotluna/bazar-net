import { homePageObject } from '../../../fixtures/pages-object/home-page-object'
import { searchProductsPageObject } from '../../../fixtures/pages-object/search-products-page-object'

describe('Result search products', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('should search products', () => {
    const query = 'laptop'
    homePageObject.searchProductsWith(query)
    searchProductsPageObject.isInSearchProducts(query)
    searchProductsPageObject.elements.cards().should('be.visible').should('have.length', 3)
  })
  it('should search products do not exist', () => {
    const query = 'asdasdasdsd'
    homePageObject.searchProductsWith(query)
    searchProductsPageObject.isInSearchProducts(query)
    searchProductsPageObject.elements.dontHaveProductMessage().should('be.visible')
    searchProductsPageObject.elements.buttonReturn().should('be.visible')
  })

  it('should return ', () => {
    const query = 'asdasdasdsd'
    homePageObject.searchProductsWith(query)
    searchProductsPageObject.isInSearchProducts(query)
    searchProductsPageObject.elements.buttonReturn().click()
    homePageObject.isInHome()
  })
})
