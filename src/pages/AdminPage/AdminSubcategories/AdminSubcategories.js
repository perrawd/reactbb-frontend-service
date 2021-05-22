import React from 'react'
import { Tab } from 'semantic-ui-react'

const panes = [
  { menuItem: 'Edit subcategories',
  // eslint-disable-next-line react/display-name
  render: () => <Tab.Pane>Edit subcategories</Tab.Pane> },
  { menuItem: 'Add subcategory',
  // eslint-disable-next-line react/display-name
  render: () => <Tab.Pane>Add subcategory</Tab.Pane> }
]

const TabExampleVerticalTabular = () => <Tab menu={{ fluid: true,
         vertical: true,
         tabular: true }}
       panes={panes} />

export default TabExampleVerticalTabular
