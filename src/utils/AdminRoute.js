import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthContext } from '../context/auth'

const AdminRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext)

  if (!user) {
    return <Redirect to="/404" />
  }

  return (
    <Route
      {...rest}
      render={props => user.sub.role === 'MODERATOR' || user.sub.role === 'SUPERUSER'
      ? <Component {...props} />
      : <Redirect to="/403" />
      }
    />
  )
}

export default AdminRoute
