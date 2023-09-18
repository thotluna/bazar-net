import { KEY_SHOPPING_CAR } from '../../../src/modules/shopping-car'

class DetailPageObject {
  elements = {
    rating: () => cy.get('span[aria-label^="rating:"]'),
    imagePrincipal: () => cy.get('figure img'),
    imageCarrousel: (position: number) =>
      cy
        .get('button img[alt^="Image #"]')
        .parent()
        .eq(position - 1),
    buttonNextImageCarrousel: () => cy.get('[aria-label="next image"]').parent(),
    buttonBackImageCarrousel: () => cy.get('[aria-label="back image"]').parent(),
    title: () => cy.get('h1'),
    description: () => cy.get('p'),
    total: () => cy.get('span[aria-label="total"]'),
    likeButton: () => cy.get('[aria-label="Like this product"]').parent(),

    homeLink: () => cy.get('a[href:"/"]')
  }

  nextImage() {
    this.elements.buttonNextImageCarrousel().wait(500).click()
  }

  backImage() {
    this.elements.buttonBackImageCarrousel().wait(500).click()
  }

  goToDetailProduct(id: number) {
    cy.visit(`/products/${id}`)
  }

  clickedTheImageCarrousel(position: number) {
    detailsPageObject.elements.imageCarrousel(position).wait(1000).click()
  }

  expectThaHaveBorderTheImageCarrousel(position: number) {
    this.elements.imageCarrousel(position).should('have.class', 'border-[var(--color-carrousel-border)]')
  }

  expectThatLocalStorageHave(quantity: number) {
    cy.location().should(() => {
      expect(localStorage.getItem(KEY_SHOPPING_CAR)).to.equal(`{"1":${quantity}}`)
    })
  }

  expectThatImagePrincipalHave(src: string) {
    this.elements.imagePrincipal().should('have.attr', 'src', src)
  }

  isInProductDetails(id: number) {
    cy.location().should((location) => {
      expect(location.pathname).to.eq(`/products/${id}`)
    })
  }
}

export const detailsPageObject = new DetailPageObject()
