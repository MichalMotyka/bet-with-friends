import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'
import hamOpen from '../../../../../assets/images/hamburger/hamOpen.webp'
import hamClose from '../../../../../assets/images/hamburger/hamClose.webp'
import './nav.css'

function Nav () {
  const [open, setOpen] = useState(false)

  const hamburgerMenu = () => {
    setOpen(!open)
  }

  return (
    <nav className='app-wrap'>
      <Link to='/' className='brand front-brand-logo'>
        Bet With <span className='span-brand'>Friends</span>
      </Link>

      <ul
        className={`nav-front ${
          open ? 'hamburger-display-flex' : 'hamburger-display-none'
        }`}
        onClick={hamburgerMenu}
      >
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
            activeclassname='active'
          >
            Sign Up
          </NavLink>
        </li>
      </ul>

      <button
        style={{ background: 'none', border: 'none' }}
        className='hamburger-btn'
        onClick={hamburgerMenu}
      >
        {open === false ? (
          <img
            style={{ width: '50px' }}
            src={hamOpen}
            alt='open hamburger menu icon'
          />
        ) : (
          <img
            style={{ width: '50px' }}
            src={hamClose}
            alt='open hamburger menu icon'
          />
        )}
      </button>
    </nav>
  )
}

export default Nav
