describe('Game', () => {

  beforeEach(()=>{
    cy.visit('/')
  })
  
  xit('should load the homepage successfully', () => {
    cy.get('.App-header > h1').should('have.text', 'Let\'s play Tic Tac Toe!')
    cy.get('.game-mode-container > :nth-child(1)').should('have.text', 'How to play')
    cy.get('p').should('have.text', 'First pick who you would like to play against, another human or a computer. Each player take turns in placing their marker on the board with `X` playing first. The first player to get 3 of their marks in a row (up, down, across, or diagonally) is the winner. When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game ends in a tie.')
    cy.get('.game-mode-container > :nth-child(3)').should('have.text', 'Select game mode')
    cy.get('[name="human_human"]').should('have.text', 'Human vs Human')
    cy.get('[name="computer_human"]').should('have.text', 'Computer vs Human')
    cy.get('#game-mode-options>button').its('length').should('be.eq', 2)
    cy.intercept('GET', '/start-game/1', { fixture: 'human_human_game' }).as('getHumanVsHumanGame') 

    cy.get('[name="human_human"]').click()
  })

  it('should display a error message when invalid move made', ()=>{
    cy.intercept('GET', '/start-game/1', { fixture: 'human_human_game' }).as('getHumanVsHumanGame') 

    cy.get('[name="human_human"]').click()
    cy.get('h2').should('have.text', 'Player X turn')
    cy.get('p').should('have.text', 'Click on the square you want to place your move')
    cy.get('.grid-container > :nth-child(1)').should('have.text', '1')

    cy.intercept('PUT', '/start-game/grid', {fixture : 'winHumanVsHumanGame/staticResponseOne'}).as('putMoveAtOne') 

    cy.get('.grid-container > :nth-child(1)').click()
    cy.wait('@putMoveAtOne')
  
    cy.get('.grid-container > :nth-child(1)').should('have.text', 'X')
    cy.get('h2').should('have.text', 'Player O turn') 
    
    cy.intercept('PUT', '/start-game/grid', {fixture : 'invalidStaticResponseTwo'}).as('putMoveAtTwo') 

    cy.get('.grid-container > :nth-child(1)').click()
    cy.wait('@putMoveAtTwo')

    cy.get('.padding-sm').should('have.text', 'Invalid move. Try again!')
    cy.get('.grid-container > :nth-child(2)').should('have.text', '2')
    
    cy.intercept('PUT', '/start-game/grid', {fixture : 'winHumanVsHumanGame/staticResponseTwo'}).as('putMoveAtTwo') 

    cy.get('.grid-container > :nth-child(2)').click()
    cy.wait('@putMoveAtTwo')

    cy.get('.grid-container > :nth-child(2)').should('have.text', 'O')
    cy.get('h2').should('have.text', 'Player X turn')
    cy.get('.App').should('not.contain', '.padding-sm')
  })

  xit('should play a human vs human game and quit successfully', () => {
    cy.intercept('GET', '/start-game/1', { fixture: 'human_human_game' }).as('getHumanVsHumanGame') 

    cy.get('[name="human_human"]').click()
    cy.get('h2').should('have.text', 'Player X turn')
    cy.get('p').should('have.text', 'Click on the square you want to place your move')
    playWinningHumanVsHumanGame()
    cy.get('h2').should('have.text', 'Congratulations X won!!!')
    cy.get('.flex-gap > :nth-child(1)').should('have.text', 'Replay')
    cy.get('.flex-gap > :nth-child(2)').should('have.text', 'Quit')
    cy.get('.flex-gap > :nth-child(2)').click()
    cy.get('div > h1').should('have.text','Thank you for playing! Goodbye!')    
  })

  xit('should play computer vs human game and quit successfully', ()=>{
 
    cy.intercept('GET', '/start-game/2', { fixture: 'computer_human_game' }).as('getComputerVsHumanGame')
    
    playWinningComputerVsHumanGame()
  
    cy.get('h2').should('have.text', 'Congratulations X won!!!')
    cy.get('.flex-gap > :nth-child(1)').should('have.text', 'Replay')
    cy.get('.flex-gap > :nth-child(2)').should('have.text', 'Quit')
    cy.get('.flex-gap > :nth-child(2)').click()
    cy.get('div > h1').should('have.text','Thank you for playing! Goodbye!') 
  })

  xit('should play a human vs human game and replay a new computer vs human game and replay successfully', () => {
    cy.intercept('GET', '/start-game/1', { fixture: 'human_human_game' }).as('getHumanVsHumanGame') 

    cy.get('[name="human_human"]').click()
    cy.get('h2').should('have.text', 'Player X turn')
    cy.get('p').should('have.text', 'Click on the square you want to place your move')
    playWinningHumanVsHumanGame()
    cy.get('h2').should('have.text', 'Congratulations X won!!!')
    cy.get('.flex-gap > :nth-child(1)').should('have.text', 'Replay')
    cy.get('.flex-gap > :nth-child(2)').should('have.text', 'Quit')
    cy.get('.flex-gap > :nth-child(1)').click()
    cy.get('.game-mode-container > :nth-child(3)').should('have.text', 'Select game mode')

    cy.intercept('GET', '/start-game/2', { fixture: 'computer_human_game' }).as('getComputerVsHumanGame') 
    playWinningComputerVsHumanGame()
    cy.get('h2').should('have.text', 'Congratulations X won!!!')
    cy.get('.flex-gap > :nth-child(1)').should('have.text', 'Replay')
    cy.get('.flex-gap > :nth-child(2)').should('have.text', 'Quit')
    cy.get('.flex-gap > :nth-child(1)').click()
    cy.get('.game-mode-container > :nth-child(3)').should('have.text', 'Select game mode')
  })

  xit('should display correct message when game tied and be able to quit game successfully', ()=> {
    cy.intercept('GET', '/start-game/1', { fixture: 'human_human_game' }).as('getHumanVsHumanGame') 

    cy.get('[name="human_human"]').click()
    cy.get('h2').should('have.text', 'Player X turn')
    cy.get('p').should('have.text', 'Click on the square you want to place your move')
    playHumanVsHumanTieGame()
    cy.get('h2').should('have.text', 'Game over!! It\'s a tie!!!')
    cy.get('.flex-gap > :nth-child(1)').should('have.text', 'Replay')
    cy.get('.flex-gap > :nth-child(2)').should('have.text', 'Quit')
    cy.get('.flex-gap > :nth-child(2)').click()
    cy.get('div > h1').should('have.text','Thank you for playing! Goodbye!') 
  })

  xit('should display correct message when game tied and be able to replay game successfully', ()=> {
    cy.intercept('GET', '/start-game/1', { fixture: 'human_human_game' }).as('getHumanVsHumanGame') 

    cy.get('[name="human_human"]').click()
    cy.get('h2').should('have.text', 'Player X turn')
    cy.get('p').should('have.text', 'Click on the square you want to place your move')
    playHumanVsHumanTieGame()   
    cy.get('h2').should('have.text', 'Game over!! It\'s a tie!!!')
    cy.get('.flex-gap > :nth-child(1)').should('have.text', 'Replay')
    cy.get('.flex-gap > :nth-child(2)').should('have.text', 'Quit')
    cy.get('.flex-gap > :nth-child(1)').click()
    cy.get('.game-mode-container > :nth-child(3)').should('have.text', 'Select game mode')
  })

})

