import createAccount from '../../../../../assets/images/front/raccoon-account.webp'
import getPoints from '../../../../../assets/images/front/raccoon-points.webp'
import beLeader from '../../../../../assets/images/front/raccoon-leader.webp'

function Hit () {
  return (
    <section>
      <hr />

      <h2 className='section-title'>
        <span className='span-brand'> Jak</span> To Działa?
      </h2>

      <div>
        <div>
          <div>
            <div>
              <span>IKONA 1</span>
              <h3 className='span-brand'>Stwórz Konto</h3>
            </div>
            <p>
              Załóż własne konto, wybierz pseudonim i zgaduj wyniki meczów oraz
              zdarzenia boiskowe. Zdobyte punkty będą widoczne w tabeli wyników.
              Sprawdź, jak się radzisz w porównaniu z innymi uczestnikami.
            </p>
          </div>

          <div>
            <img src={createAccount} alt='Cartoon Raccon Creating an Account' />
          </div>
        </div>

        <img alt='' />

        <div>
          <div>
            <div>
              <img src={getPoints} alt='Cartoon Raccon collecting points' />
            </div>

            <div>
              <span>IKONA 2</span>
              <h3 className='span-brand'>Zbieraj Punkty</h3>
            </div>
            <p>
              Po zakończeniu rozgrywek nasz system automatycznie przydzieli
              odpowiednią ilość punktów do Twojego profilu w zależności od
              trafności Twoich przewidywań.
            </p>
          </div>
        </div>

        <img alt='' />

        <div>
          <div>
            <div>
              <span>IKONA 3</span>
              <h3 className='span-brand'>Tabela wyników</h3>
            </div>
            <p>
              Po zakończeniu rozgrywek nasz system automatycznie przydzieli
              odpowiednią ilość punktów do Twojego profilu w zależności od
              trafności Twoich przewidywań
            </p>
          </div>

          <div>
            <img src={beLeader} alt='Cartoon Raccon checking leaderboard' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hit
