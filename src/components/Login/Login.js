/**
 * Login component.
 * Parts of this component has been inspired from the following project.
 * https://github.com/hidjou/classsed-graphql-mern-apollo/blob/master/client/src/pages/Login.js
 *
 * @author Per Rawdin
 * @author Ahmed Hadjou
 * @version 1.0.0
 */
import React, { useState, useContext } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useHistory } from 'react-router'
import { Button, Form } from 'semantic-ui-react'

import { AuthContext } from '../../context/auth'
import { MessageContext } from '../../context/flashmessage'

/**
 * GraphqQL mutation queries.
 */
const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      accessToken
      refreshToken
      username
      role
    }
  }
`

const Login = () => {
  const context = useContext(AuthContext)

  const [, setMessage] = useContext(MessageContext)

  const history = useHistory()

  const [errors, setErrors] = useState({})

  const [values, setValues] = useState({
    username: '',
    password: ''
  })

  /**
   * GraphqQL mutation functions.
   */
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update (proxy, { data: { login: userData } }) {
      context.login(userData)

      setMessage({
        active: true,
        message: "You are now logged in.",
        type: "green"
      })
      history.goBack()
    },
    onError (err) {
      setErrors(err.graphQLErrors[0].extensions.exception.message)
    }
  })

  /**
   * Form functions.
   */
  const onChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = event => {
    event.preventDefault()
    loginUser({ variables: values })
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
        />
        <Button type="submit">Login</Button>
      </Form>
      {Object.keys(errors).length > 0 && <div className="ui error message">
          <ul className="list">
            <li>{errors}</li>
          </ul>
        </div>}
    </div>
  )
}

export default Login