function playWinningHumanVsHumanGame(){
  cy.get('.grid-container > :nth-child(1)').should('have.text', '1')

  cy.intercept('PUT', '/start-game/grid', {fixture : 'winHumanVsHumanGame/staticResponseOne'}).as('putMoveAtOne') 

  cy.get('.grid-container > :nth-child(1)').click()
  cy.wait('@putMoveAtOne')
  cy.get('.grid-container > :nth-child(1)').should('have.text', 'X')
  cy.get('h2').should('have.text', 'Player O turn') 
  cy.get('.grid-container > :nth-child(2)').should('have.text', '2')

  cy.intercept('PUT', '/start-game/grid', {fixture : 'winHumanVsHumanGame/staticResponseTwo'}).as('putMoveAtTwo') 

  cy.get('.grid-container > :nth-child(2)').click()
  cy.wait('@putMoveAtTwo')
  cy.get('.grid-container > :nth-child(2)').should('have.text', 'O')
  cy.get('h2').should('have.text', 'Player X turn')
  cy.get('.grid-container > :nth-child(5)').should('have.text', '5')

  cy.intercept('PUT', '/start-game/grid', {fixture : 'winHumanVsHumanGame/staticResponseThree'}).as('putMoveAtThree') 

  cy.get('.grid-container > :nth-child(5)').click()
  cy.wait('@putMoveAtThree')
  cy.get('.grid-container > :nth-child(5)').should('have.text', 'X')
  cy.get('h2').should('have.text', 'Player O turn')
  cy.get('.grid-container > :nth-child(6)').should('have.text', '6')

  cy.intercept('PUT', '/start-game/grid', {fixture : 'winHumanVsHumanGame/staticResponseFour'}).as('putMoveAtFour') 

  cy.get('.grid-container > :nth-child(6)').click()
  cy.wait('@putMoveAtFour')
  cy.get('.grid-container > :nth-child(6)').should('have.text', 'O')
  cy.get('h2').should('have.text', 'Player X turn')
  cy.get('.grid-container > :nth-child(9)').should('have.text', '9')

  cy.intercept('PUT', '/start-game/grid', {fixture : 'winHumanVsHumanGame/staticResponseFive'}).as('putMoveAtFive') 

  cy.get('.grid-container > :nth-child(9)').click()
  cy.wait('@putMoveAtFive')
}

