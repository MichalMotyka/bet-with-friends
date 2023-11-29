import { Link } from 'react-router-dom'
import { useAuth } from '../../../auth/authcontext/AuthContext'
import { useState } from 'react'

import './usermenu.css'

function UserMenu () {
  const [showUserMenu, setUserMenu] = useState(false)
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  const handleUserMenu = () => {
    console.log('Clicked on user menu')
    setUserMenu(!showUserMenu)
  }

  return (
    <div className='user-menu-box'>
      <p style={{ padding: '0 10px 0 0', fontWeight: 'bold' }}>
        Nazwa użytkownika
      </p>
      <img
        src='http://130.162.44.103:5000/api/v1/avatar/ava1'
        alt=''
        className='user-menu-avatar'
        onClick={handleUserMenu}
      />
      <ul className={` ${showUserMenu ? 'show-user-menu' : 'hide-user-menu'}`}>
        <li className='panel-item'>
          <Link to='/panel/'>Panel</Link>
        </li>
        <li className='panel-item'>
          <Link to='/panel/toptypers'>Leaderboard</Link>
        </li>
        <li className='panel-item'>
          <Link to='/panel/schedule'>Terminarz</Link>
        </li>
        <li className='panel-item'>
          <Link to='/panel/profile'>Mój profil</Link>
        </li>
        <label htmlFor='darkmode'>Darkmode</label>
        <input type='checkbox' id='darkmode' />
        <button onClick={handleLogout}>Wyloguj</button>
      </ul>
    </div>
  )
}

export default UserMenu
