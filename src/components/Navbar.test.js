import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { BrowserRouter as Router } from 'react-router-dom'

test('navbar rendering without errors', () => {
  render(
      <Router>
          <Navbar/>
      </Router>
   
  );
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
