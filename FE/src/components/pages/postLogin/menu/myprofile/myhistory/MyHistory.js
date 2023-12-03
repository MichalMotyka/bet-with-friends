import { FcCalendar } from 'react-icons/fc'

import './myhistory.css'
function MyHistory (props) {
  const userStats = props.props

  return (
    <>
      <div className='tab-stats'>
        <p className='stats-item'>
          Historia Betowania <FcCalendar />
        </p>
        <p className='stats-item'>Miejsce: {userStats.ranking.place}</p>
        <p className='stats-item'>Punkty: {userStats.points}</p>
        <p className='stats-item'>Bety: {userStats.rating.bets}</p>
        <p className='stats-item'>Trafienia: {userStats.rating.wins}</p>
        <p className='stats-item'>Rating: {userStats.rating.rating} %</p>
      </div>
    </>
  )
}

export default MyHistory
