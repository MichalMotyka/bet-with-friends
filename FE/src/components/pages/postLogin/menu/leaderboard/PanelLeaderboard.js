import { useState, useEffect } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { BsArrowLeft } from 'react-icons/bs'
import './panelleaderboard.css'
import RaccoonLeader from './images/raccoon-leader.webp'
import { PredictionLogic } from '../predictions/data/PredictionLogic'
import { useAuth } from '../../../../auth/authcontext/AuthContext'

function PanelLeaderboard () {
  const [leadersData, setLeadersData] = useState([])
  const [page, setPage] = useState(1)
  const [totalLeaders, setTotalLeaders] = useState(null)
  const [limit] = useState(10)
  const [selectedCompetition, setSelectedCompetition] = useState(2002)
  const { ipMan } = useAuth()
  const { competitions } = PredictionLogic()

  // MAIN API FOR ALL  LEADERBOARD!
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://${ipMan}:5000/api/v1/ranking?competetition=${selectedCompetition}&page=${page}&limit=${limit}`

        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            'X-Total-Count': 'true'
          }
        })

        if (response.ok) {
          const jsonData = await response.json()
          console.log('Data received:', jsonData)
          setLeadersData(jsonData)
          setTotalLeaders(response.headers.get('X-Total-Count'))
        } else {
          const errorText = await response.text()
          console.error('Error fetching data:', errorText)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [page, limit, ipMan, selectedCompetition])

  const handleCompetitionChange = competitionId => {
    setSelectedCompetition(competitionId)
    // Resetowanie strony przy zmianie turnieju
  }

  return (
    <section className='app-wrap'>
      <h2 className='section-title panel-header'>
        <span className='span-brand'> Leader</span>board
      </h2>
      {/*  buttony */}

      <div className='competition-buttons'>
        {competitions.map(competition => (
          <button
            key={competition.public_id}
            className={`competition-btn ${
              selectedCompetition === competition.public_id
                ? 'active-schedule'
                : ''
            }`}
            onClick={() => handleCompetitionChange(competition.public_id)}
          >
            <img
              width={50}
              height={50}
              src={competition.emblem}
              alt=''
              className='comp-button-img'
            />
            <p>{competition.name}</p>
          </button>
        ))}
      </div>

      <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Najlepsi typerzy Bet With <span className='span-brand'>Friends</span>
      </p>
      <span style={{ display: 'block', textAlign: 'center' }}>
        {' '}
        Liczba graczy: {totalLeaders}
      </span>
      <img
        className='leader-raccoon'
        src={RaccoonLeader}
        alt=''
        width={125}
        height={125}
      />
      <p className='schedule-btns'>
        <button
          className='schedule-list-btn span-brand'
          disabled={page === 1 || totalLeaders === '0' ? true : false}
          onClick={() => setPage(prevValue => prevValue - 1)}
        >
          <BsArrowLeft />
        </button>
        <span className='schedule-btn-span'>
          Przeglądaj listę {page} / {Math.ceil(totalLeaders / limit)}
        </span>
        <button
          className='schedule-list-btn span-brand'
          onClick={() => setPage(prevValue => prevValue + 1)}
          // total matches np. 16 przez 10 daje 1.6 i Ceil robi 2.
          disabled={
            page === Math.ceil(totalLeaders / limit) || totalLeaders === '0'
          }
        >
          <BsArrowRight />
        </button>
      </p>

      {!leadersData.length <= 0 ? (
        <table className='panel-leader-table'>
          <thead>
            <tr>
              <th className='th-place'>Miejsce</th>
              <th>Nick</th>
              <th className='th-hide'>Avatar</th>
              <th>Punkty</th>
              <th>Bety</th>
              <th>Winy</th>
              <th className='th-hide'>Rating</th>
            </tr>
          </thead>
          <tbody>
            {leadersData.map(leader => (
              <tr
                key={leader.public_id}
                className={`top-panel-player ${
                  leader.place <= 3 ? 'top-players' : ''
                }`}
              >
                {console.log('here:', leader)}
                <td className={`th-place`}>{leader.place}</td>
                <td className='leader-name'>{leader.profile.name}</td>
                <td className='th-hide'>
                  <img
                    className={`${leader.place <= 3 ? 'top-avatar' : ''}`}
                    src={`http://130.162.44.103:5000/api/v1/avatar/${leader.profile.avatar}`}
                    alt=''
                  />
                </td>
                <td>{leader.points}</td>
                <td>{leader.bets}</td>
                <td>{leader.wins}</td>
                <td className='th-hide'>{leader.profile.rating.rating} %</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='dektop-leader-check' style={{ textAlign: 'center' }}>
          Oczekiwanie na rozgrywki...
        </p>
      )}

      <table className='panel-leader-mobile'>
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          {leadersData.map(leader => (
            <tr
              key={leader.public_id}
              className={`top-panel-player ${
                leader.place <= 3 ? 'top-players' : ''
              }`}
            >
              <td className='leader-stats-box'>
                <div className='top-leader-box'>
                  <span className='leader-place top-leader-box-item'>
                    {' '}
                    {leader.place}
                  </span>
                  <p className='top-leader-box-item'> {leader.profile.name} </p>
                  <img
                    className={` top-leader-box-item leader-box-img ${
                      leader.place <= 3 ? 'top-avatar' : ''
                    }`}
                    src={`http://130.162.44.103:5000/api/v1/avatar/${leader.profile.avatar}`}
                    alt=''
                    width={40}
                  />
                </div>
                <div className='leader-stats'>
                  <p>
                    Punkty
                    <br /> {leader.points}
                  </p>
                  <p>
                    Bety <br />
                    {leader.bets}
                  </p>
                  <p>
                    Winy <br />
                    {leader.wins}
                  </p>
                  <p>
                    Rating <br />
                    {leader.profile.rating.rating} %
                  </p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        {leadersData.length <= 0 && (
          <p style={{ textAlign: 'center' }}>Oczekiwanie na rozgrywki...</p>
        )}
      </table>
    </section>
  )
}
export default PanelLeaderboard
