import { Link } from 'react-router-dom'
import { useUser } from '../../context/UserContext'

import './yourprofile.css'

function YourProfile () {
  const { userProfile } = useUser()

  console.log('User profile:', userProfile)

  if (!userProfile || !userProfile.rating) {
    // Możesz tutaj wyświetlić np. ładowanie, jeśli dane są jeszcze pobierane
    return <div>Loading...</div>
  }

  return (
    <div className='panel-side-box'>
      <h2 className='panel-header'>
        Twój <span className='span-brand'>Profil</span>
      </h2>
      <div className='your-profile'>
        <img
          src={userProfile.avatar}
          alt=''
          className={`avatar ${
            userProfile.ranking.place <= 3 ? 'top-typer-avatar' : null
          } `}
          height={110}
          width={110}
        />
        <p className='your-name'>{userProfile.name}</p>
        <p>Punkty: {userProfile.points}</p>
        <p>Pozycja: {userProfile.ranking.place}</p>
        <Link to='/panel/profile' className='your-profile-btn'>
          Profil
        </Link>
      </div>
    </div>
  )
}

export default YourProfile
