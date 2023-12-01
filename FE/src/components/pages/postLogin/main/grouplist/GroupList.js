// import './grouplist.css'
// function GroupList () {
//   return (
//     <div className='panel-side-box'>
//       <h2 className='panel-header'>
//         <span className='span-brand'>Grupy</span>
//       </h2>
//     </div>
//   )
// }

// export default GroupList
import { MdFlag } from 'react-icons/md'
import './grouplist.css'
function GroupList () {
  const teams = ['Polska', 'Włochy', 'Szwajcaria', 'Turcja', 'Walia']
  return (
    <div className='panel-side-box'>
      <h2 className='panel-header'>
        <span className='span-brand'>Grupy</span>
      </h2>
      <div className='your-component'>
        <ul>
          {teams.map((team, index) => (
            <li key={index}>
              <MdFlag className='flag-icon' />
              {team}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default GroupList
