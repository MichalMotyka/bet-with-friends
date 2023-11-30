import { useEffect, useState } from 'react'

function UserInfo () {
  const [userProfile, setUserProfile] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:5000/api/v1/profile'
        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })

        console.log('Response Status:', response.status)
        console.log('Response Headers:', response.headers)

        // Log the cookies received
        console.log(document.cookie)

        if (!response.ok) {
          throw new Error(
            `Network response was not ok, status: ${response.status}`
          )
        }

        const data = await response.json()
        setUserProfile(data)
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error)
      }
    }

    fetchData()
  }, [])
  console.log(userProfile)
  return userProfile
}

export default UserInfo
