describe('the office random quote generator e2e:', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/');
  })

  // must expose network via command "yarn start:client --host"
  it('can reach site', () => {

  })

  it('displays random quote on button click', () => {
    // "spy" on API call to fetch quote
    cy.intercept('GET', '**/quote**').as('fetchQuote')
    cy.get('[data-cy=randomQuoteButton]').click()
    cy.wait('@fetchQuote').its('response.body').should('have.property', 'quote').and('have.length.at.least', 1)
  })

  it('all character buttons are selectable & unselectable', () => {
    cy.get('.flex.flex-row.justify-center').children('button').each(($character) => {
      cy.wrap($character).invoke('attr', 'class').should('contain', 'bg-slate-400')
      cy.wrap($character).click()
      cy.wrap($character).invoke('attr', 'class').should('contain', 'bg-green-400')
      cy.wrap($character).click()
      cy.wrap($character).invoke('attr', 'class').should('contain', 'bg-slate-400')
    })
  })

  it('only quotes from one character should be fetched if only one character is selected', () => {
    cy.get('.flex.flex-row.justify-center').children('button').first().click();

    // clicking a character button generates a quote from them right away
    cy.get('[data-cy="authorQuote"]').invoke('text').then((initialCharacter) => {
      for (let i = 0; i < 5; i++) {
        cy.get('[data-cy="randomQuoteButton"]').click();
        cy.get('[data-cy="authorQuote"]').should('contain', initialCharacter.slice(1));
      }
    });
  })

  it('test selecting 2 characters then unselecting one - test unselected one no longer generates quotes', () => {
    cy.get('.flex.flex-row.justify-center').children('button').eq(0).click();
    cy.get('.flex.flex-row.justify-center').children('button').eq(1).click();
    cy.get('.flex.flex-row.justify-center').children('button').eq(1).click();
    cy.intercept('GET', '**/quote**').as('fetchQuote')

    cy.get('[data-cy="authorQuote"]').invoke('text').then((initialCharacter) => {
      for (let i = 0; i < 5; i++) {
        cy.get('[data-cy="randomQuoteButton"]').click();
        cy.wait('@fetchQuote').its('response.body').should('have.property', 'character').and('contain', initialCharacter.slice(1))
      }
    });
  })

})