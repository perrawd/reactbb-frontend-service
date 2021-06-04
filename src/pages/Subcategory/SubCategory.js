/**
 * SubCategory page component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import { Table, Icon, Breadcrumb, Button } from 'semantic-ui-react'
import moment from 'moment'

import { AuthContext } from '../../context/auth'

export const GET_THREADS_QUERY = gql`
  query SubCategory($id: ID!) {
    getSubCategoryByID(id: $id) {
      title
      category {
        title
      }
      threads {
        id
        title
        author
        postCount
        updatedAt
      }
    }
  }
`

/**
 * Display a specific Subcategory page with it's threads.
 *
 */
const Subcategory = props => {
  const { user } = useContext(AuthContext)

  const queryParams = props.location.search
  const shortid = new URLSearchParams(queryParams).get('sid')

  const { loading, error, data } = useQuery(GET_THREADS_QUERY, {
    variables: {
      id: shortid
    }
  })

  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error.message}`
  }

  const threads = data.getSubCategoryByID.threads.slice().sort((a, b) => b.updatedAt - a.updatedAt)

  return (
    <div>
      <div style={{marginBottom: 15}}>
      <Breadcrumb>
        <Breadcrumb.Section link as={Link} to="/">Home</Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section link as={Link} to="/">{data.getSubCategoryByID.category.title}</Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section active>{data.getSubCategoryByID.title}
        </Breadcrumb.Section>
        <Breadcrumb.Divider />
      </Breadcrumb>
      </div>
      {user &&
        <Link
          to={{
            pathname: '/addthread',
            state: {
              subcatid: shortid,
              query: GET_THREADS_QUERY
            }
          }}
        >
          <Button basic color="green" size="tiny" compact>
          <Icon circular name="add" inverted color="green" link />
          Add thread
          </Button>
        </Link>
      }
      <Table celled sortable>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={8}>
              <h5>Threads</h5>
            </Table.Cell>
            <Table.Cell width={1} textAlign="center">
              Posts
            </Table.Cell>
            <Table.Cell width={3} textAlign="center">
              Posted by
            </Table.Cell>
            <Table.Cell width={4}>Last updated</Table.Cell>
          </Table.Row>
          {threads.map(thread => {
            return (
              <Table.Row key={thread.id}>
                <Table.Cell width={8}>
                  <Link to={`/thread?sid=${thread.id}`}>{thread.title}</Link>
                </Table.Cell>
                <Table.Cell width={1} textAlign="center">
                  {thread.postCount}
                </Table.Cell>
                <Table.Cell width={1} textAlign="center">
                {thread.author}
                </Table.Cell>
                <Table.Cell width={6}>{moment(new Date(Number(thread.updatedAt))).fromNow()}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default Subcategory
