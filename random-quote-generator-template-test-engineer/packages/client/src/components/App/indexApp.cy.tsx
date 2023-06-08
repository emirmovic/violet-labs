import { App } from './index'

let characterButtons: string[] = ['dwightButton', 'pamButton', 'michaelButton', 'pamButton'];

beforeEach(() => {
  cy.mount(<App />)
})

describe('App Component Tests:', () => {
  it('the app component renders', () => {
  })

  it('the office image is visible', () => {
    cy.get('img[src="/the-office.svg"]').should('be.visible')
  })

  it('Random Quote button is visible', () => {
    cy.get('[data-cy=randomQuoteButton]').should('be.visible')
  })

  it('all the office characters has buttons visible', () => {
    for (var characterButton of characterButtons) {
      cy.get(`[data-cy=${characterButton}`).should('be.visible')
    }
  })

  it('the office quote should be visible', () => {
    cy.get('[data-cy=characterQuote]').should('be.visible')
  })

  it('the office author should be visible', () => {
    cy.get('[data-cy=authorQuote]').should('be.visible')
  })

  it('the office quote should change after random quote button click', () => {
    cy.wait(100)
    cy.get('[data-cy=characterQuote]').invoke('text').then(text => {
      cy.get('[data-cy=randomQuoteButton]').click()
      cy.wait(100)
      cy.get('[data-cy=characterQuote]').invoke('text').should('not.contain', text)
    })
  })

  it('dwight quotes only!', () => {
    cy.wait(100)
    cy.get('[data-cy=dwightButton]').click()
    cy.get('[data-cy=authorQuote]').invoke('text').should('contain', 'wight')
    for (var i = 0; i < 5; i++) {
      cy.get('[data-cy=randomQuoteButton]').click()
      cy.wait(100)
      cy.get('[data-cy=authorQuote]').invoke('text').should('contain', 'wight')
    }
  })

  it('dwight OR jim quotes only!', () => {
    cy.wait(100)
    cy.get('[data-cy=dwightButton]').click()
    cy.get('[data-cy=jimButton]').click()
    for (var i = 0; i < 5; i++) {
      cy.get('[data-cy=authorQuote]').invoke('text').then(author => {
        cy.get('[data-cy=randomQuoteButton]').click()
        author = author.toLowerCase()
        if (author.toLowerCase() !== 'dwight' && author.toLowerCase() !== 'jim') {
          throw new Error(author.toLowerCase() + " is not part of the selected characters: jim & dwight")
        }
        cy.wait(100)
      })
    }
  })

})