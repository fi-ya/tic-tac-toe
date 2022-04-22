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

  xit('should display a error message when invalid move made', ()=>{
    cy.intercept('GET', '/start-game/1', { fixture: 'human_human_game' }).as('getHumanVsHumanGame') 

    cy.get('[name="human_human"]').click()
    cy.get('h2').should('have.text', 'Player X turn')
    cy.get('p').should('have.text', 'Click on the square you want to place your move')
    cy.get('.grid-container > :nth-child(1)').should('have.text', '1')

    cy.intercept('PUT', '/start-game/grid', staticResponseOne).as('putMoveAtOne') 

    cy.get('.grid-container > :nth-child(1)').click()
    cy.wait('@putMoveAtOne')
  
    cy.get('.grid-container > :nth-child(1)').should('have.text', 'X')
    cy.get('h2').should('have.text', 'Player O turn') 
    
    cy.intercept('PUT', '/start-game/grid', invalidStaticResponseTwo).as('putMoveAtTwo') 

    cy.get('.grid-container > :nth-child(1)').click()
    cy.wait('@putMoveAtTwo')

    cy.get('.padding-sm').should('have.text', 'Invalid move. Try again!')
    cy.get('.grid-container > :nth-child(2)').should('have.text', '2')
    
    cy.intercept('PUT', '/start-game/grid', staticResponseTwo).as('putMoveAtTwo') 

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

  xit('should play a human vs human game and replay a new computer vs human game and quit successfully', () => {
    cy.intercept('GET', '/start-game/1', { fixture: 'human_human_game' }).as('getHumanVsHumanGame') 

    cy.get('[name="human_human"]').click()
    cy.get('h2').should('have.text', 'Player X turn')
    cy.get('p').should('have.text', 'Click on the square you want to place your move')
    playWinningHumanVsHumanGame()
    cy.get('h2').should('have.text', 'Congratulations X won!!!')
    cy.get('.flex-gap > :nth-child(1)').should('have.text', 'Replay')
    cy.get('.flex-gap > :nth-child(2)').should('have.text', 'Quit')
    cy.get('.flex-gap > :nth-child(1)').click()
    cy.get('section > h1').should('have.text', 'Select game mode')

    cy.intercept('GET', '/start-game/2', { fixture: 'human_human_game' }).as('getComputerVsHumanGame') 

    cy.get('[name="computer_human"]').click()
    cy.get('p').should('have.text', 'Click on the square you want to place your move')
    // playWinningComputerVsHumanGame()
    cy.get('h2').should('have.text', 'Congratulations X won!!!')
    cy.get('.flex-gap > :nth-child(1)').should('have.text', 'Replay')
    cy.get('.flex-gap > :nth-child(2)').should('have.text', 'Quit')
    cy.get('.flex-gap > :nth-child(2)').click()
    cy.get('div > h1').should('have.text','Thank you for playing! Goodbye!') 
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
    cy.get('section > h1').should('have.text', 'Select game mode')
  })

  it('should play computer vs human game and exit successfully', ()=>{
 
    cy.intercept('GET', '/start-game/2', { fixture: 'computer_human_game' }).as('getComputerVsHumanGame')
    
    // playWinningComputerVsHumanGame()
    cy.intercept('PUT', '/start-game/computer_move', staticComputerResponseOne).as('putCompMoveAtOne')

    cy.get('[name="computer_human"]').click()
    cy.get('h2').should('have.text', 'Player X turn')
    cy.get('p').should('have.text', 'Click on the square you want to place your move')
    
    cy.get('.padding-sm').should('have.text', 'Computer thinking...')
    cy.wait('@putCompMoveAtOne')
    cy.get('.grid-container > :nth-child(1)').should('have.text', 'X')
    cy.get('h2').should('have.text', 'Player O turn') 
    cy.get('.grid-container > :nth-child(4)').should('have.text', '4')

    cy.intercept('PUT', '/start-game/grid', staticHumanResponseOne).as('putHumanMoveAtFour') 

    cy.get('.grid-container > :nth-child(4)').click()
    cy.wait('@putHumanMoveAtFour')
    cy.get('.grid-container > :nth-child(4)').should('have.text', 'O')

    cy.intercept('PUT', '/start-game/grid', staticComputerResponseTwo).as('putCompMoveAtTwo')

    cy.get('.grid-container > :nth-child(2)').should('have.text', '2')
    cy.get('.padding-sm').should('have.text', 'Computer thinking...')
    cy.wait('@putCompMoveAtTwo')
    cy.get('.grid-container > :nth-child(2)').should('have.text', 'X')
    cy.get('h2').should('have.text', 'Player O turn')
    cy.get('.grid-container > :nth-child(5)').should('have.text', '5')

    cy.intercept('PUT', '/start-game/grid', staticHumanResponseTwo).as('putHumanMoveAtFive') 
    
    cy.get('.grid-container > :nth-child(5)').click()
    cy.wait('@putHumanMoveAtFive')
    cy.get('.grid-container > :nth-child(5)').should('have.text', 'O')

    cy.intercept('PUT', '/start-game/grid', staticComputerResponseThree).as('putCompMoveAtThree')

    cy.get('.grid-container > :nth-child(3)').should('have.text', '3')
    cy.get('.padding-sm').should('have.text', 'Computer thinking...')
    cy.wait('@putCompMoveAtThree')
    cy.get('.grid-container > :nth-child(3)').should('have.text', 'X')
    cy.get('h2').should('have.text', 'Player O turn')
   
    

    // cy.get('h2').should('have.text', 'Player O turn')
    // cy.get('.grid-container > :nth-child(2)').should('have.text', '2')

    // cy.intercept('PUT', '/start-game/grid', staticHumanResponseOne).as('putHumanMoveAtTwo') 

    
    // cy.get('.grid-container > :nth-child(2)').should('have.text', 'O')
    // cy.get('.padding-sm').should('have.text', 'Computer thinking...')

    // cy.intercept('PUT', '/start-game/grid', staticComputerResponseTwo).as('putCompMoveAtThree')
    // cy.get('h2').should('have.text', 'Player X turn')




    

    // cy.get('h2').should('have.text', 'Congratulations X won!!!')
    // cy.get('.flex-gap > :nth-child(1)').should('have.text', 'Replay')
    // cy.get('.flex-gap > :nth-child(2)').should('have.text', 'Quit')
    // cy.get('.flex-gap > :nth-child(2)').click()
    // cy.get('div > h1').should('have.text','Thank you for playing! Goodbye!') 
  })
})

