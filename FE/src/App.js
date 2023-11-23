import React from 'react'
import Nav from './components/pages/preLogin/common/nav/Nav'
import Routing from './components/pages/preLogin/common/routing/Routing'
import Footer from './components/pages/preLogin/common/footer/Footer'
import './index.css'

function App () {
  return (
    <div className='wrapper'>
      <Nav />
      <Routing />
      <Footer />
    </div>
  )
}

export default App
