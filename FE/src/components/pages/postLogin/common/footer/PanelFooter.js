import { MdOutlineAlternateEmail } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './Panelfooter.css'
import { useState } from 'react'

import { FcHome } from 'react-icons/fc'
import { FcSms } from 'react-icons/fc'
import { FcCalendar } from 'react-icons/fc'
import { FcBusinessman } from 'react-icons/fc'
import { FcBullish } from 'react-icons/fc'
import { useAuth } from '../../../../auth/authcontext/AuthContext'

import { useTranslation } from 'react-i18next'

import DisplayMessages from '../../main/chat/chatdata/DisplayMessages'

function PanelFooter () {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()
  const [isChatVisible, setIsChatVisible] = useState(false)
  const { darkMode } = useAuth()

  const handleShowChat = () => {
    setIsChatVisible(!isChatVisible)
  }

  const handleMenuClick = () => {
    // Zamknij okno chatu po kliknięciu na element dolnego menu
    setIsChatVisible(false)
  }

  return (
    <>
      <p className={`brand panel-footer ${darkMode && 'darkmode-on'}`}>
        Bet With <span className='span-brand'>Friends</span>
        <MdOutlineAlternateEmail />
        {currentYear}
      </p>

      <ul className={`footer-panel ${darkMode && 'darkmode-on'}`}>
        <li
          className={`show-chat ${isChatVisible ? ' visible' : ' hidden'}`}
          style={
            darkMode
              ? { backgroundColor: 'black' }
              : { backgroundColor: 'white' }
          }
        >
          {isChatVisible && <DisplayMessages />}
        </li>

        <li className='footer-panel-li'>
          <Link
            style={darkMode ? { color: 'white' } : { color: 'black' }}
            to='/panel/'
            className='footer-panel-item'
            onClick={handleMenuClick}
          >
            <FcHome /> <br /> Panel
          </Link>
        </li>
        <li className='footer-panel-li'>
          <Link
            style={darkMode ? { color: 'white' } : { color: 'black' }}
            to='/panel/toptypers'
            className='footer-panel-item'
            onClick={handleMenuClick}
          >
            <FcBullish /> <br /> {t('panelFooter.table')}
          </Link>
        </li>
        <li className='footer-panel-li'>
          <Link
            style={darkMode ? { color: 'white' } : { color: 'black' }}
            to='/panel/schedule'
            className='footer-panel-item'
            onClick={handleMenuClick}
          >
            <FcCalendar /> <br /> {t('panelFooter.schedule')}
          </Link>
        </li>
        <li className='footer-panel-li'>
          <Link
            style={darkMode ? { color: 'white' } : { color: 'black' }}
            to='/panel/profile'
            className='footer-panel-item'
            onClick={handleMenuClick}
          >
            <FcBusinessman /> <br /> {t('panelFooter.profile')}
          </Link>
        </li>
        <li className='footer-panel-li'>
          <button
            style={darkMode ? { color: 'white' } : { color: 'black' }}
            onClick={handleShowChat}
            className={`footer-panel-item footer-panel-chat ${
              isChatVisible && 'btn-chat-active'
            }`}
          >
            <FcSms /> <br /> Chat
          </button>
        </li>
      </ul>
    </>
  )
}

export default PanelFooter
