/**
 * MyFeed page component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React from 'react'
import { Feed, Icon } from 'semantic-ui-react'

const MyFeed = () => {
  return (
    <div>
      <Feed>
        <Feed.Event>
          <Feed.Label>
            <img src="https://semantic-ui.com/images/avatar/small/elliot.jpg" />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>Elliot Fu</Feed.User> added you as a friend
              <Feed.Date>1 Hour Ago</Feed.Date>
            </Feed.Summary>
            <Feed.Meta>
              <Feed.Like>
                <Icon name="like" />4 Likes
              </Feed.Like>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label image="https://semantic-ui.com/images/avatar/small/helen.jpg" />
          <Feed.Content>
            <Feed.Summary>
              <a>Helen Troy</a> posted <a>a new thread</a>
              <Feed.Date>4 days ago</Feed.Date>
            </Feed.Summary>
            <Feed.Meta>
              <Feed.Like>
                <Icon name="like" />1 Like
              </Feed.Like>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label image="https://semantic-ui.com/images/avatar/small/jenny.jpg" />
          <Feed.Content>
            <Feed.Summary
              date="2 Days Ago"
              user="Jenny Hess"
              content="added you as a friend"
            />
            <Feed.Meta>
              <Feed.Like>
                <Icon name="like" />8 Likes
              </Feed.Like>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label image="https://semantic-ui.com/images/avatar/small/joe.jpg" />
          <Feed.Content>
            <Feed.Summary>
              <a>Joe Henderson</a> replied to your post
              <Feed.Date>3 days ago</Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>
              Ours is a life of constant reruns. Were always circling back to
              where wed we started, then starting all over again. Even if we
              dont run extra laps that day, we surely will come back for more
              of the same another day soon.
            </Feed.Extra>
            <Feed.Meta>
              <Feed.Like>
                <Icon name="like" />5 Likes
              </Feed.Like>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label image="https://semantic-ui.com/images/avatar/small/justen.jpg" />
          <Feed.Content>
            <Feed.Summary>
              <a>Justen Kitsune</a> added <a>2 new photos</a> in a thread
              <Feed.Date>4 days ago</Feed.Date>
            </Feed.Summary>
            <Feed.Meta>
              <Feed.Like>
                <Icon name="like" />
                41 Likes
              </Feed.Like>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
        <Feed.Event>
          <Feed.Label image="https://semantic-ui.com/images/avatar2/small/elyse.png" />
          <Feed.Content>
            <Feed.Summary>
              <a>Elyse Johnson</a> replied to your post
              <Feed.Date>3 days ago</Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dignissim et tortor vel varius. Vivamus lacinia metus eget rutrum efficitur. Ut dictum mattis orci, vitae congue arcu vehicula a.
            </Feed.Extra>
            <Feed.Meta>
              <Feed.Like>
                <Icon name="like" />5 Likes
              </Feed.Like>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label image="https://semantic-ui.com/images/avatar2/small/molly.png" />
          <Feed.Content>
            <Feed.Summary>
              <a>Molly James</a> posted <a>a new thread</a>
              <Feed.Date>5 days ago</Feed.Date>
            </Feed.Summary>
            <Feed.Meta>
              <Feed.Like>
                <Icon name="like" />1 Like
              </Feed.Like>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label image="https://semantic-ui.com/images/avatar2/small/lena.png" />
          <Feed.Content>
            <Feed.Summary>
              <a>Lena Thomas</a> posted <a>a new thread</a>
              <Feed.Date>5 days ago</Feed.Date>
            </Feed.Summary>
            <Feed.Meta>
              <Feed.Like>
                <Icon name="like" />1 Like
              </Feed.Like>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </div>
  )
}

export default MyFeed
