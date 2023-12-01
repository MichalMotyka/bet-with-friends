import { useState, useEffect } from 'react'

function PanelLeaderboard () {
  const [leadersData, setLeadersData] = useState([])
  const [page, setPage] = useState(1) // Domyślna strona
  const [limit, setLimit] = useState(10) // Domyślna liczba elementów na stronie

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dodaj parametry "page" i "limit" do adresu URL
        const url = `http://130.162.44.103:5000/api/v1/ranking?page=${page}&limit=${limit}`

        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          }
        })

        // Sprawdź, czy status odpowiedzi jest OK (200)
        if (response.ok) {
          const jsonData = await response.json()
          setLeadersData(jsonData)
        } else {
          // Odczytaj treść odpowiedzi jako tekst, jeśli nie jest to JSON
          const errorText = await response.text()
          console.error('Błąd pobierania danych:', errorText)
        }
      } catch (error) {
        console.error('Błąd pobierania danych:', error)
      }
    }

    fetchData()
  }, [page, limit]) // Dodaj page i limit do zależności useEffect, aby reagować na ich zmiany

  console.log(leadersData)

  return (
    leadersData &&
    leadersData.length > 0 && (
      <section className='app-wrap'>
        <h2 className='section-title'>
          <span className='span-brand'> Leader</span>board
        </h2>
        <p className='table-caption'>
          W sekcji Top 5 Typerów prezentujemy najskuteczniejszych graczy w
          naszej społeczności. Tabela zawiera kluczowe statystyki, takie jak
          zdobyte punkty, skuteczność, ilość wygranych oraz ogólna ocena. To
          doskonała okazja, aby sprawdzić swoje umiejętności w typowaniu wyników
          i konkurować z innymi fanami piłki nożnej. Dołącz już dziś i poczuj
          emocje rywalizacji!
        </p>
        <table>
          <thead>
            <tr>
              <th>Miejsce</th>
              <th>Nick</th>
              <th>Avatar</th>
              <th>Punkty</th>
              <th>Bety</th>
              <th>Winy</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {leadersData.map(leader => (
              <tr key={leader.public_id}>
                <td>{leader.ranking.place}</td>
                <td>{leader.name}</td>
                <td>
                  <img
                    src={`http://130.162.44.103:5000/api/v1/avatar/${leader.avatar}`}
                    alt=''
                  />
                </td>
                <td>{leader.points}</td>
                <td>{leader.rating.bets}</td>
                <td>{leader.rating.wins}</td>
                <td className='th-hide'>{leader.rating.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    )
  )
}
export default PanelLeaderboard
