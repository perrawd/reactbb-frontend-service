import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing'
import { GET_CATEGORIES_QUERY } from './components/BoardList'
import App from './App';

const mocks = [{
  request: {
    query: GET_CATEGORIES_QUERY,
  },
  result: {
    data: {
      getCategories: [
          { title: 'Mock Category', subtitle: 'Lorem ipsum', id: '607aadfc6fc59bc680853abc' }
      ],
    },
  },
}]

test('renders learn react link', () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );
  const linkElement = screen.getByText(/Loading.../i);
  expect(linkElement).toBeInTheDocument();
});
