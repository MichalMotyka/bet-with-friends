import { useEffect, useState } from 'react'
import { useAuth } from '../../../../auth/authcontext/AuthContext'

function Matches () {
  const [matchesData, setMatchesData] = useState([])
  const [competitionsList, setCompetitionsList] = useState([])

  const { ipMan } = useAuth()
  const competetition = 2001

  useEffect(() => {
    const getCompetitions = async () => {
      try {
        const competitionsResponse = await fetch(
          `http://130.162.44.103:5000/api/v1/competetition`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Total-Count': 'true'
            }
          }
        )
        if (competitionsResponse.ok) {
          const competitionsData = await competitionsResponse.json()
          setCompetitionsList(competitionsData)
          // zamiana bo w euro nie ma jeszcze meczy a jest na 1 miejscu w tabeli wiec jest pusta domyślnie.
          // competitionsData.reverse()

          // Sprawdź, czy Champions League jest w dostępnych konkurencjach
        } else {
          console.error('Błąd podczas pobierania danych')
        }
      } catch (error) {
        console.error('Błąd podczas wysyłania żądania:', error)
      }
    }

    getCompetitions()
  }, [ipMan])

  console.log(competitionsList)

  useEffect(() => {
    const getMatches = async () => {
      try {
        const pubMatchesResponse = await fetch(
          `http://130.162.44.103:5000/api/v1/matches?competetition=${competetition}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Total-Count': 'true'
            }
          }
        )

        if (pubMatchesResponse.ok) {
          const matchesInfo = await pubMatchesResponse.json()
          setMatchesData(matchesInfo)
          console.log('oK')
        } else {
          console.error(
            'Błąd podczas pobierania danych:',
            pubMatchesResponse.status
          )
        }
      } catch (error) {
        console.error('Błąd podczas wysyłania żądania:', error.message)
      }
    }

    getMatches()
  }, [ipMan, competetition])

  console.log('siema')
  console.log(matchesData)

  return (
    <section className='app-wrap'>
      <h2 className='section-title'>
        {' '}
        Tabela <span className='span-brand'>meczów</span>{' '}
      </h2>

      <p>
        Tabela przedstawianadchodzące rozgrywki najpopularniejszych lig
        piłkarskich i uczestniczyć w emocjonującym świecie obstawiania ze swoimi
        przyjaciółmi. Z łatwością sprawdź, kiedy odbywają się najważniejsze
        mecze i zanurz się w atmosferze rywalizacji.
      </p>
    </section>
  )
}
export default Matches
