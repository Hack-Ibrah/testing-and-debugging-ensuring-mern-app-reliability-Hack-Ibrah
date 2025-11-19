import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from '../components/BugForm';
import axios from 'axios';

jest.mock('axios');

test('shows validation error when title too short', async () => {
  const onAdd = jest.fn();
  render(<BugForm onAdd={onAdd} apiBase="http://localhost:5000/api" />);
  const input = screen.getByPlaceholderText('Title');
  const button = screen.getByText('Report Bug');
  fireEvent.change(input, { target: { value: 'ab' }});
  fireEvent.click(button);
  expect(await screen.findByRole('alert')).toHaveTextContent('Title too short');
});

test('submits and calls onAdd', async () => {
  const onAdd = jest.fn();
  axios.post.mockResolvedValue({ data: { _id: '1', title: 'ok' }});
  render(<BugForm onAdd={onAdd} apiBase="http://localhost:5000/api" />);
  fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Good title' }});
  fireEvent.click(screen.getByText('Report Bug'));
  // wait a moment for promise microtask
  await new Promise(r => setTimeout(r, 10));
  expect(onAdd).toHaveBeenCalled();
});
