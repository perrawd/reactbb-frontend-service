/**
 * MyProfile page component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React from 'react'
import { Grid, Image, Message } from 'semantic-ui-react'
import MyFeed from './MyFeed/MyFeed'

const MyProfile = () => {
  const center = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
  return (
    <div>
      <Message negative>
        <Message.Header>
            Please note that this component is non-functional.
        </Message.Header>
        <p>This is a mock-up to demonstrate a planned feature.</p>
      </Message>
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column style={center}>
            <div>
              <Image src="./profile.png" size="medium"/>
              <p style={center}>I am just a placeholder</p><br/>
              <p style={center}>100 Following</p>
              <p style={center}>100 Followers</p>
              <a style={center}>Edit profile</a>
              <br/>
              <a style={center}>Request your data</a>
              <br/>
              <a style={center}> Delete your account</a>
            </div>
          </Grid.Column>
          <Grid.Column>
            <MyFeed />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default MyProfile
