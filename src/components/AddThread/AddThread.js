/**
 * AddThread component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Button, Form, TextArea } from 'semantic-ui-react'
import { useHistory } from 'react-router'

/**
 * GraphqQL mutation queries.
 */
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

const AddThread = props => {
  const history = useHistory()

  const [errors, setErrors] = useState({})

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

  /**
   * GraphqQL mutation functions.
   */
  const [addThread] = useMutation(ADD_THREAD, {
    refetchQueries: [
      { query: props.location.state.query,
        variables: { id: props.location.state.subcatid } }
    ],
    onCompleted (data) {
      history.push(`/thread?sid=${data.addThread.id}`)
    },
    onError (err) {
      setErrors(err.graphQLErrors[0].extensions.exception.message)
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
      setErrors(err.graphQLErrors[0].extensions.exception.message)
    }
  })

  /**
   * Form functions.
   */
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
      {Object.keys(errors).length > 0 && <div className="ui error message">
          <ul className="list">
            <li>{errors}</li>
          </ul>
        </div>}
    </div>
  )
}

export default AddThread
