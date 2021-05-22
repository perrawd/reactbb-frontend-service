import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Card, Button } from 'semantic-ui-react'
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

const EditCategories = () => {
  const [activeCategory, setActiveCategory] = useState({})
  const [editCategory, setEditCategory] = useState(false)


  const { loading, error, data } = useQuery(GET_CATEGORIES_QUERY)
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error.message}`
  }

  const handleOnClick = cat => {
    setActiveCategory(cat)
    setEditCategory(true)
  }

  const categories = data.getCategories
  // eslint-disable-next-line no-console
  console.log(categories)

  return (
    editCategory
    ? <EditCategory category={activeCategory} handler={setEditCategory}/>
    : <div>
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

export default EditCategories
