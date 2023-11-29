import React from 'react'

import Nav from './components/pages/preLogin/common/nav/Nav'
import Footer from './components/pages/preLogin/common/footer/Footer'
import Routing from './components/pages/preLogin/common/routing/Routing'

function MainLayout () {
  return (
    <div className='wrapper'>
      <Nav />
      <Routing />
      <Footer />
    </div>
  )
}

export default MainLayout
