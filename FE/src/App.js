import React from 'react'
import Nav from './components/pages/preLogin/common/nav/Nav'
import Routing from './components/pages/preLogin/common/routing/Routing'
import Footer from './components/pages/preLogin/common/footer/Footer'
import './App.css'

function App () {
  return (
    <div className='wrapper'>
      <div className='content-wrapper'>
        <Nav />
        <Routing />
      </div>
      <Footer />
    </div>
  )
}

export default App
