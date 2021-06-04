/**
 * GET_POST_QUERY component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import { gql } from '@apollo/client'

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
export { GET_POST_QUERY }
