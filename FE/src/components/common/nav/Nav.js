import { Link } from 'react-router-dom'

function Nav () {
  return (
    <nav>
      <Link to='/'>BET WITH FRIENDS</Link>

      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/matches'>Mecze</Link>
        </li>
        <li>
          <Link to='/about'>O nas</Link>
        </li>
        <li>
          <Link to='/leaderboard'>Leaderboard</Link>
        </li>
        <li>
          <Link to='/login'>Log in</Link>
        </li>
        <li>
          <Link to='/singUp'>Sign Up</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
