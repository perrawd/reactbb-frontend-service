import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Table, Button, Label, Modal, Header, Icon } from 'semantic-ui-react'

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

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
  deleteUser(id: $id) {
    success
  }
}
`

const GetUsers = () => {

  const [userID, setUserID] = useState({
    id: ''
  })

  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted () {
      // eslint-disable-next-line no-console
      console.log('data ok')
    },
    onError (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  })

  const [open, setOpen] = useState(false)
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
            <Table.HeaderCell />
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
                <Table.Cell>
                  <Label color={user.role === 'USER' ? 'blue' : 'orange'}>
                    {user.role}
                  </Label>
                </Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>
                  <Modal
                    basic
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    size="small"
                    trigger={
                      <Button size="mini" color="red" onClick={() => setUserID(user.id)}>
                        Remove user
                      </Button>
                    }
                  >
                    <Header icon>
                      <Icon name="trash alternate" />
                      Remove user
                    </Header>
                    <Modal.Content>
                      <p style={{ textAlign: 'center' }}>
                        Are you sure that you want to remove this user? (This
                        action is irreversible)
                      </p>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button
                        basic
                        color="yellow"
                        inverted
                        onClick={() => setOpen(false)}
                      >
                        <Icon name="checkmark" /> Cancel
                      </Button>
                      <Button color="red" inverted onClick={() => deleteUser({ variables: { id: userID }})} >
                        <Icon name="remove"/> Delete
                      </Button>
                    </Modal.Actions>
                  </Modal>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default GetUsers
