import { useEffect } from 'react'
import PanelNav from './common/nav/PanelNav'
import GroupList from './main/grouplist/GroupList'
import TopFive from './main/topfive/TopFive'
import PanelRounting from './common/routing/PanelRouting'
import TopTyper from './main/toptyper/TopTyper'
import Ads from './main/ads/Ads'
import PanelFooter from './common/footer/PanelFooter'
import './panel.css'

import { useAuth } from '../../auth/authcontext/AuthContext'
import { useNavigate } from 'react-router-dom'

function Panel () {
  const { loggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Sprawdź, czy użytkownik jest zalogowany
    if (!loggedIn) {
      // Jeśli nie jest zalogowany, przekieruj go na stronę logowania
      navigate('/login')
    }
  }, [loggedIn, navigate])

  // function Panel () {
  //   const { loggedIn,refreshTokens  } = useAuth()
  //   const navigate = useNavigate()

  //   useEffect(() => {
  //     const checkAuthentication = async () => {
  //       try {
  //         // Sprawdź, czy użytkownik jest zalogowany
  //         if (!loggedIn) {
  //           navigate('/login');
  //           return;
  //         }

  //         // Próbuj odświeżyć tokeny przy każdym renderowaniu komponentu Panel
  //         await refreshTokens();
  //       } catch (error) {
  //         console.error('Błąd podczas odświeżania tokenów:', error);
  //         // W przypadku błędu (np. brak dostępu do serwera), przekieruj na stronę logowania
  //         navigate('/login');
  //       }
  //     };

  //     // Sprawdzaj stan zalogowania i odświeżaj tokeny przy każdym renderowaniu komponentu Panel
  //     checkAuthentication();
  //   }, [loggedIn, navigate, refreshTokens]);

  return (
    <div className='panel-wrapper panel'>
      <PanelNav />
      <GroupList />
      <TopFive />
      <PanelRounting />
      <TopTyper />
      <Ads />
      <PanelFooter />
    </div>
  )
}

export default Panel
