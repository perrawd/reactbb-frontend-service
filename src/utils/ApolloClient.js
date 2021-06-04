/**
 * ApolloClient component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

/**
 * Application URI.
 */
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL
})

/**
 * Set headers and auth token.
 */
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists.
  const token = localStorage.getItem('jwtToken')
  // Return the headers to the context so httpLink can read them.
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ""
    }
  }
})

/**
 * Initiate new ApolloClient instance.
 */
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default client
