/* eslint-disable prefer-destructuring */
import React from 'react'
import Login from '../Login'
import client from '../../../utils/ApolloClient.js'
import { ApolloProvider } from "@apollo/client"
import { render, screen, fireEvent } from '@testing-library/react'

test('It renders login page without error', () => {
  render(<ApolloProvider client={client}>
      <Login></Login>
    </ApolloProvider>)
  const pageElement = screen.getAllByText(/Login/i)
  const element = pageElement[0]
  expect(element).toBeInTheDocument()
})

it('can change the value of a Input', () => {
  const { getAllByPlaceholderText } = render(<ApolloProvider client={client}>
      <Login></Login>
    </ApolloProvider>)

  const element = getAllByPlaceholderText('Username')
  const elementInput = element[0]

  fireEvent.change(elementInput, { target: { value: 'mockUser' } })

  expect(elementInput).toHaveValue('mockUser')
})
