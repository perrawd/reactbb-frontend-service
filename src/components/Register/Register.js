import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
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
  const [registerUser] = useMutation(REGISTER_USER)

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
    alert("Registered")
  }

  return (
    <div>
        <Form onSubmit={onSubmit} noValidate>
            <h1>Register</h1>
            <Form.Input
              label="Username"
              placeholder="Username"
              name="username"
              value={values.username}
              onChange={onChange}
              />
            <Form.Input
              label="Email"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={onChange}
              />
            <Form.Input
              label="Password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={onChange}
              />
            <Form.Input
              label="ConfirmPassword"
              placeholder="ConfirmPassword"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={onChange}
              />
              <Button type='submit'>Submit</Button>
        </Form>
        
    </div>
  )
}
