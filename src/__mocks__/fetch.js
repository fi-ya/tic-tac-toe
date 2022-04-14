export const mockFetchNewGameResponse = {
  reset_current_player1_name : 'Human',
  reset_current_player_marker : 'X',
  new_grid : '["1", "2", "3", "4", "5", "6", "7", "8", "9"]'
}

export const mockUpdateGameDataResponseOne = {
  updated_grid : '["X", "2", "3", "4", "5", "6", "7", "8", "9"]',
  current_player_marker : 'O',
  game_status : 'Keep playing',
  winner : 'X'
}

export const mockUpdateGameDataResponseTwo = {
  updated_grid : '["X", "O", "3", "4", "5", "6", "7", "8", "9"]',
  current_player_marker : 'X',
  game_status : 'Keep playing',
  winner : 'X'
}

export const mockUpdateGameDataResponseThree = {
  updated_grid : '["X", "O", "3", "4", "X", "6", "7", "8", "9"]',
  current_player_marker : 'O',
  game_status : 'Keep playing',
  winner : 'X'
}

export const mockUpdateGameDataResponseFour = {
  updated_grid : '["X", "O", "3", "4", "X", "O", "7", "8", "9"]',
  current_player_marker : 'X',
  game_status : 'Keep playing',
  winner : 'X'
}

export const mockUpdateGameDataResponseFive = {
  updated_grid : '["X", "O", "3", "4", "X", "O", "7", "8", "X"]',
  current_player_marker : 'O',
  game_status : 'Won',
  winner : 'X'
}