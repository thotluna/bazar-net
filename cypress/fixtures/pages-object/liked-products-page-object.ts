class LikedProductsPageObject {
  elements = {
    cards: () => cy.get(`[href^="/products/"]`),
    buttonDelete: () => cy.get('button [aria-label="Delete all liked product"]').parent(),
    card: (id: number) => cy.get(`a[href$="/products/${id}"]`),
    likeCard: (id: number) => this.elements.card(id).get('svg[aria-label^="Like to"]').parent()
  }

  isInLikedProducts() {
    cy.location().should((location) => {
      expect(location.pathname).to.eq(`/products-liked`)
    })
  }

  card(position: number) {
    this.elements.cards().eq(position)
  }

  deleteAllLike() {
    this.elements.buttonDelete().click()
  }
}

export const likedProductsPageObject = new LikedProductsPageObject()
