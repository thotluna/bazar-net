describe('Result search products', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('should search products', () => {
    cy.get('[aria-label="Search input"]').type('iphone')
    cy.get('[aria-label="submit"').click()
    cy.get('a article').should('have.length', '2')
  })
  it('should not return products', () => {
    cy.get('[aria-label="Search input"]').type('other')
    cy.get('[aria-label="submit"').click()
    cy.get('a article').should('have.length', '0')
  })
  it('should return ', () => {
    cy.get('[aria-label="Search input"]').type('other')
    cy.get('[aria-label="submit"').click()
    cy.contains('Return').click()
    cy.location().should((location) => {
      expect(location.hash).to.be.empty
      // expect(location.host).to.eq('example.cypress.io')
      // expect(location.hostname).to.eq('example.cypress.io')
      expect(location.origin).to.eq('http://127.0.0.1:3000')
      // expect(location.pathname).to.eq('/commands/location')
      expect(location.port).to.eq('3000')
      // expect(location.protocol).to.eq('https:')
      // expect(location.search).to.be.empty
    })
  })
})
