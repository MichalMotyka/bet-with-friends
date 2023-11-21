import { Link } from 'react-router-dom'
import './nav.css'

function Nav () {
  return (
    <nav>
      <Link to='/'>
        Bet With <span className='span-brand'>Friends</span>
      </Link>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/matches'>Mecze</Link>
        </li>
        <li>
          <Link to='/leaderboard'>Leaderboard</Link>
        </li>
        <li>
          <Link to='/about'>O nas</Link>
        </li>
        <li>
          <Link to='/login'>Log In</Link>
        </li>
        <li>
          <Link to='/singUp'>Sign Up</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