function playWinningComputerVsHumanGame(){
  cy.intercept('PUT', '/start-game/computer_move', {fixture : 'winComputerVsHumanGame/staticComputerResponseOne'}).as('putCompMoveAtOne')

  cy.get('[name="computer_human"]').click()
  cy.get('h2').should('have.text', 'Player X turn')
  cy.get('p').should('have.text', 'Click on the square you want to place your move')
  
  cy.get('.padding-sm').should('have.text', 'Computer thinking...')
  cy.wait('@putCompMoveAtOne')
  cy.get('.grid-container > :nth-child(1)').should('have.text', 'X')
  cy.get('h2').should('have.text', 'Player O turn') 
  cy.get('.grid-container > :nth-child(4)').should('have.text', '4')

  cy.intercept('PUT', '/start-game/grid', {fixture : 'winComputerVsHumanGame/staticHumanResponseOne'}).as('putHumanMoveAtFour') 
  cy.intercept('PUT', '/start-game/computer_move', {fixture : 'winComputerVsHumanGame/staticComputerResponseTwo'}).as('putCompMoveAtTwo')
  
  cy.get('.grid-container > :nth-child(4)').click()
  
  cy.wait('@putHumanMoveAtFour')
  cy.get('h2').should('have.text', 'Player X turn') 
  cy.get('.grid-container > :nth-child(4)').should('have.text', 'O')    
  cy.get('.padding-sm').should('have.text', 'Computer thinking...')
  cy.get('.grid-container > :nth-child(2)').should('have.text', '2')

  cy.wait('@putCompMoveAtTwo')
  cy.get('.grid-container > :nth-child(2)').should('have.text', 'X')
  cy.get('h2').should('have.text', 'Player O turn')
  cy.get('.grid-container > :nth-child(5)').should('have.text', '5')

  cy.intercept('PUT', '/start-game/grid', {fixture : 'winComputerVsHumanGame/staticHumanResponseTwo'}).as('putHumanMoveAtFive') 
  cy.intercept('PUT', '/start-game/computer_move', {fixture : 'winComputerVsHumanGame/staticComputerResponseThree'}).as('putCompMoveAtThree')
  
  cy.get('.grid-container > :nth-child(5)').click()
  
  cy.wait('@putHumanMoveAtFive')
  cy.get('h2').should('have.text', 'Player X turn') 
  cy.get('.grid-container > :nth-child(5)').should('have.text', 'O')
  cy.get('.grid-container > :nth-child(3)').should('have.text', '3')
  cy.get('.padding-sm').should('have.text', 'Computer thinking...')
  
  cy.wait('@putCompMoveAtThree')
  cy.get('.grid-container > :nth-child(3)').should('have.text', 'X')
  cy.get('h2').should('have.text', 'Player O turn')
}

