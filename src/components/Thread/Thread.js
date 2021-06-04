import React, { useContext, useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

import { AuthContext } from '../../context/auth'
import { MessageContext } from '../../context/flashmessage'
import { Modal, Icon, Button, Header } from 'semantic-ui-react'

import { GET_THREADS_QUERY } from '../../pages/Subcategory/SubCategory'
import ThreadPost from '../ThreadPost/ThreadPost'
import ReplyThread from '../ReplyThread/ReplyThread'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import { useHistory } from 'react-router'

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
const DELETE_THREAD = gql`
  mutation deleteThread($id: ID!) {
    deleteThread(id: $id) {
      success
    }
  }
`

const Thread = props => {
  const [open, setOpen] = useState(false)
  const { user } = useContext(AuthContext)
  const [, setMessage] = useContext(MessageContext)

  const history = useHistory()

  const queryParams = props.location.search
  const shortid = new URLSearchParams(queryParams).get('sid')

  const [deletePost] = useMutation(DELETE_THREAD, {
    onCompleted () {
      setOpen(false)
      setMessage({
        active: true,
        message: 'Thread has been deleted.',
        type: 'red'
      })
      history.goBack()
    }
  })

  const { loading, error, data } = useQuery(GET_POST_QUERY, {
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

  const { posts } = data.getThreadByID

  const deleteSubmit = event => {
    event.preventDefault()
    deletePost({
      variables: { id: shortid },
      refetchQueries: [
        {
          query: GET_THREADS_QUERY,
          variables: { id: data.getThreadByID.subcategory.id }
        }
      ]
    })
  }

  return (
    <div>
      <Breadcrumbs
        type={'thread'}
        category={data.getThreadByID.subcategory.category.title}
        subcategory={{
          id: data.getThreadByID.subcategory.id,
          title: data.getThreadByID.subcategory.title
        }}
        current={data.getThreadByID.title}
      />
      <h3>{data.getThreadByID.title}</h3>
      {user && user.role === 'MODERATOR' && <div style={{marginBottom: 10}}>
        <Modal
          basic
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          size="small"
          trigger={
            <Button type="button" basic compact color="red">
              Delete thread
            </Button>
          }
        >
          <Header icon>
            <Icon name="trash alternate" />
            Delete
          </Header>
          <Modal.Content>
            <p style={{ textAlign: 'center' }}>
              Are you sure that you want to delete this thread? (This action
              is irreversible)
            </p>
            <p style={{ textAlign: 'center' }}>
              ALL POSTS IN THIS WILL BE INACCESSIBLE AS WELL, ARE YOU SURE?
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              basic
              color="yellow"
              inverted
              onClick={() => setOpen(false)}
            >
              <Icon name="checkmark" /> Cancel
            </Button>
            <Button
              color="red"
              inverted
              onClick={event => deleteSubmit(event)}
            >
              <Icon name="remove" /> Delete
            </Button>
          </Modal.Actions>
        </Modal>
        </div>
      }
      {posts.map(post => {
        return <ThreadPost key={post.id} data={post} query={GET_POST_QUERY} />
      })}
      {user && <ReplyThread thread={shortid} query={GET_POST_QUERY} />}
    </div>
  )
}

export default Thread
