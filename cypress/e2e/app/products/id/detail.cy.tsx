import { bottomBarPageObject } from '../../../../fixtures/pages-object/bottom-bar-page-object'
import { buttonShoppingPageObject } from '../../../../fixtures/pages-object/button-shopping-page-object'
import { detailsPageObject } from '../../../../fixtures/pages-object/detail-page-object'

describe('Detail Product', () => {
  beforeEach(() => {
    detailsPageObject.goToDetailProduct(1)
  })

  it('should navigate to the detail page', () => {
    detailsPageObject.isInProductDetails(1)
  })
  describe('carrousel component', () => {
    it('should render images next in preview', () => {
      detailsPageObject.nextImage()
      detailsPageObject.expectThatImagePrincipalHave('https://i.dummyjson.com/data/products/1/2.jpg')
      detailsPageObject.expectThaHaveBorderTheImageCarrousel(2)
    })
    it('should render images back in preview', () => {
      detailsPageObject.backImage()
      detailsPageObject.expectThatImagePrincipalHave('https://i.dummyjson.com/data/products/1/thumbnail.jpg')
      detailsPageObject.expectThaHaveBorderTheImageCarrousel(5)
    })
    it('should render images clicked in preview', () => {
      detailsPageObject.clickedTheImageCarrousel(2)
      detailsPageObject.expectThatImagePrincipalHave('https://i.dummyjson.com/data/products/1/2.jpg')
      detailsPageObject.expectThaHaveBorderTheImageCarrousel(2)
    })
    it('should render fir image after click next button', () => {
      detailsPageObject.clickedTheImageCarrousel(5)
      detailsPageObject.expectThatImagePrincipalHave('https://i.dummyjson.com/data/products/1/thumbnail.jpg')
      detailsPageObject.nextImage()
      detailsPageObject.expectThatImagePrincipalHave('https://i.dummyjson.com/data/products/1/1.jpg')
      detailsPageObject.expectThaHaveBorderTheImageCarrousel(1)
    })
    describe('shopping button component', () => {
      it('should add products to shopping car', () => {
        buttonShoppingPageObject.addProducts()
        buttonShoppingPageObject.addProducts()
        buttonShoppingPageObject.addProducts()
        buttonShoppingPageObject.expectHaveProducts(3)
        bottomBarPageObject.expectThatShoppingCarHave(3)
      })
      it('should decrement one product', () => {
        buttonShoppingPageObject.addProducts()
        buttonShoppingPageObject.subProducts()
        buttonShoppingPageObject.expectHaveProducts(0)
      })
      it('should not decrement one product after 0', () => {
        buttonShoppingPageObject.subProducts()
        buttonShoppingPageObject.expectHaveProducts(0)
      })
      it('should persist in Local Storage', () => {
        localStorage.clear()
        buttonShoppingPageObject.addProducts()
        detailsPageObject.expectThatLocalStorageHave(1)
      })
    })
  })
})
