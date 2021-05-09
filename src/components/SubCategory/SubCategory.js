import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Image } from 'semantic-ui-react'

export const SubCategory = props => {
  return (
    <Grid.Row key={props.data.id}>
      <Grid.Column width={1} textAlign="center">
        <Image src="./logo192.png" size="mini" />
      </Grid.Column>
      <Grid.Column width={7}>
        <Link to={props.data.id}><h5>{props.data.title}</h5></Link>
        {props.data.subtitle}
      </Grid.Column>
      <Grid.Column width={1} textAlign="center">
        25
      </Grid.Column>
      <Grid.Column width={1} textAlign="center">
        10
      </Grid.Column>
      <Grid.Column width={6}>{props.data.subtitle}</Grid.Column>
    </Grid.Row>
  )
}
