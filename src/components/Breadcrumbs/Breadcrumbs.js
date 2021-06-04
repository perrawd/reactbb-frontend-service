/**
 * Breadcrumbs component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'semantic-ui-react'

const Breadcrumbs = props => {

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Section link as={Link} to="/">Home</Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section link>{props.category}</Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section
          link as={Link}
          to={`subcategories?sid=${props.subcategory.id}`}>{props.subcategory.title}
        </Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section active>{props.current}</Breadcrumb.Section>
      </Breadcrumb>
    </div>
  )
}

export default Breadcrumbs
