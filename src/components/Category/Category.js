import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

const Category = props => {
  return (
    <div>
      <Grid celled padded divided="false">
        <Grid.Row>
          <Grid.Column width={8}><h3>{props.data.title}</h3></Grid.Column>
          <Grid.Column width={1} textAlign="center">Trådar</Grid.Column>
          <Grid.Column width={1} textAlign="center">Inlägg</Grid.Column>
          <Grid.Column width={6}>Senaste inlägg</Grid.Column>
        </Grid.Row>
        {props.data.subcategories.map(subcategory => {
          return (
            <Grid.Row key={subcategory.id}>
              <Grid.Column width={1}>
                <Image src="./logo192.png" size="mini" />
              </Grid.Column>
              <Grid.Column width={7}>
                <h5>{subcategory.title}</h5>
                {subcategory.subtitle}
              </Grid.Column>
              <Grid.Column width={1} textAlign="center">25</Grid.Column>
              <Grid.Column width={1} textAlign="center">10</Grid.Column>
              <Grid.Column width={6}>{subcategory.subtitle}</Grid.Column>
            </Grid.Row>
          )
        })}
      </Grid>
    </div>
  )
}

export default Category
