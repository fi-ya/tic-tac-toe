describe('Game', () => {
  it('loads the homepage', () => {
    cy.visit('/')
    cy.get('.App-header > h1').should('have.text', 'Let\'s play Tic Tac Toe!')
    cy.get('section > h1').should('have.text', 'Select game mode')
    cy.get('[name="human_human"]').should('have.text', 'Human vs Human')
    cy.get('[name="computer_human"]').should('have.text', 'Computer vs Human')
  })

 it('loads a human vs human game', () => {
    cy.visit('/')
    cy.get('[name="human_human"]').click()
    cy.get('h2').should('have.text', 'Player X turn')
    cy.get('p').should('have.text', 'Click on the square you want to place your move')
  })



})