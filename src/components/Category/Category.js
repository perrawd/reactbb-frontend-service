import React from 'react'
import { Link } from 'react-router-dom'
import { Item, Label } from 'semantic-ui-react'

const Category = props => {

  return (
    <div>
      <h2>{props.data.title}</h2>
      <Item.Group>
        {props.data.subcategories.map(subcategory => {
          return (
            <Item as={Link} to="/posts" key={subcategory.id}>
              <Item.Image src="./logo192.png" size="tiny" />
              <Item.Content>
                <Item.Header>{subcategory.title}</Item.Header>
                <Item.Description>{subcategory.subtitle}</Item.Description>
                <Item.Extra>
                  <Label>Demo</Label>
                  <Label>Limited</Label>
                  <Label icon="globe" content="Additional Languages" />
                </Item.Extra>
              </Item.Content>
            </Item>
          )
        })}
      </Item.Group>
    </div>
  )
}

export default Category
