import React from 'react'
import { GET_CATEGORIES_QUERY, BoardList } from '../BoardList'
import { BrowserRouter as Router } from 'react-router-dom'
import { act, render, screen } from '@testing-library/react'
import TestRenderer from 'react-test-renderer'
import { MockedProvider } from '@apollo/client/testing'

const mocks = [
  {
    request: {
      query: GET_CATEGORIES_QUERY
    },
    result: {
      data: {
        getCategories: [
          {
            title: 'Mock Category',
            subtitle: 'Category testing',
            id: '607aadfc6fc59bc680853abc',
            subcategories: [
              {
                id: '6099922e76b57a786ceb08eb',
                title: 'Mocking test',
                subtitle:
                  'Subtitle testing ',
                threadCount: 57,
                latest: {
                  id: '60b9efb1ad0aba11348a5602',
                  title: 'sadasdasdasdasd',
                  createdAt: '1622798257140',
                  author: 'testadmin'
                }
              },
              {
                id: '6099924276b57a786ceb08ec',
                title: 'Lorem ipsum ',
                subtitle:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque mi, pharetra eu sem sit amet, tincidunt ullamcorper lorem. Suspendisse quis vulputate nisl. Mauris posuere dolor at est viverra, non placerat nunc ullamcorper. ',
                threadCount: 3,
                latest: null
              }
            ]
          }
        ]
      }
    }
  }
]

it('Get (loaded) category title without error', async () => {
  await act(async () => {
    render(<MockedProvider mocks={mocks} addTypename={false}>
        <Router>
          <BoardList />
        </Router>
      </MockedProvider>)

    // eslint-disable-next-line no-promise-executor-return
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
  const component = TestRenderer.create(<MockedProvider mocks={mocks} addTypename={false}>
      <Router>
        <BoardList />
      </Router>
    </MockedProvider>)

  const tree = component.toJSON()
  expect(tree).toContain('Loading...')
})
