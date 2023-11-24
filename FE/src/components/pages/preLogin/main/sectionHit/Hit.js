import createAccount from '../../../../../assets/images/front/raccoon-account.webp'
import getPoints from '../../../../../assets/images/front/raccoon-points.webp'
import beLeader from '../../../../../assets/images/front/raccoon-leader.webp'
import arrowOne from '../../../../../assets/images/front/arrow1.webp'
import arrowTwo from '../../../../../assets/images/front/arrow2.webp'
import './hit.css'

function Hit () {
  return (
    <section className='app-wrap'>
      <hr />

      <h2 className='section-title'>
        <span className='span-brand'> Jak</span> To Działa?
      </h2>

      <div className='hit-box'>
        <div className='hit-item'>
          <div className='hit-text'>
            <div>
              <h3 className='span-brand'>
                <span className='hit-span-number'> 1 </span> Stwórz Konto
              </h3>
            </div>
            <p>
              Załóż własne konto, wybierz pseudonim i zgaduj wyniki meczów oraz
              zdarzenia boiskowe. Zdobyte punkty będą widoczne w tabeli wyników.
              Sprawdź, jak się radzisz w porównaniu z innymi uczestnikami.
            </p>
          </div>

          <img
            className='hit-image'
            src={createAccount}
            loading='lazy'
            width={500}
            height={500}
            alt='Cartoon Raccon Creating an Account'
          />
        </div>

        <img className='arrow-one' src={arrowOne} alt='' />

        <div className='hit-item'>
          <img
            className='hit-image hit-image-mid'
            src={getPoints}
            loading='lazy'
            width={500}
            height={500}
            alt='Cartoon Raccon Creating an Account'
          />
          <div className='hit-text'>
            <div>
              <h3 className='span-brand'>
                <span className='hit-span-number'> 2 </span> Zbieraj Punkty
              </h3>
            </div>
            <p>
              Po zakończeniu rozgrywek nasz system automatycznie przydzieli
              odpowiednią ilość punktów do Twojego profilu w zależności od
              trafności Twoich przewidywań.
            </p>
          </div>

          <img
            className='hit-image hit-image-mid-bot'
            src={getPoints}
            loading='lazy'
            width={500}
            height={500}
            alt='Cartoon Raccon Creating an Account'
          />
        </div>

        <img className='arrow-two' src={arrowTwo} alt='' />

        <div className='hit-item'>
          <div className='hit-text'>
            <div>
              <h3 className='span-brand'>
                <span className='hit-span-number'>3</span> Tabela wyników
              </h3>
            </div>
            <p>
              Tabela wyników będzie regularnie aktualizowana, prezentując
              punktację innych użytkowników serwisu. Sprawdź, jak dobrze radzisz
              sobie w porównaniu z innymi i zobacz, na której pozycji aktualnie
              się znajdujesz.
            </p>
          </div>

          <img
            className='hit-image'
            src={beLeader}
            loading='lazy'
            width={500}
            height={500}
            alt='Cartoon Raccon checking leaderboard'
          />
        </div>
      </div>
    </section>
  )
}

export default Hit
