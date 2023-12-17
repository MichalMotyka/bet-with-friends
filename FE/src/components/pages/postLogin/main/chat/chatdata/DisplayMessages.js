import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { useRef, useEffect } from 'react'

const GET_MESSAGES = gql`
  query MyQuery {
    getMessages(limit: 10, page: 1) {
      content
      sender {
        avatar
        name
        ranking
      }
      uuid
    }
  }
`

function DisplayMessages () {
  const [userMsg, setUserMsg] = useState(null)
  const messagesContainerRef = useRef(null)
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { limit: 10, page: 1 }
  })

  useEffect(() => {
    // Przewiń okno w dół po pierwszym renderowaniu
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight
    }
  }, [data]) // Użyj data jako zależności, aby upewnić się, że useEffect wykonuje się po otrzymaniu danych

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <div className='chat' ref={messagesContainerRef}>
        {data.getMessages
          .map(message => (
            <ul className='chat-box'>
              <li key={message.uuid} className='chat-box-item'>
                <img
                  className='chat-avatar'
                  src={message.sender.avatar}
                  height={30}
                  alt={`${message.sender.name}'s avatar`}
                />
                <p> {message.sender.ranking}</p>
                <p>{message.sender.name}:</p>
                <div className='chat-box-msg'>
                  <p> {message.content}</p>
                </div>
              </li>
            </ul>
          ))
          .reverse()}
        <div className='chat-input-box'>
          <input
            value={userMsg}
            className='chat-input'
            type='text'
            placeholder='Wiadomość...'
            onChange={e => setUserMsg(e.target.value)}
          />
          <button>Wyślij</button>
        </div>
      </div>
    </>
  )
}

export default DisplayMessages
