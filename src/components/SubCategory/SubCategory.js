import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Image } from 'semantic-ui-react'

export const SubCategory = props => {
  return (
    <Table.Row key={props.data.id}>
      <Table.Cell width={1} textAlign="center">
        <Image src="./logo192.png" size="mini" />
      </Table.Cell>
      <Table.Cell width={7}>
        <Link to={`/subcategories?sid=${props.data.id}`}><h5>{props.data.title}</h5></Link>
        {props.data.subtitle}
      </Table.Cell>
      <Table.Cell width={1} textAlign="center">
        {props.data.threadCount}
      </Table.Cell>
      <Table.Cell width={1} textAlign="center">
        10
      </Table.Cell>
      <Table.Cell width={6}>
        {props.data.subtitle}
      </Table.Cell>
    </Table.Row>
  )
}
