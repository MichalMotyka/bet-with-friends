import { useEffect, useState } from 'react'
import './myconfig.css'

function MyConfig () {
  const [changeAvatar, setChangeAvatar] = useState([])
  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const [newNick, setNewNick] = useState('')

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
        setChangeAvatar(jsonData)
      } catch (error) {
        console.error('Błąd pobierania danych:', error)
      }
    }

    fetchData()
  }, [])

  const changeAvatarBtn = avatar => {
    setSelectedAvatar(avatar)
  }

  const handleAvatarChange = async () => {
    if (!selectedAvatar) {
      console.error('Nie wybrano avatara')
      return
    }

    try {
      const avatarResponse = await fetch(
        'http://130.162.44.103:5000/api/v1/profile/',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            avatar: selectedAvatar
          })
        }
      )

      if (avatarResponse.ok) {
        console.log('Zmiana avatara udana')
        // Tutaj możesz dodać logikę, która aktualizuje UI w odpowiedzi na udaną zmianę avatara
      } else {
        console.error('Błąd podczas zmiany avatara')
      }
    } catch (error) {
      console.error('Błąd podczas wysyłania żądania:', error)
    }
  }

  const handleNickChange = async () => {
    try {
      const nickResponse = await fetch(
        'http://130.162.44.103:5000/api/v1/profile',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: newNick
          })
        }
      )

      if (nickResponse.ok) {
        console.log('Zmiana nicku udana')
        // Tutaj możesz dodać logikę, która aktualizuje UI w odpowiedzi na udaną zmianę nicku
      } else {
        console.error('Błąd podczas zmiany nicku')
      }
    } catch (error) {
      console.error('Błąd podczas wysyłania żądania:', error)
    } finally {
      // Resetuj pole po zmianie nicku
      setNewNick('')
    }
  }

  return (
    <>
      <div className='tab-config'>
        <form className='config-form'>
          <label className='config-form-item'>Zmień nick:</label>
          <input
            className='config-form-item'
            type='text'
            placeholder='Nowy nick...'
            value={newNick}
            min={3}
            max={20}
            onChange={e => setNewNick(e.target.value)}
          />
          <button
            className='config-btn'
            disabled={
              newNick.length >= 3 && newNick.length <= 20 ? false : true
            }
            onClick={handleNickChange}
          >
            Zmień nick
          </button>
        </form>

        <div className='config-avatar-box'>
          <p>Wybierz i zmień avatar</p>
          <div className='avatar-list'>
            {changeAvatar.map(avatar => (
              <img
                key={avatar.avatar}
                src={`http://130.162.44.103:5000/api/v1/avatar/${avatar.avatar}`}
                alt={`Avatar ${avatar.id}`}
                className={`avatar-item ${
                  selectedAvatar === avatar.id ? 'selected' : ''
                }`}
                onClick={() => changeAvatarBtn(avatar.avatar)}
              />
            ))}
          </div>

          <p>Twój wybór:</p>
          {selectedAvatar && (
            <>
              <img
                src={`http://130.162.44.103:5000/api/v1/avatar/${selectedAvatar}`}
                alt='Selected Avatar'
                className='selected-avatar'
                width={150}
              />
              <button className='config-btn' onClick={handleAvatarChange}>
                Zmień avatar
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default MyConfig
