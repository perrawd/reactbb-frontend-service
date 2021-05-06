import React from 'react'
import { Link } from 'react-router-dom'
import { Item, Label } from 'semantic-ui-react'

export const SubCategory = props => {
  return (
    <div>
        <Item as={Link} to="/posts" key={props.data.id}>
          <Item.Image src="./logo192.png" size="tiny" />
          <Item.Content>
            <Item.Header>{props.data.title}</Item.Header>

            <Item.Description>{props.data.subtitle}</Item.Description>
            <Item.Extra>
              <Label>Demo</Label>
              <Label>Limited</Label>
              <Label icon="globe" content="Additional Languages" />
            </Item.Extra>
          </Item.Content>
        </Item>
    </div>
  )
}
