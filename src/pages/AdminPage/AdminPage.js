import React from 'react'
import { Tab } from 'semantic-ui-react'
import GetUsers from './GetUsers/GetUsers'
import GetPosts from './GetPosts/GetPosts'
import AdminSubcategories from './AdminSubcategories/AdminSubcategories'
import AdminCategories from './AdminCategories/AdminCategories'

const panes = [
  { menuItem: 'Categories',
  // eslint-disable-next-line react/display-name
  render: () => <Tab.Pane><AdminCategories /></Tab.Pane> },
  { menuItem: 'Subcategories',
  // eslint-disable-next-line react/display-name
  render: () => <Tab.Pane><AdminSubcategories /></Tab.Pane> },
  { menuItem: 'Posts',
  // eslint-disable-next-line react/display-name
  render: () => <Tab.Pane><GetPosts /></Tab.Pane> },
  { menuItem: 'Users',
  // eslint-disable-next-line react/display-name
  render: () => <Tab.Pane><GetUsers /></Tab.Pane> }
]

const AdminPage = () => {
  return (
    <div>
      <h1>Admin!</h1>

      <Tab panes={panes} />
    </div>
  )
}

export default AdminPage
