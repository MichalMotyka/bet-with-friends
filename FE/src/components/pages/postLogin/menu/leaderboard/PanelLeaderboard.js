import { useState, useEffect } from 'react'

function PanelLeaderboard () {
  const [leadersData, setLeadersData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dodaj parametr "page" do adresu URL
        const pageParam = 1 // Przykładowa wartość, możesz dostosować
        const url = `http://130.162.44.103:5000/api/v1/ranking?limit=${pageParam}`

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
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
  }, [])
  console.log(leadersData)

  return (
    leadersData &&
    leadersData.length > 0 && (
      <section className='app-wrap'>
        <h2 className='section-title'>
          <span className='span-brand'> Leader</span>board
        </h2>
        <p className='table-caption'>
          W sekcji "Top 5 Typerów Piłki Nożnej" prezentujemy najskuteczniejszych
          graczy w naszej społeczności. Tabela zawiera kluczowe statystyki,
          takie jak zdobyte punkty, skuteczność, ilość wygranych oraz ogólna
          ocena. To doskonała okazja, aby sprawdzić swoje umiejętności w
          typowaniu wyników i konkurować z innymi fanami piłki nożnej. Dołącz
          już dziś i poczuj emocje rywalizacji!
        </p>
        <table className='  '>
          <thead>
            <tr>
              <th className=''>Miejsce</th>
              <th>Nick</th>
              <th className=''>Avatar</th>
              <th>Punkty</th>
              <th>Bety</th>
              <th>Winy</th>
              <th className=''>Rating</th>
            </tr>
          </thead>
          <tbody>
            {leadersData.map(leader => (
              <tr key={leader.public_id}>
                <td className=''>{leader.ranking.place}</td>
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
