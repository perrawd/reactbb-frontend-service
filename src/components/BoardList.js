import React from 'react'
import {gql, useQuery} from '@apollo/client'
import { Item, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const query = gql`
  query {
    getCategories {
         title
         subtitle
         id
     }
    }
  `

function BoardList (props) {
  const { loading, error, data } = useQuery(query)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const categories = data.getCategories

  return (
    <Item.Group>
      {categories.map(category => (
        <Item as={Link} to='/postlist' key={category.id}>
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

export default BoardList
