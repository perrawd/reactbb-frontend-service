import React from 'react'
import { Tab } from 'semantic-ui-react'
import EditCategories from './EditCategories/EditCategories'
import AddCategory from './AddCategory/AddCategory'

const panes = [
  { menuItem: 'Edit categories',
  // eslint-disable-next-line react/display-name
  render: () => <Tab.Pane><EditCategories /></Tab.Pane> },
  { menuItem: 'Add category',
  // eslint-disable-next-line react/display-name
  render: () => <Tab.Pane><AddCategory /></Tab.Pane> }
]

const AdminCategories = () => <Tab menu={{ fluid: true,
         vertical: true,
         tabular: true }}
       panes={panes} />

export default AdminCategories
