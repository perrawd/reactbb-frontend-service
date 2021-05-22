import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Button, Form } from 'semantic-ui-react'

const ADD_SUBCATEGORY = gql`
  mutation addSubCategory($title: String!, $subtitle: String, $category: ID) {
    addSubCategory(title: $title, subtitle: $subtitle, category: $category) {
      success
    }
  }
`

const AddCategory = props => {
  const categoryData = props.categories.map(category => {
      return {
          value: category.id,
          text: category.title
  }
})

  const [addSubcategory] = useMutation(ADD_SUBCATEGORY, {
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
    subtitle: '',
    category: ''
  })

  const onPostChange = (event, value) => {
    // eslint-disable-next-line no-console
    console.log(value)
    setPostValues({
      ...postValues,
      [event.target.name]: event.target.value
    })
  }

  const selectCategory = (event, value) => {
    // eslint-disable-next-line no-console
    console.log(value)
    setPostValues({
      ...postValues,
      category: value
    })
  }

  const onSubmit = event => {
    event.preventDefault()
    // eslint-disable-next-line no-console
    console.log(postValues)
    addSubcategory({ variables: postValues })
    // eslint-disable-next-line no-console
    console.log('OK')
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
    </div>
  )
}

export default AddCategory