function playWinningHumanVsHumanGame(){
  cy.get('.grid-container > :nth-child(1)').should('have.text', '1')

  cy.intercept('PUT', '/start-game/grid', staticResponseOne).as('putMoveAtOne') 

  cy.get('.grid-container > :nth-child(1)').click()
  cy.wait('@putMoveAtOne')
  cy.get('.grid-container > :nth-child(1)').should('have.text', 'X')
  cy.get('h2').should('have.text', 'Player O turn') 
  cy.get('.grid-container > :nth-child(2)').should('have.text', '2')

  cy.intercept('PUT', '/start-game/grid', staticResponseTwo).as('putMoveAtTwo') 

  cy.get('.grid-container > :nth-child(2)').click()
  cy.wait('@putMoveAtTwo')
  cy.get('.grid-container > :nth-child(2)').should('have.text', 'O')
  cy.get('h2').should('have.text', 'Player X turn')
  cy.get('.grid-container > :nth-child(5)').should('have.text', '5')

  cy.intercept('PUT', '/start-game/grid', staticResponseThree).as('putMoveAtThree') 

  cy.get('.grid-container > :nth-child(5)').click()
  cy.wait('@putMoveAtThree')
  cy.get('.grid-container > :nth-child(5)').should('have.text', 'X')
  cy.get('h2').should('have.text', 'Player O turn')
  cy.get('.grid-container > :nth-child(6)').should('have.text', '6')

  cy.intercept('PUT', '/start-game/grid', staticResponseFour).as('putMoveAtFour') 

  cy.get('.grid-container > :nth-child(6)').click()
  cy.wait('@putMoveAtFour')
  cy.get('.grid-container > :nth-child(6)').should('have.text', 'O')
  cy.get('h2').should('have.text', 'Player X turn')
  cy.get('.grid-container > :nth-child(9)').should('have.text', '9')

  cy.intercept('PUT', '/start-game/grid', staticResponseFive).as('putMoveAtFive') 

  cy.get('.grid-container > :nth-child(9)').click()
  cy.wait('@putMoveAtFive')
}

