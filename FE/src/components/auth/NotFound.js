import React from 'react'
import errorRaccoon from '../../assets/images/errors/404.webp'

function NotFound () {
  return (
    <section style={{ marginBottom: '30px' }} className='app-wrap'>
      <div className='login'>
        <h2 className='section-title'>
          Niestety taka strona nie istnieje - 404
        </h2>

        <img src={errorRaccoon} alt='' />
      </div>
    </section>
  )
}

export default NotFound
