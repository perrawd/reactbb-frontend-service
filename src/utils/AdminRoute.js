/**
 * AdminRoute component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthContext } from '../context/auth'

/**
 * Protected routes and redirects unauthorized users for Admin routes.
 *
 * @param {component} component Passed component.
 * @returns {component} Route component.
 */
const AdminRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext)

  if (!user) {
    return <Redirect to="/404" />
  }

  return (
    <Route
      {...rest}
      render={props => user.role === 'MODERATOR' || user.role === 'SUPERUSER'
      ? <Component {...props} />
      : <Redirect to="/403" />
      }
    />
  )
}

export default AdminRoute