function playHumanVsHumanTieGame(){
  cy.get('.grid-container > :nth-child(1)').should('have.text', '1')
  cy.intercept('PUT', '/start-game/grid', staticResponseOne).as('putMoveAtOne') 
  cy.get('.grid-container > :nth-child(1)').click()
  cy.get('.grid-container > :nth-child(1)').should('have.text', 'X')
  cy.get('h2').should('have.text', 'Player O turn')
  cy.get('.grid-container > :nth-child(3)').should('have.text', '3')
  cy.intercept('PUT', '/start-game/grid', staticTieResponseTwo).as('putMoveAtTwo') 
  cy.get('.grid-container > :nth-child(3)').click()
  cy.get('.grid-container > :nth-child(3)').should('have.text', 'O')
  cy.get('h2').should('have.text', 'Player X turn')
  cy.get('.grid-container > :nth-child(2)').should('have.text', '2')
  cy.intercept('PUT', '/start-game/grid', staticTieResponseThree).as('putMoveAtThree') 
  cy.get('.grid-container > :nth-child(2)').click()
  cy.get('.grid-container > :nth-child(2)').should('have.text', 'X')
  cy.get('h2').should('have.text', 'Player O turn')
  cy.get('.grid-container > :nth-child(4)').should('have.text', '4')
  cy.intercept('PUT', '/start-game/grid', staticTieResponseFour).as('putMoveAtFour') 
  cy.get('.grid-container > :nth-child(4)').click()
  cy.get('.grid-container > :nth-child(4)').should('have.text', 'O')
  cy.get('h2').should('have.text', 'Player X turn')
  cy.get('.grid-container > :nth-child(5)').should('have.text', '5')
  cy.intercept('PUT', '/start-game/grid', staticTieResponseFive).as('putMoveAtFive') 
  cy.get('.grid-container > :nth-child(5)').click()
  cy.get('.grid-container > :nth-child(5)').should('have.text', 'X')
  cy.get('h2').should('have.text', 'Player O turn')
  cy.get('.grid-container > :nth-child(8)').should('have.text', '8')
  cy.intercept('PUT', '/start-game/grid', staticTieResponseSix).as('putMoveAtSix') 
  cy.get('.grid-container > :nth-child(8)').click()
  cy.get('.grid-container > :nth-child(8)').should('have.text', 'O')
  cy.get('h2').should('have.text', 'Player X turn')
  cy.get('.grid-container > :nth-child(6)').should('have.text', '6')
  cy.intercept('PUT', '/start-game/grid', staticTieResponseSeven).as('putMoveAtSeven') 
  cy.get('.grid-container > :nth-child(6)').click()
  cy.get('.grid-container > :nth-child(6)').should('have.text', 'X')
  cy.get('h2').should('have.text', 'Player O turn')
  cy.get('.grid-container > :nth-child(9)').should('have.text', '9')
  cy.intercept('PUT', '/start-game/grid', staticTieResponseEight).as('putMoveAtEight') 
  cy.get('.grid-container > :nth-child(9)').click()
  cy.get('.grid-container > :nth-child(9)').should('have.text', 'O')
  cy.get('h2').should('have.text', 'Player X turn')
  cy.get('.grid-container > :nth-child(7)').should('have.text', '7')
  cy.intercept('PUT', '/start-game/grid', staticTieResponseNine).as('putMoveAtNine') 
  cy.get('.grid-container > :nth-child(7)').click()
}

const staticResponseOne ={
  updated_grid : '["X", "2", "3", "4", "5", "6", "7", "8", "9"]',
  current_player_name: "Human",
  current_player_marker : 'O',
  game_status : 'Keep playing',
  winner : 'X'
}

