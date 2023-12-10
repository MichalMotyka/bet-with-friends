import PatoPokers from './images/patopokers.webp'
import './ads.css'

function Ads () {
  return (
    <div className='panel-side-box'>
      <h2 className='panel-header'>
        Twoja <span className='span-brand'>Reklama!</span>
      </h2>
      <div className='ad-box'>
        <img className='patopoker' src={PatoPokers} alt='' />
      </div>{' '}
    </div>
  )
}

export default Ads
