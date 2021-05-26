import { gql, useQuery } from '@apollo/client'

const GET_CATEGORIES_QUERY = gql`
  query {
    getCategories {
      id
      title
      subtitle
      author
      createdAt
      updatedAt
      subcategories {
        id
        title
        subtitle
      }
    }
  }
`

const GET_POSTS_QUERY = gql`
  query {
    getPosts {
      body
      id
      createdAt
      thread {
        id
      }
      author
    }
  }
`

const GET_USERS_QUERY = gql`
  query {
    getUsers {
      id
      role
      username
      createdAt
    }
  }
`

const useMultipleQueries = () => {
  const res1 = useQuery(GET_CATEGORIES_QUERY)
  const res2 = useQuery(GET_POSTS_QUERY)
  const res3 = useQuery(GET_USERS_QUERY)
  return [res1, res2, res3]
}

export default useMultipleQueries