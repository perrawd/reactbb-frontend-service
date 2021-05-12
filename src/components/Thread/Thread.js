import React, { useContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import ThreadPost from '../ThreadPost/ThreadPost'
import ReplyThread from '../ReplyThread/ReplyThread'
import { AuthContext } from '../../context/auth'

const Thread = props => {
  const { user } = useContext(AuthContext)
  const queryParams = props.location.search
  const shortid = new URLSearchParams(queryParams).get('sid')

  const GET_POST_QUERY = gql`
    query Thread($id: ID!) {
      getThreadByID(id: $id) {
        title
        posts {
          id
          body
          createdAt
          updatedAt
        }
      }
    }
  `

  const { loading, error, data } = useQuery(GET_POST_QUERY, {
    variables: {
      id: shortid
    }
  })

  if (loading) {
    return 'Loading...'
  }
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return `Error! ${error.message}`
  }

  const { posts } = data.getThreadByID
  // eslint-disable-next-line no-console
  console.log(data)

  return (
    <div>
      <h3>{data.getThreadByID.title}</h3>
      {posts.map(post => {
        return <ThreadPost key={post.id} data={post} />
      })}
      {user &&
        <ReplyThread thread={shortid}></ReplyThread>
      }
    </div>
  )
}

export default Thread
