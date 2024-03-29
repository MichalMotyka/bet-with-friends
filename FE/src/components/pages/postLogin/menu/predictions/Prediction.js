import { useState } from 'react'
import MatchBet from './betting/MatchBet'
import { PredictionLogic } from './data/PredictionLogic'
import TypingRacoon from './images/raccoon-header3.webp'
import { useAuth } from '../../../../auth/authcontext/AuthContext'
import { useTranslation } from 'react-i18next'

import './prediction.css'
function Prediction () {
  const { t } = useTranslation()
  const { darkMode } = useAuth()
  const [isHowToModalVisible, setHowToModalVisibility] = useState(false)

  const {
    matchList,
    currentPage,
    totalMatches,
    competitions,
    selectedCompetition,
    limit,
    setCurrentPage,
    setTotalMatches,
    handleCompetitionChange
  } = PredictionLogic()

  const handleCompetitionNames = competitionName => {
    const translateCompetition = {
      'European Championship': 'Euro 2024',
      'UEFA Champions League': 'Champions League',
      'Premier League': 'Premier League',
      Championship: 'Championship',
      Bundesliga: 'Bundesliga',
      'Serie A': 'Serie A',
      'Campeonato Brasileiro Série A': 'Brasileiro Série A'
    }

    return translateCompetition[competitionName] || competitionName
  }

  const handleHowTo = () => {
    setHowToModalVisibility(true)
  }

  const closeHowToModal = () => {
    setHowToModalVisibility(false)
  }

  return (
    <section className='app-wrap'>
      <div className='pred'>
        {/* BOX INFORMACYJNY: */}
        <div className='pred-box-info'>
          <img
            className='typing-raccoon-top'
            width={180}
            height={180}
            src={TypingRacoon}
            alt=''
          />
          <div className='pred-info-text'>
            <h2 className='section-title panel-header'>
              {t('type.headerA')}{' '}
              <span className='span-brand'> {t('type.headerB')} </span>
            </h2>
            <img
              className='typing-raccoon-bot'
              width={180}
              src={TypingRacoon}
              alt=''
            />

            <button className='how-to-bet' onClick={handleHowTo}>
              {t('type.how')}
            </button>

            {/* MODAL */}
            {isHowToModalVisible && (
              <div className='how-to-modal' onClick={closeHowToModal}>
                <div
                  className={`how-to-modal-content ${
                    darkMode && 'darkmode-on'
                  }`}
                >
                  <h4> {t('type.how')}:</h4>
                  <span className='close-modal'>X</span>
                  <ol>
                    <li>
                      <p>{t('type.info1')}</p>
                    </li>

                    <li>
                      <p>{t('type.info2')}</p>
                    </li>
                    <li>
                      <p>
                        {t('type.info3')}
                        <br />
                        {t('type.info4')}
                      </p>
                    </li>
                  </ol>
                </div>
              </div>
            )}

            <p className='how-to-bet-p'>
              {t('type.desc1')} <br /> {t('type.desc2')} <br />
              {t('type.desc3')} <br />
              <b>{t('type.desc4')}</b>
              {t('type.gl')}
            </p>
          </div>
        </div>
        <hr className='hr-panel'></hr>

        {/* LISTA COMPETITION DO BETOWANIA - NA GUZIKI: */}

        <div className='schedule'>
          <div className='competition-buttons'>
            {competitions.map(competition => (
              <button
                key={competition.public_id}
                style={
                  darkMode
                    ? { color: 'white', backgroundColor: '#1F1F1F' }
                    : { color: 'black' }
                }
                className={`competition-btn ${
                  selectedCompetition === competition.public_id
                    ? 'active-schedule'
                    : ''
                }`}
                onClick={() => handleCompetitionChange(competition.public_id)}
              >
                <img
                  width={50}
                  height={50}
                  src={competition.emblem}
                  alt=''
                  className='comp-button-img'
                  style={{ backgroundColor: 'white', borderRadius: '2px' }}
                />
                {handleCompetitionNames(competition.name)}
              </button>
            ))}
          </div>
          <hr className='hr-panel-bot'></hr>

          <MatchBet
            matchList={matchList}
            currentPage={currentPage}
            totalMatches={totalMatches}
            limit={limit}
            setCurrentPage={setCurrentPage}
            setTotalMatches={setTotalMatches}
          />
        </div>
      </div>
    </section>
  )
}

export default Prediction
