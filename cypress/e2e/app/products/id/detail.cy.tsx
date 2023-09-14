import { KEY_SHOPPING_CAR } from '../../../../../src/modules/shopping-car/infrastructure/local-storage-shopping-car'

describe('Result search products', () => {
  beforeEach(() => {
    cy.visit('/products/1')
  })

  it('should navigate to the detail page', () => {
    cy.location().should((location) => {
      expect(location.hash).to.be.empty
      // expect(location.host).to.eq('example.cypress.io')
      // expect(location.hostname).to.eq('example.cypress.io')
      expect(location.origin).to.eq('http://127.0.0.1:3000')
      expect(location.pathname).to.eq('/products/1')
      expect(location.port).to.eq('3000')
      // expect(location.protocol).to.eq('https:')
      expect(location.search).to.be.empty
    })
  })
  describe('carrousel component', () => {
    it('should render images next in preview', () => {
      cy.get('img[alt="iPhone 9"').should('have.attr', 'src', 'https://i.dummyjson.com/data/products/1/1.jpg')
      cy.get('img[alt^="Image #0"]').parent().should('have.class', 'border-[var(--color-carrousel-border)]')

      cy.get('[aria-label="next image"]').parent().wait(500).should('be.visible').click()

      cy.get('img[alt="iPhone 9"').should('have.attr', 'src', 'https://i.dummyjson.com/data/products/1/2.jpg')
      cy.get('img[alt^="Image #0"]').parent().should('have.class', 'border-transparent')
      cy.get('img[alt^="Image #1"]').parent().should('have.class', 'border-[var(--color-carrousel-border)]')
    })
    it('should render images back in preview', () => {
      cy.get('img[alt="iPhone 9"').should('have.attr', 'src', 'https://i.dummyjson.com/data/products/1/1.jpg')
      cy.get('img[alt^="Image #0"]').parent().should('have.class', 'border-[var(--color-carrousel-border)]')

      cy.get('button [aria-label="back image"]').wait(500).should('be.visible').click()
      cy.get('img[alt^="Image #0"]').parent().should('have.class', 'border-transparent')
      cy.get('img[alt^="Image #4"]').parent().should('have.class', 'border-[var(--color-carrousel-border)]')
    })
    it('should render images clicked in preview', () => {
      cy.get('img[alt="iPhone 9"').should('have.attr', 'src', 'https://i.dummyjson.com/data/products/1/1.jpg')
      cy.get('img[alt^="Image #0"]').parent().should('have.class', 'border-[var(--color-carrousel-border)]')

      cy.get('img[alt^="Image #4"]').wait(500).should('be.visible').click()
      cy.get('img[alt="iPhone 9"').should('have.attr', 'src', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg')
      cy.get('img[alt^="Image #0"]').parent().should('have.class', 'border-transparent')
      cy.get('img[alt^="Image #4"]').parent().should('have.class', 'border-[var(--color-carrousel-border)]')
    })
    it('should render fir image after click next button', () => {
      cy.get('img[alt^="Image #4"]').wait(500).should('be.visible').click()
      cy.get('img[alt="iPhone 9"').should('have.attr', 'src', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg')
      cy.get('img[alt^="Image #4"]').parent().should('have.class', 'border-[var(--color-carrousel-border)]')

      cy.get('[aria-label="next image"]').parent().wait(500).should('be.visible').click()

      cy.get('img[alt^="Image #4"]').parent().should('have.class', 'border-transparent')

      cy.get('img[alt^="Image #0"]').parent().should('have.class', 'border-[var(--color-carrousel-border)]')

      cy.get('img[alt="iPhone 9"').should('have.attr', 'src', 'https://i.dummyjson.com/data/products/1/1.jpg')
    })
    describe('shopping button component', () => {
      it('should render component', () => {
        cy.contains('Product in shopping card:')
        cy.contains('0 und')
      })
      it('should add one product', () => {
        cy.contains('Product in shopping card:')
        cy.contains('0 und')
        cy.get('button [aria-label="add product"]').wait(500).should('be.visible').click()
        cy.contains('1 und')
      })
      it('should decrement one product', () => {
        cy.contains('Product in shopping card:')
        cy.contains('0 und')
        cy.get('button [aria-label="add product"]').wait(500).should('be.visible').click()
        cy.contains('1 und')
        cy.get('button [aria-label="subtract product"]').wait(500).should('be.visible').click()
        cy.contains('0 und')
      })
      it('should not decrement one product after 0', () => {
        cy.contains('Product in shopping card:')
        cy.contains('0 und')
        cy.get('button [aria-label="subtract product"]').wait(500).should('be.visible').click()
        cy.contains('0 und')
      })
      it.skip('should not add one product after the stock', () => {
        cy.contains('Product in shopping card:')
        cy.contains('0 und')
        let count = 0
        const stock = 94
        do {
          cy.get('button [aria-label="subtract product"]').wait(500).should('be.visible').click()
          const text = count <= 94 ? `${count} und` : `${stock} und`
          cy.contains(text)
          count++
        } while (count <= stock + 1)
      })
      it('should persist in Local Storage', () => {
        localStorage.clear()
        cy.contains('Product in shopping card:')
        cy.contains('0 und')
        cy.get('button [aria-label="add product"]').wait(500).should('be.visible').click()
        cy.contains('1 und')
        cy.location().should(() => {
          expect(localStorage.getItem(KEY_SHOPPING_CAR)).to.equal('{"1":1}')
        })
      })
    })
  })
})
