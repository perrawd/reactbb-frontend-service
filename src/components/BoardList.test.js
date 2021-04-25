import TestRenderer from 'react-test-renderer'
import { MockedProvider } from '@apollo/client/testing'
import { GET_CATEGORIES_QUERY, BoardList } from './BoardList'
import { act } from '@testing-library/react'
import { BrowserRouter } from "react-router-dom"

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

it('render BoardList component without error', () => {
    const component = TestRenderer.create(
        <MockedProvider mocks={mocks} addTypename={false}>
           <BoardList></BoardList>
        </MockedProvider>,
      )
    const tree = component.toJSON();
    console.log(tree)
    expect(tree).toContain('Loading...');
  }
)
/*
it('render BoardList component success', async () => {
  const component = TestRenderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
         <BoardList></BoardList>
      </MockedProvider>,
    )

    await new Promise(resolve => setTimeout(resolve, 0))
  const tree = component.toJSON();
  console.log(tree)
  expect(tree).toContain('Mock');
}
)

it('should render categories', async () => {
  const component = TestRenderer.create(
    <BrowserRouter>
    <MockedProvider mocks={mocks} addTypename={false}>
       <BoardList></BoardList>
    </MockedProvider>
    </BrowserRouter>
  )
  await new Promise(resolve => setTimeout(resolve, 0))

  const p = component.root
  const d = component.toJSON()
  console.log(p.findByType('div'))
  console.log(d)
  expect(p).toContain('Mock')
})
*/