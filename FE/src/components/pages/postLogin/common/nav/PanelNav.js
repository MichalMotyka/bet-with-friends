import { Link } from 'react-router-dom'
import UserMenu from '../../usermenu/UserMenu'
import { useAuth } from '../../../../auth/authcontext/AuthContext'
import './panelnav.css'

function PanelNav () {
  const { darkMode } = useAuth()

  return (
    <>
      <nav className={`nav-panel ${darkMode && 'darkmode-on'}`}>
        <div className='nav-panel-box'>
          <Link to='/panel/' className='brand front-brand-logo'>
            Bet With <span className='span-brand'>Friends</span>
          </Link>

          <div className='border'></div>

          <ul className='panel-menu'>
            <li className='panel-item'>
              <Link to='/panel/'>Panel</Link>
            </li>
            <li className='panel-item'>
              <Link to='/panel/toptypers'>Leaderboard</Link>
            </li>
            <li className='panel-item'>
              <Link to='/panel/schedule'>Terminarz</Link>
            </li>
            <li className='panel-item'>
              <Link to='/panel/profile'>Profil</Link>
            </li>
          </ul>
        </div>
        <UserMenu />
      </nav>
    </>
  )
}

export default PanelNav
