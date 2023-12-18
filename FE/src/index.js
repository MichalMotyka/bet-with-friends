import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

// Adres GraphQL dla HTTP
// const httpUri = 'http://localhost:8081/graphql'
const httpUri = 'http://130.162.44.103:8081/graphql'

// Adres GraphQL dla WebSocket (zmień na odpowiednią ścieżkę)
// const wsUri = 'ws://localhost:8081/graphql'
const wsUri = 'ws://130.162.44.103:8081/graphql'

// HTTP Link
const httpLink = new HttpLink({ uri: httpUri, credentials: 'include' })

// WebSocket Link
const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    reconnect: true
  },
  credentials: 'include'
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

// Apollo Client
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  credentials: 'include'
})
console.log('hello')

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
)

reportWebVitals()
