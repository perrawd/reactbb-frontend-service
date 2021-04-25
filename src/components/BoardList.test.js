import TestRenderer from 'react-test-renderer'
import { MockedProvider } from '@apollo/client/testing'
import { GET_CATEGORIES_QUERY, BoardList } from './BoardList'
import { act } from '@testing-library/react'
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
            { title: 'Mockz 2', subtitle: 'Lorem ipsum', id: '607aadfc6fc59bc68x0853abc' }
        ],
      },
    },
  }]
/*
it('render BoardList component without error', () => {
    const component = TestRenderer.create(
        <MockedProvider mocks={mocks} addTypename={false}>
           <BoardList></BoardList>
        </MockedProvider>,
      )
    const tree = component.toJSON();
    // console.log(tree)
    expect(tree).toContain('Loading...');
  }
)
*/
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
    // await act(() => new Promise(resolve => setTimeout(resolve, 0)))
    // console.log(screen)
    const linkElement = screen.getByText(/Mock Category/i);
    const linkElement2 = screen.getByText(/Mockz 3/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement2).toBeInTheDocument();
  })
  
})

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