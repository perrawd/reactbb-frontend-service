/**
 * EditPost page component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React, { useState, useContext } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { Form, TextArea, Button, Icon, Modal, Header } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'

import { AuthContext } from '../../context/auth'
import { MessageContext } from '../../context/flashmessage'

/**
 * GraphqQL mutation queries.
 */
const EDIT_POST = gql`
  mutation editPost($id: ID!, $body: String!, $isEdited: Boolean) {
    editPost(id: $id, body: $body, isEdited: $isEdited) {
      success
    }
  }
`

const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      success
    }
  }
`

const EditPost = props => {
  const history = useHistory()

  const { user } = useContext(AuthContext)
  const [, setMessage] = useContext(MessageContext)

  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState({})

  const refetchQueryOptions = [
    {
      query: props.location.state.query,
      variables: { id: props.location.state.post.thread.id }
    }
  ]

  const [postValues, setPostValues] = useState({
    body: props.location.state.post.body
  })

  /**
   * GraphqQL mutation functions.
   */
  const [editPost, { loading }] = useMutation(EDIT_POST, {
    refetchQueries: refetchQueryOptions,
    awaitRefetchQueries: true,
    onCompleted () {
      setMessage({
        active: true,
        message: 'The post has been edited',
        type: 'yellow'
      })
      history.goBack()
    },
    onError (err) {
      setErrors(err.graphQLErrors[0].extensions.exception.message)
    }
  })

  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: refetchQueryOptions,
    onCompleted () {
      setMessage({
        active: true,
        message: 'The post has been deleted',
        type: 'red'
      })
      history.goBack()
    },
    onError (err) {
      setErrors(err.graphQLErrors[0].extensions.exception.message)
    }
  })

  /**
   * Form functions.
   */
  const onPostChange = event => {
    setPostValues({
      ...postValues,
      id: props.location.state.post.id,
      isEdited: true,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = event => {
    event.preventDefault()
    editPost({ variables: postValues })
  }

  const deleteSubmit = event => {
    event.preventDefault()
    deletePost({
      variables: { id: props.location.state.post.id }
    })
  }

  return user &&
  (user.role === 'MODERATOR' ||
    user.username === props.location.state.post.author) ? <div>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Edit Post</h1>
        <Form.Input
          onChange={onPostChange}
          control={TextArea}
          name="body"
          label="body"
          value={postValues.body}
          type="text"
        />
        <Button primary type="submit">
          Edit Post
        </Button>
        <Modal
          basic
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          size="small"
          trigger={
            <Button basic color="red" type="button">
              Delete post
            </Button>
          }
        >
          <Header icon>
            <Icon name="trash alternate" />
            Delete post
          </Header>
          <Modal.Content>
            <p style={{ textAlign: 'center' }}>
              Are you sure that you want to delete this post? (This action is
              irreversible)
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
            <Button color="red" inverted onClick={e => deleteSubmit(e)}>
              <Icon name="remove" /> Delete
            </Button>
          </Modal.Actions>
        </Modal>
        <Button type="button" onClick={() => history.goBack()}>Cancel</Button>
      </Form>
      {Object.keys(errors).length > 0 && <div className="ui error message">
          <ul className="list">
            <li>{errors}</li>
          </ul>
        </div>
      }
    </div> : <Redirect to="/403" />
}

export default EditPost
