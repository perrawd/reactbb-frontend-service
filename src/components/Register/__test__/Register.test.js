import Register from '../Register'
import { render, screen, fireEvent } from '@testing-library/react'
import { ApolloProvider } from "@apollo/client"
import client from '../../../utils/ApolloClient.js'

test('It renders register page without error', () => {
  render(<ApolloProvider client={client}>
      <Register></Register>
    </ApolloProvider>)
  const pageElement = screen.getByText(/Register/i);
  expect(pageElement).toBeInTheDocument();
})

it('can change the value of a Input', () => {
  const { getAllByPlaceholderText } = render(<ApolloProvider client={client}>
      <Register></Register>
    </ApolloProvider>)

  const element = getAllByPlaceholderText('Username')
  const elementInput = element[0]

  fireEvent.change(elementInput, { target: { value: 'mockUser' } })

  expect(elementInput).toHaveValue('mockUser')
})
