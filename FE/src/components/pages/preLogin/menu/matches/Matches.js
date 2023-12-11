import { useEffect, useState } from 'react'
import { useAuth } from '../../../../auth/authcontext/AuthContext'

function Matches () {
  const [matchesData, setMatchesData] = useState([])
  const { ipMan } = useAuth()
  const competetition = 2001

  useEffect(() => {
    const getMatches = async () => {
      try {
        const pubMatchesResponse = await fetch(
          `http://130.162.44.103/api/v1/matches?competetition=${competetition}`,
          // `http://localhost:5000/api/v1/matches?competetition=2001`,

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
          console.error('Błąd podczas pobierania danych')
        }
      } catch (error) {
        console.error('Błąd podczas wysyłania żądania:', error)
      }
    }

    getMatches()
  }, [ipMan])
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
