import TestRenderer from 'react-test-renderer'
import { MockedProvider } from '@apollo/client/testing'
import { GET_CATEGORIES_QUERY, BoardList } from '../src/components/BoardList'

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

test('render BoardList component without error', () => {
    const component = TestRenderer.create(
        <MockedProvider mocks={mocks} addTypename={false}>
          <BoardList/>
        </MockedProvider>,
      )
    const tree = component.toJSON();
    expect(tree.children).toContain('Loading...');
  }
)
