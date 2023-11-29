import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn')
    return storedLoggedIn ? JSON.parse(storedLoggedIn) : false
  })

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn')
    if (storedLoggedIn) {
      setLoggedIn(JSON.parse(storedLoggedIn))
    }
  }, [])

  const login = () => {
    setLoggedIn(true)
    localStorage.setItem('loggedIn', JSON.stringify(true))
    console.log('User logged in')
  }

  const logout = () => {
    setLoggedIn(false)
    localStorage.removeItem('loggedIn')
    console.log('User logged out')
  }

//   const refreshTokens = async () => {
//     try {
//       // Tutaj dokonaj odpowiedniego zapytania do serwera w celu odświeżenia tokenów
//       const refreshToken = localStorage.getItem('refreshToken')
//       const response = await fetch(
//         'http://130.162.44.103:5000/api/v1/refresh',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           credentials: 'include',
//           body: JSON.stringify({ refreshToken })
//         }
//       )

//       if (response.status === 401 || response.status === 403) {
//         // W przypadku błędu autoryzacji, przekieruj na stronę logowania
//         console.error(
//           'Błąd autoryzacji podczas odświeżania tokenów:',
//           response.statusText
//         )
//         logout() // Wyloguj użytkownika
//         throw new Error('Błąd autoryzacji podczas odświeżania tokenów')
//       }
//     } catch (error) {
//       console.error('Błąd podczas odświeżania tokenów:', error)
//       throw error
//     }
//   }



// refreshTokens
  return (
    <AuthContext.Provider value={{ loggedIn, login, logout,  }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
