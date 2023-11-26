import { Link } from 'react-router-dom'
import footerLogo from './images/footer-logo.webp'
import { ScrollToTop } from '../../../../utilities/ScrollToTop'
import './footer.css'

function Footer () {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='front-footer'>
      <div className='app-wrap'>
        <div className='footer-front-box footer-front-text '>
          <div className='footer-front-item'>
            <Link
              to='/'
              onClick={ScrollToTop}
              className='brand footer-brand footer-top-brand'
            >
              Bet With <span className='span-brand'>Friends</span>
            </Link>
            <p>
              Dołącz do społeczności typujących! Przewiduj wyniki meczów,
              rywalizuj z innymi i zdobywaj punkty. [Best With Friends ©] [2023]
              Wszelkie prawa zastrzeżone.
            </p>
          </div>

          <div className='footer-front-item '>
            <p style={{ fontSize: '24px' }}>Navigation</p>
            <ul className='footer-front-nav'>
              <li>
                <Link className='footer-menu-item' to='/' onClick={ScrollToTop}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className='footer-menu-item'
                  to='/matches'
                  onClick={ScrollToTop}
                >
                  Mecze
                </Link>
              </li>
              <li>
                <Link
                  className='footer-menu-item'
                  to='/leaderboard'
                  onClick={ScrollToTop}
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  className='footer-menu-item'
                  to='/about'
                  onClick={ScrollToTop}
                >
                  O nas
                </Link>
              </li>
              <li>
                <Link
                  className='footer-menu-item'
                  to='/login'
                  onClick={ScrollToTop}
                >
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  className='footer-menu-item'
                  to='/signup'
                  onClick={ScrollToTop}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <img
            className='footer-front-item footer-front-img'
            src={footerLogo}
            width={250}
            height={250}
            alt=''
          />
        </div>

        <hr />

        <p className='brand footer-brand footer-bot-brand'>
          Bet With <span className='span-brand'>Friends</span> @{currentYear}
        </p>
      </div>
    </footer>
  )
}

export default Footer
