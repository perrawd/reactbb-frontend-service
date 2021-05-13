import React, { useState, useContext } from 'react'
import { Form, TextArea, Button } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'
import { AuthContext } from '../../context/auth'

const EditPost = props => {
  const { user } = useContext(AuthContext)
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

  return user && user.sub.username === props.location.state.author
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
        <Button basic color="red" onClick={deleteSubmit}>Delete Post</Button>
      </Form>
    </div>
    : <h1>Unauthorized</h1>
}

export default EditPost
