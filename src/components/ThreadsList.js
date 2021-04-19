import React from 'react'
import {gql, useQuery} from '@apollo/client'
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const query = gql`
  query {
    getPosts {
         title
     }
    }
  `

const ThreadsList = (props) => {
  const { loading, error, data } = useQuery(query)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const posts = data.getPosts

  return (
        <List divided relaxed>
          {
            posts.map(post => (
              <List.Item as={Link} to='/posts'>
              <List.Icon name='chat' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header>{post.title}</List.Header>
                <List.Header>(6)</List.Header>
                <List.Description>Updated 10 mins ago</List.Description>
              </List.Content>
            </List.Item>
            ))
          }
        </List>
    )
}

export default ThreadsList