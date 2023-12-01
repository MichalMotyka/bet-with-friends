import { NavLink, Link } from 'react-router-dom'
import './panelnav.css'
import UserMenu from '../../usermenu/UserMenu'

function PanelNav () {
  return (
    <>
      <nav className='nav-panel'>
        <div className='nav-panel-box'>
          <Link to='/panel/' className='brand front-brand-logo'>
            Bet With <span className='span-brand'>Friends</span>
          </Link>

          <div className='border'></div>

          <ul className='panel-menu'>
            <li className='panel-item'>
              <NavLink to='/panel/'>Panel</NavLink>
            </li>
            <li className='panel-item'>
              <NavLink to='/panel/toptypers'>Leaderboard</NavLink>
            </li>
            <li className='panel-item'>
              <NavLink to='/panel/schedule'>Terminarz</NavLink>
            </li>
            <li className='panel-item'>
              <NavLink to='/panel/profile'>Mój profil</NavLink>
            </li>
          </ul>
        </div>
        <UserMenu />
      </nav>
    </>
  )
}

export default PanelNav
