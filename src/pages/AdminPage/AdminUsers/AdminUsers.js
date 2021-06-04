/**
 * AdminUsers component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React, { useState, useContext } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Table, Button, Label, Modal, Header, Icon } from 'semantic-ui-react'
import moment from 'moment'
import { MessageContext } from '../../../context/flashmessage'

/**
 * GraphqQL mutation queries.
 */
const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
  deleteUser(id: $id) {
    success
  }
}
`

const AdminUsers = props => {
  const [errors, setErrors] = useState({})

  const [, setMessage] = useContext(MessageContext)

  const [open, setOpen] = useState(false)

  const [userID, setUserID] = useState({
    id: ''
  })

  /**
   * GraphqQL mutation functions.
   */
  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted () {
      setOpen(false)
      setMessage({
        active: true,
        message: 'User has been removed.',
        type: 'red'
      })
    },
    onError (err) {
      setErrors(err.graphQLErrors[0].extensions.exception.message)
    }
  })

  const {users} = props

  return (
    <div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Registration Date</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>E-mail address</Table.HeaderCell>
            <Table.HeaderCell>Delete user</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.map(user => {
            return (
              <Table.Row key={user.id}>
                <Table.Cell>{moment(new Date(Number(user.createdAt))).format("YYYY-MM-DD HH:mm")}</Table.Cell>
                <Table.Cell>
                  <Label color={user.role === 'USER' ? 'blue' : 'orange'}>
                    {user.role}
                  </Label>
                </Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
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
      {Object.keys(errors).length > 0 && <div className="ui error message">
          <ul className="list">
            <li>{errors}</li>
          </ul>
        </div>
      }
    </div>
  )
}

export default AdminUsers
