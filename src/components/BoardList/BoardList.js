import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Category from '../Category/Category.js'


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
  // eslint-disable-next-line no-console
  console.log(categories)

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
