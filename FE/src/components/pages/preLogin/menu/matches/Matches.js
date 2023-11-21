function Matches () {
  return (
    <section>
      <h2>Tabela Meczów</h2>

      <p>
        Tabela Meczów to centralne miejsce, gdzie możesz śledzić wszystkie
        nadchodzące rozgrywki Euro 2024 i uczestniczyć w emocjonującym świecie
        obstawiania ze swoimi przyjaciółmi. Z łatwością sprawdź, kiedy odbywają
        się najważniejsze mecze i zanurz się w atmosferze rywalizacji.
      </p>
    </section>
  )
}
export default Matches

// import React, { useEffect, useState } from 'react'

// const Matches = () => {
//   const [matches, setMatches] = useState([])

//   useEffect(() => {
//     const fetchMatches = async () => {
//       const uri = 'https://api.football-data.org/v4/matches'
//       const headers = { 'X-Auth-Token': '2e5640899c95458992402923bfb45b69' }

//       try {
//         const response = await fetch(uri, { method: 'GET', headers })
//         const data = await response.json()

//         // Assuming the response structure has a 'matches' property
//         setMatches(data.matches)
//       } catch (error) {
//         console.error('Error fetching data:', error)
//       }
//     }

//     fetchMatches()
//   }, []) // Empty dependency array to run the effect only once on component mount

//   return (
//     <div>
//       {matches.map((match, index) => (
//         <div key={index}>
//           {/* Render your match data here */}
//           {/* For example: <p>{match.someProperty}</p> */}
//         </div>
//       ))}
//     </div>
//   )
// }

// export default Matches
