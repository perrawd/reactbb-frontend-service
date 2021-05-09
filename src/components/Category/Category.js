import React from 'react'
import { Grid } from 'semantic-ui-react'
import { SubCategory } from '../SubCategory/SubCategory.js'

const Category = props => {
  return (
    <div>
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={8}><h3>{props.data.title}</h3></Grid.Column>
          <Grid.Column width={1} textAlign="center">Trådar</Grid.Column>
          <Grid.Column width={1} textAlign="center">Inlägg</Grid.Column>
          <Grid.Column width={6}>Senaste inlägg</Grid.Column>
        </Grid.Row>
        {props.data.subcategories.map(subcategory => {
          return (
            <SubCategory data={subcategory} key={subcategory.id}></SubCategory>
          )
        })}
      </Grid>
    </div>
  )
}

export default Category
