export const mockFetchNewGameResponse = {
  player1_name: 'Human',
  player1_marker: 'X',
  grid: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
}

export const mockUpdateGameDataResponseOne = {
  updated_grid: ['X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  current_player_marker: 'O',
  game_status: 'Keep playing',
  winner: 'X',
  invalid_move: false,
}

export const mockUpdateGameDataResponseTwo = {
  updated_grid: ['X', 'O', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  current_player_marker: 'X',
  game_status: 'Keep playing',
  winner: 'X',
  invalid_move: false,
}

export const mockUpdateGameDataResponseThree = {
  updated_grid: ['X', 'O', ' ', ' ', 'X', ' ', ' ', ' ', ' '],
  current_player_marker: 'O',
  game_status: 'Keep playing',
  winner: 'X',
  invalid_move: false,
}

export const mockUpdateGameDataResponseFour = {
  updated_grid: ['X', 'O', ' ', ' ', 'X', 'O', ' ', ' ', ' '],
  current_player_marker: 'X',
  game_status: 'Keep playing',
  winner: 'X',
  invalid_move: false,
}

export const mockUpdateGameDataResponseFive = {
  updated_grid: ['X', 'O', ' ', ' ', 'X', 'O', ' ', ' ', 'X'],
  current_player_marker: 'O',
  game_status: 'Won',
  winner: 'X',
  invalid_move: false,
}

export const mockTieGameDataResponse = {
  updated_grid: ['X', 'X', 'O', 'O', 'X', 'X', 'X', 'O', 'O'],
  current_player_marker: 'O',
  game_status: 'Tie',
  winner: 'X',
  invalid_move: false,
}

export const mockInvalidMoveGameDataResponse = {
  updated_grid: ['X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  current_player_marker: 'O',
  game_status: 'Keep playing',
  winner: 'X',
  invalid_move: true,
}
