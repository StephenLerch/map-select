import React from 'react';
import MemoryRouter from 'react-router-dom';
import {render} from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders App', () => {
    const {getByText} = render(<App />, { wrapper: MemoryRouter });
    expect(getByText('Mapping example')).toBeInTheDocument();
  });
});
