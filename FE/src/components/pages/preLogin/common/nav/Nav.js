import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'
import hamOpen from '../../../../../assets/images/hamburger/hamOpen.webp'
import hamClose from '../../../../../assets/images/hamburger/hamClose.webp'
import './nav.css'

// activeClassName='active'

function Nav () {
  const [open, setOpen] = useState(false)

  const hamburgerMenu = () => {
    setOpen(!open)
  }

  // <div className='app-wrap'>

  return (
    <nav className='app-wrap nav-box'>
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
          <NavLink className='nav-menu-item' to='/'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className='nav-menu-item' to='/matches'>
            Mecze
          </NavLink>
        </li>
        <li>
          <NavLink className='nav-menu-item' to='/leaderboard'>
            Leaderboard
          </NavLink>
        </li>
        <li>
          <NavLink className='nav-menu-item' to='/about'>
            O nas
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' className='nav-front-login-btn'>
            Log In
          </NavLink>
        </li>
        <li>
          <NavLink to='/signup' className='nav-front-signup-btn'>
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
            width={50}
            height={50}
            src={hamOpen}
            alt='open hamburger menu icon'
          />
        ) : (
          <img
            width={50}
            height={50}
            src={hamClose}
            alt='closed hamburger menu icon'
          />
        )}
      </button>
    </nav>
  )
}

export default Nav
