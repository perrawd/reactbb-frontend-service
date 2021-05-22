import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Button, Form } from 'semantic-ui-react'

const ADD_CATEGORY = gql`
  mutation addCategory($title: String!, $subtitle: String) {
    addCategory(title: $title, subtitle: $subtitle) {
      title
      subtitle
    }
  }
`

const AddCategory = () => {
  const [addCategory] = useMutation(ADD_CATEGORY, {
    onCompleted () {
      // eslint-disable-next-line no-console
      console.log('data ok')
    },
    onError (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  })

  const [postValues, setPostValues] = useState({
    title: '',
    subtitle: ''
  })

  const onPostChange = event => {
    setPostValues({
      ...postValues,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = event => {
    event.preventDefault()

    addCategory({ variables: postValues })
    // eslint-disable-next-line no-console
    console.log('OK')
  }

  return (
    <div>
      <h1>Add new Category</h1>
      <Form noValidate onSubmit={onSubmit}>
        <Form.Input
          onChange={onPostChange}
          name="title"
          label="Title"
          value={postValues.title}
          type="text"
        />
        <Form.Input
          onChange={onPostChange}
          name="subtitle"
          label="Subtitle"
          value={postValues.subtitle}
          type="text"
        />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}

export default AddCategory
