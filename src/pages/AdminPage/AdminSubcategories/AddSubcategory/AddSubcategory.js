/**
 * AddSubcategory component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React, { useState, useContext } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Button, Form } from 'semantic-ui-react'
import { MessageContext } from '../../../../context/flashmessage'
import { GET_CATEGORIES_QUERY } from '../../useMultipleQueries.js'

/**
 * GraphqQL mutation queries.
 */
const ADD_SUBCATEGORY = gql`
  mutation addSubCategory($title: String!, $subtitle: String, $category: ID) {
    addSubCategory(title: $title, subtitle: $subtitle, category: $category) {
      success
    }
  }
`

const AddSubcategory = props => {
  const [, setMessage] = useContext(MessageContext)

  const [errors, setErrors] = useState({})

  const categoryData = props.categories.map(category => {
    return {
      value: category.id,
      text: category.title
    }
  })

  const [postValues, setPostValues] = useState({
    title: '',
    subtitle: '',
    category: ''
  })

  /**
   * GraphqQL mutation functions.
   */
  const [addSubcategory] = useMutation(ADD_SUBCATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES_QUERY }],
    onCompleted () {
      setPostValues({
        title: '',
        subtitle: '',
        category: ''
      })
      setMessage({
        active: true,
        message: 'Subcategory has been added.',
        type: 'green'
      })
    },
    onError (err) {
      setErrors(err.graphQLErrors[0].extensions.exception.message)
    }
  })

  /**
   * Form functions.
   */
  const onPostChange = event => {
    setPostValues({
      ...postValues,
      [event.target.name]: event.target.value
    })
  }

  const selectCategory = (event, value) => {
    setPostValues({
      ...postValues,
      category: value
    })
  }

  const onSubmit = event => {
    event.preventDefault()
    addSubcategory({ variables: postValues })
  }

  return (
    <div>
      <h1>Add new Subcategory</h1>
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
        <Form.Select
          fluid
          onChange={(e, { value }) => selectCategory(e, value)}
          name="category"
          label="Category"
          options={categoryData}
          placeholder="Category"
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

export default AddSubcategory
