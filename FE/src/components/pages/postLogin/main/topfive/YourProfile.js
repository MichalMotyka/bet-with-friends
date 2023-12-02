import { useUser } from '../../context/UserContext'

import './yourprofile.css'

function YourProfile () {
  const { userProfile } = useUser()

  const yourProfile = userProfile && userProfile.length > 0 ? userProfile : null
  console.log(yourProfile)

  return userProfile && userProfile.length > 0 ? (
    <div className='panel-side-box'>
      <h2 className='panel-header'>
        Twój <span className='span-brand'>Profil</span>
        <div className='your-profile'>
          <img
            src={yourProfile.avatar}
            alt=''
            className='avatar top-typer-avatar'
            height={110}
            width={110}
          />
          <p>{yourProfile.name}</p>
          <p>Punkty: {yourProfile.points}</p>
          <p>Trafienia: {yourProfile.rating.wins}</p>
          <p>Rating: {yourProfile.rating.rating}</p>
          <button>Twój profil</button>
        </div>
      </h2>
    </div>
  ) : null
}

export default YourProfile
