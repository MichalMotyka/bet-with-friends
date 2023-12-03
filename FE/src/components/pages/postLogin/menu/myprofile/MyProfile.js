import { useEffect, useState } from 'react'
import { useUser } from '../../context/UserContext'
import './myprofile.css'

function MyProfile () {
  const [avatar, setAvatar] = useState([])
  const { userProfile } = useUser()

  console.log(userProfile)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://130.162.44.103:5000/api/v1/avatar',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        const jsonData = await response.json()
        setAvatar(jsonData)
      } catch (error) {
        console.error('Błąd pobierania danych:', error)
      }
    }

    fetchData()
  }, [])

  return Object.keys(avatar).length && Object.keys(userProfile).length > 0 ? (
    <section style={{ marginBottom: '30px' }} className='app-wrap'>
      <div className='login'>
        <h2 className='section-title'>Mój profil</h2>
      </div>
      <div className='my-profile'>
        <img
          src={`http://130.162.44.103:5000/api/v1/avatar/${avatar[1].avatar}`}
          alt=''
        />
      </div>
    </section>
  ) : null
}

export default MyProfile
// http://130.162.44.103:5000/api/v1/avatar/
