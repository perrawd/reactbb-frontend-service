import React from 'react'
import {gql, useQuery} from '@apollo/client'
import { Item, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const GET_CATEGORIES_QUERY = gql`
  query {
    getCategories {
         title
         subtitle
         id
     }
    }
  `

const BoardList = (props) => {
  const { loading, error, data } = useQuery(GET_CATEGORIES_QUERY)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const categories = data.getCategories

  return (
    <Item.Group>
      {categories.map(category => (
        <Item as={Link} to='/posts' key={category.id}>
          <Item.Image src='./logo192.png' size='tiny'/>
          <Item.Content>
            <Item.Header>{category.title}</Item.Header>
            <Item.Meta>
              <span className='cinema'>{category.subtitle}</span>
            </Item.Meta>
            <Item.Description>{category.subtitle}</Item.Description>
            <Item.Extra>
              <Label>Demo</Label>
              <Label>Limited</Label>
              <Label icon='globe' content='Additional Languages' />
            </Item.Extra>
          </Item.Content>
        </Item>
      )
    )} 
    </Item.Group>

  )
}

export { BoardList, GET_CATEGORIES_QUERY }
