import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Button, Form, TextArea } from 'semantic-ui-react'

const ReplyThread = () => {

  const [values, setValues] = useState({
      body: '',
      author: 'testingfromfrontend'
    })

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

  const [addPost, { loading }] = useMutation(ADD_POST, {
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