const staticResponseTwo ={
  updated_grid : '["X", "O", "3", "4", "5", "6", "7", "8", "9"]',
  current_player_name: "Human",
  current_player_marker : 'X',
  game_status : 'Keep playing',
  winner : 'X'
}
const staticResponseThree ={
  updated_grid : '["X", "O", "3", "4", "X", "6", "7", "8", "9"]',
  current_player_marker : 'O',
  game_status : 'Keep playing',
  winner : 'X'
}
const staticResponseFour ={
  updated_grid : '["X", "O", "3", "4", "X", "O", "7", "8", "9"]',
  current_player_marker : 'X',
  game_status : 'Keep playing',
  winner : 'X'
}
const staticResponseFive ={
  updated_grid : '["X", "O", "3", "4", "X", "O", "7", "8", "X"]',
  current_player_marker : 'O',
  game_status : 'Won',
  winner : 'X'
}

const invalidStaticResponseTwo ={
  updated_grid : 'Invalid move. Try again',
  current_player_marker : 'O',
  game_status : 'Keep playing',
  winner : 'X'
}

const staticTieResponseTwo = {
  updated_grid : '["X", "2", "O", "4", "5", "6", "7", "8", "9"]',
  current_player_marker : 'X',
  game_status : 'Keep playing',
  winner : 'X'
}

const staticTieResponseThree = {  
  updated_grid : '["X", "X", "O", "4", "X", "6", "7", "8", "9"]',
  current_player_marker : 'O',
  game_status : 'Keep playing',
  winner : 'X'
}

const staticTieResponseFour = {  
  updated_grid : '["X", "X", "O", "O", "5", "6", "7", "8", "9"]',
  current_player_marker : 'X',
  game_status : 'Keep playing',
  winner : 'X'
}
const staticTieResponseFive = {  
  updated_grid : '["X", "X", "O", "O", "X", "6", "7", "8", "9"]',
  current_player_marker : 'O',
  game_status : 'Keep playing',
  winner : 'X'
}

const staticTieResponseSix = { 
  updated_grid : '["X", "X", "O", "O", "X", "6", "7", "O", "9"]',
  current_player_marker : 'X',
  game_status : 'Keep playing',
  winner : 'X'
}

const staticTieResponseSeven = {
  updated_grid : '["X", "X", "O", "O", "X", "X", "7", "O", "9"]',
  current_player_marker : 'O',
  game_status : 'Keep playing',
  winner : 'X'
}

const staticTieResponseEight= {
  updated_grid : '["X", "X", "O", "O", "X", "X", "7", "O", "O"]',
  current_player_marker : 'X',
  game_status : 'Keep playing',
  winner : 'X'
}

const staticTieResponseNine = {  
  updated_grid : '["X", "X", "O", "O", "X", "X", "X", "O", "O"]',
  current_player_marker : 'O',
  game_status : 'Tie',
  winner : 'X'
}

const staticComputerResponseOne ={
  updated_grid : '["X", "2", "3", "4", "5", "6", "7", "8", "9"]',
  current_player_name: "Human",
  current_player_marker : 'O',
  game_status : 'Keep playing',
  winner : 'X'
}

const staticHumanResponseOne ={
  updated_grid : '["X", "2", "3", "O", "5", "6", "7", "8", "9"]',
  current_player_name: "Computer",
  current_player_marker : 'X',
  game_status : 'Keep playing',
  winner : 'X'
}
const staticComputerResponseTwo ={
  updated_grid : '["X", "X", "3", "O", "5", "6", "7", "8", "9"]',
  current_player_name: "Human",
  current_player_marker : 'O',
  game_status : 'Keep playing',
  winner : 'X'
}
const staticHumanResponseTwo ={
  updated_grid : '["X", "X", "3", "O", "O", "6", "7", "8", "9"]',
  current_player_name: "Computer",
  current_player_marker : 'X',
  game_status : 'Keep playing',
  winner : 'X'
}
const staticComputerResponseThree ={
  updated_grid : '["X", "X", "X", "O", "5", "6", "7", "8", "9"]',
  current_player_name: "Human",
  current_player_marker : 'O',
  game_status : 'Won',
  winner : 'X'
}