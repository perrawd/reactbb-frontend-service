import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'

const ThreadPost = props => {
  return (
    <div>
      <Card raised={true} color="blue" centered fluid>
        <Card.Content>
          <Image
            floated="left"
            size="mini"
            src={`https://semantic-ui.com/images/avatar2/large/mark.png`}
          />
          <Card.Header />
          <Card.Meta>Posted by kalle</Card.Meta>
          <Card.Meta>On 2021-03-25</Card.Meta>
          <Card.Description>{props.data.body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div>
            <Button
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
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}

export default ThreadPost
