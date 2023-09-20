import { bottomBarPageObject } from '../../fixtures/pages-object/bottom-bar-page-object'
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
      const position = 1
      homePageObject.goToDetailProduct(position)
      detailsPageObject.isInProductDetails(position + 1)
    })
    it('to Shopping car', () => {
      bottomBarPageObject.goToShoppingCar()
      shoppingCarPageObject.isInShoppingCar()
    })
    it('to Liked product', () => {
      bottomBarPageObject.goToLikedProducts()
      likedProductsPageObject.isInLikedProducts()
    })
  })

  it('should increment products like', () => {
    homePageObject.clickLikeProduct(1)
    homePageObject.clickLikeProduct(2)
    homePageObject.clickLikeProduct(3)
    bottomBarPageObject.expectThatLikedProductsHave(3)
  })
})
