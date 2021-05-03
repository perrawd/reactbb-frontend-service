import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Button, Form } from 'semantic-ui-react'

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

export default function Register() {

  const history = useHistory()
  
  const [errors, setErrors] = useState({})

  const [values, setValues] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
  })

  const onChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value})
  }

  const onSubmit = (event) => {
    event.preventDefault()
    registerUser({variables: values})
  }

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result)
      history.push('/')
    },
    onError(err) {
      console.log(err.graphQLErrors)
      setErrors(err.graphQLErrors[0].extensions.exception.validationMessages)
    }
  })

  return (
    <div>
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
              <Button type='submit'>Submit</Button>
        </Form>
        {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
