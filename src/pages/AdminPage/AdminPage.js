import React from 'react'
import { Tab } from 'semantic-ui-react'
import GetUsers from './GetUsers/GetUsers'
import GetPosts from './GetPosts/GetPosts'
import AdminSubcategories from './AdminSubcategories/AdminSubcategories'
import AdminCategories from './AdminCategories/AdminCategories'
import { gql, useQuery } from '@apollo/client'

const GET_CATEGORIES_QUERY = gql`
  query {
    getCategories {
      id
      title
      subtitle
      author
      createdAt
      updatedAt
      subcategories {
        id
        title
        subtitle
      }
    }
  }
`

const AdminPage = () => {

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


  const panes = [
    { menuItem: 'Categories',
    // eslint-disable-next-line react/display-name
    render: () => <Tab.Pane><AdminCategories categories={categories} /></Tab.Pane> },
    { menuItem: 'Subcategories',
    // eslint-disable-next-line react/display-name
    render: () => <Tab.Pane><AdminSubcategories categories={categories} /></Tab.Pane> },
    { menuItem: 'Posts',
    // eslint-disable-next-line react/display-name
    render: () => <Tab.Pane><GetPosts /></Tab.Pane> },
    { menuItem: 'Users',
    // eslint-disable-next-line react/display-name
    render: () => <Tab.Pane><GetUsers /></Tab.Pane> }
  ]

  return (
    <div>
      <h1>Admin!</h1>

      <Tab panes={panes} />
    </div>
  )
}

export default AdminPage
