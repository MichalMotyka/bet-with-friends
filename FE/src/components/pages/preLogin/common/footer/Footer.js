import { Link } from 'react-router-dom'
import footerLogo from '../../../../../assets/images/front/footer-logo.webp'

function Footer () {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer>
      <div>
        <div>
          <Link to='/' onClick={scrollToTop} className='brand'>
            Bet With <span className='span-brand'>Friends</span>
          </Link>
          <p>
            Dołącz do społeczności typujących! Przewiduj wyniki meczów,
            rywalizuj z innymi i zdobywaj punkty. © [2023] [Best With Friends]
            Wszelkie prawa zastrzeżone.
          </p>
        </div>

        <div>
          <p>Navigation</p>
          <ul>
            <li>
              <Link to='/' onClick={scrollToTop}>
                Home
              </Link>
            </li>
            <li>
              <Link to='/matches' onClick={scrollToTop}>
                Mecze
              </Link>
            </li>
            <li>
              <Link to='/leaderboard' onClick={scrollToTop}>
                Leaderboard
              </Link>
            </li>
            <li>
              <Link to='/about' onClick={scrollToTop}>
                O nas
              </Link>
            </li>
            <li>
              <Link to='/login' onClick={scrollToTop}>
                Log In
              </Link>
            </li>
            <li>
              <Link to='/singUp' onClick={scrollToTop}>
                Sign Up
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <img src={footerLogo} alt='' />
        </div>
      </div>

      <hr />

      <p>
        Bet With <span className='span-brand'>Friends</span> @{currentYear}
      </p>
    </footer>
  )
}

export default Footer
