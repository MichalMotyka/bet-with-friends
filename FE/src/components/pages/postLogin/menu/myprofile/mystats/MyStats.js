import { FcGlobe } from 'react-icons/fc'
import { FcRating } from 'react-icons/fc'
import { FcInspection } from 'react-icons/fc'
import { FcSalesPerformance } from 'react-icons/fc'
import { FcBullish } from 'react-icons/fc'

import './mystats.css'
function MyStats (props) {
  const userStats = props.props

  console.log(userStats)

  const percentage = userStats.rating.rating
  const style = { '--percentage': `${percentage}%` }

  return (
    <>
      <div className='stats-box'>
        <p>Statystyki globalne:</p>
        <div className='tab-stats'>
          <p className='stats-item'>
            <FcGlobe /> Miejsce <br /> <span>{userStats.ranking.place} </span>{' '}
          </p>
          <p className='stats-item'>
            <FcBullish /> Punkty <br /> <span>{userStats.points}</span>
          </p>
          <p className='stats-item'>
            <FcSalesPerformance /> Bety <br />{' '}
            <span> {userStats.rating.bets}</span>
          </p>
          <p className='stats-item'>
            <FcInspection /> Trafienia <br />{' '}
            <span>{userStats.rating.wins}</span>
          </p>

          <p className='stats-item' style={style}>
            <FcRating /> Rating
            <br />
            <span className='stats-item-chart'>{userStats.rating.rating}</span>%
          </p>
        </div>

        <p>Statystyki ligowe:</p>
        <div className='tab-stats'>
          <ul className='tab-stats-ul'>
            {userStats.ranking_competetition.map(userComp => (
              <li className='tab-stats-item' key={userComp.public_id}>
                <div className='tab-stats-comp'>
                  <img
                    src={userComp.competetition.emblem}
                    alt='competition eblem'
                    width={30}
                    height={30}
                  />
                  <p>{userComp.competetition.name}</p>
                </div>
                <div className='tab-stats-span'>
                  <span>
                    Miejsce: {` `}
                    {userComp.place}
                  </span>
                  <span>
                    Punkty: {` `}
                    {userComp.points}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default MyStats
