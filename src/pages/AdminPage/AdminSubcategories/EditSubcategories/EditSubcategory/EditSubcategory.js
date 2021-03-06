/**
 * EditSubcategory component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React, { useState, useContext } from 'react'
import { Form, TextArea, Button, Icon, Modal, Header } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'

import { MessageContext } from '../../../../../context/flashmessage'
import { GET_CATEGORIES_QUERY } from '../../../useMultipleQueries.js'

/**
 * GraphqQL mutation queries.
 */
const EDIT_SUBCATEGORY = gql`
  mutation editSubcategory($id: ID!, $title: String, $subtitle: String) {
    editSubcategory(id: $id, title: $title, subtitle: $subtitle) {
      success
    }
  }
`

const DELETE_SUBCATEGORY = gql`
  mutation deleteSubcategory($id: ID!) {
    deleteSubcategory(id: $id) {
      success
    }
  }
`

const EditSubcategory = props => {
  const [errors, setErrors] = useState({})

  const [, setMessage] = useContext(MessageContext)

  const [open, setOpen] = useState(false)

  const [postValues, setPostValues] = useState({
    title: props.subcategory.title,
    subtitle: props.subcategory.subtitle
  })

  const queryOptions = [{ query: GET_CATEGORIES_QUERY }]

  /**
   * GraphqQL mutation functions.
   */
  const [editSubcategory, { loading }] = useMutation(EDIT_SUBCATEGORY, {
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

  const [deletePost] = useMutation(DELETE_SUBCATEGORY, {
    refetchQueries: queryOptions,
    onCompleted () {
      setOpen(false)
      props.handler(false)
      setMessage({
        active: true,
        message: 'Subcategory has been deleted.',
        type: 'red'
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
      id: props.subcategory.id,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = event => {
    event.preventDefault()
    editSubcategory({ variables: postValues })
  }

  const deleteSubmit = event => {
    event.preventDefault()
    deletePost({
      variables: { id: props.subcategory.id }
    })
  }

  return (
    <div>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Edit Subcategory</h1>
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
              Delete subcategory
            </Button>
          }
        >
          <Header icon>
            <Icon name="trash alternate" />
            Delete subcategory
          </Header>
          <Modal.Content>
            <p style={{ textAlign: 'center' }}>
              Are you sure that you want to delete this subcategory? (This action
              is irreversible)
            </p>
            <p style={{ textAlign: 'center' }}>
              ALL THREADS AND POSTS WILL BE REMOVED AS WELL, ARE YOU SURE?
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

export default EditSubcategory
