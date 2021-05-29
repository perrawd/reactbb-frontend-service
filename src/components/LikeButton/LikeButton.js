/* eslint-disable no-nested-ternary */
import { gql, useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { Button, Icon, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const LikeButton = props => {
    // eslint-disable-next-line no-console
    console.log(props)
    const LIKE_POST_MUTATION = gql`
      mutation addLikes($id: ID!) {
        addLikes(id: $id) {
          success
        }
      }
    `
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        if (props.user && props.post.likes.find(like => like.username === props.user.username)) {
            setLiked(true)
        }
    }, [props.user, props.post.likes])

    const [addLikes] = useMutation(LIKE_POST_MUTATION, {
        variables: { id: props.post.id },
        refetchQueries: [
            { query: props.query,
              variables: { id: props.post.id } }
          ],
        onCompleted () {
            setLiked(true)
        }
      })

      const likeButton = props.user
      ? liked ? <Button color="teal">
            <Icon name="heart" />
          </Button>
        : <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
        : <Button as={Link} to="/login" color="teal" basic>
          <Icon name="heart" />
        </Button>

    return <div>
                <Button as="div" labelPosition="right" onClick={addLikes}>
      {likeButton}
      <Label basic color="teal" pointing="left">
        {props.post.likes.length}
      </Label>
    </Button>
        </div>

}

export default LikeButton
