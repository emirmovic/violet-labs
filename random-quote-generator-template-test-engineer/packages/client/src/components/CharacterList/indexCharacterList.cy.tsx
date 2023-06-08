import { CharacterList } from './index'

const characterList = ["jim", "dwight", "pam", "violet"]

beforeEach(() => {
  const handleChange = cy.stub()
  cy.mount(<CharacterList data={characterList} handleChange={handleChange}/>)
})

describe('CharacterList Component Tests:', () => {
  it('CharacterList component renders', () => {

  })

  it('renders all values in data as Pills', () => {
    cy.get('.flex.flex-row.justify-center').children('button').each(($character, index) => {
      cy.wrap($character).should('have.text', characterList[index])
    })
  })

  // some overlap here with Pill component test with changing CSS but still good to test within the character list
  // i was not able to figure out how to grab and test changing selectedCharacters states but ensuring the CSS changes is decent
  it('clicking Pills changes selected css', () => {
    cy.get('.flex.flex-row.justify-center').children('button').each(($character, index) => {
      cy.wrap($character).invoke('attr', 'class').should('contain', 'bg-slate-400')
      cy.wrap($character).click()
      cy.wrap($character).invoke('attr', 'class').should('contain', 'bg-green-400')
    })
  })
  
})