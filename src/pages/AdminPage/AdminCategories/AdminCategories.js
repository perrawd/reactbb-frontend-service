import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Card, Button } from 'semantic-ui-react'

const GET_CATEGORIES_QUERY = gql`
  query {
    getCategories {
      title
      subtitle
      id
      createdAt
      subcategories {
        id
        title
        subtitle
      }
    }
  }
`

const AdminCategories = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES_QUERY)
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error.message}`
  }

  const categories = data.getCategories
  // eslint-disable-next-line no-console
  console.log(categories)

  return (
    <div>
    <Button basic color="green" size="small">Add a category</Button>
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
                  <Button color="yellow">
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
