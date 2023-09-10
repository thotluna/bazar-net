describe('Liked Products list', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[aria-label="Like to iPhone 9"]').parent().click()
    cy.get('[aria-label="Like to iPhone X"]').parent().click()

    cy.get('[aria-label="Go to Likes products list"]').parent().click()
  })
  it('should render 2 card', () => {
    cy.get('a article').should('have.length', 2)
  })
  it('should remove 1 card', () => {
    cy.get('[aria-label="Like to iPhone 9"]').click()
    cy.get('a article').should('have.length', 1)
  })
  it.only('should remove all card', () => {
    cy.get('[aria-label="Delete all liked product"]').click()
    cy.url().should('eq', 'http://127.0.0.1:3000/')
  })
})