function playHumanVsHumanTieGame(){
  cy.get('.grid-container > :nth-child(1)').should('have.text', '1')
  cy.intercept('PUT', '/start-game/grid', {fixture : 'winHumanVsHumanGame/staticResponseOne'}).as('putMoveAtOne') 
  cy.get('.grid-container > :nth-child(1)').click()
  cy.get('.grid-container > :nth-child(1)').should('have.text', 'X')
  cy.get('h2').should('have.text', 'Player O turn')
  cy.get('.grid-container > :nth-child(3)').should('have.text', '3')
  cy.intercept('PUT', '/start-game/grid', {fixture : 'tieHumanVsHumanGame/staticTieResponseTwo'}).as('putMoveAtTwo') 
  cy.get('.grid-container > :nth-child(3)').click()
  cy.get('.grid-container > :nth-child(3)').should('have.text', 'O')
  cy.get('h2').should('have.text', 'Player X turn')
  cy.get('.grid-container > :nth-child(2)').should('have.text', '2')
  cy.intercept('PUT', '/start-game/grid', {fixture : 'tieHumanVsHumanGame/staticTieResponseThree'}).as('putMoveAtThree') 
  cy.get('.grid-container > :nth-child(2)').click()
  cy.get('.grid-container > :nth-child(2)').should('have.text', 'X')
  cy.get('h2').should('have.text', 'Player O turn')
  cy.get('.grid-container > :nth-child(4)').should('have.text', '4')
  cy.intercept('PUT', '/start-game/grid', {fixture : 'tieHumanVsHumanGame/staticTieResponseFour'}).as('putMoveAtFour') 
  cy.get('.grid-container > :nth-child(4)').click()
  cy.get('.grid-container > :nth-child(4)').should('have.text', 'O')
  cy.get('h2').should('have.text', 'Player X turn')
  cy.get('.grid-container > :nth-child(5)').should('have.text', '5')
  cy.intercept('PUT', '/start-game/grid', {fixture : 'tieHumanVsHumanGame/staticTieResponseFive'}).as('putMoveAtFive') 
  cy.get('.grid-container > :nth-child(5)').click()
  cy.get('.grid-container > :nth-child(5)').should('have.text', 'X')
  cy.get('h2').should('have.text', 'Player O turn')
  cy.get('.grid-container > :nth-child(8)').should('have.text', '8')
  cy.intercept('PUT', '/start-game/grid', {fixture : 'tieHumanVsHumanGame/staticTieResponseSix'}).as('putMoveAtSix') 
  cy.get('.grid-container > :nth-child(8)').click()
  cy.get('.grid-container > :nth-child(8)').should('have.text', 'O')
  cy.get('h2').should('have.text', 'Player X turn')
  cy.get('.grid-container > :nth-child(6)').should('have.text', '6')
  cy.intercept('PUT', '/start-game/grid', {fixture : 'tieHumanVsHumanGame/staticTieResponseSeven'}).as('putMoveAtSeven') 
  cy.get('.grid-container > :nth-child(6)').click()
  cy.get('.grid-container > :nth-child(6)').should('have.text', 'X')
  cy.get('h2').should('have.text', 'Player O turn')
  cy.get('.grid-container > :nth-child(9)').should('have.text', '9')
  cy.intercept('PUT', '/start-game/grid', {fixture : 'tieHumanVsHumanGame/staticTieResponseEight'}).as('putMoveAtEight') 
  cy.get('.grid-container > :nth-child(9)').click()
  cy.get('.grid-container > :nth-child(9)').should('have.text', 'O')
  cy.get('h2').should('have.text', 'Player X turn')
  cy.get('.grid-container > :nth-child(7)').should('have.text', '7')
  cy.intercept('PUT', '/start-game/grid', {fixture : 'tieHumanVsHumanGame/staticTieResponseNine'}).as('putMoveAtNine') 
  cy.get('.grid-container > :nth-child(7)').click()
}
