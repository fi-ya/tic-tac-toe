describe('Game', () => {

  beforeEach(()=>{
    cy.visit('/')
  })

  it('should load the homepage successfully', () => {
    cy.get('.App-header > h1').should('have.text', 'Let\'s play Tic Tac Toe!')
    cy.get('section > h1').should('have.text', 'Select game mode')
    cy.get('[name="human_human"]').should('have.text', 'Human vs Human')
    cy.get('[name="computer_human"]').should('have.text', 'Computer vs Human')
  })

 it('should play a human vs human game and quit successfully', () => {
    cy.get('[name="human_human"]').click()
    cy.get('h2').should('have.text', 'Player X turn')
    cy.get('p').should('have.text', 'Click on the square you want to place your move')
    cy.get('.grid-container > :nth-child(1)').should('have.text', '1')
    cy.get('.grid-container > :nth-child(1)').click()
    cy.get('.grid-container > :nth-child(1)').should('have.text', 'X')
    cy.get('h2').should('have.text', 'Player O turn')
    cy.get('.grid-container > :nth-child(2)').should('have.text', '2')
    cy.get('.grid-container > :nth-child(2)').click()
    cy.get('.grid-container > :nth-child(2)').should('have.text', 'O')
    cy.get('h2').should('have.text', 'Player X turn')
    cy.get('.grid-container > :nth-child(5)').should('have.text', '5')
    cy.get('.grid-container > :nth-child(5)').click()
    cy.get('.grid-container > :nth-child(5)').should('have.text', 'X')
    cy.get('h2').should('have.text', 'Player O turn')
    cy.get('.grid-container > :nth-child(6)').should('have.text', '6')
    cy.get('.grid-container > :nth-child(6)').click()
    cy.get('.grid-container > :nth-child(6)').should('have.text', 'O')
    cy.get('h2').should('have.text', 'Player X turn')
    cy.get('.grid-container > :nth-child(9)').should('have.text', '9')
    cy.get('.grid-container > :nth-child(9)').click()
    cy.get('h2').should('have.text', 'Congratulations X won!!!')
    cy.get('.flex-gap > :nth-child(1)').should('have.text', 'Replay')
    cy.get('.flex-gap > :nth-child(2)').should('have.text', 'Quit')
    cy.get('.flex-gap > :nth-child(2)').click()
    cy.get('div > h1').should('have.text','Thank you for playing! Goodbye!')    
  })

  it('should display a error message when invalid move made', ()=>{
    cy.get('[name="human_human"]').click()
    cy.get('h2').should('have.text', 'Player X turn')
    cy.get('p').should('have.text', 'Click on the square you want to place your move')
    cy.get('.grid-container > :nth-child(1)').should('have.text', '1')
    cy.get('.grid-container > :nth-child(1)').click()
    cy.get('.grid-container > :nth-child(1)').should('have.text', 'X')
    cy.get('h2').should('have.text', 'Player O turn')
    cy.get('.grid-container > :nth-child(1)').click()
    cy.get('.padding-sm').should('have.text', 'Invalid move. Try again!')
    cy.get('.grid-container > :nth-child(2)').should('have.text', '2')
    cy.get('.grid-container > :nth-child(2)').click()
    cy.get('.grid-container > :nth-child(2)').should('have.text', 'O')
    cy.get('.App').should('not.contain', '.padding-sm')
  })



})