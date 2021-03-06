import React from 'react'
import Register from '../Register'
import { ApolloProvider } from "@apollo/client"
import client from '../../../utils/ApolloClient.js'
import MessageProvider from '../../../context/flashmessage'
import { render, screen, fireEvent } from '@testing-library/react'

test('It renders register page without error', () => {
  render(<MessageProvider>
      <ApolloProvider client={client}>
        <Register></Register>
      </ApolloProvider>
    </MessageProvider>)
  const pageElement = screen.getByText(/Register/i);
  expect(pageElement).toBeInTheDocument();
})

it('can change the value of a Input', () => {
  const { getAllByPlaceholderText } = render(<MessageProvider>
      <ApolloProvider client={client}>
        <Register></Register>
      </ApolloProvider>
    </MessageProvider>)

  const element = getAllByPlaceholderText('Username')
  // eslint-disable-next-line prefer-destructuring
  const elementInput = element[0]

  fireEvent.change(elementInput, { target: { value: 'mockUser' } })

  expect(elementInput).toHaveValue('mockUser')
})
