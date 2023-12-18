import React, { useState } from 'react'
import { useQuery, useMutation, useSubscription } from '@apollo/client'
import { gql } from '@apollo/client'

const GET_MESSAGES = gql`
  query GetMessages($limit: Int!, $page: Int!) {
    getMessages(limit: $limit, page: $page) {
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

const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription NewMessageSubscription {
    newMessageSubscription {
      content
      sender {
        name
        avatar
        ranking
      }
      uuid
    }
  }
`

console.log('hello2')

const SEND_MESSAGE = gql`
  mutation SendMessage($message: String!) {
    sendMessage(message: $message) {
      code
      message
      timestamp
    }
  }
`

const DisplayMessages = () => {
  const [inputMessage, setInputMessage] = useState('')
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { limit: 10, page: 1 }
  })

  useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    onData: ({ client, subscriptionData }) => {
      client.writeQuery({
        query: GET_MESSAGES,
        variables: { limit: 10, page: 1 },
        data: {
          getMessages: [
            ...data.getMessages,
            subscriptionData.data.newMessageSubscription
          ]
        }
      })
    }
  })

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    update: (cache, { data: { sendMessage } }) => {
      const { getMessages } = cache.readQuery({
        query: GET_MESSAGES,
        variables: { limit: 10, page: 1 }
      })

      cache.writeQuery({
        query: GET_MESSAGES,
        variables: { limit: 10, page: 1 },
        data: {
          getMessages: [...getMessages, sendMessage]
        }
      })
    }
  })

  const handleSendMessage = async e => {
    e.preventDefault()

    if (inputMessage.trim() !== '') {
      try {
        await sendMessage({
          variables: { message: inputMessage }
        })
        setInputMessage('')
      } catch (err) {
        console.error('Error sending message:', err)
      }
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className='chat-wrapper'>
      <div className='chat'>
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
              value={inputMessage}
              className='chat-input'
              placeholder='Wiadomość...'
              onChange={e => setInputMessage(e.target.value)}
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
