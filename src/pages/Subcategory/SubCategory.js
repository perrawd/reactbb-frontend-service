import React from 'react'
import { Grid } from 'semantic-ui-react'
import { gql, useQuery } from '@apollo/client'

const Subcategory = props => {
  const queryParams = props.location.search
  const shortid = new URLSearchParams(queryParams).get('sid')
  // eslint-disable-next-line no-console
  console.log(shortid)

  const GET_THREADS_QUERY = gql`
    query {
    getThreads {
    title
   }
  }
`
  const { loading, error, data } = useQuery(GET_THREADS_QUERY)
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

  const threads = data.getThreads
  // eslint-disable-next-line no-console
  console.log(threads)

  return (
    <div>
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={8}>
            <h5>Threads</h5>
          </Grid.Column>
          <Grid.Column width={1} textAlign="center">
            Posts
          </Grid.Column>
          <Grid.Column width={1} textAlign="center">
            Last post
          </Grid.Column>
          <Grid.Column width={6}>Last post</Grid.Column>
        </Grid.Row>
        {threads.map(thread => {
          return <Grid.Row key={thread.id}>
            <Grid.Column width={8}>
              {thread.title}
            </Grid.Column>
            <Grid.Column width={1} textAlign="center">
              5
            </Grid.Column>
            <Grid.Column width={1} textAlign="center">
              3
            </Grid.Column>
            <Grid.Column width={6}>Senaste inlägg</Grid.Column>
          </Grid.Row>
        })}
      </Grid>
    </div>
  )
}

export default Subcategory
