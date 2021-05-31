/* eslint-disable no-nested-ternary */
import { gql, useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Button, Icon, Label } from 'semantic-ui-react'

const LikeButton = props => {
  const history = useHistory()

  const [liked, setLiked] = useState(false)

  const [currentLikes, setCurrentLikes] = useState(props.post.likes.length)

  const LIKE_POST_MUTATION = gql`
    mutation addLikes($id: ID!) {
      addLikes(id: $id) {
        success
      }
    }
  `

  useEffect(
    () => {
      if (
        props.user &&
        props.post.likes.find(like => like.username === props.user.username)
      ) {
        setLiked(true)
      }
    },
    [props.user, props.post.likes]
  )

  const [addLikes] = useMutation(LIKE_POST_MUTATION, {
    variables: { id: props.post.id },
    refetchQueries: [
      {
        query: props.query,
        variables: { id: props.post.id }
      }
    ],
    onCompleted () {
      setLiked(!liked)
      if (liked) {
        setCurrentLikes(currentLikes - 1)
      } else {
        setCurrentLikes(currentLikes + 1)
      }
    }
  })

  const likeButton = props.user ? liked ? <Button compact color="red" size="mini" onClick={addLikes}>
      <Icon name="heart" /> Like
    </Button>
    : <Button compact color="red" size="mini" basic onClick={addLikes}>
      <Icon name="heart" /> Like
    </Button>
    : <Button
      compact
      color="red"
      size="mini"
      basic
      onClick={() => history.push('/login')}
    >
      <Icon name="heart" /> Like
    </Button>

  return (
    <Button as="div" labelPosition="right">
      {likeButton}
      <Label basic color="red" pointing="left" size="mini">
        {currentLikes}
      </Label>
    </Button>
  )
}

export default LikeButton
