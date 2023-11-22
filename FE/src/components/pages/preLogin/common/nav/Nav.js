import { NavLink, Link } from 'react-router-dom'
import './nav.css'

function Nav () {
  return (
    <nav className='app-wrap'>
      <Link to='/' className='brand'>
        Bet With <span className='span-brand'>Friends</span>
      </Link>
      <ul className='nav-front'>
        <li>
          {/* link jest aktywny tylko wtedy, gdy ścieżka URL jest identyczna z określoną ścieżką. 
            NavLink posiadafunkcje która za pomocą atrybutu activeClassName nadaje klasę active do aktualnie otwartego elementu menu.
          */}
          <NavLink
            className='nav-menu-item'
            exact
            to='/'
            activeClassName='active'
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className='nav-menu-item'
            to='/matches'
            activeClassName='active'
          >
            Mecze
          </NavLink>
        </li>
        <li>
          <NavLink
            className='nav-menu-item'
            to='/leaderboard'
            activeClassName='active'
          >
            Leaderboard
          </NavLink>
        </li>
        <li>
          <NavLink
            className='nav-menu-item'
            to='/about'
            activeClassName='active'
          >
            O nas
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/login'
            className='nav-front-login-btn'
            activeClassName='active'
          >
            Log In
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/singUp'
            className='nav-front-signup-btn'
            activeClassName='active'
          >
            Sign Up
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
