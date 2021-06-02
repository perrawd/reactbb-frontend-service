import React, { useState, useContext } from 'react'
import { Form, TextArea, Button, Icon, Modal, Header } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'
import { MessageContext } from '../../../../../context/flashmessage'
import { GET_CATEGORIES_QUERY } from '../../../useMultipleQueries'

const EDIT_CATEGORY = gql`
  mutation editCategory($id: ID!, $title: String, $subtitle: String) {
    editCategory(id: $id, title: $title, subtitle: $subtitle) {
      success
    }
  }
`

const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      success
    }
  }
`

const EditCategory = props => {
  const [errors, setErrors] = useState({})

  const [, setMessage] = useContext(MessageContext)

  const [open, setOpen] = useState(false)

  const [postValues, setPostValues] = useState({
    title: props.category.title,
    subtitle: props.category.subtitle
  })

  const queryOptions = [{ query: GET_CATEGORIES_QUERY }]

  const [editCategory, { loading }] = useMutation(EDIT_CATEGORY, {
    refetchQueries: queryOptions,
    onCompleted () {
      setOpen(false)
      props.handler(false)
      setMessage({
        active: true,
        message: 'Subcategory has been updated.',
        type: 'green'
      })
    },
    onError (err) {
      setErrors(err.graphQLErrors[0].extensions.exception.message)
    }
  })

  const [deletePost] = useMutation(DELETE_CATEGORY, {
    refetchQueries: queryOptions,
    onCompleted () {
      setOpen(false)
      props.handler(false)
      setMessage({
        active: true,
        message: 'Category has been deleted.',
        type: 'red'
      })
    },
    onError (err) {
      setErrors(err.graphQLErrors[0].extensions.exception.message)
    }
  })

  const onPostChange = event => {
    setPostValues({
      ...postValues,
      id: props.category.id,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = event => {
    event.preventDefault()
    editCategory({ variables: postValues })
  }

  const deleteSubmit = event => {
    event.preventDefault()
    deletePost({
      variables: { id: props.category.id }
    })
  }

  return (
    <div>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Edit Category</h1>
        <Form.Input
          onChange={onPostChange}
          name="title"
          label="title"
          value={postValues.title}
          type="text"
        />
        <Form.Input
          onChange={onPostChange}
          control={TextArea}
          name="subtitle"
          label="subtitle"
          value={postValues.subtitle}
          type="text"
        />
        <Button primary type="submit">
          Edit Post
        </Button>
        <Modal
          basic
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          size="small"
          trigger={
            <Button type="button" basic color="red">
              Delete category
            </Button>
          }
        >
          <Header icon>
            <Icon name="trash alternate" />
            Delete category
          </Header>
          <Modal.Content>
            <p style={{ textAlign: 'center' }}>
              Are you sure that you want to delete this category? (This action
              is irreversible)
            </p>
            <p style={{ textAlign: 'center' }}>
              ALL SUBCATEGORIES AND POSTS WILL BE REMOVED AS WELL, ARE YOU SURE?
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              basic
              color="yellow"
              inverted
              onClick={() => setOpen(false)}
            >
              <Icon name="checkmark" /> Cancel
            </Button>
            <Button color="red" inverted onClick={deleteSubmit}>
              <Icon name="remove" /> Delete
            </Button>
          </Modal.Actions>
        </Modal>
        <Button onClick={() => props.handler(false)}>Cancel</Button>
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

export default EditCategory
