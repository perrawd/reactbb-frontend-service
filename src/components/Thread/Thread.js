import React, { useContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import ThreadPost from '../ThreadPost/ThreadPost'
import ReplyThread from '../ReplyThread/ReplyThread'
import { AuthContext } from '../../context/auth'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'

const Thread = props => {
  const { user } = useContext(AuthContext)
  // eslint-disable-next-line no-console
  console.log(user)
  const queryParams = props.location.search
  const shortid = new URLSearchParams(queryParams).get('sid')

  const GET_POST_QUERY = gql`
    query Thread($id: ID!) {
      getThreadByID(id: $id) {
        title
        subcategory {
          id
          title
          category {
            title
          }
        }
        posts {
          id
          body
          isEdited
          createdAt
          updatedAt
          thread {
            id
          }
          replyto {
            id
            body
            author
          }
          likes {
            username
          }
          replies
          author
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
      <Breadcrumbs
        type={'thread'}
        category={data.getThreadByID.subcategory.category.title}
        subcategory={{
            id: data.getThreadByID.subcategory.id,
            title: data.getThreadByID.subcategory.title
          }}
        current={data.getThreadByID.title}/>
      <h3>{data.getThreadByID.title}</h3>
      {posts.map(post => {
        return <ThreadPost key={post.id} data={post} query={GET_POST_QUERY}/>
      })}
      {user &&
        <ReplyThread thread={shortid} query={GET_POST_QUERY}></ReplyThread>
      }
    </div>
  )
}

export default Thread
