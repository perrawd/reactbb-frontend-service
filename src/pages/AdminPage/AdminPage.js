import React from 'react'
import { Tab } from 'semantic-ui-react'
import Statistics from './Statistics/Statistics'
import AdminUsers from './AdminUsers/AdminUsers'
import AdminPosts from './AdminPosts/AdminPosts'
import AdminSubcategories from './AdminSubcategories/AdminSubcategories'
import AdminCategories from './AdminCategories/AdminCategories'
import useMultipleQueries from './useMultipleQueries'

const AdminPage = () => {

  const [
      { loading: loading1, data: gCategories },
      { loading: loading2, data: gPosts },
      { loading: loading3, data: gUsers }
    ] = useMultipleQueries()
      if (loading1 || loading2 || loading3) {
        return 'Loading...'
  }

  const categories = gCategories.getCategories
  const posts = gPosts.getPosts
  const users = gUsers.getUsers

  const panes = [
    { menuItem: 'Statistics',
    // eslint-disable-next-line react/display-name
    render: () => <Tab.Pane><Statistics categories={categories} posts={posts} users={users}/></Tab.Pane> },
    { menuItem: 'Categories',
    // eslint-disable-next-line react/display-name
    render: () => <Tab.Pane><AdminCategories categories={categories} /></Tab.Pane> },
    { menuItem: 'Subcategories',
    // eslint-disable-next-line react/display-name
    render: () => <Tab.Pane><AdminSubcategories categories={categories} /></Tab.Pane> },
    { menuItem: 'Posts',
    // eslint-disable-next-line react/display-name
    render: () => <Tab.Pane><AdminPosts posts={posts} /></Tab.Pane> },
    { menuItem: 'Users',
    // eslint-disable-next-line react/display-name
    render: () => <Tab.Pane><AdminUsers users={users}/></Tab.Pane> }
  ]

  return (
    <div>
      <h1>Admin center</h1>
      <Tab panes={panes} />
    </div>
  )
}

export default AdminPage
