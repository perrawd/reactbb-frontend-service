import React from 'react'
import { Tab } from 'semantic-ui-react'
import EditSubcategories from './EditSubcategories/EditSubcategories'
import AddSubcategory from './AddSubcategory/AddSubcategory'

const TabExampleVerticalTabular = props => {
  const { categories } = props
  const panes = [
    { menuItem: 'Edit subcategories',
    // eslint-disable-next-line react/display-name
    render: () => <Tab.Pane><EditSubcategories categories={categories}/></Tab.Pane> },
    { menuItem: 'Add subcategory',
    // eslint-disable-next-line react/display-name
    render: () => <Tab.Pane><AddSubcategory categories={categories} /></Tab.Pane> }
  ]

return <Tab menu={{ fluid: true,
         vertical: true,
         tabular: true }}
       panes={panes} />
}

export default TabExampleVerticalTabular
