import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Table } from 'semantic-ui-react'

const GET_POSTS_QUERY = gql`
  query {
    getPosts {
      body
      id
      createdAt
      author
    }
  }
`

const GetUsers = () => {

  const { loading, error, data } = useQuery(GET_POSTS_QUERY)
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error.message}`
  }

  const posts = data.getPosts
  // eslint-disable-next-line no-console
  console.log(posts)

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Author</Table.HeaderCell>
            <Table.HeaderCell>Created At</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {posts.map(post => {
            return (
            <Table.Row key={post.id}>
              <Table.Cell>{post.id}</Table.Cell>
              <Table.Cell>{post.author}</Table.Cell>
              <Table.Cell>{post.createdAt}</Table.Cell>
            </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default GetUsers
