import React, { useState, useContext } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Button, Form } from 'semantic-ui-react'
import { MessageContext } from '../../../../context/flashmessage'
import { GET_CATEGORIES_QUERY } from '../../useMultipleQueries.js'

const ADD_CATEGORY = gql`
  mutation addCategory($title: String!, $subtitle: String) {
    addCategory(title: $title, subtitle: $subtitle) {
      title
      subtitle
    }
  }
`

const AddCategory = () => {
  const [errors, setErrors] = useState({})

  const [, setMessage] = useContext(MessageContext)

  const [postValues, setPostValues] = useState({
    title: '',
    subtitle: ''
  })

  const [addCategory] = useMutation(ADD_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES_QUERY }],
    onCompleted () {
      setPostValues({
        title: '',
        subtitle: ''
      })
      setMessage({
        active: true,
        message: "Category has been added.",
        type: "green"
      })
    },
    onError (err) {
      setErrors(err.graphQLErrors[0].extensions.exception.message)
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
    addCategory({ variables: postValues })
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
      {Object.keys(errors).length > 0 && <div className="ui error message">
          <ul className="list">
            <li>{errors}</li>
          </ul>
        </div>
      }
    </div>
  )
}

export default AddCategory
