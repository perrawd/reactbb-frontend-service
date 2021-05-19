import React from 'react'
import { Tab } from 'semantic-ui-react'
import GetUsers from './GetUsers/GetUsers'

const panes = [
  { menuItem: 'Categories',
  // eslint-disable-next-line react/display-name
  render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
  { menuItem: 'Subcategories',
  // eslint-disable-next-line react/display-name
  render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
  { menuItem: 'Posts',
  // eslint-disable-next-line react/display-name
  render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
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
