import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Button, Form, TextArea } from 'semantic-ui-react'

const ReplyThread = props => {
  // eslint-disable-next-line no-console
  console.log(props)

  const [values, setValues] = useState({
      body: '',
      thread: props.thread,
      replyto: props.post ? props.post.id : null
    })

  // eslint-disable-next-line no-console
  console.log(values)

  const ADD_POST = gql`
    mutation addPost(
      $body: String!
      $thread: String!
      $replyto: ID
    ) {
      addPost(
          body: $body,
          thread: $thread,
          replyto: $replyto
      ) {
        id
      }
    }
    `

  const [addPost, { loading }] = useMutation(ADD_POST, {
    refetchQueries: [
      { query: props.query,
        variables: { id: props.thread } }
    ],
    awaitRefetchQueries: true,
    onCompleted (data) {
        // eslint-disable-next-line no-console
        console.log(data)
    },
    onError (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  })

  const onChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = event => {
    event.preventDefault()
    // eslint-disable-next-line no-console
    console.log(values)
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
    </div>
  )
}

export default ReplyThread
