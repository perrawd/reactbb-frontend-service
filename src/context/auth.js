/* eslint-disable no-empty-function */
import jwtDecode from 'jwt-decode'
import React, { useReducer, createContext } from 'react'

const initialState = { user: null }

if (localStorage.getItem('jwtToken')) {
  const token = jwtDecode(localStorage.getItem('jwtToken')).sub

  if (token.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken')
  } else {
    initialState.user = token
  }
}

const AuthContext = createContext({
  user: null,
  // eslint-disable-next-line no-unused-vars
  login: data => {},
  logout: () => {}
})

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: jwtDecode(localStorage.getItem('jwtToken')).sub
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}

const AuthProvider = props => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = data => {
    localStorage.setItem('jwtToken', data.accessToken)
    dispatch({
      type: 'LOGIN',
      payload: data
    })
  }

  const logout = () => {
    localStorage.removeItem('jwtToken')
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        logout
      }}
      {...props}
    />
  )
}

export { AuthContext, AuthProvider }
