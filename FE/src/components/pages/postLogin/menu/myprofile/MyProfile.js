import React, { useEffect, useState } from 'react'

function MyProfile () {
  const [userProfile, setUserProfile] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://130.162.44.103:5000/api/v1/profile'
        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (!response.ok) {
          throw new Error(
            `Network response was not ok, status: ${response.status}`
          )
        }

        const data = await response.json()
        setUserProfile(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])
  console.log(userProfile)

  return (
    <section style={{ marginBottom: '30px' }} className='app-wrap'>
      <div className='login'>
        <h2 className='section-title'>Mój profil</h2>
      </div>
    </section>
  )
}

export default MyProfile
