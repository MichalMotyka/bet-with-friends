import { BsArrowRight } from 'react-icons/bs'
import { BsArrowLeft } from 'react-icons/bs'

import './grouplist.css'
function GroupList () {
  const teams = ['Niemcy', 'Szkocja', 'Węgry', 'Szwajcaria']

  return (
    <div className='panel-side-box'>
      <h2 className='panel-header group-name'>
        <span>
          <BsArrowLeft />
        </span>
        <span className='span-brand group-name'>Euro 2024</span>
        <BsArrowRight />
      </h2>
      <div className='group-box'>
        <select className='group-select'>
          <option>Grupa A</option>
          <option>Grupa B</option>
          <option>Grupa C</option>
          <option>Grupa D</option>
          <option>Grupa E</option>
          <option>Grupa F</option>
        </select>
        <ul className='group-list'>
          {teams.map((team, index) => (
            <li className='group-item' key={index}>
              {team}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default GroupList
