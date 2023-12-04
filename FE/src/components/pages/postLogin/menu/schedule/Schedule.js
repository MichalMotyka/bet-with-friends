import React, { useEffect, useState } from 'react'

function Schedule () {
  const [matchList, setMatchList] = useState([])

  useEffect(() => {
    const getMatches = async () => {
      try {
        const competitionId = '2001' // Zastąp wartość swoim id typu meczy
        // 2001 - CL
        // 2018 - euro

        const page = 1 // Możesz dostosować stronę do paginacji
        const limit = 10 // Możesz dostosować limit do paginacji

        const matchesResponse = await fetch(
          `http://130.162.44.103/5000/api/v1/matches?competetition=${competitionId}&page=${page}&limit=${limit}`,

          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        if (matchesResponse.ok) {
          const matchesData = await matchesResponse.json()
          console.log('Pobranie danych zakończone sukcesem:', matchesData)
          setMatchList(matchesData)
        } else {
          console.error('Błąd podczas pobierania danych')
        }
      } catch (error) {
        console.error('Błąd podczas wysyłania żądania:', error)
      }
    }

    getMatches()
  }, [])

  console.log(matchList)

  return (
    <div>
      <h2>Terminarz rozgrywek</h2>
      <table>
        <thead>
          <tr>
            <th>Mecz</th>
            <th>Drużyna domowa</th>
            <th>Wynik</th>
            <th>Drużyna wyjazdowa</th>
            <th>Termin</th>
          </tr>
        </thead>
        <tbody>
          {matchList.map((match, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{match.home_team.name}</td>
              {/* <td>
                {match.score
                  ? `${match.score.full_time.home_team} - ${match.score.full_time.away_team}`
                  : 'N/A'}
              </td> */}
              <td>{match.away_team.name}</td>
              <td>{match.utc_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Schedule
