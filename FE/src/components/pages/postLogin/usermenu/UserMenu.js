import { Link } from 'react-router-dom'
import { useAuth } from '../../../auth/authcontext/AuthContext'
import { useUser } from '../context/UserContext'
import { useState } from 'react'

import './usermenu.css'

function UserMenu () {
  const { userProfile } = useUser()
  const [showUserMenu, setUserMenu] = useState(false)
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  const handleUserMenu = () => {
    setUserMenu(!showUserMenu)
  }
console.log(userProfile.avatar);

  return (
    <div className='user-menu-box'>
      <p style={{ padding: '0 10px 0 0', fontWeight: 'bold' }}>
        {userProfile.name}
      </p>
      <img
        src={userProfile.avatar}
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
