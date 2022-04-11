export const fetchNewGame = async (url) => {
  return await fetch(url, {
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:4567'
    }
  })
    .then(response => {
      if (!response.ok) throw new Error(response.status);
      return response.json()
    })
    .catch((error) => console.error("Error getting data for startGame:", error))
}