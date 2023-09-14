class DetailPageObject {
  elements = {
    rating: () => cy.get('span[aria-label^="rating:"]'),
    imagePrincipal: () => cy.get('figure img'),
    imageCarrousel: (position: number) =>
      cy
        .get('button img[alt^="Image #"]')
        .parent()
        .eq(position - 1),
    buttonNextImageCarrousel: () => cy.get('[aria-label="next image"]'),
    buttonBackImageCarrousel: () => cy.get('[aria-label="back image"]'),
    title: () => cy.get('h1'),
    description: () => cy.get('p'),
    total: () => cy.get('span[aria-label="total"]'),
    likeButton: () => cy.get('[aria-label="Like this product"]').parent(),

    buttonSubtractProduct: () => cy.get('[aria-label="subtract product"]').parent(),
    buttonAddProduct: () => cy.get('[aria-label="add product"]').parent(),
    homeLink: () => cy.get('a[href:"/"]')
  }

  nextImage() {
    this.elements.buttonNextImageCarrousel().wait(500).click()
  }

  backImage() {
    this.elements.buttonBackImageCarrousel().wait(500).click()
  }

  addElement() {
    this.elements.buttonAddProduct().click()
  }
  subElement() {
    this.elements.buttonSubtractProduct().click()
  }

  goToDetailProduct(id: number) {
    cy.visit(`/products/${id}`)
  }

  isInProductDetails(id: number) {
    cy.location().should((location) => {
      expect(location.pathname).to.eq(`/products/${id}`)
    })
  }
}

export const detailsPageObject = new DetailPageObject()
