import { Quote } from './index'
import { IQuote } from '@violet-labs/domain';

const quote: IQuote = {
  quote: "That was beautiful. All her idea too. Awesome. She is so great.",
  character: "jim"
}

beforeEach(() => {
  cy.mount(<Quote data={quote} />)
})

describe('Quote Component Tests:', () => {
  it('Quote component renders', () => {

  })

  it('quote is visible', () => {
    cy.get('[data-cy=characterQuote]').should('be.visible')
  })

  it('quote matches what is passed into Quote component', () => {
    cy.get('[data-cy=characterQuote]').should('contain.have.text','That was beautiful. All her idea too. Awesome. She is so great.')
  })

  it('author is visible', () => {
    cy.get('[data-cy=authorQuote]').should('be.visible')
  })

  it('character matches what is passed into Quote component', () => {
    cy.get('[data-cy=authorQuote]').should('contain.have.text','jim')
  })

})