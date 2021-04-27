import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'

export default function Register() {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

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
            </Form>
            <Button type='submit'>Submit</Button>
        </div>
    )
}
