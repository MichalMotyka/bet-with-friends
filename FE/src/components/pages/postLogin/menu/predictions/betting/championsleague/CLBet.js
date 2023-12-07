import { useState } from 'react'
import './clbet.css'

function CLBet ({ matchList }) {
  const [betResults, setBetResults] = useState({})

  // PODMIEN PUBLIC ID OBECNY NA GŁÓWNY public ID

  // const handleInputChange = (matchId, team, value) => {
  //   setBetResults(prevResults => ({
  //     ...prevResults,
  //     [matchId]: { ...prevResults[matchId], [team]: value }
  //   }))
  // }
  // handleInputChange to funkcja obsługująca zmiany wartości w inputach,
  // które reprezentują wprowadzane przez użytkownika wyniki meczu.
  // matchId: Unikalny identyfikator meczu, pozwalający funkcji zidentyfikować, dla którego meczu nastąpiła zmiana.
  // team: Określa, czy wprowadzane są dane dla drużyny gospodarzy ('home_team') czy gości ('away_team').
  // value: Wartość wprowadzana przez użytkownika, czyli liczba goli dla danej drużyny w danym meczu.
  // setBetResults: Funkcja służąca do aktualizacji stanu betResults.
  // (prevResults => ({...})): Wykorzystuje poprzedni stan prevResults do utworzenia nowego obiektu stanu, który zawiera aktualizację dla konkretnego meczu i drużyny.
  const handleInputChange = (matchId, team, value) => {
    setBetResults(prevResults => ({
      ...prevResults,
      [matchId]: { ...prevResults[matchId], [team]: value }
    }))
  }

  const handleBetSubmit = async matchId => {
    const betData = betResults[matchId]

    try {
      const betEndpoint = `http://localhost:5000/api/v1/bet/${matchId}`
      const response = await fetch(betEndpoint, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(betData)
      })
      console.log(betResults)
      if (response.ok) {
        console.log('Zakład wysłany pomyślnie')
      } else {
        console.error('Błąd podczas wysyłania zakładu')
      }
    } catch (error) {
      console.error('Błąd podczas wysyłania zakładu:', error)
    }
  }

  return matchList.length > 0 ? (
    <table className='schedule-table'>
      <thead>
        <tr>
          <th className='crest'></th>
          <th>Gospodarze</th>
          <th>Wynika</th>
          <th>Goście</th>
          <th className='crest'></th>
          <th>Termin</th>
          <th>Zakład</th>
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
            <td>
              <input
                type='number'
                placeholder='Gospodarze'
                value={betResults[match.public_id]?.home_team || ''}
                onChange={e =>
                  handleInputChange(
                    match.public_id,
                    'home_team',
                    e.target.value
                  )
                }
              />
              <span> : </span>
              <input
                type='number'
                placeholder='Goście'
                value={betResults[match.public_id]?.away_team || ''}
                onChange={e =>
                  handleInputChange(
                    match.public_id,
                    'away_team',
                    e.target.value
                  )
                }
              />
              <button onClick={() => handleBetSubmit(match.public_id)}>
                WYŚLIJ
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    'Data pending...'
  )
}

export default CLBet
