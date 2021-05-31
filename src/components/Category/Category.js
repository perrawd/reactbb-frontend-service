import React from 'react'
import { Table } from 'semantic-ui-react'

import { SubCategory } from '../SubCategory/SubCategory.js'

const Category = props => {
  return (
    <Table fixed>
      <Table.Body>
        <Table.Row>
          <Table.Cell width={1} textAlign="center" />
          <Table.Cell width={7}>
            <h3>{props.data.title}</h3>
          </Table.Cell>
          <Table.Cell width={1} textAlign="center">
            Trådar
          </Table.Cell>
          <Table.Cell width={1} textAlign="center">
            Inlägg
          </Table.Cell>
          <Table.Cell width={6}>Senaste inlägg</Table.Cell>
        </Table.Row>
        {props.data.subcategories.map(subcategory => {
          return <SubCategory data={subcategory} key={subcategory.id} />
        })}
      </Table.Body>
    </Table>
  )
}

export default Category
