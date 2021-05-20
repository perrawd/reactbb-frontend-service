import React, { useContext } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import moment from 'moment'
import { AuthContext } from '../../context/auth'
import { Link } from 'react-router-dom'

const ThreadPost = props => {
  const { user } = useContext(AuthContext)
  // eslint-disable-next-line no-console
  console.log(user)
  const d = new Date(Number(props.data.createdAt))
  // eslint-disable-next-line no-console
  console.log(d)
  // eslint-disable-next-line no-console
  console.log(props)
  return (
    <Card raised={true} color="blue" centered fluid>
      <Card.Content>
        <Image
          floated="left"
          size="mini"
          src={`https://semantic-ui.com/images/avatar2/large/mark.png`}
        />
        <Card.Header />
        <Card.Meta>Posted by {props.data.author}</Card.Meta>
        <Card.Meta>On {moment(d).fromNow()}</Card.Meta>
        <Card.Description>{props.data.body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div>
          <Button
            compact
            size="mini"
            color="red"
            content="Like"
            icon="heart"
            label={{
              basic: true,
              color: 'red',
              pointing: 'left',
              content: '1'
            }}
          />
          <Button
            compact
            basic
            size="mini"
            color="blue"
            content="Reply"
            icon="fork"
            label={{
              as: 'a',
              basic: true,
              color: 'blue',
              pointing: 'left',
              content: '0'
            }}
          />
          { user && (user.role === 'MODERATOR' || user.username === props.data.author) &&
          <Link to={{
              pathname: `/editpost`,
              state: props.data
            }}>
            <Button basic compact color="yellow" floated="right">
              Edit Post
            </Button>
          </Link>
        }
        </div>

      </Card.Content>
    </Card>
  )
}

export default ThreadPost
