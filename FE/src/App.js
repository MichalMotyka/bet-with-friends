import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './MainLayout'
import Panel from './components/pages/postLogin/Panel'

import './index.css'

function App () {
  return (
    <div className='wrapper'>
      <Routes>
        <Route path='/*' element={<MainLayout />} />
        <Route path='/panel/*' element={<Panel />} />
      </Routes>
    </div>
  )
}

export default App
