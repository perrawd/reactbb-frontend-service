import React from 'react'
import NavBar from '../NavBar'
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'
import MessageProvider from '../../../context/flashmessage'

test('navbar rendering without errors', () => {
  render(<MessageProvider>
        <Router>
          <NavBar/>
        </Router>
      </MessageProvider>)
  const homeLink = screen.getByText(/Home/i)

  expect(homeLink).toBeInTheDocument()
})
