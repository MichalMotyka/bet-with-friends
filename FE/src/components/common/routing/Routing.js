import { Routes, Route } from 'react-router-dom'

import Main from '../../frontPages/main/Main'
import About from '../../frontPages/menu/about/About'
import Matches from '../../frontPages/menu/matches/Matches'
import Leaderboard from '../../frontPages/menu/leaderboard/Leaderboard'
import Login from '../../auth/login/Login'
import SingUp from '../../auth/signup/SignUp'

function Routing () {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/Matches' element={<Matches />} />
      <Route path='/About' element={<About />} />
      <Route path='/Leaderboard' element={<Leaderboard />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/SingUp' element={<SingUp />} />
    </Routes>
  )
}

export default Routing
