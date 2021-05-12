import React, { useState, useContext } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useHistory } from 'react-router'
import { Button, Form } from 'semantic-ui-react'
import { AuthContext } from '../../context/auth'

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      accessToken
      refreshToken
      username
    }
  }
`

const Login = () => {
  const context = useContext(AuthContext)

  const history = useHistory()

  const [errors, setErrors] = useState({})

  const [values, setValues] = useState({
    username: '',
    password: ''
  })

  const onChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update (proxy, { data: { login: userData } }) {
      context.login(userData)
      history.push('/')
    },
    onError (err) {
      setErrors(err.graphQLErrors[0].extensions.exception.message)
    }
  })

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
