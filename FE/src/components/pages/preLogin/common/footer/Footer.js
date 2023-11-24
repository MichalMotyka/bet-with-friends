import { Link } from 'react-router-dom'
import footerLogo from '../../../../../assets/images/front/footer-logo.webp'
import './footer.css'

function Footer () {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className='front-footer'>
      <div className='app-wrap'>
        <div className='footer-front-box footer-front-text '>
          <div className='footer-front-item'>
            <Link
              to='/'
              onClick={scrollToTop}
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
                <Link className='footer-menu-item' to='/' onClick={scrollToTop}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className='footer-menu-item'
                  to='/matches'
                  onClick={scrollToTop}
                >
                  Mecze
                </Link>
              </li>
              <li>
                <Link
                  className='footer-menu-item'
                  to='/leaderboard'
                  onClick={scrollToTop}
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  className='footer-menu-item'
                  to='/about'
                  onClick={scrollToTop}
                >
                  O nas
                </Link>
              </li>
              <li>
                <Link
                  className='footer-menu-item'
                  to='/login'
                  onClick={scrollToTop}
                >
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  className='footer-menu-item'
                  to='/singUp'
                  onClick={scrollToTop}
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
