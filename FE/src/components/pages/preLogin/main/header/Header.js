import mainLogo from '../../../../../assets/images/front/raccoon-header1.webp'

function Header () {
  return (
    <header>
      <div>
        <div>
          <h1>
            Obstawiaj wyniki rozgrywek{' '}
            <span className='span-brand'>Euro 2024</span> i porównuj się ze
            znajomymi!
          </h1>
          <p>
            Przewiduj wyniki meczów oraz inne wydarzenia związane z grą,
            zdobywaj punkty za trafne typy. Po zakończonych rozgrywkach
            sprawdzaj swoją punktację i zobacz, jakie miejsce zajmujesz w tabeli
            zwycięzców.
          </p>
          <button>Dołącz Teraz</button>
        </div>
        <div>
          <img src={mainLogo} alt='Bet With Friends main logo' />
        </div>
      </div>
    </header>
  )
}

export default Header
