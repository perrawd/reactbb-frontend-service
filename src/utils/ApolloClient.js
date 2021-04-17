import {ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL
  }),
  cache: new InMemoryCache()
})

export default client
