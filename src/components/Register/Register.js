/**
 * Register component.
 * Parts of this component has been inspired from the following project.
 * https://github.com/hidjou/classsed-graphql-mern-apollo/blob/master/client/src/pages/Register.js
 *
 * @author Per Rawdin
 * @author Ahmed Hadjou
 * @version 1.0.0
 */
import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router'
import { gql, useMutation } from '@apollo/client'
import { Button, Form } from 'semantic-ui-react'

import { MessageContext } from '../../context/flashmessage'

/**
 * GraphqQL mutation queries.
 */
const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
    }
  }
`

const Register = () => {
  const history = useHistory()

  const [errors, setErrors] = useState({})

  const [, setMessage] = useContext(MessageContext)

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  /**
   * GraphqQL mutation functions.
   */
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update () {
      setMessage({
        active: true,
        message: "Your account has been registered. Please login with your credentials.",
        type: "green"
      })
      history.push('/login')
    },
    onError (err) {
      setErrors(err.graphQLErrors[0].extensions.exception.validationMessages)
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
    registerUser({ variables: values })
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          value={values.email}
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
        <Form.Input
          label="ConfirmPassword"
          placeholder="ConfirmPassword"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit">Submit</Button>
      </Form>
      {Object.keys(errors).length > 0 && <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map(value => <li key={value}>{value}</li>)}
          </ul>
        </div>}
    </div>
  )
}

export default Register
