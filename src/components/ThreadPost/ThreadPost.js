import React, { useContext, useState } from 'react'
import { Card, Image, Button, Message, Icon } from 'semantic-ui-react'
import moment from 'moment'
import { AuthContext } from '../../context/auth'
import { Link, useHistory } from 'react-router-dom'
import ReplyThread from '../ReplyThread/ReplyThread'
import LikeButton from '../LikeButton/LikeButton'


const ThreadPost = props => {
  const { user } = useContext(AuthContext)
  const history = useHistory()

  const [isReply, setIsReply] = useState(false)
  // eslint-disable-next-line no-console
  console.log(user)
  const d = new Date(Number(props.data.createdAt))
  // eslint-disable-next-line no-console
  console.log(d)
  // eslint-disable-next-line no-console
  console.log(props)
  return (
    <div style={{marginBottom: 10}}>
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
        <Card.Description>
          {Boolean(props.data.replyto) && <Message size="mini" style={{marginBottom: 15}}>
              <p style={{fontStyle: "italic"}}>This is a reply to the following post by {props.data.replyto.author} on {props.data.createdAt}</p>
              <p>
                {props.data.replyto.body}
              </p>
            </Message>
            }
          {props.data.body}
          {props.data.isEdited && <p style={{fontStyle: "italic",
          fontSize: "x-small",
          marginTop: 15}
          }>
            {`This post was last edited on ${
              moment(new Date(Number(props.data.updatedAt))).format("YYYY-MM-DD HH:mm")
            }`}
            </p>}
          </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div>
        <LikeButton
          user={user}
          post={props.data}
          query={props.query}>
        </LikeButton>
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
              content: props.data.replies
            }}
            onClick={user ? () => setIsReply(!isReply) : () => history.push("/login")}
          />
          { user && (user.role === 'MODERATOR' || user.username === props.data.author) &&
          <Link to={{
              pathname: `/editpost`,
              state: props.data
            }}>
            <Button basic compact color="yellow" floated="right">
              <Icon name="edit outline" />
              Edit Post
            </Button>
          </Link>
        }
        </div>
        {isReply && <ReplyThread isreply={setIsReply} post={props.data} thread={props.data.thread.id} query={props.query}/>}
      </Card.Content>
    </Card>
  </div>
  )
}

export default ThreadPost
