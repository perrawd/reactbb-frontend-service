import React, { useContext } from 'react'
import { Table, Icon } from 'semantic-ui-react'
import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth'

const Subcategory = props => {
  const { user } = useContext(AuthContext)
  const queryParams = props.location.search
  const shortid = new URLSearchParams(queryParams).get('sid')
  // eslint-disable-next-line no-console
  console.log(shortid)

  const GET_THREADS_QUERY = gql`
    query SubCategory($id: ID!) {
      getSubCategoryByID(id: $id) {
        title
        threads {
          id
          title
        }
      }
    }
  `
  const { loading, error, data } = useQuery(GET_THREADS_QUERY, {
    variables: {
      id: shortid
    }
  })
  // eslint-disable-next-line no-console
  console.log(data)
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return `Error! ${error.message}`
  }

  const { threads } = data.getSubCategoryByID
  // eslint-disable-next-line no-console
  console.log(threads)

  return (
    <div>
      {user &&
        <Link
          to={{
            pathname: '/addthread',
            state: { subcatid: shortid }
          }}
        >
          <Icon circular name="add" inverted color="green" link />
        </Link>
      }
      <Table celled>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={8}>
              <h5>Threads</h5>
            </Table.Cell>
            <Table.Cell width={1} textAlign="center">
              Posts
            </Table.Cell>
            <Table.Cell width={1} textAlign="center">
              Last post
            </Table.Cell>
            <Table.Cell width={6}>Last post</Table.Cell>
          </Table.Row>
          {threads.map(thread => {
            return (
              <Table.Row key={thread.id}>
                <Table.Cell width={8}>
                  <Link to={`/thread?sid=${thread.id}`}>{thread.title}</Link>
                </Table.Cell>
                <Table.Cell width={1} textAlign="center">
                  5
                </Table.Cell>
                <Table.Cell width={1} textAlign="center">
                  3
                </Table.Cell>
                <Table.Cell width={6}>Senaste inlägg</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default Subcategory
