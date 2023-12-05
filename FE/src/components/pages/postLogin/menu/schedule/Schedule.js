import React, { useEffect, useState } from 'react'
import './schedule.css'
function Schedule () {
  const [matchList, setMatchList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const competitionId = '2001' // Zastąp wartość swoim id typu meczy
  const limit = 10
  useEffect(() => {
    const getMatches = async () => {
      try {
        // 2001 - CL
        // 2018 - euro
        const matchesResponse = await fetch(
          `http://localhost:5000/api/v1/matches?competetition=${competitionId}&page=${currentPage}&limit=${limit}`,

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
  }, [currentPage])

  console.log('Tuyaj:', matchList)

  return Object.keys(matchList).length > 0 ? (
    <div className='schedule'>
      <h2>
        Terminarz <span className='span-brand'>rozgrywek</span>
      </h2>
      {/* <img width={75} src={matchList[0].competition.emblem} alt='' /> */}

      <p className='competition-name'>
        {matchList[0].competition.name} <br /> Przeglądaj listę:{' '}
        <select
          value={currentPage}
          onChange={e => setCurrentPage(e.target.value)}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>
      </p>
      <table className='schedule-table'>
        <thead>
          <tr>
            <th className='crest'></th>
            <th>Drużyna domowa</th>
            <th>Wynik</th>
            <th>Drużyna wyjazdowa</th>
            <th className='crest'></th>
            <th>Termin</th>
          </tr>
        </thead>
        <tbody>
          {matchList.map(match => (
            <tr key={match.score.public_id}>
              <td className='crest'>
                <img width={45} src={match.home_team.crest} alt='' />
              </td>
              <td>{match.home_team.short_name}</td>
              <td>{match.score.full_time ?? 'TBD'}</td>

              <td>{match.away_team.short_name}</td>
              <td className='crest'>
                <img width={45} src={match.away_team.crest} alt='' />
              </td>
              <td>{match.utc_date.replace('T', ' ').slice(0, -3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    'Data pending...'
  )
}

export default Schedule
