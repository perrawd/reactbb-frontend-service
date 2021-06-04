/* eslint-disable prefer-destructuring */
import React from 'react'
import Login from '../Login'
import client from '../../../utils/ApolloClient.js'
import { ApolloProvider } from "@apollo/client"
import { render, screen, fireEvent } from '@testing-library/react'
import MessageProvider from '../../../context/flashmessage'

test('It renders login page without error', () => {
  render(<MessageProvider>
      <ApolloProvider client={client}>
        <Login></Login>
      </ApolloProvider>
    </MessageProvider>)
  const pageElement = screen.getAllByText(/Login/i)
  const element = pageElement[0]
  expect(element).toBeInTheDocument()
})

it('can change the value of a Input', () => {
  const { getAllByPlaceholderText } = render(<MessageProvider>
    <ApolloProvider client={client}>
      <Login></Login>
    </ApolloProvider>
  </MessageProvider>)

  const element = getAllByPlaceholderText('Username')
  const elementInput = element[0]

  fireEvent.change(elementInput, { target: { value: 'mockUser' } })

  expect(elementInput).toHaveValue('mockUser')
})
