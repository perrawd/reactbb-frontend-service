import React from 'react'
import { Table, Statistic } from 'semantic-ui-react'

const Statistics = props => {
  // eslint-disable-next-line no-console
  console.log(props.categories.map(category => category.subcategories.length))
  return <div>
    <Table fixed textAlign="center" style={{width: 400,
      marginLeft: "auto",
      marginRight: "auto"}}>
      <Table.Body>
      <Table.Row>
      <Table.Cell>
          <Statistic size="huge">
          <Statistic.Value>{props.users.length}</Statistic.Value>
            <Statistic.Label>Users</Statistic.Label>
            </Statistic>
          </Table.Cell>
          <Table.Cell>
          <Statistic size="huge">
          <Statistic.Value>{props.posts.length}</Statistic.Value>
            <Statistic.Label>Posts</Statistic.Label>
            </Statistic>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
          <Statistic size="huge">
            <Statistic.Value>{props.categories.length}</Statistic.Value>
            <Statistic.Label>Categories</Statistic.Label>
          </Statistic>
          </Table.Cell>
          <Table.Cell>
          <Statistic size="huge">
          <Statistic.Value>{props.categories.map(category => category.subcategories.length).reduce((a, b) => a + b)}</Statistic.Value>
            <Statistic.Label>Subcategories</Statistic.Label>
            </Statistic>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </div>
}

export default Statistics
