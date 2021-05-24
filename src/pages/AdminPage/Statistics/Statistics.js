import React from 'react'
import { Table, Statistic } from 'semantic-ui-react'

const Statistics = props => {
  // eslint-disable-next-line no-console
  console.log(props.categories.map(category => category.subcategories.length))
  return <div>
    <Table fixed textAlign="center">
      <Table.Body>
        <Table.Row>
          <Table.Cell>
          <Statistic>
            <Statistic.Value>{props.categories.length}</Statistic.Value>
            <Statistic.Label>Categories</Statistic.Label>
          </Statistic>
          </Table.Cell>
          <Table.Cell>
          <Statistic>
          <Statistic.Value>{props.categories.map(category => category.subcategories.length).reduce((a, b) => a + b)}</Statistic.Value>
            <Statistic.Label>Subcategories</Statistic.Label>
            </Statistic>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
          </Table.Cell>
          <Table.Cell>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </div>
}

export default Statistics
