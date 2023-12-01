import './toptyper.css'

function TopTyper (props) {
  const { leadersData } = props
  const topTyper = leadersData && leadersData.length > 0 ? leadersData[0] : null

  return leadersData && leadersData.length > 0 ? (
    <div className='panel-side-box'>
      <h2 className='panel-header'>
        Najlepszy <span className='span-brand'>Typer</span>{' '}
      </h2>
      <div className='top-typer'>
        <img
          src={`http://130.162.44.103:5000/api/v1/avatar/${topTyper.avatar}`}
          alt=''
          className='avatar top-typer-avatar'
          height={110}
          width={110}
        />
        <p>{topTyper.name}</p>
        <p>Punkty: {topTyper.points}</p>
        <p>Trafienia: {topTyper.rating.wins}</p>
        <p>Rating: {topTyper.rating.rating}</p>
      </div>
    </div>
  ) : null
}

export default TopTyper
