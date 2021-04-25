import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { BrowserRouter as Router } from 'react-router-dom'

test('navbar rendering without errors', () => {
  render(
      <Router>
          <Navbar/>
      </Router>
   
  )
  const homeLink = screen.getByText(/Home/i)
  const messagesLink = screen.getByText(/Messages/i)
  const friendsLink = screen.getByText(/Friends/i)

  expect(homeLink).toBeInTheDocument()
  expect(messagesLink).toBeInTheDocument()
  expect(friendsLink).toBeInTheDocument()
})
