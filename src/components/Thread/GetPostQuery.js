import { gql } from '@apollo/client'

const GET_POST_QUERY = gql`
    query getThreadByID($id: ID!) {
      getThreadByID(id: $id) {
        title
        posts {
          id
          body
          createdAt
          updatedAt
          author
        }
      }
    }
  `
export { GET_POST_QUERY }
