export const fetchNewGame = async (url) => {
  return await fetch(url, {
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:4567',
    },
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
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4567',
    },
    body: JSON.stringify([gridData, currentPlayerMarker, playerMove]),
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.status)
      return response.json()
    })
    .catch((error) =>
      console.error('Error getting data for putGameData:', error),
    )
}

export const fetchComputerMove = async (url, gridData, currentPlayerMarker) => {
  console.log('FETC comp', url, gridData, currentPlayerMarker )
  return await fetch (url, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4567',
    },
    body: JSON.stringify([gridData, currentPlayerMarker]),
  })
  .then((response) => {
    console.log('FETC comp RESPONSE', response )
    if(!response.ok) throw new Error(response.status)
    return response.json()
  })
  .catch((error) => console.error('Error getting data for fetchComputerMove'))
}