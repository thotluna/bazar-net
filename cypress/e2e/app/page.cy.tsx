import { KEY_LIKED_PRODUCTS } from '../../../src/modules/liked-products/infrastructure/local-storage-liked-repository'
describe('Page Home', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  describe('should have', () => {
    it('Page title', () => {
      cy.title().should('eq', 'Bazar-Net')
    })
    it('Principal Heading', () => {
      cy.get('h1').should('have.text', 'BAZAR-NET')
    })
    it('Input placeholder', () => {
      cy.get('input').should('have.attr', 'placeholder', 'Search')
    })
    it('Input arial-label', () => {
      cy.get('input').should('have.attr', 'aria-label', 'Search')
    })
    it('Button submit', () => {
      cy.get('button[type="submit"]').children().should('have.attr', 'aria-label', 'submit')
    })
    it('Button Shopping car list', () => {
      cy.get('a[href="/shopping-card"]')
    })
    it('Button Liked list', () => {
      cy.get('a[href="/products-liked"]')
    })
    it('Button profile', () => {
      cy.get('a').last().children().should('have.attr', 'aria-label', 'Go to profile')
    })

    it('Card', () => {
      cy.get('[aria-label="Got to Detail of iPhone 9"]')
      cy.get('[aria-label="Like to iPhone 9"]')
    })
  })
  describe('should navigate', () => {
    it('to products found', () => {
      cy.get('input').type('searching-thing')
      cy.get('button[type="submit"]').click()
      cy.url({ timeout: 10000 }).should('include', '/products?q=searching-thing')
    })
    it('to products details', () => {
      cy.get('a article').first().click()
      cy.url({ timeout: 10000 }).should('include', '/products/1')
    })
    it('to Shopping card', () => {
      cy.get('a[href="/shopping-card"]').click()
      cy.url({ timeout: 10000 }).should('include', '/shopping-card')
    })
    it('to Shopping card', () => {
      cy.get('a[href="/products-liked"]').click()
      cy.url({ timeout: 10000 }).should('include', '/products-liked')
    })
    it('to like a product', () => {
      cy.get('button > svg[aria-label="Like to iPhone 9"]').parent().click()
      cy.get('button > svg[aria-label="Like to iPhone 9"]')
        .parent()
        .should('have.class', 'border-[var(--color-button-circle-border-active)]')
    })
  })
  describe('LikedProducts', () => {
    it('should save localStorage when click in LikeButton', () => {
      cy.clearLocalStorage(KEY_LIKED_PRODUCTS)
      cy.get('button > svg[aria-label="Like to iPhone 9"]')
        .parent()
        .click()
        .then(() => {
          expect(localStorage.getItem(KEY_LIKED_PRODUCTS)).to.equal('[1]')
        })
      cy.get('[href="/products-liked"] span').should('have.text', '1')
    })
  })
})
