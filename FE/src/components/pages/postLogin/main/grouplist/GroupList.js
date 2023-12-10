import { useState } from 'react'
import Euro2024 from './euro2024/Euro2024'
import './grouplist.css'

function YourComponent () {
  const [activeTab, setActiveTab] = useState('Euro2024')
  // const [compe, setCompe] = useState([])

  const handleTabClick = tab => {
    setActiveTab(tab)
  }

  // Wywołanie funkcji pobierającej dane, np. w useEffect

  return (
    <div className='panel-side-box'>
      <div className='tabs'>
        <button
          className={`tabs-btn   ${
            activeTab === 'Euro2024' ? 'active-btn' : ''
          }`}
          onClick={() => handleTabClick('Euro2024')}
        >
          Euro 2024
        </button>
      </div>

      <Euro2024 />
    </div>
  )
}

export default YourComponent
