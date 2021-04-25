import { act } from '@testing-library/react'
import TestRenderer from 'react-test-renderer'
import { MockedProvider } from '@apollo/client/testing'
import { GET_CATEGORIES_QUERY, BoardList } from './BoardList'
import { BrowserRouter as Router } from "react-router-dom"
import { render, screen } from '@testing-library/react';

const mocks = [{
    request: {
      query: GET_CATEGORIES_QUERY,
    },
    result: {
      data: {
        getCategories: [
            { title: 'Mock Category', subtitle: 'Lorem ipsum', id: '607aadfc6fc59bc680853abc' },
            { title: 'Mocking test', subtitle: 'Subtitle testing', id: '607aadfc6fc59bc68x0853abc' }
        ],
      },
    },
  }]


it('Get (loaded) category title without error', async () => {
  await act(async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router>
          <BoardList></BoardList>
        </Router>
      </MockedProvider>
    )

    await new Promise(resolve => setTimeout(resolve, 0))

    const categoryHeader1 = screen.getByText(/Mock Category/i)
    const categoryHeader2 = screen.getByText(/Mocking test/i)
    const subtitleElement = screen.getByText(/Subtitle testing/i)
    expect(categoryHeader1).toBeInTheDocument()
    expect(categoryHeader2).toBeInTheDocument()
    expect(subtitleElement).toBeInTheDocument()
  })
})


it('render BoardList component without error', () => {
  const component = TestRenderer.create(
    <Router>
      <MockedProvider mocks={mocks} addTypename={false}>
         <BoardList></BoardList>
      </MockedProvider>
    </Router>,
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