const myHeaders = new Headers()

myHeaders.append('Content-Type', 'application/json')
myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:4567')

export const fetchNewGame = async (url) => {
  return await fetch(url, {
    headers: myHeaders,
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.status)
      return response.json()
    })
    .catch((error) =>
      console.error('Error getting data for fetchNewGame:', error),
    )
}

export const updateGameData = async (
  url,
  gridData,
  currentPlayerMarker,
  playerMove,
) => {
  return await fetch(url, {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify({
      grid: gridData,
      current_player_marker: currentPlayerMarker,
      player_move: playerMove,
    }),
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.status)
      return response.json()
    })
    .catch((error) =>
      console.error('Error getting data for putGameData:', error),
    )
}

export const fetchComputerMove = async (url, grid, currentPlayerMarker) => {
  return await fetch(url, {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify({
      grid: grid,
      current_player_marker: currentPlayerMarker,
    }),
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.status)
      return response.json()
    })
    .catch((error) => console.error('Error getting data for fetchComputerMove'))
}
