import { FcDataConfiguration } from 'react-icons/fc'

import './myconfig.css'
function MyConfig (props) {
  const userStats = props.props

  return (
    <>
      <div className='tab-stats'>
        <p className='stats-item'>
          Ustawienia <FcDataConfiguration />
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

export default MyConfig
