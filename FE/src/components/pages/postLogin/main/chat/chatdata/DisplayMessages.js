import React, { useState, useRef, useEffect } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'

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

const SEND_MESSAGE = gql`
  mutation MyMutation($message: String!) {
    sendMessage(message: $message) {
      code
      message
      timestamp
    }
  }
`

function DisplayMessages () {
  const [userMsg, setUserMsg] = useState('')
  const messagesContainerRef = useRef(null)

  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { limit: 10, page: 1 }
  })

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    refetchQueries: [{ query: GET_MESSAGES, variables: { limit: 10, page: 1 } }]
  })

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight
    }
  }, [data])

  const handleSendMessage = async e => {
    e.preventDefault()
    if (userMsg.trim() !== '') {
      await sendMessage({ variables: { message: userMsg } })
      setUserMsg('')
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className='chat-wrapper'>
      <div className='chat ' ref={messagesContainerRef}>
        {data && data.getMessages
          ? data.getMessages
              .map(message => (
                <ul className='chat-box' key={message.uuid}>
                  <li className='chat-box-item'>
                    <img
                      className='chat-avatar'
                      src={message.sender.avatar}
                      height={30}
                      alt={`${message.sender.name}'s avatar`}
                    />
                    <p> {message.sender.ranking}</p>
                    <p>{message.sender.name}:</p>
                    <div className='chat-box-msg'>
                      <p className='chat-message'> {message.content}</p>
                    </div>
                  </li>
                </ul>
              ))
              .reverse()
          : null}
        <div>
          <form className='chat-input-box' onSubmit={handleSendMessage}>
            <input
              type='text'
              maxLength={150}
              value={userMsg}
              className='chat-input'
              placeholder='Wiadomość...'
              onChange={e => setUserMsg(e.target.value)}
            />
            <button className='chat-button' type='submit'>
              Wyślij
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DisplayMessages
