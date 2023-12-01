import { useEffect } from 'react';
import PanelNav from './common/nav/PanelNav';
import GroupList from './main/grouplist/GroupList';
import TopFive from './main/topfive/TopFive';
import PanelRounting from './common/routing/PanelRouting';
import TopTyper from './main/toptyper/TopTyper';
import Ads from './main/ads/Ads';
// import PanelFooter from './common/footer/PanelFooter';
import './panel.css';

import UserProvider from './context/UserContext';
import { useAuth } from '../../auth/authcontext/AuthContext';
import { useNavigate } from 'react-router-dom';

function Panel() {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Sprawdź, czy użytkownik jest zalogowany
    if (!loggedIn) {
      // Jeśli nie jest zalogowany, przekieruj go na stronę logowania
      navigate('/login');
    }
  }, [loggedIn, navigate]);

  return (
    <div className='panel-wrapper panel'>
      <UserProvider>

        <PanelNav />
        <div className='panel-content'>
          <div className='left-panel'>
            <GroupList />
            <TopFive />
          </div>

          <div className='center-panel'>
            <PanelRounting />
          </div>

          <div className='right-panel'>
            <TopTyper />
            <Ads />
          </div>
        </div>
        {/* <PanelFooter /> */}

      </UserProvider>
    </div>
  );
}

export default Panel;
