import { useEffect } from 'react'
import PanelNav from './common/nav/PanelNav'
import GroupList from './main/grouplist/GroupList'
import PanelRounting from './common/routing/PanelRouting'
import Ads from './main/ads/Ads'
import PanelFooter from './common/footer/PanelFooter'
import TopParent from './main/topParent/TopParent'
import UserProvider from './context/UserContext'
import { useAuth } from '../../auth/authcontext/AuthContext'
import { useNavigate } from 'react-router-dom'
import './panel.css'

function Panel () {
  const { loggedIn, login } = useAuth()
  const navigate = useNavigate()

  console.log('Dane logowania:', loggedIn)

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await fetch(
          'http://130.162.44.103:5000/api/v1/auto-login'
        )
        const data = await response.json()

        console.log('Dane z API:', data)

        if (response.ok) {
          console.log('Gitareczka!')
          login()
          // Tutaj możesz dodać kod do przetwarzania pobranych danych
        } else {
          console.error('Błąd pobierania danych z API:', data)
        }
      } catch (error) {
        console.error('Błąd pobierania danych z API:', error)
      }
    }

    fetchDataFromApi()
  }, [login])

  useEffect(() => {
    // Sprawdź, czy użytkownik jest zalogowany
    if (!loggedIn) {
      // Jeśli nie jest zalogowany, przekieruj go na stronę logowania
      navigate('/login')
    }
  }, [loggedIn, navigate])

  return (
    <div className='panel-wrapper panel'>
      <UserProvider>
        <PanelNav />
        <div className='panel-box'>
          <div className='left-panel'>
            <GroupList />
            <Ads />
          </div>

          <div className='center-panel'>
            <PanelRounting />
          </div>

          <div className='right-panel'>
            <TopParent />
          </div>
        </div>
        <PanelFooter />
      </UserProvider>
    </div>
  )
}

export default Panel
