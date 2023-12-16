import React from 'react'
import { useQuery, gql } from '@apollo/client'

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
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { limit: 10, page: 1 }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className='chat'>
      {data.getMessages
        .map(message => (
          <div key={message.uuid} className='chat-box'>
            <img
              src={message.sender.avatar}
              height={35}
              alt={`${message.sender.name}'s avatar`}
            />
            <p> {message.sender.ranking}</p>
            <p>{message.sender.name}</p>
            <div className='chat-box-msg'>
              <p> {message.content}</p>
            </div>
          </div>
        ))
        .reverse()}
    </div>
  )
}

export default DisplayMessages
