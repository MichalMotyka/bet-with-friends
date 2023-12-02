import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

function UserProvider ({ children }) {
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
            'Content-type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Network response was not ok.')
        }

        const data = await response.json()
        setUserProfile(data)
      } catch (error) {
        console.error(`Bład podczas pobierana danych:`, error)
      }
    }
    fetchData()
  }, [])

  return (
    <UserContext.Provider value={{ userProfile }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}

export default UserProvider
