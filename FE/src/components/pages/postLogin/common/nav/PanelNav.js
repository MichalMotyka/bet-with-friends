import { NavLink, Link } from 'react-router-dom'
import './panelnav.css'

function PanelNav () {
  return (
    <nav className='nav-boxa'>
      <Link to='/panel/' className='brand front-brand-logo'>
        Bet With <span className='span-brand'>Friends</span>
      </Link>

      <ul className='panel-ul'>
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
    </nav>
  )
}

export default PanelNav
