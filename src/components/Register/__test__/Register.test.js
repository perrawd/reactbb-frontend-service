import Register from '../Register'
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'

const setup = () => {
    const utils = render(<Register></Register>)
    const input = utils.getByLabelText('username-input')
    return {
      input,
      ...utils,
    }
}

test('It renders register page without error', () => {
  render(<Register></Register>)
  const pageElement = screen.getByText(/Register/i);
  expect(pageElement).toBeInTheDocument();
})

test('It should allow input text in username field', () => {
  const { input } = setup()
  fireEvent.change(input, { target: { value: 'mockUser' } })
  expect(input.value).toBe('mockUser')
})
