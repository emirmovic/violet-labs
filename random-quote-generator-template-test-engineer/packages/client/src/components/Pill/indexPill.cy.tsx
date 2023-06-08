import { Pill } from './index'

describe('Pill Component Tests:', () =>  {
  it('renders', () => {
    cy.mount(<Pill myKey="key" value="jim"/>)
  })

  it('value passed in for selected property (false) should match for Pill', () => {
    cy.mount(<Pill myKey="key" value="jim" selected={false}/>)
    cy.get("[data-cy=jimButton]").invoke('attr', 'class').should('contain', 'bg-slate-400')
  })

  it('value passed in for selected property (true) should match for Pill', () => {
    cy.wait(100)
    cy.mount(<Pill myKey="key" value="jim" selected={true}/>)
    cy.get("[data-cy=jimButton]").invoke('attr', 'class').should('contain', 'bg-green-400')
  })

  it('Pill passed in should match text for Pill', () => {
    cy.mount(<Pill myKey="key" value="jim"/>)
    cy.get("[data-cy=jimButton]").should('contain.text', "jim")
  })

  it('clicking Pill should call handleClick() with correct value', () => {
    const handleClick = cy.stub();
    cy.mount(<Pill myKey="key" value="jim" handleClick={handleClick} selected={false}/>)
    cy.get("[data-cy=jimButton]").click()
    cy.wrap(handleClick).should('be.calledWith', "jim");
  })
  
})
