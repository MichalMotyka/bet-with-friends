import { useState, useEffect } from 'react'
import './leaderboards.css'

function Leaderboard () {
  const [leadersData, setLeadersData] = useState([])
  const [leadersNumber, setLeaderNumber] = useState(10)

  useEffect(() => {
    const APIURL = `https://randomuser.me/api/?results=${leadersNumber}`

    fetch(APIURL)
      .then(response => response.json())
      .then(data => setLeadersData(data.results))
      .catch(error => console.error(error))
  }, [leadersNumber])

  const handleLeadersNumber = e => {
    setLeaderNumber(e.target.value)
  }

  return (
    leadersData &&
    leadersData.length > 0 && (
      <section className='app-wrap'>
        <h2 className='section-title'>
          <span className='span-brand'> Leader</span>board
        </h2>

        <div>
          <ol>
            {leadersData
              .sort(
                (a, b) => b.location.street.number - a.location.street.number
              )
              .map((leader, index) => (
                <li key={leader.login.uuid}>
                  <p>{index + 1}</p>
                  <img src={leader.picture.large} alt='' />
                  <p>{leader.login.username}</p>
                  <p>{leader.location.street.number}</p>
                </li>
              ))}
          </ol>
        </div>

        <select value={leadersNumber} onChange={handleLeadersNumber}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>
      </section>
    )
  )
}

export default Leaderboard
