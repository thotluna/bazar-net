import { KEY_SHOPPING_CAR } from '../../../../../src/modules/shopping-car/infrastructure/local-storage-shopping-car'
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
      detailsPageObject.elements.imagePrincipal().should('be.visible')

      detailsPageObject.nextImage()

      detailsPageObject.elements
        .imagePrincipal()
        .should('have.attr', 'src', 'https://i.dummyjson.com/data/products/1/2.jpg')
      detailsPageObject.elements.imageCarrousel(1).should('have.class', 'border-transparent')
      detailsPageObject.elements.imageCarrousel(2).should('have.class', 'border-[var(--color-carrousel-border)]')
    })
    it('should render images back in preview', () => {
      detailsPageObject.backImage()
      detailsPageObject.elements
        .imagePrincipal()
        .should('have.attr', 'src', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg')
      detailsPageObject.elements.imageCarrousel(5).should('have.class', 'border-[var(--color-carrousel-border)]')
    })
    it('should render images clicked in preview', () => {
      detailsPageObject.elements.imageCarrousel(2).click()
      detailsPageObject.elements
        .imagePrincipal()
        .should('have.attr', 'src', 'https://i.dummyjson.com/data/products/1/2.jpg')
      detailsPageObject.elements.imageCarrousel(2).should('have.class', 'border-[var(--color-carrousel-border)]')
    })
    it('should render fir image after click next button', () => {
      detailsPageObject.elements.imageCarrousel(5).click()
      detailsPageObject.elements
        .imagePrincipal()
        .should('have.attr', 'src', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg')
      detailsPageObject.nextImage()
      detailsPageObject.elements
        .imagePrincipal()
        .should('have.attr', 'src', 'https://i.dummyjson.com/data/products/1/1.jpg')
      detailsPageObject.elements.imageCarrousel(1).should('have.class', 'border-[var(--color-carrousel-border)]')
    })
    describe('shopping button component', () => {
      it('should add one product', () => {
        cy.contains('0 und')
        detailsPageObject.addElement()
        cy.contains('1 und')
      })
      it('should decrement one product', () => {
        cy.contains('0 und')
        detailsPageObject.addElement()
        cy.contains('1 und')
        detailsPageObject.subElement()
        cy.contains('0 und')
      })
      it('should not decrement one product after 0', () => {
        cy.contains('0 und')
        detailsPageObject.subElement()
        cy.contains('0 und')
      })
      it('should persist in Local Storage', () => {
        localStorage.clear()
        cy.contains('0 und')
        detailsPageObject.addElement()
        cy.contains('1 und')
        cy.location().should(() => {
          expect(localStorage.getItem(KEY_SHOPPING_CAR)).to.equal('{"1":1}')
        })
      })
    })
  })
})
