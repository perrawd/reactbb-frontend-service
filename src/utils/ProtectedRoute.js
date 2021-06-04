/**
 * ProtectedRoute component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthContext } from '../context/auth'


/**
 * Redirects unauthorized user to login for protected routes.
 *
 * @param {component} component Passed component.
 * @returns {component} Route component.
 */
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={props => user ? <Component {...props} /> : <Redirect to="/login" /> }
    />
  )
}

export default ProtectedRoute
