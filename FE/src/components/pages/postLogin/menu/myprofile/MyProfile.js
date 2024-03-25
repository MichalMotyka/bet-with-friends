import { useState } from 'react'
import { useUser } from '../../context/UserContext'
import MyStats from './mystats/MyStats'
import MyAchiv from './myachiv/MyAchiv'
import MyHistory from './myhistory/MyHistory'
import MyConfig from './myconfig/MyConfig'
import './myprofile.css'
import { useAuth } from '../../../../auth/authcontext/AuthContext'
import { useTranslation } from 'react-i18next'

function MyProfile () {
  const { t } = useTranslation()
  const { userProfile } = useUser()
  const [activeTab, setActiveTab] = useState('Statystyki')
  const { darkMode } = useAuth()
  const experience = userProfile.experience
  const level = userProfile.level
  const style = { '--percentage': `${experience}%` }

  const handleTabClick = tab => {
    setActiveTab(tab)
  }

  return Object.keys(userProfile).length > 0 ? (
    <section style={{ marginBottom: '30px' }} className='app-wrap '>
      <div>
        {/* <h2 className='section-title panel-header '>
          Mój <span className='span-brand'>profil</span>{' '}
        </h2> */}
      </div>
      <div className='my-profile'>
        <div className='my-header'>
          <img src={userProfile.avatar} alt='' className='avatar ' width={80} />

          <p className='your-name'>
            {t('panelProfile.hi')}, {userProfile.name} (lvl {level})
          </p>

          <p
            className='level-item'
            style={{ ...style, color: darkMode ? 'black' : null }}
          >
            EXP: {experience} / 100
          </p>
        </div>
        <div className='tabs'>
          <button
            className={`tabs-btn ${
              activeTab === `${t('panelProfile.stats')}` ? 'active-btn' : ''
            }`}
            onClick={() => handleTabClick('Statystyki')}
          >
            {t('panelProfile.stats')}
          </button>
          <button
            className={`tabs-btn ${
              activeTab === `${t('panelProfile.achiv')}` ? 'active-btn' : ''
            }`}
            onClick={() => handleTabClick('Osiągnięcia')}
          >
            {t('panelProfile.achiv')}
          </button>
          <button
            className={`tabs-btn ${
              activeTab === `${t('panelProfile.history')}` ? 'active-btn' : ''
            }`}
            onClick={() => handleTabClick('Historia')}
          >
            {t('panelProfile.history')}
          </button>
          <button
            className={`tabs-btn ${
              activeTab === `${t('panelProfile.settings')}` ? 'active-btn' : ''
            }`}
            onClick={() => handleTabClick('Ustawienia')}
          >
            {t('panelProfile.settings')}
          </button>
        </div>

        <div className='tab-content wave-box '>
          <hr className='hr-panel' />
          {activeTab === `${t('panelProfile.stats')}` && (
            <MyStats props={userProfile} />
          )}
          {activeTab === `${t('panelProfile.achiv')}` && (
            <MyAchiv props={userProfile} />
          )}
          {activeTab === `${t('panelProfile.history')}` && (
            <MyHistory props={userProfile} />
          )}
          {activeTab === `${t('panelProfile.settings')}` && <MyConfig />}
        </div>
      </div>
    </section>
  ) : null
}

export default MyProfile
