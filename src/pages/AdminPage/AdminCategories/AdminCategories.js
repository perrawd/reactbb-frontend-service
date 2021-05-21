import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Card, Button, Modal, Form } from 'semantic-ui-react'
import EditCategory from '../EditCategory/EditCategory'

const GET_CATEGORIES_QUERY = gql`
  query {
    getCategories {
      id
      title
      subtitle
      author
      createdAt
      updatedAt
      subcategories {
        id
        title
        subtitle
      }
    }
  }
`

const ADD_CATEGORY = gql`
  mutation addCategory($title: String!, $subtitle: String) {
    addCategory(title: $title, subtitle: $subtitle) {
      title
      subtitle
    }
  }
`

const AdminCategories = () => {
  const [activeCategory, setActiveCategory] = useState({})
  const [editCategory, setEditCategory] = useState(false)
  const [open, setOpen] = React.useState(false)

  const { loading, error, data } = useQuery(GET_CATEGORIES_QUERY)
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error.message}`
  }

  const [addCategory] = useMutation(ADD_CATEGORY, {
    onCompleted () {
      // eslint-disable-next-line no-console
      console.log(data)
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

  const handleOnClick = cat => {
    setActiveCategory(cat)
    setEditCategory(true)
  }

  const addButton = () => {
    addCategory({ variables: postValues})
    setOpen(false)
  }

  const categories = data.getCategories
  // eslint-disable-next-line no-console
  console.log(categories)

  return (
    editCategory
    ? <EditCategory category={activeCategory} handler={setEditCategory}/>
    : <div>
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button basic color="green" size="small" >Add category</Button>}
    >
      <Modal.Header>Add a new category</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form noValidate className={loading ? 'loading' : ''}>
        <Form.Input
          onChange={onPostChange}
          name="title"
          label="title"
          value={postValues.title}
          type="text"
        />
        <Form.Input
          onChange={onPostChange}
          name="subtitle"
          label="subtitle"
          value={postValues.subtitle}
          type="text"
        />
      </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Add category"
          labelPosition="right"
          icon="checkmark"
          onClick={addButton}
          positive
        />
      </Modal.Actions>
    </Modal>
    <h5>To edit a category and its subcategories, click on Edit.</h5>

      <Card.Group>
        {categories.map(category => {
          return (
            <Card key={category.id}>
              <Card.Content>
                <Card.Header>{category.title}</Card.Header>
                <Card.Meta>{category.createdAt}</Card.Meta>
                <Card.Description>
                  {
                      category.subcategories.map(subcategory => {
                          return (
                            <div key={subcategory.id}>
                                <strong>{subcategory.title}</strong><br />
                            </div>
                          )
                      })
                  }
                </Card.Description>
              </Card.Content>
                <Card.Content extra>
                    <Button color="yellow" onClick={() => handleOnClick(category)}>
                      Edit
                    </Button>
                </Card.Content>
            </Card>
          )
        })}
      </Card.Group>
    </div>
  )
}

export default AdminCategories
