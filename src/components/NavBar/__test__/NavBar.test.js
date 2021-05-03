import NavBar from '../NavBar'
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'

test('navbar rendering without errors', () => {
  render(
      <Router>
          <NavBar/>
      </Router>
   
  )
  const homeLink = screen.getByText(/Home/i)

  expect(homeLink).toBeInTheDocument()
})
