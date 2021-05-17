import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Button, Form, TextArea } from 'semantic-ui-react'
import { useHistory } from 'react-router'

const AddThread = props => {
  const history = useHistory()
  // eslint-disable-next-line no-console
  console.log(props)
  const ADD_POST = gql`
    mutation addPost(
      $body: String!
      $author: String!
    ) {
      addPost(
          body: $body
          author: $author
      ) {
        id
      }
    }
    `

  const ADD_THREAD = gql`
    mutation addThread(
      $title: String!
      $subtitle: String!
      $subcategory: String!
      $posts: String!
    ) {
      addThread(
        title: $title
        subtitle: $subtitle
        subcategory: $subcategory
        posts: $posts
      ) {
        id
        title
        posts {
          title
        }
      }
    }
  `
  // Const [errors, setErrors] = useState({})

  // Const [postID, setPostID] = useState('')

  const [threadValues, setThreadValues] = useState({
    title: '',
    subtitle: '',
    subcategory: props.location.state.subcatid,
    posts: ''
  })

  const [postValues, setPostValues] = useState({
    body: '',
    author: 'testingfromfrontend'
  })

  // eslint-disable-next-line no-unused-vars
  const [addThread] = useMutation(ADD_THREAD, {
    onCompleted (data) {
      // eslint-disable-next-line no-console
      console.log(data)
      history.push(`/thread?sid=${data.addThread.id}`)
    },
    onError (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  })

  const [addPost, { loading }] = useMutation(ADD_POST, {
    onCompleted (data) {
      addThread({ variables: {
        title: threadValues.title,
        subtitle: threadValues.subtitle,
        subcategory: threadValues.subcategory,
        posts: data.addPost.id
    } })
    },
    onError (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  })

  const onThreadChange = event => {
    setThreadValues({
      ...threadValues,
      [event.target.name]: event.target.value
    })
  }

  const onPostChange = event => {
    setPostValues({
      ...postValues,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = event => {
    event.preventDefault()

    addPost({ variables: postValues })
    // eslint-disable-next-line no-console
    console.log("OK")
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <Form.Input
          label="Title"
          placeholder="Title"
          name="title"
          type="text"
          value={threadValues.title}
          onChange={onThreadChange}
        />
        <Form.Input
          label="Subtitle"
          placeholder="Subtitle"
          name="subtitle"
          type="text"
          value={threadValues.subtitle}
          onChange={onThreadChange}
        />
        <Form.Input
          control={TextArea}
          label="body"
          placeholder="body"
          name="body"
          type="text"
          value={postValues.body}
          onChange={onPostChange}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}

export default AddThread
