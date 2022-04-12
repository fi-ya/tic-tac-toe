const mockFetchNewGameResponse = {
  reset_current_player1_name : 'Human',
  reset_current_player_marker : 'X',
  new_grid : '["1", "2", "3", "4", "5", "6", "7", "8", "9"]'
}

const mockUpdateGameDataResponse = {
  updated_grid : '["X", "2", "3", "4", "5", "6", "7", "8", "9"]',
  current_player_marker : 'O',
  game_status : 'Keep playing',
  winner : 'X'
}


export default {
  get: jest.fn().mockResolvedValue(mockFetchNewGameResponse), 
  put: jest.fn().mockResolvedValue(mockUpdateGameDataResponse)
}