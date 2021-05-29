import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, TextArea, Button, Icon, Modal, Header } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'
import { AuthContext } from '../../context/auth'

const EditPost = props => {
  const { user } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  // eslint-disable-next-line no-console
  console.log(props)

  const EDIT_POST = gql`
    mutation editPost($id: ID!, $body: String!) {
      editPost(id: $id, body: $body) {
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

  const [postValues, setPostValues] = useState({
    body: props.location.state.body
  })

  const [editPost, { loading }] = useMutation(EDIT_POST, {
    onCompleted (data) {
      // eslint-disable-next-line no-console
      console.log(data)
    },
    onError (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  })

  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted (data) {
      // eslint-disable-next-line no-console
      console.log(data)
    },
    onError (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  })

  const onPostChange = event => {
    setPostValues({
      ...postValues,
      id: props.location.state.id,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = event => {
    event.preventDefault()

    editPost({ variables: postValues })
    // eslint-disable-next-line no-console
    console.log('OK')
  }

  const deleteSubmit = event => {
    event.preventDefault()
    deletePost({
      variables: { id: props.location.state.id }
    })
  }

  return user && (user.role === 'MODERATOR' || user.username === props.location.state.author)
  ? <div>
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
          trigger={<Button basic color="red">Delete post</Button>}
        >
          <Header icon>
            <Icon name="trash alternate" />
            Delete post
          </Header>
          <Modal.Content>
            <p style={{ textAlign: "center" }}>
              Are you sure that you want to delete this post? (This action is irreversible)
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color="yellow" inverted onClick={() => setOpen(false)}>
              <Icon name="checkmark" /> Cancel
            </Button>
            <Button color="red" inverted onClick={deleteSubmit}>
              <Icon name="remove" /> Delete
            </Button>
          </Modal.Actions>
        </Modal>
      </Form>
    </div>
    : <Redirect to="/403" />
}

export default EditPost
