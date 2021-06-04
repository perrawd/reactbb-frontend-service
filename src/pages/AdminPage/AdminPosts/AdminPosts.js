/**
 * AdminPosts component.
 * Main page for AdminPosts.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'
import moment from 'moment'

const AdminPosts = props => {
  const {posts} = props

  return (
    <div>
      <Table celled fixed >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Body</Table.HeaderCell>
            <Table.HeaderCell>Author</Table.HeaderCell>
            <Table.HeaderCell>Thread</Table.HeaderCell>
            <Table.HeaderCell>Created At</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {posts.map(post => {
            return (
            <Table.Row key={post.id}>
              <Table.Cell>{post.body.slice(0, 10)}</Table.Cell>
              <Table.Cell>{post.author}</Table.Cell>
              <Table.Cell>
                {post.thread ? <Link to={`/thread?sid=${post.thread.id}`}>
                {post.thread.title}
                </Link>
                : "No thread"
              }
              </Table.Cell>
              <Table.Cell>{moment(new Date(Number(post.createdAt))).format("YYYY-MM-DD HH:mm")}</Table.Cell>
            </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default AdminPosts
