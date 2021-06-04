/**
 * AuthRoute component.
 * Code has been used from the following project.
 * https://github.com/hidjou/classsed-graphql-mern-apollo/blob/master/client/src/util/AuthRoute.js
 *
 * @author Ahmed Hadjou
 * @version 1.0.0
 */

import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthContext } from '../context/auth'

/**
 * Redirects authorized user from unauthorized routes.
 *
 * @param {component} component Passed component.
 * @returns {component} Route component.
 */
const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={props => user ? <Redirect to="/" /> : <Component {...props} />}
    />
  )
}

export default AuthRoute
