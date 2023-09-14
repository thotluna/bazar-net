import { detailsPageObject } from '../../fixtures/pages-object/detail-page-object'
import { homePageObject } from '../../fixtures/pages-object/home-page-object'
import { likedProductsPageObject } from '../../fixtures/pages-object/liked-products-page-object'
import { searchProductsPageObject } from '../../fixtures/pages-object/search-products-page-object'
import { shoppingCarPageObject } from '../../fixtures/pages-object/shopping-car-page-object'
describe('Page Home', () => {
  beforeEach(() => {
    homePageObject.go()
  })
  describe('should have', () => {
    it('Page title', () => {
      cy.title().should('eq', 'Bazar-Net')
    })
    it('Principal Heading', () => {
      cy.get('header h2').should('have.text', 'BAZAR-NET')
    })
    it('Input placeholder', () => {
      homePageObject.elements.search().should('have.attr', 'placeholder', 'Search')
    })
    it('Input arial-label', () => {
      homePageObject.elements.search().should('be.visible')
    })
    it('Button submit', () => {
      homePageObject.elements.submitSearch().should('be.visible')
    })
    it('Button Shopping car list', () => {
      homePageObject.elements.buttonShoppingCar().should('be.visible')
    })
    it('Button Liked list', () => {
      homePageObject.elements.buttonLikedProducts().should('be.visible')
    })
    it('Button profile', () => {
      cy.get('a').last().children().should('have.attr', 'aria-label', 'Go to profile')
    })
    it('Cards of products', () => {
      homePageObject.elements.card(1).should('be.visible')
    })
  })
  describe('should navigate', () => {
    it('to search results ', () => {
      const query = 'laptop'
      homePageObject.searchProductsWith(query)
      searchProductsPageObject.isInSearchProducts(query)
    })
    it('should search with search input empty or blank', () => {
      homePageObject.searchProducts()
      homePageObject.isInHome()
    })
    it('to products details', () => {
      const id = 1
      homePageObject.goToDetailProduct(id)
      detailsPageObject.isInProductDetails(id)
    })
    it('to Shopping car', () => {
      homePageObject.goToShoppingCar()
      shoppingCarPageObject.isInShoppingCar()
    })
    it('to Liked product', () => {
      homePageObject.goToLikedProducts()
      likedProductsPageObject.isInLikedProducts()
    })
  })
})
