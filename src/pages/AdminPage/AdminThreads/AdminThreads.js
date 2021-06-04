/**
 * AdminThreads component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React, { useState, useContext } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Table, Header, Icon, Modal, Button } from 'semantic-ui-react'
import { MessageContext } from '../../../context/flashmessage'
import { GET_THREADS_QUERY } from '../useMultipleQueries'

const DELETE_THREAD = gql`
  mutation deleteThread($id: ID!) {
    deleteThread(id: $id) {
    success
    }
}
`
const AdminThreads = props => {
  const [open, setOpen] = useState(false)
  const [, setMessage] = useContext(MessageContext)

  // eslint-disable-next-line no-console
  console.log(props)

  const [deletePost] = useMutation(DELETE_THREAD, {
    refetchQueries: [{ query: GET_THREADS_QUERY }],
    awaitRefetchQueries: true,
    onCompleted () {
      setOpen(false)
      setMessage({
        active: true,
        message: 'Category has been deleted.',
        type: 'red'
      })
    }
  })

  const deleteSubmit = (event, arg) => {
    event.preventDefault()
    deletePost({
      variables: { id: arg }
    })
  }

  return (
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Subcategory</Table.HeaderCell>
          <Table.HeaderCell>Author</Table.HeaderCell>
          <Table.HeaderCell>Created At</Table.HeaderCell>
          <Table.HeaderCell>Delete</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.threads.map(thread => {
          return (
            <Table.Row key={thread.id}>
              <Table.Cell>{thread.id}</Table.Cell>
              <Table.Cell>{thread.title}</Table.Cell>
              <Table.Cell>{thread.subcategory.title}</Table.Cell>
              <Table.Cell>{thread.author}</Table.Cell>
              <Table.Cell>{thread.createdAt}</Table.Cell>
              <Table.Cell>
                <Modal
                  basic
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                  open={open}
                  size="small"
                  trigger={
                    <Button type="button" basic color="red">
                      Delete
                    </Button>
                  }
                >
                  <Header icon>
                    <Icon name="trash alternate" />
                    Delete
                  </Header>
                  <Modal.Content>
                    <p style={{ textAlign: 'center' }}>
                      Are you sure that you want to delete this category? (This
                      action is irreversible)
                    </p>
                    <p style={{ textAlign: 'center' }}>
                      ALL SUBCATEGORIES AND POSTS WILL BE REMOVED AS WELL, ARE
                      YOU SURE?
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
                    <Button color="red" inverted onClick={event => deleteSubmit(event, thread.id)}>
                      <Icon name="remove" /> Delete
                    </Button>
                  </Modal.Actions>
                </Modal>
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}

export default AdminThreads
