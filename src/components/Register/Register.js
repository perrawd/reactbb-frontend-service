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
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result)
    }
  })

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
        
    </div>
  )
}
