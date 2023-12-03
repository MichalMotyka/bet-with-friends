import { MdOutlineAlternateEmail } from 'react-icons/md'
import './Panelfooter.css'

function PanelFooter () {
  const currentYear = new Date().getFullYear()
  return (
    <>
      <p className='brand panel-footer'>
        Bet With <span className='span-brand'>Friends</span>
        <MdOutlineAlternateEmail />
        {currentYear}
      </p>
    </>
  )
}

export default PanelFooter
