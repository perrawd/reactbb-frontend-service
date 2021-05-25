import React from 'react'
import { Tab } from 'semantic-ui-react'
import AdminUsers from './AdminUsers/AdminUsers'
import AdminPosts from './AdminPosts/AdminPosts'
import AdminSubcategories from './AdminSubcategories/AdminSubcategories'
import AdminCategories from './AdminCategories/AdminCategories'
import useMultipleQueries from './useMultipleQueries'
import Statistics from './Statistics/Statistics'

const AdminPage = () => {


const [
  { loading: loading1, data: gCategories },
  { loading: loading2, data: gPosts },
  { loading: loading3, data: gUsers }
] = useMultipleQueries()
  if (loading1) {
    return 'Loading...'
  }
  if (loading2) {
    return 'Loading...'
  }
  if (loading3) {
    return 'Loading...'
  }

  const categories = gCategories.getCategories
  // eslint-disable-next-line no-console
  console.log(categories)
  const posts = gPosts.getPosts
  // eslint-disable-next-line no-console
  console.log(posts)
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
      <h1>Admin!</h1>

      <Tab panes={panes} />
    </div>
  )
}

export default AdminPage
