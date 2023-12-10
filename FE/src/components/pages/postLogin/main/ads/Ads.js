// import patopoker from './images/patopokers.webp'
import gentelman from './images/gentelman.webp'
import './ads.css'

function Ads () {
  return (
    <div className='panel-side-box'>
      <h2 className='panel-header'>
        Twoja <span className='span-brand'>Reklama</span>
      </h2>
      <div className='ad-box'>
        {/* <img
          className='patopoker'
          src={patopoker}
          alt='Pato Poker best Poker Game!'
          width={220}
          height={400}
        /> */}
      </div>
      <img src={gentelman} alt='test' />
    </div>
  )
}

export default Ads
