import { GET_CATEGORIES_QUERY, BoardList } from '../BoardList'
import { BrowserRouter as Router } from "react-router-dom"
import { act } from '@testing-library/react'
import TestRenderer from 'react-test-renderer'
import { MockedProvider } from '@apollo/client/testing'
import { render, screen } from '@testing-library/react'

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
    <MockedProvider mocks={mocks} addTypename={false}>
      <Router>
        <BoardList></BoardList>
      </Router>
    </MockedProvider>,
  )
    const tree = component.toJSON()
    expect(tree).toContain('Loading...')
  }
)
