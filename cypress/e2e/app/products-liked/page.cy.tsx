import { bottomBarPageObject } from '../../../fixtures/pages-object/bottom-bar-page-object'
import { homePageObject } from '../../../fixtures/pages-object/home-page-object'
import { likedProductsPageObject } from '../../../fixtures/pages-object/liked-products-page-object'

describe('Liked Products list', () => {
  beforeEach(() => {
    homePageObject.go()
    homePageObject.clickLikeProduct(1)
    homePageObject.clickLikeProduct(2)
    homePageObject.clickLikeProduct(3)
    bottomBarPageObject.goToLikedProducts()
  })
  it('should render 3 card', () => {
    likedProductsPageObject.elements.cards().should('have.length', 3)
  })
  it('should remove 1 card', () => {
    homePageObject.clickLikeProduct(1)
    likedProductsPageObject.elements.cards().should('have.length', 2)
  })
  it('should remove all card', () => {
    likedProductsPageObject.deleteAllLike()
    homePageObject.isInHome()
  })
})
