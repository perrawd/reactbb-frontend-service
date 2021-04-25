import { render, screen } from '@testing-library/react';
import App from './App';
import { ApolloProvider } from "@apollo/client"
import client from './utils/ApolloClient.js'

test('navbar rendering without errors', () => {
  render(
   <ApolloProvider client={client}>
     <App />
   </ApolloProvider>
  );
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
