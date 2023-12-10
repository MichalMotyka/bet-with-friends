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


  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await fetch('https://example.com/api/data');
        const data = await response.json();

        console.log('Dane z API:', data);

        if (response.ok) {
          console.log('Gitareczka!');
          // Tutaj możesz dodać kod do przetwarzania pobranych danych
        } else {
          console.error('Błąd pobierania danych z API:', data);
        }
      } catch (error) {
        console.error('Błąd pobierania danych z API:', error);
      }
    };

    // Wywołanie funkcji pobierającej dane z API
    fetchDataFromApi();
  }, []); // Pusta tablica oznacza, że ten efekt będzie uruchomiony tylko raz po zamontowaniu komponentu

  const login = () => {
   

    setLoggedIn(true)
    localStorage.setItem('loggedIn', JSON.stringify(true))
    console.log('User logged in')
  }

  const logout = async () => {
    const url = 'http://130.162.44.103:5000/api/v1/logout'

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        setLoggedIn(false)
        localStorage.removeItem('loggedIn')
        console.log('User logged out')
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
