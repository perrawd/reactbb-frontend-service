/**
 * ReplyThread component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Button, Form, TextArea } from 'semantic-ui-react'

/**
 * GraphqQL mutation queries.
 */
const ADD_POST = gql`
  mutation addPost($body: String!, $thread: String!, $replyto: ID) {
    addPost(body: $body, thread: $thread, replyto: $replyto) {
      id
    }
  }
`

const ReplyThread = props => {
  const [errors, setErrors] = useState({})

  const [values, setValues] = useState({
    body: '',
    thread: props.thread,
    replyto: props.post ? props.post.id : null
  })

  /**
   * GraphqQL mutation functions.
   */
  const [addPost, { loading }] = useMutation(ADD_POST, {
    refetchQueries: [
      {
        query: props.query,
        variables: { id: props.thread }
      }
    ],
    awaitRefetchQueries: true,
    onError (err) {
      setErrors(err.graphQLErrors[0].extensions.exception.message)
    }
  })

  /**
   * Form functions.
   */
  const onChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = event => {
    event.preventDefault()
    addPost({ variables: values })
    setValues({
      ...values,
      body: ''
    })
    if (props.isreply) {
      props.isreply(false)
    }
  }

  return (
    <div>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <Form.Input
          control={TextArea}
          label="Reply"
          placeholder="Reply"
          name="body"
          type="text"
          value={values.body}
          onChange={onChange}
        />
        <Button type="submit">Reply</Button>
      </Form>
      {Object.keys(errors).length > 0 && <div className="ui error message">
          <ul className="list">
            <li>{errors}</li>
          </ul>
        </div>
      }
    </div>
  )
}

export default ReplyThread
