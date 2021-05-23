import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Table } from 'semantic-ui-react'
import moment from 'moment'

const GET_POSTS_QUERY = gql`
  query {
    getPosts {
      body
      id
      createdAt
      thread {
        title
      }
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
      <Table celled fixed >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Author</Table.HeaderCell>
            <Table.HeaderCell>Thread</Table.HeaderCell>
            <Table.HeaderCell>Created At</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {posts.map(post => {
            return (
            <Table.Row key={post.id}>
              <Table.Cell>{post.body.slice(0, 10)}</Table.Cell>
              <Table.Cell>{post.author}</Table.Cell>
              <Table.Cell>{post.thread.title}</Table.Cell>
              <Table.Cell>{moment(new Date(Number(post.updatedAt))).fromNow()}</Table.Cell>
            </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default GetUsers
