/**
 * BoardList component.
 * Displays a list of categories and it's subcategories.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React from 'react'
import { gql, useQuery } from '@apollo/client'

import Category from '../Category/Category.js'

/**
 * GraphqQL queries.
 */
const GET_CATEGORIES_QUERY = gql`
  query {
    getCategories {
      title
      subtitle
      id
      subcategories {
        id
        title
        subtitle
        threadCount
        latest {
          id
          title
          createdAt
          author
        }
      }
    }
  }
`

const BoardList = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES_QUERY)

  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error.message}`
  }

  const categories = data.getCategories

  return (
    <div>
      {categories.map(category => {
          return <Category data={category} key={category.id}></Category>
        })
      }
    </div>
  )
}

export { BoardList, GET_CATEGORIES_QUERY }
