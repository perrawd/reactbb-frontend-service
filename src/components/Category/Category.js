/**
 * Category component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React from 'react'
import { Table } from 'semantic-ui-react'

import { SubCategory } from '../SubCategory/SubCategory.js'

const Category = props => {
  return (
    <Table color="teal" fixed>
      <Table.Body>
        <Table.Row>
          <Table.Cell width={1} textAlign="center" />
          <Table.Cell width={8}>
            <h3>{props.data.title}</h3>
          </Table.Cell>
          <Table.Cell width={2} textAlign="center">
            Threads
          </Table.Cell>
          <Table.Cell width={5}>Latest thread</Table.Cell>
        </Table.Row>
        {props.data.subcategories.map(subcategory => {
          return <SubCategory data={subcategory} key={subcategory.id} />
        })}
      </Table.Body>
    </Table>
  )
}

export default Category
