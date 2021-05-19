import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Table, Button, Label } from 'semantic-ui-react'

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

const GetUsers = () => {
  const { loading, error, data } = useQuery(GET_USERS_QUERY)
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error.message}`
  }

  const users = data.getUsers
  // eslint-disable-next-line no-console
  console.log(users)

  return (
    <div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Registration Date</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>E-mail address</Table.HeaderCell>
            <Table.HeaderCell>Delete user</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.map(user => {
            return (
              <Table.Row key={user.id}>
                <Table.Cell>{user.createdAt}</Table.Cell>
                <Table.Cell><Label color={user.role === 'USER' ? 'blue' : 'orange'}>{user.role}</Label></Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell><Button size="mini">Delete user</Button></Table.Cell>
              </Table.Row>
          )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default GetUsers
