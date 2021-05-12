import React, { useState } from 'react'
import { Form, TextArea, Button } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'

const EditPost = props => {
  // eslint-disable-next-line no-console
  console.log(props)

  const EDIT_POST = gql`
  mutation {
    editPost(id:"609c00dee653f97103a6eb25", body:"test edit"){
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

  const onPostChange = event => {
    setPostValues({
      ...postValues,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = event => {
    event.preventDefault()

    editPost({ variables: postValues })
    // eslint-disable-next-line no-console
    console.log("OK")
  }

  return (
    <div>
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
        <Button primary type="submit">Edit Post</Button>
        <Button danger>Delete Post</Button>
      </Form>
    </div>
  )
}

export default EditPost
