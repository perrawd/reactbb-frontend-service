import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}` || ''
    }
  }),
  cache: new InMemoryCache()
})

export default client
